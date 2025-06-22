import cv2
import os
import uuid
import mediapipe as mp
from asl_translation_points import extract_landmarks, stacked_heatmap
from label_assignment import get_label_id


label = input("Enter label for this gesture: ").strip()
label_id, classes = get_label_id(label)
print(f"Using label'{label}' with ID {label_id}")

img_save_dir = os.path.join("yolo_dataset", "images", label)
lbl_save_dir = os.path.join("yolo_dataset","labels",label)
os.makedirs(img_save_dir,exist_ok=True)
os.makedirs(lbl_save_dir, exist_ok = True)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence = 0.7)

capture = cv2.VideoCapture(0)
count = 0

while True:
    ret,frame = capture.read()
    if not ret:
        break
    rgb = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        landmarks = extract_landmarks(frame, results)
        if landmarks:
            pseudo_img = stacked_heatmap(frame, landmarks)
            filename = f"{label}_{uuid.uuid4().hex[:8]}"
            img_path = os.path.join(img_save_dir, f"{filename}.jpg")
            lbl_path = os.path.join(lbl_save_dir,f"{filename}.txt")
            cv2.imwrite(img_path,pseudo_img)
            yolo_label = f"{label_id} 0.5 0.5 1.0 1.0\n"
            with open(lbl_path, "w") as f:
                f.write(yolo_label)
            count += 1
            print(f" Saved: {filename}")
    cv2.imshow("Preview", frame)
    if cv2.waitKey(1) & 0xFF == 27:
        break
capture.release()
cv2.destroyAllWindows()