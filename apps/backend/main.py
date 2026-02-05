import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import applications, companies

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

app = FastAPI(
    title="Grindle API",
    description="Backend for Grindle job application tracker",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    applications.router,
    prefix="/applications",
    tags=["applications"],
)
app.include_router(
    companies.router,
    prefix="/companies",
    tags=["companies"],
)

@app.get("/")
def read_root():
    return {"message": "Grindle API is running", "version": "0.1.0"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
