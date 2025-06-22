import pickle
label_map = {i: chr(65 + i) for i in range(26)}  # 0:'A', ..., 25:'Z'

with open("backend/models/label_map.pkl", "wb") as f:
    pickle.dump(label_map, f)
