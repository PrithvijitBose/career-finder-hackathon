# Use a pre-built image with ML libraries
FROM pytorch/pytorch:2.0.1-py3.10-cpu

# Install only the additional packages we need
RUN pip install --no-cache-dir \
    fastapi \
    uvicorn[standard] \
    sentence-transformers==5.1.0 \
    faiss-cpu==1.12.0 \
    ollama

WORKDIR /app
COPY . .

EXPOSE 8000
CMD ["python", "backend.py"]