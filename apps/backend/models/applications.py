from pydantic import BaseModel
from typing import Optional
from datetime import date

class ApplicationCreate(BaseModel):
    company_id: int
    role: str
    status: str = "applied"
    applied_date: Optional[date] = None
    resume_version: Optional[str] = None
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    role: Optional[str] = None
    status: Optional[str] = None
    applied_date: Optional[date] = None
    resume_version: Optional[str] = None
    notes: Optional[str] = None
