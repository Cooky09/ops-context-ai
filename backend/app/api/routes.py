from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.app.database.connection import SessionLocal, engine
from backend.app.models.knowledge import KnowledgeDocument
from backend.app.schemas.knowledge import (
    KnowledgeCreate,
    KnowledgeResponse,
)
from backend.app.services.embeddings import create_embedding
from backend.app.services.rag import answer_question
from backend.app.services.search import search_knowledge


router = APIRouter()


class AskRequest(BaseModel):
    question: str


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/")
def root():
    return {
        "message": "AI Operations Knowledge Assistant API",
        "status": "running",
    }


@router.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "AI Operations Knowledge Assistant",
    }


@router.get("/database-health")
def database_health():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        value = result.scalar()

    return {
        "database": "healthy",
        "result": value,
    }


@router.post(
    "/knowledge",
    response_model=KnowledgeResponse,
)
def create_knowledge(
    knowledge: KnowledgeCreate,
    db: Session = Depends(get_db),
):
    embedding = create_embedding(knowledge.content)

    document = KnowledgeDocument(
        title=knowledge.title,
        content=knowledge.content,
        source=knowledge.source,
        embedding=embedding,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


@router.get(
    "/knowledge",
    response_model=list[KnowledgeResponse],
)
def list_knowledge(
    db: Session = Depends(get_db),
):
    return db.query(KnowledgeDocument).all()


@router.get("/search")
def search(
    q: str = Query(..., min_length=1),
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db),
):
    results = search_knowledge(
        db=db,
        query=q,
        limit=limit,
    )

    return [
        {
            "id": document.id,
            "title": document.title,
            "content": document.content,
            "source": document.source,
            "distance": float(distance),
        }
        for document, distance in results
    ]


@router.post("/ask")
def ask(
    request: AskRequest,
    db: Session = Depends(get_db),
):
    result = answer_question(
        db=db,
        question=request.question,
    )

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"],
    }