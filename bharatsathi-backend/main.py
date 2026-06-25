from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ai_engine import get_ai_guidance

app = FastAPI(
    title="BharatSathi AI Backend Engine",
    description="The high-performance API routing layer handling citizen welfare schemes.",
    version="1.0.0"
)

# Allow our local Next.js client to safely make request streams
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "platform": "BharatSathi AI Backend Engine",
        "auth_layer": "GitHub Models Active"
    }

@app.post("/api/v1/chat")
async def handle_citizen_query(request: ChatRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="The prompt cannot be empty.")

    result = await get_ai_guidance(request.prompt)
    
    if result["error"]:
        raise HTTPException(status_code=500, detail=result["message"])

    return {
        "status": "success",
        "response": result["ai_response"]
    }