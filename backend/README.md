# Sign Language Detection Backend

This Flask backend provides endpoints for real-time sign language detection using YOLO and translation services.

## Features

- Real-time sign language detection using YOLO model
- Text translation to multiple languages
- RESTful API endpoints
- CORS enabled for frontend integration

## Setup

1. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Configure your YOLO model:**

   - Replace `'path/to/your/sign_language_model.pt'` in `app.py` with the actual path to your trained YOLO model
   - Make sure your model is trained to detect sign language gestures

3. **Set up translation API (optional):**

   - For production use, replace the demo translation function with a proper API like Google Translate
   - Set the `TRANSLATION_API_KEY` environment variable

4. **Run the server:**

   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check

- **GET** `/health`
- Returns server status and model loading status

### 2. Sign Language Detection

- **POST** `/detect`
- **Body:** `{"image": "base64_encoded_image"}`
- **Response:** `{"detected_sign": "detected_text", "success": true}`

### 3. Text Translation

- **POST** `/translate`
- **Body:** `{"text": "text_to_translate", "target_language": "es"}`
- **Response:** `{"translated_text": "translated_text", "original_text": "original", "target_language": "es", "success": true}`

## Model Configuration

The backend expects a YOLO model trained for sign language detection. The model should:

- Be saved in `.pt` format
- Have classes corresponding to different sign language gestures
- Return confidence scores for detections

## Translation Setup

Currently, the backend includes a demo translation function with basic translations for common words. For production use:

1. **Google Translate API:**

   ```python
   from googletrans import Translator

   translator = Translator()
   result = translator.translate(text, dest=target_language)
   return result.text
   ```

2. **Azure Translator:**

   ```python
   import requests

   url = "https://api.cognitive.microsofttranslator.com/translate"
   headers = {"Ocp-Apim-Subscription-Key": "your_key"}
   params = {"api-version": "3.0", "to": target_language}
   body = [{"text": text}]
   response = requests.post(url, headers=headers, params=params, json=body)
   return response.json()[0]["translations"][0]["text"]
   ```

## Environment Variables

- `TRANSLATION_API_KEY`: API key for translation service
- `MODEL_PATH`: Path to your YOLO model file

## Troubleshooting

1. **Model not loading:** Check the model path and ensure the file exists
2. **CORS errors:** The backend includes CORS headers, but ensure your frontend is making requests to the correct URL
3. **Memory issues:** YOLO models can be large; ensure sufficient RAM is available

## Development

To run in development mode with auto-reload:

```bash
export FLASK_ENV=development
python app.py
```
