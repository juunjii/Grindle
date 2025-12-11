from fastapi import APIRouter, Header
from models.applications import Application 
from db.supabase_client import db_create_application, db_get_all_applications, db_get_application

router = APIRouter()

@router.get("/", response_model=list[Application])
async def list_applications(x_user_id: str | None = Header(None)):
    """List all job applications."""
    user_id = x_user_id or "dev-user"
    return await db_get_all_applications(user_id)

@router.post("/", response_model=Application)
async def create_applications(application: Application, x_user_id: str | None = Header(None)):
    """Create a new job application."""
    user_id = x_user_id or "dev-user"
    return await db_create_application(application, user_id)

@router.get("/{application_id}", response_model=Application)
async def get_applications(application_id: str, x_user_id: str | None = Header(None)):
    """Get a specific application by ID."""
    user_id = x_user_id or "dev-user"
    return await db_get_application(application_id, user_id)