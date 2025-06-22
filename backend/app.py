from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import io
from PIL import Image
import requests
import os
from ultralytics import YOLO
import json

app = Flask(__name__)
CORS(app)

# Load your YOLO model for sign language detection
# Replace 'path/to/your/sign_language_model.pt' with your actual model path
try:
    model = YOLO('path/to/your/sign_language_model.pt')
    print("YOLO model loaded successfully")
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    model = None

# Translation API configuration
# You can use Google Translate API, Azure Translator, or any other translation service
TRANSLATION_API_KEY = os.getenv('TRANSLATION_API_KEY', 'your_api_key_here')
TRANSLATION_API_URL = "https://translation.googleapis.com/language/translate/v2"

def base64_to_image(base64_string):
    """Convert base64 string to OpenCV image"""
    try:
        # Remove data URL prefix if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        # Decode base64
        image_data = base64.b64decode(base64_string)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to OpenCV format
        opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        return opencv_image
    except Exception as e:
        print(f"Error converting base64 to image: {e}")
        return None

def detect_sign_language(image):
    """Detect sign language using YOLO model"""
    try:
        if model is None:
            return "Model not loaded"
        
        # Run YOLO detection
        results = model(image)
        
        # Process results
        detected_signs = []
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    # Get class name and confidence
                    cls = int(box.cls[0])
                    conf = float(box.conf[0])
                    
                    # Get class name from model
                    class_name = model.names[cls]
                    
                    if conf > 0.5:  # Confidence threshold
                        detected_signs.append({
                            'sign': class_name,
                            'confidence': conf
                        })
        
        # Return the most confident detection
        if detected_signs:
            best_detection = max(detected_signs, key=lambda x: x['confidence'])
            return best_detection['sign']
        else:
            return "No sign detected"
            
    except Exception as e:
        print(f"Error in sign language detection: {e}")
        return "Detection error"

def translate_text(text, target_language):
    """Translate text using Google Translate API"""
    try:
        # For demo purposes, using a simple translation mapping
        # In production, use a proper translation API like Google Translate
        
        translations = {
            'es': {
                'hello': 'hola',
                'thank you': 'gracias',
                'goodbye': 'adiós',
                'yes': 'sí',
                'no': 'no',
                'please': 'por favor',
                'sorry': 'lo siento',
                'help': 'ayuda',
                'water': 'agua',
                'food': 'comida'
            },
            'fr': {
                'hello': 'bonjour',
                'thank you': 'merci',
                'goodbye': 'au revoir',
                'yes': 'oui',
                'no': 'non',
                'please': 's\'il vous plaît',
                'sorry': 'désolé',
                'help': 'aide',
                'water': 'eau',
                'food': 'nourriture'
            },
            'de': {
                'hello': 'hallo',
                'thank you': 'danke',
                'goodbye': 'auf wiedersehen',
                'yes': 'ja',
                'no': 'nein',
                'please': 'bitte',
                'sorry': 'entschuldigung',
                'help': 'hilfe',
                'water': 'wasser',
                'food': 'essen'
            }
        }
        
        # Check if we have a translation for this language and text
        if target_language in translations:
            text_lower = text.lower()
            if text_lower in translations[target_language]:
                return translations[target_language][text_lower]
        
        # If no translation found, return original text with note
        return f"{text} (translation not available for {target_language})"
        
    except Exception as e:
        print(f"Error in translation: {e}")
        return f"Translation error: {text}"

@app.route('/detect', methods=['POST'])
def detect():
    """Endpoint for sign language detection"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Convert base64 image to OpenCV format
        image = base64_to_image(data['image'])
        
        if image is None:
            return jsonify({'error': 'Invalid image data'}), 400
        
        # Detect sign language
        detected_sign = detect_sign_language(image)
        
        return jsonify({
            'detected_sign': detected_sign,
            'success': True
        })
        
    except Exception as e:
        print(f"Error in detect endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/translate', methods=['POST'])
def translate():
    """Endpoint for text translation"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data or 'target_language' not in data:
            return jsonify({'error': 'Missing text or target_language'}), 400
        
        text = data['text']
        target_language = data['target_language']
        
        # Translate the text
        translated_text = translate_text(text, target_language)
        
        return jsonify({
            'translated_text': translated_text,
            'original_text': text,
            'target_language': target_language,
            'success': True
        })
        
    except Exception as e:
        print(f"Error in translate endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 