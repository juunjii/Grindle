from fastapi import APIRouter, Header, HTTPException
from models import Application 
from db import db_create_application, db_get_all_applications, db_get_application, db_delete_application

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
    result = await db_get_application(application_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return result

@router.delete("/{application_id}")
async def delete_application(application_id: str, x_user_id: str | None = Header(None)):
    """Delete a specific application by ID."""
    user_id = x_user_id or "dev-user"
    result = await db_delete_application(application_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully", "id": application_id}