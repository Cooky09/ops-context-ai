import ollama

from backend.app.config import settings


def create_embedding(text: str) -> list[float]:
    client = ollama.Client(host=settings.ollama_host)

    response = client.embed(
        model=settings.ollama_embedding_model,
        input=text,
    )

    return response["embeddings"][0]