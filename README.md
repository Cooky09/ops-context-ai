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
