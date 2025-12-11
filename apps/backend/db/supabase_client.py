from supabase import create_client, Client
from db import SUPABASE_URL, SUPABASE_KEY
from models import Application

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def db_get_all_applications(user_id: str):
    """Fetch all applications for a user."""
    response = (
        supabase
        .table("applications")
        .select("*")
        .eq("user_id", user_id)
        .execute()
    )
    return response.data

async def db_create_application(app: Application, user_id: str):
    """Insert a new application for a user."""
    payload = app.model_dump(mode="json") | {"user_id": user_id}
    response = supabase.table("applications").insert(payload).execute()
    return response.data[0]

async def db_get_application(app_id: str, user_id: str):
    """Fetch a single application by ID, scoped to a user."""
    response = (
        supabase
        .table("applications")
        .select("*")
        .eq("id", app_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data[0] if response.data else None

async def db_delete_application(app_id: str, user_id: str):
    """Delete a single application by ID, scoped to a user."""
    response = (
        supabase
        .table("applications")
        .delete()
        .eq("id", app_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data[0] if response.data else None