import streamlit as st
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from ollama import Client

# Load vector DB
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local("college_index", embeddings, allow_dangerous_deserialization=True)

# Load retriever
retriever = db.as_retriever(search_kwargs={"k": 3})

# Initialize Ollama client
client = Client()

# Streamlit UI
st.title("🎓 College RAG Assistant")
st.write("Ask me anything about government engineering colleges!")

query = st.text_input("Enter your question:")
if query:
    # Retrieve context
    docs = retriever.get_relevant_documents(query)
    context = "\n\n".join([doc.page_content for doc in docs])
    
    # Generate answer using Ollama
    prompt = f"Answer the question based on the context below:\n\nContext:\n{context}\n\nQuestion: {query}\nAnswer:"
    
    try:
        response = client.chat(
            model="llama3.2:1b",  # Using Llama3.2:1b which requires less memory
            messages=[{"role": "user", "content": prompt}]
        )
        
        # Extract the response text
        if hasattr(response, 'message') and hasattr(response.message, 'content'):
            answer = response.message.content
        elif isinstance(response, dict):
            answer = response.get("message", {}).get("content", "") or response.get("content", "")
        else:
            answer = str(response)
        
        st.subheader("Answer")
        st.write(answer)
        
    except Exception as e:
        st.error(f"Error generating response: {str(e)}")
        st.info("Make sure Ollama is running and the 'llama3.2:1b' model is available.")
    
    # Show references
    st.subheader("References")
    if docs:
        for i, doc in enumerate(docs):
            st.write(f"📌 {i+1}. {doc.page_content[:300]}...")
    else:
        st.warning("No relevant documents found.")