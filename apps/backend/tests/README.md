# Test Structure

This test suite follows pytest best practices with tests organized outside application code.

## Directory Structure

```
tests/
├── __init__.py                    # Package marker
├── conftest.py                    # Shared fixtures and configuration
├── test_applications.py           # Happy path tests
├── test_error_handling.py         # Error handling and validation tests
└── test_database_layer.py         # Database layer tests with mocks
```

## Running Tests

### Run all tests

```bash
pytest
```

### Run specific test file

```bash
pytest tests/test_applications.py -v
```

### Run specific test class

```bash
pytest tests/test_error_handling.py::TestDatabaseErrorHandling -v
```

### Run specific test

```bash
pytest tests/test_error_handling.py::TestDatabaseErrorHandling::test_list_applications_database_error -v
```

### Run with coverage

```bash
pip install pytest-cov
pytest --cov=. --cov-report=html
```

### Run only async tests

```bash
pytest -m asyncio
```

## Test Organization

### `test_applications.py`

Tests the happy path - successful CRUD operations:

- **TestCreateApplication**: Creating applications (full, minimal, default user)
- **TestListApplications**: Listing applications (empty, with user)
- **TestGetApplication**: Fetching single applications (not found)
- **TestUpdateApplication**: Updating applications
- **TestDeleteApplication**: Deleting applications

### `test_error_handling.py`

Tests error handling and user isolation:

- **TestDatabaseErrorHandling**: Database errors are caught and returned as 500
- **TestInputValidation**: Invalid input is rejected with 422
- **TestUserIsolation**: Users can only access their own data
- **TestStatusCodes**: Proper HTTP status codes are returned

### `test_database_layer.py`

Tests database functions with mocks:

- **TestDatabaseErrorHandling**: Database functions raise DatabaseError on API errors
- **TestDatabaseSuccessOperations**: Database functions succeed with valid data

## Key Testing Principles

1. **Separation of Concerns**

   - Endpoint tests focus on HTTP behavior
   - Database tests focus on data layer behavior
   - Error handling tests verify exception handling

2. **Use of Fixtures** (`conftest.py`)

   - `client`: FastAPI test client
   - `test_user_id`: Consistent test user ID
   - `test_application_data`: Full test data
   - `test_application_minimal`: Minimal test data

3. **Mocking**

   - Database layer tests mock Supabase calls
   - Endpoint tests mock database functions to isolate layers

4. **Test Isolation**
   - Each test is independent
   - No shared state between tests
   - Database mocks prevent actual data modifications

## Installation

Install test dependencies:

```bash
pip install -e ".[dev]"
```

This installs the package in editable mode with dev dependencies (pytest, pytest-asyncio, httpx).
