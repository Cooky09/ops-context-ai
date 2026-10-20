from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_database_health():
    response = client.get("/database-health")

    assert response.status_code == 200

    data = response.json()

    assert data["database"] == "healthy"
    assert data["result"] == 1