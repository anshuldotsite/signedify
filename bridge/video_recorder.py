import cv2
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import numpy as np
import sys
import os
import time
import mediapipe as mp
from gtts import gTTS
import playsound
import tempfile
from googletrans import Translator

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_path = os.path.join(base_dir, 'backend')
sys.path.append(backend_path)

from asl_translation_points import stacked_heatmap
from Translator import translate_heatmap_sequence

recording = False
heatmap_sequence = []
last_frame_time = 0

capture = cv2.VideoCapture(0)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.5)
mp_draw = mp.solutions.drawing_utils

translator = Translator()

def update_frame():
    global recording, heatmap_sequence, last_frame_time

    ret, frame = capture.read()
    if not ret:
        root.after(10, update_frame)
        return

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if recording:
        now = time.time()
        if now - last_frame_time > 0.3:
            last_frame_time = now
            landmarks = []
            if results.multi_hand_landmarks:
                landmarks = [(int(lm.x * frame.shape[1]), int(lm.y * frame.shape[0]))
                             for lm in results.multi_hand_landmarks[0].landmark]
            if landmarks:
                heatmap = stacked_heatmap(frame, landmarks)
                if heatmap is not None:
                    heatmap_sequence.append(heatmap)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = Image.fromarray(frame_rgb)
    imgtk = ImageTk.PhotoImage(image=img)

    video_label.imgtk = imgtk
    video_label.configure(image=imgtk)

    root.after(10, update_frame)

def start_recording():
    global recording, heatmap_sequence
    heatmap_sequence = []
    recording = True
    print("🎬 Recording started")

def stop_recording():
    global recording
    recording = False
    print(f"🛑 Recording stopped — {len(heatmap_sequence)} heatmaps recorded")

def speak_text(text, lang='en'):
    try:
        tts = gTTS(text=text, lang=lang)
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as fp:
            temp_path = fp.name
            tts.save(temp_path)
        playsound.playsound(temp_path)
        os.remove(temp_path)
    except Exception as e:
        print("Error during speech synthesis:", e)

def run_translation():
    sentence = translate_heatmap_sequence(heatmap_sequence)
    print("🧠 Translated sentence:", sentence)
    translated_label.config(text=f"Translation: {sentence}")

    selected_lang = lang_var.get()
    try:
        translated_text = translator.translate(sentence, dest=selected_lang).text
        print(f"Translated text ({selected_lang}): {translated_text}")
        speak_text(translated_text, lang=selected_lang)
    except Exception as e:
        print("Error during translation or speech:", e)

root = tk.Tk()
root.title("ASL Heatmap Recorder")

video_label = ttk.Label(root)
video_label.pack()

btn_frame = ttk.Frame(root)
btn_frame.pack(pady=5)

ttk.Button(btn_frame, text="Start Recording", command=start_recording).pack(side=tk.LEFT, padx=10)
ttk.Button(btn_frame, text="Stop Recording", command=stop_recording).pack(side=tk.LEFT, padx=10)
ttk.Button(btn_frame, text="Translate & Speak", command=run_translation).pack(side=tk.LEFT, padx=10)

lang_var = tk.StringVar(value='en')
lang_options = {
    "English": 'en',
    "Spanish": 'es',
    "French": 'fr',
    "German": 'de',
    "Chinese (Simplified)": 'zh-cn',
    "Japanese": 'ja',
    "Korean": 'ko',
}

lang_menu = ttk.OptionMenu(root, lang_var, 'en', *lang_options.values())
ttk.Label(root, text="Select Language for Audio:").pack(pady=(10,0))
lang_menu.pack()

translated_label = ttk.Label(root, text="Translation:")
translated_label.pack(pady=10)

update_frame()
root.protocol("WM_DELETE_WINDOW", lambda: (capture.release(), root.destroy()))
root.mainloop()
