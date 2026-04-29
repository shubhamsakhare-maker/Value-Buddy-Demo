# API Specification

> **Note:** For this prototype, all backend API calls are mocked within the frontend service layer (`src/services`). No real backend connection is required.

## AI Endpoints

### Generate Text
- **URL:** `/ai/generate-text`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "prompt": "string",
    "systemPrompt": "string"
  }
  ```
- **Response:**
  ```json
  {
    "text": "string"
  }
  ```
