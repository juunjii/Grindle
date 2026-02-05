from fastapi import APIRouter, Header, HTTPException
from models import Application, ApplicationCreate, ApplicationUpdate
from db import db_create_application, db_get_all_applications, db_get_application, db_update_application, db_delete_application

router = APIRouter()

@router.get("/", response_model=list[Application])
async def list_applications(x_user_id: str | None = Header(None)):
    """List all job applications."""
    user_id = x_user_id or "dev-user"
    result = await db_get_all_applications(user_id)

    if not result:
        return []

    return result

@router.post("/", response_model=Application)
async def create_applications(application: ApplicationCreate, x_user_id: str | None = Header(None)):
    """Create a new job application."""
    user_id = x_user_id or "dev-user"

    result = await db_create_application(application, user_id)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to create application")

    return result

@router.get("/{application_id}", response_model=Application)
async def get_applications(application_id: int, x_user_id: str | None = Header(None)):
    """Get a specific application by ID."""
    user_id = x_user_id or "dev-user"
    result = await db_get_application(application_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return result

@router.patch("/{application_id}", response_model=Application)
async def update_application(application_id: int, updates: ApplicationUpdate, x_user_id: str | None = Header(None)):
    """Update a specific application by ID."""
    user_id = x_user_id or "dev-user"
    update_data = updates.model_dump(mode="json", exclude_unset=True)
    
    # If no fields to update, return the current object
    if not update_data:
        result = await db_get_application(application_id, user_id)
        if result is None:
            raise HTTPException(status_code=404, detail="Application not found or unauthorized")
        return result
    
    result = await db_update_application(application_id, user_id, update_data)
    if result is None:
        raise HTTPException(status_code=404, detail="Application not found or unauthorized")
    return result

@router.delete("/{application_id}")
async def delete_application(application_id: int, x_user_id: str | None = Header(None)):
    """Delete a specific application by ID."""
    user_id = x_user_id or "dev-user"
    result = await db_delete_application(application_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully", "id": application_id}