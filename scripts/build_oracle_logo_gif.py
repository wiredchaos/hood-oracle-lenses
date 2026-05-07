#!/usr/bin/env python3
"""Build a circular animated GIF cycling through all 12 Hood Oracle portraits."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "hoods"
OUT_DIR = ROOT / "public" / "brand"
OUT_DIR.mkdir(parents=True, exist_ok=True)

ORDER = ["compton","philly","atlanta","chicago","nyc","kingston",
         "lagos","london","paris","tokyo","rio","johannesburg"]

SIZE = 192  # render size; browser scales down
RING = 4
CYAN = (0, 230, 255, 255)
RED  = (255, 42, 61, 255)

def square_crop(im: Image.Image) -> Image.Image:
    w, h = im.size
    s = min(w, h)
    return im.crop(((w-s)//2, (h-s)//2, (w+s)//2, (h+s)//2))

def make_frame(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGB")
    im = square_crop(im).resize((SIZE, SIZE), Image.LANCZOS)

    # circular alpha mask
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, SIZE, SIZE), fill=255)

    # red outer glow
    glow = Image.new("RGBA", (SIZE, SIZE), (0,0,0,0))
    ImageDraw.Draw(glow).ellipse((0,0,SIZE,SIZE), fill=RED)
    glow = glow.filter(ImageFilter.GaussianBlur(8))

    base = Image.new("RGBA", (SIZE, SIZE), (10,10,10,255))
    base.alpha_composite(glow)
    rgba = im.convert("RGBA")
    rgba.putalpha(mask)
    base.alpha_composite(rgba)

    # cyan ring
    draw = ImageDraw.Draw(base)
    draw.ellipse((RING//2, RING//2, SIZE-RING//2, SIZE-RING//2),
                 outline=CYAN, width=RING)

    # apply circular mask to whole frame so corners are transparent
    out = Image.new("RGBA", (SIZE, SIZE), (0,0,0,0))
    out.paste(base, (0,0), mask)
    return out

frames = [make_frame(SRC / f"{name}.jpg") for name in ORDER]

# Save GIF (GIF needs palette + transparency)
gif_frames = []
for f in frames:
    # Quantize while preserving transparent pixels
    alpha = f.split()[-1]
    rgb = f.convert("RGB").quantize(colors=255, method=Image.Quantize.MEDIANCUT)
    # reserve index 255 for transparent
    mask = Image.eval(alpha, lambda a: 255 if a <= 8 else 0)
    rgb.paste(255, mask)
    gif_frames.append(rgb)

gif_path = OUT_DIR / "oracle-logo.gif"
gif_frames[0].save(
    gif_path,
    save_all=True,
    append_images=gif_frames[1:],
    duration=220,
    loop=0,
    disposal=2,
    transparency=255,
    optimize=True,
)
print(f"GIF: {gif_path} ({gif_path.stat().st_size//1024} KB)")

# Static PNG fallback
png_path = OUT_DIR / "oracle-logo.png"
frames[0].save(png_path, optimize=True)
print(f"PNG: {png_path}")

# QA strip
strip = Image.new("RGBA", (SIZE*len(frames), SIZE), (0,0,0,0))
for i, f in enumerate(frames):
    strip.paste(f, (i*SIZE, 0))
strip.save("/tmp/oracle-logo-strip.png")
print("QA strip: /tmp/oracle-logo-strip.png")
