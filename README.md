# Ops Context AI

> AI-powered operational knowledge assistant that uses Retrieval-Augmented Generation (RAG) to provide grounded answers from internal runbooks.

![Status](https://img.shields.io/badge/status-active-success)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688)
![Next.js](https://img.shields.io/badge/Next.js-frontend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791)
![Ollama](https://img.shields.io/badge/Ollama-local%20AI-white)

## Overview

Ops Context AI is a full-stack AI operations assistant designed to help engineers quickly find answers from operational documentation.

Instead of relying on a general-purpose LLM alone, the application searches an internal knowledge base using vector similarity and provides answers grounded in relevant operational runbooks.

The project combines:

- **RAG (Retrieval-Augmented Generation)**
- **Vector search with PostgreSQL + pgvector**
- **Local LLM inference with Ollama**
- **FastAPI backend**
- **Next.js / React frontend**
- **Docker containerization**
- **Kubernetes manifests**
- **Automated testing**

The goal is to demonstrate how AI can be integrated into practical DevOps and engineering workflows.

---

## Features

### 🤖 AI Knowledge Assistant

Ask natural-language questions about operational procedures and receive answers generated from the indexed knowledge base.

Example:

> How do I troubleshoot a PostgreSQL database connection?

The assistant retrieves relevant runbooks before generating its response.

### 🔎 Semantic Search

Questions are converted into embeddings and compared against stored document embeddings using PostgreSQL + pgvector.

This allows the assistant to retrieve conceptually relevant documentation rather than relying only on keyword matching.

### 📚 Grounded Responses

Responses include the operational documents used to generate the answer.

Each source displays:

- Document title
- Source/runbook
- Similarity distance

### 🖥️ Modern Frontend

The frontend provides:

- Responsive interface
- Quick-question shortcuts
- Loading states
- Error handling
- Markdown rendering
- Source attribution
- RAG status indicators
- Professional operational dashboard styling

### 🐳 Dockerized Infrastructure

The application can be started using Docker Compose with separate services for:

- Frontend
- Backend
- PostgreSQL + pgvector

### ☸️ Kubernetes Ready

Kubernetes manifests are included for deploying the backend and PostgreSQL components.

---

## Architecture

```text
                    ┌─────────────────────┐
                    │     Next.js UI      │
                    │                     │
                    │  Knowledge Assistant│
                    └──────────┬──────────┘
                               │
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │ Semantic Search  │   │     Ollama       │
          │                  │   │                  │
          │ Embeddings +     │   │ Local LLM        │
          │ pgvector         │   │ Generation       │
          └────────┬─────────┘   └──────────────────┘
                   │
                   ▼
          ┌──────────────────────┐
          │ PostgreSQL + pgvector│
          │                      │
          │ Operational          │
          │ Knowledge Base       │
          └──────────────────────┘
