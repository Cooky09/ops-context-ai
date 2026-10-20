from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.models.knowledge import KnowledgeDocument
from backend.app.services.embeddings import create_embedding


def search_knowledge(
    db: Session,
    query: str,
    limit: int = 5,
    distance_threshold: float = 0.35,
):
    query_embedding = create_embedding(query)

    distance = KnowledgeDocument.embedding.cosine_distance(
        query_embedding
    )

    statement = (
        select(
            KnowledgeDocument,
            distance.label("distance"),
        )
        .where(
            KnowledgeDocument.embedding.is_not(None),
            distance <= distance_threshold,
        )
        .order_by(distance)
        .limit(limit)
    )

    result = db.execute(statement)

    return result.all()