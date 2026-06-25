import os
import httpx
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    github_token: str = os.getenv("GITHUB_TOKEN", "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")
    github_models_url: str = os.getenv("GITHUB_MODELS_URL", "https://models.inference.ai.azure.com")

    class Config:
        env_file = ".env"

settings = Settings()

async def get_ai_guidance(user_profile_prompt: str) -> dict:
    """
    Connects to GitHub's hosted models engine using your personal access token.
    Uses strict system instructions to keep the model acting like an expert policy advisor.
    """
    # System instructions grounding the LLM in Indian public policy criteria
    system_prompt = (
        "You are BharatSathi AI, an elite public policy specialist, lawyer, financial advisor, "
        "and empathetic social worker combined. Your mission is to assist citizens with Indian government "
        "schemes, subsidies, pensions, and financial planning. Explain everything step-by-step in simple, human-friendly "
        "language. Provide official context, structured document checklists, and continuous diagnostic support."
    )

    payload = {
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_profile_prompt}
        ],
        "model": "gpt-4o",  # Running flag-ship GPT-4o on GitHub's architecture
        "temperature": 0.2,
        "max_tokens": 2048
    }

    headers = {
        "Authorization": f"Bearer {settings.github_token}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.github_models_url}/chat/completions",
                json=payload,
                headers=headers,
                timeout=30.0
            )
            
            if response.status_code != 200:
                return {
                    "error": True,
                    "message": f"GitHub API failure code: {response.status_code}",
                    "raw_response": response.text
                }
                
            data = response.json()
            ai_response_text = data["choices"][0]["message"]["content"]
            return {"error": False, "ai_response": ai_response_text}
            
        except Exception as e:
            return {
                "error": True,
                "message": f"Exception connecting to the AI cluster: {str(e)}"
            }