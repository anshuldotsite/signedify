import cv2
import mediapipe as mp
from asl_translation_points import extract_landmarks, stacked_heatmap

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence = 0.5)

capture = cv2.VideoCapture(0)

while True:
    success, img = capture.read()
    if not success:
        break

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    landmark_list = extract_landmarks(img, results)
    if landmark_list:
        heatmap = stacked_heatmap(img, landmark_list, grid_size=128)
        # Convert heatmap to BGR for cv2 window
        heatmap_bgr = cv2.cvtColor(heatmap, cv2.COLOR_RGB2BGR)
        cv2.imshow("Heatmap", heatmap_bgr)

    cv2.imshow("Hand Detection", img)

    if cv2.waitKey(1) & 0xFF == 27:
        break

capture.release()
cv2.destroyAllWindows()