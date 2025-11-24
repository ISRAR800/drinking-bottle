from pathlib import Path
from PIL import Image

# Directory with images
IM_DIR = Path(__file__).parent
WIDTHS = [320, 640, 1024]
QUALITY = 80

avif_files = list(IM_DIR.glob('*.avif'))
if not avif_files:
    print('No .avif files found in', IM_DIR)
else:
    print(f'Found {len(avif_files)} AVIF files, optimizing...')

for p in avif_files:
    try:
        with Image.open(p) as im:
            im.load()
            base = p.stem
            # Ensure sRGB
            if im.mode not in ('RGB','RGBA'):
                im = im.convert('RGB')
            w, h = im.size
            for target_w in WIDTHS:
                if w <= target_w:
                    # skip upsizing; still create a re-encoded WebP
                    resized = im.copy()
                else:
                    ratio = target_w / float(w)
                    target_h = int(h * ratio)
                    resized = im.resize((target_w, target_h), Image.LANCZOS)
                out_name = IM_DIR / f"{base}-{target_w}.webp"
                resized.save(out_name, 'WEBP', quality=QUALITY, method=6)
                print('Saved', out_name.name)
    except Exception as e:
        print('Failed to process', p.name, '-', e)

print('Done')
