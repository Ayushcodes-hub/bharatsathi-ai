# 🏛️ BharatSathi AI: Sovereign Welfare & Analytics Matrix

BharatSathi AI is an ultra-premium, zero-latency public policy intelligence platform designed to map, track, and analyze Indian federal and state government welfare scheme distributions in real time. Built with an elegant imperial gold aesthetic, the platform leverages advanced LLM reasoning with strict conversational memory alongside fluid data visualization vectors.

## 🚀 Core Architecture

- **Sovereign Intelligence Engine (Backend):** Asynchronous Python framework powered by FastAPI, processing historical and live telemetry data using `gpt-4o` models via secure inference gateways.
- **Dynamic Metrics Portal (Frontend):** High-fidelity Next.js application styled with Tailwind CSS, utilizing `Framer Motion` for micro-animations and `Recharts` for real-time statistical area projections.
- **Deep Memory Sync:** Chained chat loop timeline processing ensuring structural context retention across sequential user queries.

---

## 🛠️ Local Development Installation

### 1. Prerequisites
Ensure you have Python 3.10+ and Node.js 18+ installed on your workstation.

### 2. Backend Setup
```bash
cd bharatsathi-backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Open http://localhost:3000 to view the workspace dashboard.

🌐 Production Deployment Cloud Topology
This ecosystem is optimized to run seamlessly across distributed architectures:

Frontend Layer: Vercel Global CDN Matrix

Data Engine Layer: Render Compute Web Services / Hugging Face Docker Spaces
```
---

## Part 2: How to Deploy to Hugging Face Spaces (Easiest Way)

Hugging Face Spaces lets you host full apps using Docker for free. Since your app has two separate parts (Frontend & Backend), we can combine them into a single file called a **Dockerfile**, and Hugging Face will run the whole thing on one free URL.

### Step 1: Create the Config Files
In the **root directory** (`bharatsathi-ai`), create two brand-new files:

1. **Create a file named `Dockerfile` (No extension) and paste this:**
```dockerfile
# Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY bharatsathi-frontend/package*.json ./
RUN npm install
COPY bharatsathi-frontend/ ./
RUN npm run build

# Final Runtime Environment
FROM python:3.10-slim
WORKDIR /app

# Install Node to serve Next.js export or just run the multi-process setup
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy Backend and install requirements
COPY bharatsathi-backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt
COPY bharatsathi-backend/ ./backend/

# Copy built frontend
COPY --from=frontend-builder /app/frontend ./frontend

EXPOSE 7860
ENV PORT=7860

# Start both services (Backend on 8000, Frontend on 7860)
CMD cd /app/backend && uvicorn main:app --host 0.0.0.0 --port 8000 & cd /app/frontend && npm run start -- -p 7860
```

  
