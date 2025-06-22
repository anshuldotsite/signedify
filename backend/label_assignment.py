import os

CLASSES_FILE = "classes.txt"

def load_classes():
    if os.path.exists(CLASSES_FILE):
        with open(CLASSES_FILE, "r") as f:
            classes = [line.strip() for line in f.readlines()]
    else:
        classes = []
    return classes 

def save_classes(classes):
    with open(CLASSES_FILE, "w") as f:
        for c in classes:
            f.write(c+"\n")

def get_label_id(label):
    classes = load_classes()
    if label in classes:
        return classes.index(label), classes
    else:
        classes.append(label)
        save_classes(classes)
        return len(classes) - 1, classes