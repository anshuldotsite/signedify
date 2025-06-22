from ultralytics import YOLO
import cv2

model = YOLO("backend/models/best.pt")

capture = cv2.VideoCapture(0)
CONF_THRESHOLD = 0.5

while True:
    ret,frame = capture.read()
    if not ret:
        break
    results = model(frame)
    annotated_frame = frame.copy()
    for box in results[0].boxes:
        conf = box.conf.item()
        if conf < CONF_THRESHOLD:
            continue
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        cls_id = int(box.cls[0])
        cls_name = model.names[cls_id]
        cv2.rectangle(annotated_frame, (x1,y1),(x2,y2),(0,255,0),2)
        label = f"{cls_name} {conf:.2f}"
        (w,h), _ = cv2.getTextSize(label,cv2.FONT_HERSHEY_SIMPLEX,0.6,2)
        cv2.rectangle(annotated_frame,(x1,y1-h-10),(x1+w,y1),(0,250,0), -1)
        cv2.putText(annotated_frame, "Test 0.99", (x1,y1-5),
                    cv2.FONT_HERSHEY_SIMPLEX,0.6,(0,0,0),2)
    cv2.imshow("Live YOLO Inference",annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
capture.release()
cv2.destroyAllWindows()