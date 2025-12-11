from pydantic import BaseModel

class CompanyInfo(BaseModel):
    user_id: str
    name: str
    industry: str | None = None
    website: str | None = None
    location: str | None = None

