from datetime import datetime

from pydantic import BaseModel, ConfigDict


class KnowledgeCreate(BaseModel):
    title: str
    content: str
    source: str | None = None


class KnowledgeResponse(BaseModel):
    id: int
    title: str
    content: str
    source: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)