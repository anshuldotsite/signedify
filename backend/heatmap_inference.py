import cv2
import numpy as np
import mediapipe as mp
from asl_translation_points import stacked_heatmap
from ultralytics import YOLO  # assuming you use ultralytics YOLOv8

# Setup mediapipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.5)

# Load your YOLO model (change path as needed)
model = YOLO("backend/models/yolomodel.pt")

# YOLO expected input size
input_w, input_h = 416, 416

confidence_threshold = 0.5

capture = cv2.VideoCapture(0)

while True:
    ret, frame = capture.read()
    if not ret:
        break

    # Flip and convert to RGB for mediapipe
    frame = cv2.flip(frame, 1)
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect hands
    result = hands.process(img_rgb)

    if result.multi_hand_landmarks:
        hand_landmarks = result.multi_hand_landmarks[0].landmark
        h, w, _ = frame.shape

        # Convert normalized landmarks to pixel coords
        landmarks = [(int(lm.x * w), int(lm.y * h)) for lm in hand_landmarks]

        # Generate heatmap
        pseudo_img = stacked_heatmap(frame, landmarks)
        if pseudo_img is None:
            continue

        # Resize heatmap for YOLO input
        pseudo_img_resized = cv2.resize(pseudo_img, (input_w, input_h))

        # Run YOLO inference
        results = model(pseudo_img_resized)
        boxes = results[0].boxes

        if boxes is not None and len(boxes) > 0:
            xyxy = boxes.xyxy.cpu().numpy()
            confs = boxes.conf.cpu().numpy()
            classes = boxes.cls.cpu().numpy()

            for box, conf, cls in zip(xyxy, confs, classes):
                if conf < confidence_threshold:
                    continue
                x1, y1, x2, y2 = map(int, box)
                label = f'{model.names[int(cls)]} {conf:.2f}'
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow("ASL Translator", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
