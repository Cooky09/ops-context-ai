# Ops Context AI

> AI-powered operational knowledge assistant that uses Retrieval-Augmented Generation (RAG) to provide grounded answers from internal runbooks.

[![Status](https://img.shields.io/badge/status-active-success)](https://github.com/Cooky09/ops-context-ai)
[![Python](https://img.shields.io/badge/Python-3.x-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-009688)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-frontend-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791)](https://www.postgresql.org/)
[![Ollama](https://img.shields.io/badge/Ollama-local%20AI-white)](https://ollama.com/)
[![Docker](https://img.shields.io/badge/Docker-containerized-2496ED)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-ready-326CE5)](https://kubernetes.io/)

---

## Overview

**Ops Context AI** is a full-stack AI operations assistant designed to help engineers quickly find answers from operational documentation.

Instead of relying on a general-purpose LLM alone, the application searches an internal knowledge base using vector similarity and provides answers grounded in relevant operational runbooks.

The project combines:

- Retrieval-Augmented Generation (RAG)
- Semantic vector search
- PostgreSQL + pgvector
- Local AI inference with Ollama
- FastAPI
- Next.js and React
- TypeScript
- Docker
- Docker Compose
- Kubernetes
- Automated testing

The goal is to demonstrate how AI can be integrated into practical engineering, DevOps, and operational workflows.

---

## What Problem Does It Solve?

Engineers often need to search through operational documentation while troubleshooting incidents.

Traditional documentation search can require knowing the exact terminology used in a runbook.

Ops Context AI allows engineers to ask questions naturally.

For example:

> How do I troubleshoot a PostgreSQL database connection?

The system searches the operational knowledge base, retrieves the most relevant documents, and provides a response based on that context.

The answer also includes the sources used during retrieval.

This makes the assistant more useful for operational workflows while keeping responses grounded in documented procedures.

---

## Key Features

### 🤖 AI Knowledge Assistant

Ask natural-language questions about operational procedures and receive answers generated from the indexed knowledge base.

Example:

```text
How do I troubleshoot a Kubernetes deployment?

```
The assistant retrieves relevant runbooks before generating the response.

### 🔎 Semantic Search**

Questions are converted into embeddings and searched against the knowledge base using vector similarity.

The system returns the most relevant documents based on semantic meaning rather than exact keyword matching.

Each response includes:
- Retrieved document
- Document title
- Knowledge source
- Similarity distance
  
#### 📚 Grounded Answers
The assistant is designed to answer using retrieved operational context.

If the knowledge base does not contain relevant information, the system can return:
I could not find any relevant information in the knowledge base.

This helps avoid presenting unsupported operational procedures as authoritative answers.

#### 🗄️ PostgreSQL + pgvector
Operational knowledge documents and their embeddings are stored in PostgreSQL.

pgvector provides vector similarity search directly inside PostgreSQL.

This keeps the retrieval layer simple and makes the project easy to run locally.
#### 🧠 Local AI with Ollama
The project uses Ollama for local AI inference.

This allows the application to run without depending on a hosted AI API for its core RAG workflow.

The configuration supports:
- LLM model
- Embedding model
- Ollama host
These values are configured through environment variables.

#### ⚡ FastAPI Backend
The backend provides the API layer responsible for:
1. Receiving questions
2. Creating query embeddings
3. Searching the knowledge base
4. Retrieving relevant documents
5. Generating grounded answers
6. Returning sources and similarity scores
   
#### 🎨 Next.js Frontend
The frontend provides a modern operational dashboard built with:
- Next.js
- React
- TypeScript
- React Markdown
- Responsive CSS
The interface includes:
- AI assistant input
- Quick question suggestions
- Loading states
- Error handling
- Markdown responses
- Knowledge source cards
- Similarity scores
- RAG status indicators
- Clear operational styling

#### 🐳 Docker
The complete application can be run using Docker Compose.

The stack contains:
Frontend
   │
   ▼
FastAPI Backend
   │
   ├── Ollama
   │
   └── PostgreSQL + pgvector

This makes the project easy to reproduce on another development machine.

#### ☸️ Kubernetes Ready
The repository also includes Kubernetes manifests for deploying the backend and PostgreSQL components.

Kubernetes configuration is located in:
k8s/
├── backend.yaml
└── postgres.yaml

Architecture
                    ┌──────────────────────┐
                    │      Next.js UI      │
                    │   React + TypeScript │
                    └──────────┬───────────┘
                               │
                               │ HTTP
                               ▼
                    ┌──────────────────────┐
                    │     FastAPI API      │
                    │                      │
                    │       /ask           │
                    └──────────┬───────────┘
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
              ┌─────────────┐     ┌─────────────┐
              │  Embeddings │     │    Ollama   │
              │    Model    │     │     LLM     │
              └──────┬──────┘     └─────────────┘
                     │
                     ▼
              ┌─────────────────────┐
              │ PostgreSQL +        │
              │ pgvector            │
              │                     │
              │ Knowledge Documents │
              │ + Embeddings        │
              └─────────────────────┘

RAG Workflow
When a user asks a question, the application follows this process:
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
Send Context + Question to LLM
      │
      ▼
Generate Grounded Answer
      │
      ▼
Return Answer + Sources

Example
Question
How do I troubleshoot a PostgreSQL database connection?

Retrieved Sources
PostgreSQL Database Troubleshooting
Database Backup Procedure

Example Response
To troubleshoot a PostgreSQL database connection, first verify
that the PostgreSQL service is running and that the database is
reachable.

Then check the PostgreSQL container, database connection,
application configuration, and PostgreSQL logs for authentication
errors or connection problems.

The UI also displays the retrieved sources and similarity distances.
Project Structure
ops-context-ai/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── database/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       ├── config.py
│       └── main.py
│
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
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

Getting Started
Prerequisites
Make sure the following are installed:
- Docker Desktop
- Git
- Python 3.x
- Node.js
- Ollama
Environment Configuration
Create your environment file:
Copy-Item .env.example .env

Configure the required environment variables:
DATABASE_URL=postgresql://...
OLLAMA_HOST=http://...
OLLAMA_LLM_MODEL=...
OLLAMA_EMBEDDING_MODEL=...

Do not commit .env to GitHub.

The repository includes .env.example for configuration reference.
Run with Docker Compose
Start the application:
docker compose up -d

Check the running containers:
docker compose ps

The application exposes:
Frontend:
http://localhost:3000

Backend:
http://localhost:8000

Test the API
Example request:
Invoke-RestMethod `
  -Uri http://localhost:8000/ask `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"question":"How do I troubleshoot a Kubernetes deployment?"}'

The API returns the question, generated answer, and retrieved knowledge sources.
Testing
Run the test suite with:
pytest

The tests cover areas including:
- Database connectivity
- Health checks
- RAG functionality
- Knowledge search
Example Questions
Try asking:
How do I troubleshoot a Kubernetes deployment?

How do I troubleshoot a PostgreSQL database connection?

What should I check when a deployment is unhealthy?

You can also ask unrelated questions to verify that the assistant does not return unsupported operational information.

For example:
What is the capital of France?

If no relevant operational knowledge is retrieved, the assistant reports that the information could not be found in the knowledge base.

