from pydantic import BaseModel
from enum import Enum
from datetime import date

class ApplicationStatus(str, Enum):
    APPLIED = "APPLIED"
    SAVED = "SAVED"
    INTERVIEW = "INTERVIEW"
    OFFER = "OFFER"
    REJECTED = "REJECTED"

class Application(BaseModel):
    company_name: str
    user_id: str
    role: str
    status: ApplicationStatus = ApplicationStatus.APPLIED
    location: str | None = None
    job_link: str | None = None
    
    source: str | None = None
    salary: str | None = None
    date_applied: date
    notes: str | None = None

class ApplicationUpdate(BaseModel):
    role: str | None = None
    status: str | None = None
    date_applied: date  
    notes: str | None = None

