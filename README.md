# Ops Context AI

> AI-powered operational knowledge assistant using Retrieval-Augmented Generation (RAG) to provide grounded answers from internal runbooks.

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-Frontend-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Ollama](https://img.shields.io/badge/Ollama-Local%20AI-000000)](https://ollama.com/)

---

## Overview

**Ops Context AI** is a full-stack AI operations assistant built to help engineers troubleshoot infrastructure and operational issues using information stored in internal runbooks.

Instead of asking a general-purpose language model to answer from memory, the application first searches a PostgreSQL knowledge base using vector similarity and then provides the retrieved context to the language model.

The result is a simple RAG workflow:

**Question → Embedding → Semantic Search → Relevant Runbooks → LLM → Grounded Answer**

The project was built to demonstrate practical skills across **AI engineering, backend development, frontend development, databases, containerization, testing, and Kubernetes**.

---

## Why I Built This

Operational teams often have useful troubleshooting knowledge documented across runbooks, but finding the right information during an incident can take time.

I wanted to build a system that allows an engineer to ask a question naturally, such as:

> "How do I troubleshoot a Kubernetes deployment?"

The assistant searches the operational knowledge base, retrieves relevant documentation, and generates an answer based on that context.

The interface also exposes the retrieved sources and similarity distances so the user can see where the answer came from.

---

## Features

### AI-Powered Knowledge Assistant

Ask natural-language questions about operational procedures and troubleshooting.

Example questions:

```text
How do I troubleshoot a Kubernetes deployment?

How do I troubleshoot a PostgreSQL database connection?

What should I check when a deployment is unhealthy?
```

---

### Retrieval-Augmented Generation

The assistant does not rely solely on the language model.

For each question:

1. The question is converted into an embedding.
2. The embedding is compared against stored document embeddings.
3. Relevant operational runbooks are retrieved.
4. Retrieved content is provided as context to the LLM.
5. The LLM generates a grounded response.
6. The API returns both the answer and the retrieved sources.

This helps keep operational answers tied to the project's documented knowledge.

---

### Semantic Vector Search

The application uses vector embeddings to search for documents based on meaning rather than exact keyword matches.

For example, a question about:

```text
database connection problems
```

can retrieve documentation related to:

```text
PostgreSQL connectivity troubleshooting
```

even when the wording is different.

---

### Grounded Responses

When relevant knowledge is found, the assistant generates a response using the retrieved operational context.

When relevant information cannot be found, the system can return:

```text
I could not find any relevant information in the knowledge base.
```

This provides a clear boundary between documented operational knowledge and unsupported answers.

---

### Source Transparency

Every retrieved source is displayed in the UI with:

- Document title
- Knowledge source
- Retrieval ranking
- Similarity distance

Example:

```text
01
PostgreSQL Database Troubleshooting
database-runbook

Similarity
0.115
```

This makes the RAG pipeline more transparent to the user.

---

### Modern Frontend

The frontend is built with Next.js, React, and TypeScript.

It includes:

- Responsive interface
- Operational dashboard design
- Quick-question suggestions
- Loading states
- Error handling
- Markdown rendering
- RAG status indicators
- Source cards
- Similarity scores
- Clear visual hierarchy
- Interactive question input

The frontend was intentionally designed as part of the project rather than using a basic AI chat template.

---

### Local AI Inference

The project uses Ollama for local model inference.

This allows the RAG workflow to run locally without requiring a hosted AI API for the core application.

The following are configurable:

- LLM model
- Embedding model
- Ollama host

Configuration is handled through environment variables.

---

### PostgreSQL + pgvector

PostgreSQL is used as the application's primary database.

The `pgvector` extension provides vector storage and similarity search capabilities for the knowledge documents.

This keeps structured operational data and vector search within the same database system.

---

### Dockerized Development Environment

The application is containerized using Docker and Docker Compose.

The main services include:

```text
Frontend
    │
    ▼
FastAPI Backend
    │
    ├── PostgreSQL + pgvector
    │
    └── Ollama
```

This makes the application easier to reproduce across development environments.

---

### Kubernetes Configuration

The repository also includes Kubernetes manifests for deploying application components.

Kubernetes configuration is located in:

```text
k8s/
├── backend.yaml
└── postgres.yaml
```

This provides a foundation for running the application in a Kubernetes environment.

---

## Architecture

```text
                         ┌───────────────────────┐
                         │       Next.js         │
                         │   React + TypeScript  │
                         └───────────┬───────────┘
                                     │
                                     │ HTTP
                                     ▼
                         ┌───────────────────────┐
                         │       FastAPI         │
                         │         /ask          │
                         └───────────┬───────────┘
                                     │
                       ┌─────────────┴─────────────┐
                       │                           │
                       ▼                           ▼
              ┌─────────────────┐        ┌─────────────────┐
              │    Embedding    │        │     Ollama      │
              │      Model      │        │       LLM       │
              └────────┬────────┘        └─────────────────┘
                       │
                       ▼
              ┌─────────────────────────────┐
              │     PostgreSQL + pgvector  │
              │                             │
              │   Knowledge Documents       │
              │   + Embeddings              │
              └─────────────────────────────┘
```

---

## RAG Pipeline

The retrieval workflow follows this sequence:

```text
User Question
      │
      ▼
Create Query Embedding
      │
      ▼
Vector Similarity Search
      │
      ▼
Retrieve Relevant Runbooks
      │
      ▼
Build Context
      │
      ▼
Question + Context → LLM
      │
      ▼
Generate Grounded Answer
      │
      ▼
Return Answer + Sources
```

---

## Example

### Question

```text
How do I troubleshoot a Kubernetes deployment?
```

### Retrieved Knowledge

```text
Kubernetes Deployment Troubleshooting
operations-runbook
```

### Generated Answer

```text
To troubleshoot a Kubernetes deployment, first check the deployment
status with kubectl get deployments, then inspect the pods with
kubectl get pods.

If a pod is not starting correctly, use kubectl describe pod to
inspect events and configuration.
```

The frontend also displays the retrieved source and similarity distance.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- React Markdown
- Remark GFM
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- SQLAlchemy

### AI / RAG

- Retrieval-Augmented Generation
- Vector embeddings
- Ollama
- Semantic similarity search

### Database

- PostgreSQL
- pgvector

### Infrastructure

- Docker
- Docker Compose
- Kubernetes

### Testing

- Pytest

---

## Project Structure

```text
ops-context-ai/
│
├── backend/
│   └── app/
│       ├── api/
│       │   └── routes.py
│       │
│       ├── database/
│       │   └── connection.py
│       │
│       ├── models/
│       │   ├── base.py
│       │   └── knowledge.py
│       │
│       ├── schemas/
│       │   └── knowledge.py
│       │
│       ├── services/
│       │   ├── embeddings.py
│       │   ├── rag.py
│       │   └── search.py
│       │
│       ├── config.py
│       └── main.py
│
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── public/
│   └── package.json
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── .dockerignore
│
├── k8s/
│   ├── backend.yaml
│   └── postgres.yaml
│
├── tests/
│   ├── test_database.py
│   ├── test_health.py
│   ├── test_rag.py
│   └── test_search.py
│
├── docker-compose.yml
├── requirements.txt
├── .env.example
├── .gitignore
└── pytest.ini
```

---

## Getting Started

### Prerequisites

Install the following:

- Git
- Docker Desktop
- Python 3.x
- Node.js
- Ollama

---

### Clone the Repository

```bash
git clone https://github.com/Cooky09/ops-context-ai.git
cd ops-context-ai
```

---

### Environment Configuration

Create a local environment file from the example:

#### PowerShell

```powershell
Copy-Item .env.example .env
```

Configure the required values in `.env`:

```env
DATABASE_URL=postgresql://...
OLLAMA_HOST=http://...
OLLAMA_LLM_MODEL=...
OLLAMA_EMBEDDING_MODEL=...
```

Do not commit `.env`.

The repository includes `.env.example` as the configuration template.

---

## Running with Docker Compose

Start the application:

```bash
docker compose up -d
```

Check the containers:

```bash
docker compose ps
```

The application exposes:

```text
Frontend
http://localhost:3000

Backend
http://localhost:8000
```

To stop the application:

```bash
docker compose down
```

---

## API

The main question-answering endpoint is:

```text
POST /ask
```

Example request:

### PowerShell

```powershell
Invoke-RestMethod `
  -Uri http://localhost:8000/ask `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"question":"How do I troubleshoot a Kubernetes deployment?"}'
```

Example response:

```json
{
  "question": "How do I troubleshoot a Kubernetes deployment?",
  "answer": "To troubleshoot a Kubernetes deployment...",
  "sources": [
    {
      "id": 1,
      "title": "Kubernetes Deployment Troubleshooting",
      "source": "operations-runbook",
      "distance": 0.168
    }
  ]
}
```

---

## Testing

Run the test suite:

```bash
pytest
```

The project includes tests covering:

- Database connectivity
- API health
- Knowledge search
- RAG functionality

---

## Kubernetes

Kubernetes manifests are provided in the `k8s/` directory.

```text
k8s/
├── backend.yaml
└── postgres.yaml
```

The manifests provide a starting point for deploying the backend and PostgreSQL components into a Kubernetes environment.

---

## Engineering Highlights

This project demonstrates experience across multiple areas of modern software engineering:

### AI Engineering

- Retrieval-Augmented Generation
- Embedding generation
- Vector similarity search
- Context-aware LLM responses
- Local model inference

### Backend Engineering

- REST API development
- FastAPI
- Pydantic validation
- SQLAlchemy
- PostgreSQL
- API error handling

### Frontend Engineering

- Next.js
- React
- TypeScript
- Responsive UI
- Markdown rendering
- Interactive states
- Loading and error states
- Component-driven UI development

### DevOps / Infrastructure

- Docker
- Docker Compose
- PostgreSQL containers
- Kubernetes manifests
- Environment-based configuration

### Testing

- Pytest
- Database tests
- API tests
- Search tests
- RAG tests

---

## Design Goals

The project was built around several principles:

**Grounded AI**

Answers should be based on retrieved operational documentation rather than unsupported model knowledge.

**Transparency**

Users should be able to see which knowledge sources contributed to an answer.

**Local Development**

The core AI workflow can run locally using Ollama.

**Reproducibility**

Docker Compose provides a consistent development environment.

**Separation of Concerns**

The application separates:

- API routes
- Database access
- Models
- Embeddings
- Search
- RAG logic
- Frontend presentation

**Developer Experience**

The project includes environment templates, tests, Docker configuration, and Kubernetes manifests to make the system easier to run and extend.

---

## Future Improvements

Potential improvements include:

- Streaming LLM responses
- Authentication and user accounts
- Document upload and indexing UI
- Automated knowledge ingestion
- Runbook versioning
- Conversation history
- Feedback on generated answers
- Improved retrieval ranking
- Hybrid keyword + vector search
- Observability and structured logging
- Production Kubernetes deployment
- CI/CD pipeline
- Automated evaluation of RAG quality

---

## Project Status

The current version provides a working local RAG application with:

- Functional semantic search
- PostgreSQL + pgvector storage
- Local Ollama inference
- FastAPI backend
- Next.js frontend
- Source attribution
- Docker Compose deployment
- Kubernetes manifests
- Automated tests

The project is actively structured for further development and experimentation.

---


## License

This project is intended as a portfolio and learning project.
