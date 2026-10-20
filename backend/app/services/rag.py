from typing import Any

from langchain_ollama import ChatOllama
from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.services.search import search_knowledge


llm = ChatOllama(
    model=settings.ollama_llm_model,
    base_url=settings.ollama_host,
    temperature=0,
)


def answer_question(
    db: Session,
    question: str,
) -> dict[str, Any]:

    results = search_knowledge(
        db=db,
        query=question,
        limit=3,
    )

    if not results:
        return {
            "answer": "I could not find any relevant information in the knowledge base.",
            "sources": [],
        }

    context_parts = []

    for document, distance in results:
        context_parts.append(
            f"Title: {document.title}\n"
            f"Source: {document.source}\n"
            f"Content: {document.content}"
        )

    context = "\n\n---\n\n".join(context_parts)

    prompt = f"""Use the information in the Knowledge section to answer the Question.

Knowledge:
{context}

Question:
{question}

Give a short, direct answer based only on the Knowledge.
"""

    response = llm.invoke(prompt)

    return {
        "answer": response.content,
        "sources": [
            {
                "id": document.id,
                "title": document.title,
                "source": document.source,
                "distance": float(distance),
            }
            for document, distance in results
        ],
    }