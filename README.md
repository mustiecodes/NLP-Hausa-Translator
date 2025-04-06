# FastAPI Translation API with React Frontend

This project consists of two parts:
1. **FastAPI Backend**: A FastAPI app that uses a pre-trained transformer model to translate text from Hausa to English.
2. **React Frontend**: A simple React-based UI where users can input text and get translations.

## Requirements

- **Backend**: 
  - Python 3.7 or higher
  - `pip` (Python's package installer)
  - FastAPI, Pydantic, and Hugging Face's Transformers library
- **Frontend**:
  - Node.js (v14 or higher)
  - npm (Node package manager)
  - React 18 or higher
  - Axios for making HTTP requests

clone the repo using `https://github.com/mustiecodes/NLP-Hausa-Translator.git`

### Backend Setup
- cd ./backend/
-  Install the backend dependencies: `pip install -r requirements.txt`
-  Run the FastAPI app: `uvicorn main:app --reload --port 8000`

### Frontend Setup
- cd ./frontend/
-  Install the frontend dependencies: `npm install`
-  Run the React app: `npm start`
