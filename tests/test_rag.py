from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_answer_question_returns_answer():
    response = client.post(
        "/ask",
        json={
            "question": "How do I troubleshoot a Kubernetes deployment?"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["question"] == (
        "How do I troubleshoot a Kubernetes deployment?"
    )

    assert data["answer"]
    assert isinstance(data["answer"], str)

    assert "sources" in data
    assert isinstance(data["sources"], list)
    assert len(data["sources"]) >= 1


def test_answer_question_has_kubernetes_source():
    response = client.post(
        "/ask",
        json={
            "question": "How do I troubleshoot a Kubernetes deployment?"
        },
    )

    assert response.status_code == 200

    data = response.json()

    titles = [
        source["title"]
        for source in data["sources"]
    ]

    assert "Kubernetes Deployment Troubleshooting" in titles


def test_answer_question_source_structure():
    response = client.post(
        "/ask",
        json={
            "question": "How do I troubleshoot a Kubernetes deployment?"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data["sources"]) >= 1

    source = data["sources"][0]

    assert "id" in source
    assert "title" in source
    assert "source" in source
    assert "distance" in source

    assert isinstance(source["id"], int)
    assert isinstance(source["title"], str)
    assert isinstance(source["source"], str)
    assert isinstance(source["distance"], float)


def test_answer_question_empty_body():
    response = client.post(
        "/ask",
        json={},
    )

    assert response.status_code == 422
