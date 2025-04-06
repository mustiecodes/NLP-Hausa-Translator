from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins or restrict to a specific domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, change "*" to a specific URL to restrict
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods, or restrict to specific ones like ["GET", "POST"]
    allow_headers=["*"],  # Allow all headers
)

model_name = "Ahmadala/hausa_eng_model"
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False, force_download=True)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

class TextInput(BaseModel):
    text: str

@app.post("/translate")
def translate_text(data: TextInput):
    inputs = tokenizer(data.text, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(**inputs, max_length=512)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"translation": result}
