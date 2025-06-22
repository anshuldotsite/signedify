import cv2
import os
from asl_translation_points import extract_landmarks, landmarks_to_heatmap
import mediapipe as mp

label = input("Enter label for this gesture (e.g., thumbsup): ")
SAVE_DIR = f"data/{label}"
os.makedirs(SAVE_DIR,exist_ok=True)

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence = 0.7)

capture = cv2.VideoCapture(0)
count = 0

while True:
    ret,frame = capture.read()
    if not ret:
        break
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        landmarks = extract_landmarks(frame, results)
        if landmarks:
            heatmap = landmarks_to_heatmap(frame, landmarks, grid_size = 128)
            file_path = os.path.join(SAVE_DIR, f"{label}_{count}.npy")
            with open(file_path, 'wb') as f:
                import numpy as np
                np.save(f,heatmap)
            count+=1
            print(f"saved {file_path}")
    cv2.imshow("Capture", frame)
    if cv2.waitKey(1) & 0xFF ==27:
        break
capture.release()
cv2.destroyAllWindows()
    