from pathlib import Path
from PIL import Image

# Directory with images
IM_DIR = Path(__file__).parent
WIDTHS = [320, 640, 1024]
QUALITY = 80
AVIF_QUALITY = 50

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
                # Save WebP
                out_webp = IM_DIR / f"{base}-{target_w}.webp"
                resized.save(out_webp, 'WEBP', quality=QUALITY, method=6)
                print('Saved', out_webp.name)
                # Save AVIF (if plugin available)
                try:
                    out_avif = IM_DIR / f"{base}-{target_w}.avif"
                    # Pillow with pillow-avif-plugin supports saving with quality parameter
                    resized.save(out_avif, 'AVIF', quality=AVIF_QUALITY)
                    print('Saved', out_avif.name)
                except Exception as e:
                    print('AVIF save failed for', base, target_w, '-', e)
    except Exception as e:
        print('Failed to process', p.name, '-', e)

print('Done')
