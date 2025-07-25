import cv2

cap = cv2.VideoCapture(0)
print("Is camera opened? ", cap.isOpened())

if not cap.isOpened():
    print("Cannot open webcam")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    cv2.imshow("Test Webcam", frame)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC key to quit
        break

cap.release()
cv2.destroyAllWindows()
