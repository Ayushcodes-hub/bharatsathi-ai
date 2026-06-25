# 🏛️ BharatSathi AI: Sovereign Welfare & Analytics Matrix

<div align="center">

![BharatSathi Header](https://capsule-render.vercel.app/api?type=waving&color=bfa15f&height=220&section=header&text=BharatSathi%20AI&fontSize=56&fontColor=ffffff&desc=Sovereign%20Welfare%20%26%20Public%20Policy%20Intelligence%20Matrix&descSize=22&descAlignY=65)

[![License: MIT](https://img.shields.io/badge/License-MIT-bfa15f.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/Python-3.10%2B-00529B.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14--15-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Infrastructure-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<p align="center">
  <strong>An ultra-premium, zero-latency public policy intelligence platform designed to map, track, and analyze Indian federal and state government welfare scheme distributions in real time.</strong>
</p>

---
[🏠 Core Architecture](#-core-architecture) • [📂 Project Structure](#-repository-structure) • [🛠️ Local Installation](#%EF%B8%8F-local-development-installation) • [🐳 Docker & Space Deployment](#-production-deployment-cloud-topology)
---

</div>

## 🚀 Core Architecture

BharatSathi AI is built with an elegant **Imperial Gold** aesthetic, leveraging state-of-the-art LLM reasoning with strict conversational memory anchors alongside fluid data visualization vectors.

┌────────────────────────────────────────────────────────┐
   │             Dynamic Metrics Portal (Next.js)           │
   │     Styled with Tailwind CSS & Framer Motion Graphs     │
   └───────────────────────────┬────────────────────────────┘
                               │
                     (Async Telemetry Streams)
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │         Sovereign Intelligence Engine (FastAPI)        │
   │         Secure Middleware & Dynamic Aggregations        │
   └───────────────────────────┬────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │   Deep Memory Sync    │     │   gpt-4o Inference    │
    │ Chained Chat Loop Timeline │  │  Structured Policy Data│
    └───────────────────────┘     └───────────────────────┘

    * **Sovereign Intelligence Engine (Backend):** Asynchronous Python framework powered by **FastAPI**, processing deep historical data and live telemetry using state-of-the-art `gpt-4o` models via secure inference gateways.
* **Dynamic Metrics Portal (Frontend):** High-fidelity **Next.js** web application styled with **Tailwind CSS**, utilizing `Framer Motion` for micro-animations and `Recharts` for real-time statistical area projections.
* **Deep Memory Sync:** A specialized chained chat loop timeline processing infrastructure that ensures context retention across sequential, multi-layered user queries.

---

## 📂 Repository Structure

The platform is explicitly decoupled into standalone modules unified under a single parent layer to facilitate seamless multi-stage container deployment.

```directory
bharatsathi-ai/
├── bharatsathi-backend/        # Python FastAPI Application
│   ├── main.py                 # Core ASGI Application entry point
│   ├── requirements.txt        # Backend dependencies & packages
│   └── .env.example            # Environment design baseline
├── bharatsathi-frontend/       # React/Next.js Application
│   ├── app/                    # Next.js App Router workspace
│   ├── components/             # Reusable UI elements (Charts, Metrics)
│   ├── package.json            # Node configuration scripts
│   └── tailwind.config.js      # Imperial Gold styling matrix
├── Dockerfile                  # Multi-stage production container setup
└── README.md                   # System Documentation Matrix
```
🛠️ Local Development Installation
1. Prerequisites
Ensure your local system satisfies the following runtime specifications:

Python: 3.10 or higher

Node.js: 18.0.0 or higher

Package Managers: pip (Python) and npm (Node)

2. Backend Environment Verification
Navigate to the backend system directory, install dependencies, and run the FastAPI server:
```
# Navigate to the backend folder
cd bharatsathi-backend

# Install python dependencies
pip install -r requirements.txt

# Run server with hot reload enabled
uvicorn main:app --reload --port 8000
```
⚙️ Security Protocol: Generate a .env configuration file in the bharatsathi-backend directory matching the following structure:
```
GITHUB_TOKEN=your_secure_github_token_here
OPENAI_API_KEY=your_openai_api_key_here
```
3. Frontend Environment Verification
Open a separate terminal window, build the local dependency tree, and execute the Next.js engine:
```
# Navigate to the frontend directory
cd ../bharatsathi-frontend

# Install dependencies
npm install

# Start development workspace
npm run dev
```
Open http://localhost:3000 on your local web browser to access the dynamic dashboard.
🌐 Production Deployment Cloud Topology
The application architecture is tailored to compile cleanly inside virtual environments or run asynchronously across independent hosting layers.
Environment Component,Platform Target,Optimization Profile
Frontend UI Core,Vercel Global CDN Matrix,"Static Edge caching, minimal visual layout shifts, fast interactions"
Inference & Telemetry,Hugging Face Spaces / Render,"Secure token isolation, containerized processes, continuous delivery"
🐳 Deploying to Hugging Face Spaces (Monolithic Production Setup)
Hugging Face Spaces allows you to host comprehensive applications using Docker for free. Since BharatSathi AI contains two detached execution structures (Frontend & Backend), we utilize a multi-stage Dockerfile to compile the Next.js assets and run both processes concurrently within a single environment context.

Step 1: Create the Build Specification
In your root project directory (bharatsathi-ai), save the following code exactly as a file named Dockerfile (with no file extension):
```
# STAGE 1 FRONTEND COMPILER
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY bharatsathi-frontend/package*.json ./
RUN npm install
COPY bharatsathi-frontend/ ./
RUN npm run build

# STAGE 2 UNIFIED RUNTIME ENVIRONMENT
FROM python:3.10-slim
WORKDIR /app

# Install Node system environments to host Next.js runtime tasks
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL [https://deb.nodesource.com/setup_18.x](https://deb.nodesource.com/setup_18.x) | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Populate Python configuration patterns and resolve structures
COPY bharatsathi-backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt
COPY bharatsathi-backend/ ./backend/

# Extract the compiled production UI from Stage 1
COPY --from=frontend-builder /app/frontend ./frontend

# Expose mandatory Hugging Face operational interface parameters
EXPOSE 7860
ENV PORT=7860

# Parallel Activation Run backend on 8000 and proxy traffic out of frontend via 7860
CMD cd /app/backend && uvicorn main:app --host 0.0.0.0 --port 8000 & cd /app/frontend && npm run start -- -p 7860
```
Step 2: Deployment Lifecycle Actions
1. Log in to your Hugging Face console and create a new Space.

2. Input your preferred Workspace Name and choose Docker as the SDK framework option.

3. Select the Blank template option when prompted.

4. Clone the newly generated Space remote URL to your workstation, drop your project code (including this root Dockerfile) inside it, and commit the update:
```
git add .
git commit -m "feat: infrastructure configuration for sovereign deployment matrix"
git push
```
5. Hugging Face will process the multi-stage system setup layers, expose port 7860, and open up your interactive public policy space instantly.
