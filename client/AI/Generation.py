# Generation.py

import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# ------------------------------
# 1. Load JSON data (colleges info)
# ------------------------------
with open("govt_engineering_colleges.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# ------------------------------
# 2. Convert JSON into text "docs"
# ------------------------------
docs = []
for entry in data:
    text = " | ".join([f"{k}: {v}" for k, v in entry.items() if v])
    docs.append(text)

print(f"✅ Processed {len(docs)} college entries")

# ------------------------------
# 3. Make embeddings (turn text -> numbers)
# ------------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")
print("🔄 Creating embeddings...")
embeddings = model.encode(docs)

# ------------------------------
# 4. Store in FAISS index
# ------------------------------
embedding_matrix = np.array(embeddings, dtype="float32")
index = faiss.IndexFlatL2(embedding_matrix.shape[1])
index.add(embedding_matrix)

print(f"🏗️  FAISS index created with {index.ntotal} vectors")

# ------------------------------
# 5. Save everything for reuse
# ------------------------------
# Save the FAISS index
faiss.write_index(index, "govt_colleges_index.faiss")
print("💾 Saved FAISS index to: govt_colleges_index.faiss")

# Save the processed docs
with open("processed_college_docs.json", "w", encoding="utf-8") as f:
    json.dump(docs, f, indent=2, ensure_ascii=False)
print("💾 Saved processed docs to: processed_college_docs.json")

# Save original data for reference
with open("original_college_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("💾 Saved original data to: original_college_data.json")

# ------------------------------
# 6. Test the system
# ------------------------------
def retrieve(query, top_k=3):
    query_vec = model.encode([query])
    D, I = index.search(np.array(query_vec, dtype="float32"), top_k)
    return [docs[i] for i in I[0]], D[0]  # Return docs and distances

query = "Government engineering colleges in Mumbai"
results, distances = retrieve(query)

print(f"\n🔎 Test Query: '{query}'")
print("📋 Retrieved results:")
for i, (doc, dist) in enumerate(zip(results, distances)):
    print(f"\n{i+1}. (Similarity: {dist:.3f})")
    print(f"   {doc[:200]}...")

print(f"\n✅ Setup complete! Files saved:")
print("   - govt_colleges_index.faiss")
print("   - processed_college_docs.json") 
print("   - original_college_data.json")