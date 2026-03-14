import os
from PIL import Image

# SETTINGS
input_folder = "/home/ffsk/Desktop/fflori4n.github.io/_dev/assets/images/"
output_folder = "/home/ffsk/Desktop/fflori4n.github.io/_dev/assets/images/post-iot-beehive-optimized/"
max_width = 1920
max_height = 1920
quality = 80  # JPEG/WebP quality

os.makedirs(output_folder, exist_ok=True)

def resize_image(img):
    width, height = img.size
    
    ratio = min(max_width / width, max_height / height, 1)
    new_size = (int(width * ratio), int(height * ratio))
    
    return img.resize(new_size, Image.LANCZOS)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        with Image.open(input_path) as img:
            img = resize_image(img)

            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            img.save(
                output_path,
                optimize=True,
                quality=quality
            )

        print(f"Optimized: {filename}")

print("Done!")