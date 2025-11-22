from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))


async def get_current_user(token: str):
    try:
        user = supabase.auth.get_user(token)
        return user
    except:
        raise HTTPException(401, "Invalid or missing token")


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/users")
def get_users():
    return supabase.table("User").select("*").execute().data

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI!"}

@app.get("/protected/user")
async def protected_route(user=Depends(get_current_user)):
    return user
