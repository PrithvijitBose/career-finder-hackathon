from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import uvicorn

# Make ML imports optional
try:
    import faiss
    import numpy as np
    from sentence_transformers import SentenceTransformer
    ML_AVAILABLE = True
    print("✅ ML libraries loaded successfully")
except ImportError as e:
    ML_AVAILABLE = False
    print(f"⚠️ ML libraries not available: {e}")
    print("Running in API-only mode")

# Ollama imports
try:
    from ollama import Client
    import ollama
    OLLAMA_AVAILABLE = True
    print("✅ Ollama library loaded successfully")
except ImportError as e:
    OLLAMA_AVAILABLE = False
    print(f"⚠️ Ollama library not available: {e}")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ------------------------
# Models
# ------------------------
class QueryRequest(BaseModel):
    query: str
    mode: str  # "search" or "ai"

class QARequest(BaseModel):
    answers: dict  # {"question": "answer", ...}

# ------------------------
# Critical questions
# ------------------------
CRITICAL_QUESTIONS = [
    "What is your main goal in pursuing higher education?",
    "What challenges are you currently facing regarding college admissions?",
    "How much time per week can you dedicate to studies?",
    "Do you prefer a research-oriented or job-oriented course?",
]

# ------------------------
# Resource Loading
# ------------------------
index = None
docs = None
model = None
client = None

# Load ML resources if available
if ML_AVAILABLE:
    try:
        index = faiss.read_index("govt_colleges_index.faiss")
        with open("processed_college_docs.json", "r", encoding="utf-8") as f:
            docs = json.load(f)
        model = SentenceTransformer("all-MiniLM-L6-v2")
        print("✅ FAISS index and documents loaded successfully")
    except Exception as e:
        print(f"❌ Error loading ML resources: {e}")
        ML_AVAILABLE = False

# Load Ollama client if available
if OLLAMA_AVAILABLE:
    try:
        client = Client()
        print("✅ Ollama client loaded successfully")
    except Exception as e:
        print(f"❌ Error loading Ollama client: {e}")
        OLLAMA_AVAILABLE = False

# ------------------------
# Helper to normalize Ollama responses
# ------------------------
def extract_answer(response):
    """Extracts the assistant's text + metadata from Ollama response"""
    answer = None
    metadata = {}

    # New-style object response
    if hasattr(response, "message") and hasattr(response.message, "content"):
        answer = response.message.content
        metadata = {
            "model": getattr(response, "model", None),
            "created_at": getattr(response, "created_at", None),
            "done_reason": getattr(response, "done_reason", None),
            "eval_tokens": getattr(response, "eval_count", None),
            "prompt_tokens": getattr(response, "prompt_eval_count", None),
            "duration_ms": int(getattr(response, "total_duration", 0) / 1e6),
        }

    # Dict-style response
    elif isinstance(response, dict):
        if "message" in response and "content" in response["message"]:
            answer = response["message"]["content"]
        elif "content" in response:
            answer = response["content"]
        else:
            answer = str(response)
        metadata = {k: v for k, v in response.items() if k not in ["message", "content"]}

    # Fallback
    if not answer:
        answer = str(response)

    return answer, metadata

# ------------------------
# Endpoints
# ------------------------
@app.post("/ask")
def ask_college(request: QueryRequest):
    try:
        print(f"🔍 Received query: {request.query} in mode: {request.mode}")

        if not ML_AVAILABLE or not model or not index or not docs:
            raise HTTPException(
                status_code=503, 
                detail="ML services not available. Vector search is disabled."
            )

        # Vector search
        query_vec = model.encode([request.query])
        D, I = index.search(np.array(query_vec, dtype="float32"), 3)
        retrieved_docs = [
            {"content": docs[i], "similarity_score": float(D[0][idx])}
            for idx, i in enumerate(I[0]) if i < len(docs)
        ]

        if request.mode == "search":
            return {"results": retrieved_docs}

        # AI mode - requires both ML and Ollama
        if not OLLAMA_AVAILABLE or not client:
            return {
                "results": retrieved_docs,
                "answer": "AI chat is not available, but here are the search results.",
                "metadata": {"error": "Ollama not available"}
            }

        context = "\n\n".join(
            [f"College {i+1}: {doc['content'][:300]}" for i, doc in enumerate(retrieved_docs[:2])]
        )
        prompt = f"Based on these colleges, answer the question:\n\n{context}\n\nQuestion: {request.query}\nAnswer:"

        response = client.chat(
            model="llama3.2:1b",
            messages=[{"role": "user", "content": prompt}]
        )

        answer, metadata = extract_answer(response)

        return {
            "results": retrieved_docs,
            "answer": answer,
            "metadata": metadata,
        }

    except Exception as e:
        print(f"❌ Error in /ask: {e}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.get("/critical-questions")
def get_critical_questions():
    """Send predefined critical questions"""
    return {"questions": CRITICAL_QUESTIONS}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "ml_available": ML_AVAILABLE,
        "ollama_available": OLLAMA_AVAILABLE,
        "services": {
            "faiss_index": index is not None,
            "documents": docs is not None,
            "sentence_transformer": model is not None,
            "ollama_client": client is not None
        }
    }

@app.post("/critical-qa")
def evaluate_answers(request: QARequest):
    """Evaluate user answers using Ollama"""
    try:
        if not OLLAMA_AVAILABLE or not client:
            raise HTTPException(
                status_code=503,
                detail="Ollama service not available"
            )

        formatted = "\n".join([f"Q: {q}\nA: {a}" for q, a in request.answers.items()])
        prompt = (
            "You are an evaluator. Based on the following Q&A from a student, "
            "analyze their situation and provide a thoughtful recommendation:\n\n"
            f"{formatted}\n\nFinal Recommendation:"
        )

        response = client.chat(
            model="llama3.2:1b",
            messages=[
                {"role": "system", "content": "Be analytical but concise."},
                {"role": "user", "content": prompt}
            ]
        )

        answer, metadata = extract_answer(response)

        return {
            "evaluation": answer,
            "metadata": metadata,
        }

    except Exception as e:
        print(f"❌ Error in /critical-qa: {e}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.post("/test-ollama")
def test_ollama():
    """Debug endpoint to test Ollama directly"""
    try:
        if not OLLAMA_AVAILABLE:
            return {"success": False, "error": "Ollama library not available"}
        
        response = ollama.generate(
            model="llama3.2:1b", prompt='Say "test successful" and nothing else.'
        )
        return {"success": True, "response": response}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/ping")
def ping():
    return {"status": "ok", "message": "Backend is running!"}

@app.get("/")
def root():
    return {"message": "College AI API is running"}

@app.get("/status")
def status():
    """Debug endpoint to check what's available"""
    return {
        "ml_libraries": ML_AVAILABLE,
        "ollama_available": OLLAMA_AVAILABLE,
        "resources_loaded": {
            "faiss_index": index is not None,
            "documents": docs is not None,  
            "sentence_transformer": model is not None,
            "ollama_client": client is not None
        }
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
# Run with: uvicorn backend:app --reload --port 8000
