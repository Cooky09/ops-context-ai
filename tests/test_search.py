from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_kubernetes_search():
    response = client.get(
        "/search",
        params={
            "q": "How do I troubleshoot a Kubernetes deployment?",
            "limit": 1,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["title"] == "Kubernetes Deployment Troubleshooting"
    assert data[0]["source"] == "operations-runbook"
    assert data[0]["distance"] < 0.5