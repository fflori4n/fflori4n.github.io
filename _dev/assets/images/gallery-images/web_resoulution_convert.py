from PIL import Image, ImageOps
import os

# Web-friendly max size
MAX_SIZE = 1920  # pixels
QUALITY = 85     # JPEG quality (80–85 is typical for web)

# Supported image extensions
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp")

for filename in os.listdir("."):
    lower_name = filename.lower()

    # Skip non-images or already-processed images
    if not lower_name.endswith(IMAGE_EXTENSIONS):
        continue
    if "web" in lower_name:
        print(f"Skipping (already web): {filename}")
        continue

    try:
        with Image.open(filename) as img:
            img = ImageOps.exif_transpose(img)

            width, height = img.size

            # Skip if already small enough
            if max(width, height) <= MAX_SIZE:
                print(f"Skipping (already web size): {filename}")
                continue

            # Resize while keeping aspect ratio
            img.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)

            # Convert to RGB for JPEG compatibility
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            # Output filename
            name, _ = os.path.splitext(filename)
            output_file = f"{name}_web.jpg"

            img.save(
                output_file,
                "JPEG",
                quality=QUALITY,
                optimize=True
            )

        # Delete original only after successful save
        os.remove(filename)
        print(f"Converted & deleted: {filename} → {output_file}")

    except Exception as e:
        print(f"Error processing {filename}: {e}")
