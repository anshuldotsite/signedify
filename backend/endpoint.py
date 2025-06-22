import cv2
import numpy as np
from flask import Flask, send_file, jsonify
import threading
import time
import os
from flask_cors import CORS
import mediapipe as mp

from asl_translation_points import stacked_heatmap

app = Flask(__name__, static_folder='static')
CORS(app)

HEATMAP_IMAGE_PATH = os.path.abspath('heatmap.png')
LIVEFEED_IMAGE_PATH = os.path.abspath('livefeed.png')
FINAL_FRAME_IMAGE_PATH = os.path.abspath(os.path.join('static', 'final_frame.png'))

current_translation = "Waiting for translation..."

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.5)
mp_draw = mp.solutions.drawing_utils

capture = cv2.VideoCapture(0)
if not capture.isOpened():
    print("ERROR: Could not open webcam")
    exit(1)

def generate_heatmap_and_livefeed_images():
    while True:
        ret, frame = capture.read()
        if not ret:
            print("Failed to grab frame from camera")
            time.sleep(0.1)
            continue

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        landmarks = []
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            landmarks = [(int(lm.x * frame.shape[1]), int(lm.y * frame.shape[0]))
                         for lm in results.multi_hand_landmarks[0].landmark]

        # Save live camera frame with landmarks
        cv2.imwrite(LIVEFEED_IMAGE_PATH, frame)

        # Save heatmap if landmarks found
        if landmarks:
            heatmap = stacked_heatmap(frame, landmarks)
            if heatmap is not None:
                cv2.imwrite(HEATMAP_IMAGE_PATH, heatmap)

        time.sleep(0.1)

def generate_final_frame():
    global current_translation
    while True:
        final_frame = np.zeros((240, 320, 3), dtype=np.uint8)
        cv2.putText(final_frame, 'ASL Translation', (10, 120), cv2.FONT_HERSHEY_SIMPLEX,
                    0.8, (255, 255, 255), 2)
        cv2.imwrite(FINAL_FRAME_IMAGE_PATH, final_frame)
        current_translation = "Hello from ASL translator!"
        time.sleep(1)

@app.route('/api/heatmap-frame')
def heatmap_frame():
    if os.path.exists(HEATMAP_IMAGE_PATH):
        return send_file(HEATMAP_IMAGE_PATH, mimetype='image/png')
    else:
        return "Heatmap image not found", 404

@app.route('/api/livefeed-frame')
def livefeed_frame():
    if os.path.exists(LIVEFEED_IMAGE_PATH):
        return send_file(LIVEFEED_IMAGE_PATH, mimetype='image/png')
    else:
        return "Live feed image not found", 404

@app.route('/api/final-frame')
def final_frame():
    image_url = '/static/final_frame.png' if os.path.exists(FINAL_FRAME_IMAGE_PATH) else ''
    return jsonify({
        'text': current_translation,
        'imageUrl': image_url
    })

if __name__ == '__main__':
    threading.Thread(target=generate_heatmap_and_livefeed_images, daemon=True).start()
    threading.Thread(target=generate_final_frame, daemon=True).start()
    app.run(debug=True)
