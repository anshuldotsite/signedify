import numpy as np
import cv2

def extract_landmarks(image, results):
    landmarks = []
    h, w, _ = image.shape

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                cx = int(lm.x * w)
                cy = int(lm.y * h)
                landmarks.append((cx, cy))

    return landmarks

def stacked_heatmap(image, landmarks, grid_size=128):
    try:
        h, w, _ = image.shape

        def make_heat(points, blur=7):
            heatmap = np.zeros((grid_size, grid_size), dtype=np.float32)

            for (x, y) in points:
                norm_x = x / w
                norm_y = y / h

                grid_x = int(norm_x * (grid_size - 1))
                grid_y = int(norm_y * (grid_size - 1))

                # Spread the dot around center coords for smooth cluster
                for dy in range(-2, 3):
                    for dx in range(-2, 3):
                        gx = grid_x + dx
                        gy = grid_y + dy
                        if 0 <= gx < grid_size and 0 <= gy < grid_size:
                            dist_sq = dx*dx + dy*dy
                            heatmap[gy, gx] += np.exp(-dist_sq / 4.0)

            heatmap = np.clip(heatmap, 0, 1)

            blurred = cv2.GaussianBlur(heatmap, (blur, blur), 0)

            if len(blurred.shape) == 3:
                blurred = blurred[:, :, 0]

            return blurred

        raw = make_heat(landmarks, blur=3)
        blurred = make_heat(landmarks, blur=7)
        edge = cv2.Laplacian(raw.astype(np.float32), cv2.CV_32F)

        if raw.ndim != 2 or blurred.ndim != 2 or edge.ndim != 2:
            raise ValueError("One of the heatmaps is not 2D")

        stacked = np.stack([raw, blurred, edge], axis=2)
        stacked = (stacked * 255).astype(np.uint8)

        return stacked

    except Exception as e:
        print("Error in stacked_heatmap:", e)
        return None
