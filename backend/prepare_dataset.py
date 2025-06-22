import os
import shutil
import random
from glob import glob

SOURCE_IMAGE_ROOT = "../yolo_dataset/images"
SOURCE_LABEL_ROOT = "../yolo_dataset/labels"
DEST_IMAGE_ROOT = "../yolo_ready_dataset/images"
DEST_LABEL_ROOT = "../yolo_ready_dataset/labels"

all_images = glob(os.path.join(SOURCE_IMAGE_ROOT, "*","*.jpg"))
random.shuffle(all_images)

split_index = int(len(all_images)* 0.8)
train_images = all_images[:split_index]
val_images = all_images[split_index:]

def copy_pairs(image_list, split):
    for img_path in image_list:
        filename = os.path.basename(img_path)
        label_subfolder = os.path.basename(os.path.dirname(img_path))
        label_path = os.path.join(SOURCE_LABEL_ROOT, label_subfolder, filename.replace(".jpg",".txt"))

        dest_img = os.path.join(DEST_IMAGE_ROOT,split, filename)
        dest_lbl = os.path.join(DEST_LABEL_ROOT, split, filename.replace(".jpg", ".txt"))

        os.makedirs(os.path.dirname(dest_img), exist_ok=True)
        os.makedirs(os.path.dirname(dest_lbl), exist_ok=True)
        if os.path.exists(label_path):
            shutil.copy(img_path, dest_img)
            shutil.copy(label_path, dest_lbl)
        else:
            print(f"Label file missing for {filename}, skipping.")
copy_pairs(train_images,"train")
copy_pairs(val_images, "val")

print(f"Copied {len(train_images)} training and {len(val_images)} validation samples.")
