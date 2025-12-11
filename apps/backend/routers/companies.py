from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_companies():
    """List all companies."""
    return {"companies": []}
