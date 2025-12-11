from pydantic import BaseModel
from enum import Enum
from datetime import date

class ApplicationStatus(str, Enum):
    APPLIED = "APPLIED"
    SAVED = "SAVED"
    INTERVIEW = "INTERVIEW"
    OFFER = "OFFER"
    REJECTED = "REJECTED"

# TODO: Add company_id field later when integrating with companies
class Application(BaseModel):
    id: int
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

class ApplicationCreate(BaseModel):
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
    """Model for updating an application - all fields are optional."""
    company_name: str | None = None
    role: str | None = None
    status: ApplicationStatus | None = None
    location: str | None = None
    job_link: str | None = None
    source: str | None = None
    salary: str | None = None
    date_applied: date | None = None
    notes: str | None = None
