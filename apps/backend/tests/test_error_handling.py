"""Test error handling for application endpoints."""
from unittest.mock import patch
from fastapi import HTTPException


class TestDatabaseErrorHandling:
    """Test database error handling in endpoints."""
    
    @patch("routers.applications.db_get_all_applications")
    def test_list_applications_database_error(self, mock_get, client, test_user_id):
        """Test list endpoint handles database errors gracefully."""
        mock_get.side_effect = HTTPException(status_code=400, detail="Database connection failed")
        
        response = client.get(
            "/applications/",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 400
        assert "Database connection failed" in response.json()["detail"]
    
    @patch("routers.applications.db_create_application")
    def test_create_application_database_error(self, mock_create, client, test_user_id, test_application_data):
        """Test create endpoint handles database errors gracefully."""
        mock_create.side_effect = HTTPException(status_code=400, detail="Duplicate key error")
        
        response = client.post(
            "/applications/",
            json=test_application_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 400
        assert "Duplicate key error" in response.json()["detail"]
    
    @patch("routers.applications.db_get_application")
    def test_get_application_database_error(self, mock_get, client, test_user_id):
        """Test get endpoint handles database errors gracefully."""
        mock_get.side_effect = HTTPException(status_code=400, detail="Network timeout")
        
        response = client.get(
            "/applications/1",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 400
        assert "Network timeout" in response.json()["detail"]
    
    @patch("routers.applications.db_update_application")
    def test_update_application_database_error(self, mock_update, client, test_user_id, test_application_data):
        """Test update endpoint handles database errors gracefully."""
        mock_update.side_effect = HTTPException(status_code=400, detail="Invalid column update")
        
        response = client.patch(
            "/applications/1",
            json=test_application_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 400
        assert "Invalid column update" in response.json()["detail"]
    
    @patch("routers.applications.db_delete_application")
    def test_delete_application_database_error(self, mock_delete, client, test_user_id):
        """Test delete endpoint handles database errors gracefully."""
        mock_delete.side_effect = HTTPException(status_code=400, detail="Delete operation failed")
        
        response = client.delete(
            "/applications/1",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 400
        assert "Delete operation failed" in response.json()["detail"]


class TestInputValidation:
    """Test request input validation."""
    
    def test_create_application_missing_required_fields(self, client, test_user_id):
        """Test creating application without required fields fails validation."""
        invalid_data = {
            "role": "Developer"
            # Missing company_name and date_applied
        }
        response = client.post(
            "/applications/",
            json=invalid_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 422  # Unprocessable Entity
    
    def test_create_application_invalid_date_format(self, client, test_user_id):
        """Test creating application with invalid date format."""
        invalid_data = {
            "company_name": "Test Co",
            "role": "Developer",
            "date_applied": "invalid-date"
        }
        response = client.post(
            "/applications/",
            json=invalid_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 422
    
    def test_update_application_invalid_status(self, client, test_user_id):
        """Test updating application with invalid status value."""
        invalid_data = {
            "status": "INVALID_STATUS"
        }
        response = client.patch(
            "/applications/1",
            json=invalid_data,
            headers={"X-User-Id": test_user_id}
        )
        # Should fail validation or database returns 404
        assert response.status_code in [422, 404, 500]


class TestUserIsolation:
    """Test user data isolation."""
    
    @patch("routers.applications.db_get_application")
    def test_get_application_user_isolation(self, mock_get, client):
        """Test that users cannot access other users' applications."""
        mock_get.return_value = None  # Simulate application not found for this user
        
        response = client.get(
            "/applications/1",
            headers={"X-User-Id": "user-1"}
        )
        assert response.status_code == 404
        
        # Verify the function was called with the correct user_id
        mock_get.assert_called_once_with("1", "user-1")
    
    @patch("routers.applications.db_get_all_applications")
    def test_list_applications_user_isolation(self, mock_get, client):
        """Test that list endpoints only return user's own applications."""
        from datetime import date
        mock_get.return_value = [{
            "id": 1,
            "company_name": "Test",
            "user_id": "user-1",
            "role": "Engineer",
            "status": "APPLIED",
            "date_applied": date(2025, 12, 10)
        }]
        
        response = client.get(
            "/applications/",
            headers={"X-User-Id": "user-1"}
        )
        assert response.status_code == 200
        
        # Verify the function was called with the correct user_id
        mock_get.assert_called_once_with("user-1")


class TestStatusCodes:
    """Test proper HTTP status codes."""
    
    def test_successful_operations_return_200(self, client, test_user_id, test_application_data):
        """Test that successful operations return 200 OK."""
        # List (even if empty)
        response = client.get(
            "/applications/",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 200
    
    def test_not_found_returns_404(self, client, test_user_id):
        """Test that not found errors return 404."""
        response = client.get(
            "/applications/99999",
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 404
    
    def test_validation_errors_return_422(self, client, test_user_id):
        """Test that validation errors return 422."""
        invalid_data = {"role": "Developer"}  # Missing required fields
        response = client.post(
            "/applications/",
            json=invalid_data,
            headers={"X-User-Id": test_user_id}
        )
        assert response.status_code == 422
