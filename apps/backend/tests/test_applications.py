"""Test successful application CRUD operations."""
from unittest.mock import patch
from datetime import date


class TestCreateApplication:
    """Test application creation endpoint."""
    
    @patch("routers.applications.db_create_application")
    def test_create_application_success(self, mock_create, client, test_user_id, test_application_data):
        """Test successfully creating an application."""
        mock_create.return_value = {
            **test_application_data,
            "date_applied": date(2025, 12, 10)
        }
        response = client.post(
            "/applications/",
            json=test_application_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 200
        data = response.json()
        print(f"Response data: {data}")
        print(f"Mock called: {mock_create.called}")
        print(f"Mock call count: {mock_create.call_count}")
        assert data["company_name"] == "Test Company"
        assert data["role"] == "Software Engineer"
        assert data["status"] == "APPLIED"
    
    @patch("routers.applications.db_create_application")
    def test_create_application_minimal(self, mock_create, client, test_user_id, test_application_minimal):
        """Test creating an application with minimal data."""
        mock_create.return_value = {
            "id": 2,
            **test_application_minimal,
            "status": "APPLIED",
            "date_applied": date(2025, 12, 10)
        }
        response = client.post(
            "/applications/",
            json=test_application_minimal,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["company_name"] == "Minimal Co"
        assert data["status"] == "APPLIED"  # Default value
    
    @patch("routers.applications.db_create_application")
    def test_create_application_default_user(self, mock_create, client, test_application_data):
        """Test creating an application without X-User-Id header."""
        mock_create.return_value = {
            "id": 3,
            **test_application_data,
            "date_applied": date(2025, 12, 10)
        }
        response = client.post(
            "/applications/",
            json=test_application_data
        )
        assert response.status_code == 200
        data = response.json()


class TestListApplications:
    """Test listing applications endpoint."""
    
    @patch("routers.applications.db_get_all_applications")
    def test_list_applications_empty(self, mock_list, client, test_user_id):
        """Test listing applications for a user with no data."""
        mock_list.return_value = []
        response = client.get(
            "/applications/",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 200
        assert response.json() == []
    
    def test_list_applications_default_user(self, client):
        """Test listing applications with default user."""
        response = client.get("/applications/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)


class TestGetApplication:
    """Test getting a single application endpoint."""
    
    def test_get_application_not_found(self, client, test_user_id):
        """Test getting a non-existent application returns 404."""
        response = client.get(
            "/applications/99999",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 404
        assert "not found" in response.json()["detail"].lower()


class TestUpdateApplication:
    """Test updating an application endpoint."""
    
    def test_update_application_not_found(self, client, test_user_id):
        """Test updating a non-existent application returns 404."""
        response = client.patch(
            "/applications/99999",
            json={"role": "New Role"},
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 404
        assert "not found" in response.json()["detail"].lower()
    
    def test_update_application_no_changes(self, client, test_user_id):
        """Test patching with empty object returns 404 for non-existent app."""
        response = client.patch(
            "/applications/99999",
            json={},
            headers={"X-User-Id": test_user_id}
        )
        # Should return 404 since application doesn't exist
        assert response.status_code == 404

    @patch("routers.applications.db_update_application")
    def test_update_application_success(self, mock_update, client, test_user_id, test_application_data):
        """Test updating an existing application returns updated object."""
        updated = test_application_data.copy()
        updated.update({"id": 1, "role": "Senior Engineer", "date_applied": date(2025, 12, 10)})
        mock_update.return_value = updated

        response = client.patch(
            "/applications/1",
            json={"id": 1, "role": "Senior Engineer", "company_name": "Test Company", "user_id": test_user_id, "date_applied": "2025-12-10"},
            headers={"X-User-Id": test_user_id}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["role"] == "Senior Engineer"
        assert data["id"] == 1
        mock_update.assert_called_once()


class TestDeleteApplication:
    """Test deleting an application endpoint."""
    
    def test_delete_application_not_found(self, client, test_user_id):
        """Test deleting a non-existent application returns 404."""
        response = client.delete(
            "/applications/99999",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 404
        assert "not found" in response.json()["detail"].lower()

    @patch("routers.applications.db_delete_application")
    def test_delete_application_success(self, mock_delete, client, test_user_id):
        """Test deleting an existing application returns success message."""
        mock_delete.return_value = {"id": 1, "user_id": test_user_id}

        response = client.delete(
            "/applications/1",
            headers={"X-User-Id": test_user_id}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Application deleted successfully"
        assert data["id"] == 1
        mock_delete.assert_called_once()
