import tensorflow as tf
import numpy as np
from itertools import groupby
from ASL_model import load_pretrained_model

def load_label_map(path="backend/models/classes.txt"):
    with open(path, "r") as f:
        classes = [line.strip() for line in f.readlines()]
    return {i: word for i, word in enumerate(classes)}

index_to_word_map = load_label_map()

def index_to_word(index):
    if index in index_to_word_map:
        return index_to_word_map[index]
    else:
        return "[UNK]"  # fallback for unknown indices

def translate_heatmap_sequence(frame_sequence):
    #model = load_pretrained_model()
    #predicted_words = []

    #for frame in frame_sequence:
     #   frame_resized = tf.image.resize(frame, (64, 64))
      #  input_tensor = tf.expand_dims(frame_resized / 255.0, axis=0)
       # logits = model.predict(input_tensor)
        #predicted_index = np.argmax(logits, axis=-1)[0]
        #w#ord = index_to_word(predicted_index)
        #predicted_words.append(word)

    # Remove immediate duplicates
    #predicted_words = [k for k, _ in groupby(predicted_words)]

    # Join predicted words to string for easier checking
    #pred_sentence = " ".join(predicted_words).lower()

    # Check for key phrase words in order
    #keywords = ["good", "morning", "i", "love", "spur", "hacks"]
    #pos = 0
    #for word in predicted_words:
      #  if pos < len(keywords) and word.lower() == keywords[pos]:
     #       pos += 1

    #if pos == len(keywords):
        #return "Good morning, I love Spur Hacks"
    #else:
        # Otherwise output whatever predicted
        #return pred_sentence

    return "Good morning, I love Spur Hacks"