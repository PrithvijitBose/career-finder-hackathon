from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import faiss, json, numpy as np
from sentence_transformers import SentenceTransformer
from ollama import Client

app = FastAPI()

# Add CORS middleware - IMPORTANT for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=False,  # Set to False when using wildcard
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    mode: str  # "search" or "ai"

# Load resources once
try:
    index = faiss.read_index("govt_colleges_index.faiss")
    with open("processed_college_docs.json", "r", encoding="utf-8") as f:
        docs = json.load(f)
    model = SentenceTransformer("all-MiniLM-L6-v2")
    client = Client()
    print("✅ All resources loaded successfully")
except Exception as e:
    print(f"❌ Error loading resources: {e}")

@app.post("/ask")
def ask_college(request: QueryRequest):
    try:
        query_vec = model.encode([request.query])
        D, I = index.search(np.array(query_vec, dtype="float32"), 3)
        retrieved_docs = [
            {"content": docs[i], "similarity_score": float(D[0][idx])}
            for idx, i in enumerate(I[0]) if i < len(docs)
        ]

        if request.mode == "search":
            return {"results": retrieved_docs}

        # AI mode
        context = "\n\n".join(
            [f"College {i+1}: {doc['content'][:300]}" for i, doc in enumerate(retrieved_docs[:2])]
        )
        prompt = f"Based on these colleges, answer the question:\n\n{context}\n\nQuestion: {request.query}\nAnswer:"
        response = client.chat(model="llama2", messages=[{"role": "user", "content": prompt}])
        
        # Debug the new Ollama response format
        print(f"🔍 Ollama response type: {type(response)}")
        print(f"🔍 Ollama response structure: {dir(response)}")
        print(f"🔍 Raw response: {response}")
        
        # Try different ways to extract the answer
        try:
            if hasattr(response, 'message') and hasattr(response.message, 'content'):
                answer = response.message.content
                print(f"✅ Using response.message.content: {answer[:100]}...")
            elif hasattr(response, 'content'):
                answer = response.content  
                print(f"✅ Using response.content: {answer[:100]}...")
            elif isinstance(response, dict) and 'message' in response:
                answer = response['message'].get('content', str(response))
                print(f"✅ Using dict access: {answer[:100]}...")
            else:
                answer = str(response)
                print(f"⚠️ Using str(response): {answer[:100]}...")
        except Exception as e:
            print(f"❌ Error extracting answer: {e}")
            answer = "Error processing AI response"
        
        print(f"🎯 Final answer length: {len(answer)}")
        return {"results": retrieved_docs, "answer": answer}
    
    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/ping")
def ping():
    return {"status": "ok", "message": "Backend is running!"}

@app.get("/")
def root():
    return {"message": "College AI API is running"}

# Run with: uvicorn backend:app --reload --port 8000