import pytest
from fastapi.testclient import TestClient
from datetime import date
from main import app

@pytest.fixture
def client():
    """Provide a test client for the FastAPI app."""
    return TestClient(app)

@pytest.fixture
def test_user_id():
    """Provide a consistent test user ID."""
    return "dev-user"

@pytest.fixture
def test_application_data(test_user_id):
    """Provide test application data."""
    return {
        "company_name": "Test Company",
        "user_id": "dev-user",
        "role": "Software Engineer",
        "status": "APPLIED",
        "location": "Remote",
        "job_link": "https://example.com/job",
        "source": "LinkedIn",
        "salary": "$100k-$120k",
        "date_applied": "2025-12-10",
        "notes": "Great opportunity"
    }

@pytest.fixture
def test_application_minimal(test_user_id):
    """Provide minimal test application data."""
    return {
        "company_name": "Minimal Co",
        "user_id": test_user_id,
        "role": "Developer",
        "date_applied": "2025-12-10"
    }
