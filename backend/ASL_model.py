from tensorflow.keras.models import load_model

def load_pretrained_model():
    model = load_model("backend/models/Model.h5")
    return model
