#!/usr/bin/env python3
"""Render hood oracle messages and the NEURO demo report using ffmpeg."""
import os, subprocess, json, shutil, textwrap, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOODS_DIR = ROOT / "src/assets/hoods"
ENV_DIR = ROOT / "src/assets/env360"
OUT = ROOT / "public/videos"
POSTERS = OUT / "posters"
OUT.mkdir(parents=True, exist_ok=True)
POSTERS.mkdir(parents=True, exist_ok=True)
TMP = Path("/tmp/oraclevid"); TMP.mkdir(exist_ok=True)

SERIF = "/nix/store/dg3hd9mqha517djbgpgnq8r4q1j1wn30-noto-fonts-2025.11.01/share/fonts/noto/NotoSerif[wdth,wght].ttf"
SANS  = "/nix/store/dg3hd9mqha517djbgpgnq8r4q1j1wn30-noto-fonts-2025.11.01/share/fonts/noto/NotoSans[wdth,wght].ttf"
MONO  = "/nix/store/dg3hd9mqha517djbgpgnq8r4q1j1wn30-noto-fonts-2025.11.01/share/fonts/noto/NotoSansMono[wdth,wght].ttf"

# Hood messages: [city_id, kicker, line, sign-off]
HOODS = [
    ("compton",      "LA STREET SIGNAL",      "Even the corner stops pretending it isn't watching.",            "RUN YOUR SIGNAL"),
    ("philly",       "BATTLE-TESTED WISDOM",  "She speaks the language the block already knows.",                "RUN YOUR SIGNAL"),
    ("atlanta",      "VELVET AMBITION",       "Ambition without alignment is just noise.",                       "RUN YOUR SIGNAL"),
    ("chicago",      "WINTER DISCIPLINE",     "Discipline is the warmest coat she owns.",                        "RUN YOUR SIGNAL"),
    ("nyc",          "PRESSURE & PROPHECY",   "The city pressed her into a signal.",                             "RUN YOUR SIGNAL"),
    ("kingston",     "RHYTHM & RESISTANCE",   "The bass remembers what the mind forgets.",                       "RUN YOUR SIGNAL"),
    ("lagos",        "MARKET INTELLIGENCE",   "Every stall is a prophecy in motion.",                            "RUN YOUR SIGNAL"),
    ("london",       "FOG & SURVEILLANCE",    "Visibility is the trap. Signal is the exit.",                     "RUN YOUR SIGNAL"),
    ("paris",        "ELEGANCE UNDER PRESSURE","Grace is the discipline of the unseen.",                         "RUN YOUR SIGNAL"),
    ("tokyo",        "PRECISION GHOST",       "Silence cuts cleaner than any blade.",                            "RUN YOUR SIGNAL"),
    ("rio",          "MOUNTAIN & FAVELA",     "The hill remembers every dancer.",                                "RUN YOUR SIGNAL"),
    ("johannesburg", "GOLD VEIN SIGNAL",      "The ancestors run on the same network.",                          "RUN YOUR SIGNAL"),
]

def esc(t):
    return t.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\u2019").replace(",", "\\,")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write("FFMPEG FAILED:\n" + " ".join(cmd[:5]) + "...\n" + r.stderr[-2000:])
        raise SystemExit(1)

def render_hood(slug, kicker, line, signoff):
    src = HOODS_DIR / f"{slug}.jpg"
    out = OUT / f"oracle-{slug}.mp4"
    poster = POSTERS / f"oracle-{slug}.jpg"
    dur = 14
    fps = 30
    W, H = 1080, 1350
    # Ken-burns zoom + heavy red/cyan tint + scanline grid + text reveals
    vf = (
        f"scale=-2:{H+200},crop={W}:{H+200},"
        f"zoompan=z='min(zoom+0.0008,1.18)':d={dur*fps}:s={W}x{H}:fps={fps},"
        f"eq=saturation=0.55:contrast=1.15:brightness=-0.04,"
        f"colorchannelmixer=rr=1.05:rg=0.0:rb=0.05:gr=0.0:gg=0.85:gb=0.05:br=0.05:bg=0.05:bb=1.0,"
        # vignette
        f"vignette=PI/4,"
        # scanline overlay
        f"format=yuv420p,"
        # grain
        f"noise=alls=8:allf=t,"
        # red top gradient + dark bottom for legibility
        f"drawbox=x=0:y=0:w={W}:h={H}:color=black@0.35:t=fill,"
        f"drawbox=x=0:y={H-460}:w={W}:h=460:color=black@0.55:t=fill,"
        # Top kicker (mono red)
        f"drawtext=fontfile='{MONO}':text='{esc('NO DOX SIGNALS // ' + kicker)}':"
        f"fontcolor=#ff2a3d:fontsize=30:x=60:y=70:alpha='if(lt(t,0.3),0,if(lt(t,0.8),(t-0.3)/0.5,1))',"
        # City label
        f"drawtext=fontfile='{SERIF}':text='{esc(slug.upper().replace('JOHANNESBURG','JO\u2019BURG'))} ORACLE':"
        f"fontcolor=white:fontsize=96:x=60:y=130:alpha='if(lt(t,0.5),0,if(lt(t,1.2),(t-0.5)/0.7,1))',"
        # Center quote
        f"drawtext=fontfile='{SERIF}':text='{esc(chr(0x201C) + line + chr(0x201D))}':"
        f"fontcolor=white:fontsize=58:x=(w-text_w)/2:y=h-380:line_spacing=14:"
        f"box=0:alpha='if(lt(t,2),0,if(lt(t,3),(t-2),1))',"
        # signoff CTA
        f"drawtext=fontfile='{MONO}':text='{esc(signoff)}':"
        f"fontcolor=#00e6ff:fontsize=42:x=(w-text_w)/2:y=h-160:"
        f"alpha='if(lt(t,{dur-4}),0,if(lt(t,{dur-3}),(t-{dur-4}),1))',"
        # tiny brand
        f"drawtext=fontfile='{MONO}':text='THE HOOD ORACLE':"
        f"fontcolor=white@0.7:fontsize=22:x=(w-text_w)/2:y=h-100:"
        f"alpha='if(lt(t,{dur-4}),0,1)',"
        # fade in/out
        f"fade=t=in:st=0:d=0.6,fade=t=out:st={dur-0.6}:d=0.6"
    )
    cmd = [
        "ffmpeg","-y","-loop","1","-t",str(dur),"-i",str(src),
        "-vf",vf,"-r",str(fps),"-c:v","libx264","-pix_fmt","yuv420p",
        "-crf","22","-preset","veryfast","-movflags","+faststart",
        str(out)
    ]
    run(cmd)
    # poster from frame 1.5s
    run(["ffmpeg","-y","-ss","2","-i",str(out),"-frames:v","1","-q:v","3",str(poster)])
    print(f"  ok: {out.name} ({out.stat().st_size//1024} KB)")

def render_neuro():
    """Multi-scene 1920x1080 demo report."""
    W, H, fps = 1920, 1080, 30
    # 6 scenes, each backed by a hood image
    scenes = [
        # (image, kicker, big_title, sub, dur)
        ("nyc",      "NO DOX MODE ACTIVE",   "N3UR0 META X",                "Symbolic Reading // Privacy First", 4.5),
        ("compton",  "LENS 01 // ASTROLOGY", "VIRGO EARTH ARCHITECT",       "The auditor. The healer. The systems oracle.", 5.5),
        ("chicago",  "LENS 02 // NUMEROLOGY","LIFE PATH 11 / 2",            "Make the signal operational. Day signature 8.", 5.5),
        ("london",   "LENS 03 // AKASHIC",   "THE RED LEDGER",              "Keeper of methods, recipes, ledgers, warnings.", 5.5),
        ("tokyo",    "LENS 04 // FIBONACCI", "SPIRAL\u201134",              "Architecture After Pressure.", 5.5),
        ("atlanta",  "PATCH-LIFE",           "RED VEIL SYSTEMS ORACLE",     "Pattern is not prison. Signal is not sentence.", 7.0),
    ]
    parts = []
    for i,(slug,kicker,title,sub,dur) in enumerate(scenes):
        src = HOODS_DIR / f"{slug}.jpg"
        out = TMP / f"scene_{i}.mp4"
        vf = (
            f"scale=-2:{H+200},crop={W}:{H+200},"
            f"zoompan=z='min(zoom+0.0006,1.15)':d={int(dur*fps)}:s={W}x{H}:fps={fps},"
            f"eq=saturation=0.5:contrast=1.18:brightness=-0.05,"
            f"colorchannelmixer=rr=1.05:rg=0:rb=0.05:gr=0:gg=0.8:gb=0.08:br=0.06:bg=0.06:bb=1.0,"
            f"vignette=PI/4,"
            f"format=yuv420p,noise=alls=6:allf=t,"
            f"drawbox=x=0:y=0:w={W}:h={H}:color=black@0.4:t=fill,"
            f"drawbox=x=0:y={H-360}:w={W}:h=360:color=black@0.55:t=fill,"
            f"drawbox=x=0:y=0:w={W}:h=120:color=black@0.6:t=fill,"
            f"drawtext=fontfile='{MONO}':text='{esc(kicker)}':fontcolor=#ff2a3d:fontsize=32:x=80:y=50:"
            f"alpha='if(lt(t,0.2),0,if(lt(t,0.7),(t-0.2)/0.5,1))',"
            f"drawtext=fontfile='{MONO}':text='HOOD ORACLE \u2022 SYMBOLIC REPORT':fontcolor=#00e6ff:fontsize=28:x=w-tw-80:y=54:alpha=0.85,"
            f"drawtext=fontfile='{SERIF}':text='{esc(title)}':fontcolor=white:fontsize=140:x=80:y=h-300:"
            f"alpha='if(lt(t,0.6),0,if(lt(t,1.4),(t-0.6)/0.8,1))',"
            f"drawtext=fontfile='{SANS}':text='{esc(sub)}':fontcolor=white@0.92:fontsize=48:x=80:y=h-130:"
            f"alpha='if(lt(t,1.2),0,if(lt(t,2.0),(t-1.2)/0.8,1))',"
            f"drawtext=fontfile='{MONO}':text='{esc(f'SCENE 0{i+1} / 06')}':fontcolor=white@0.6:fontsize=22:x=80:y=h-60,"
            f"fade=t=in:st=0:d=0.5,fade=t=out:st={dur-0.5}:d=0.5"
        )
        run(["ffmpeg","-y","-loop","1","-t",str(dur),"-i",str(src),
             "-vf",vf,"-r",str(fps),"-c:v","libx264","-pix_fmt","yuv420p",
             "-crf","20","-preset","veryfast", str(out)])
        parts.append(out)

    # concat
    listfile = TMP/"list.txt"
    listfile.write_text("\n".join(f"file '{p}'" for p in parts))
    final = OUT / "neuro-meta-x-report.mp4"
    run(["ffmpeg","-y","-f","concat","-safe","0","-i",str(listfile),
         "-c","copy","-movflags","+faststart",str(final)])
    poster = POSTERS / "neuro-meta-x-report.jpg"
    run(["ffmpeg","-y","-ss","2","-i",str(final),"-frames:v","1","-q:v","3",str(poster)])
    print(f"NEURO demo: {final.stat().st_size//1024} KB")

if __name__ == "__main__":
    print("Rendering NEURO demo...")
    render_neuro()
    print("Rendering hood messages...")
    for h in HOODS:
        render_hood(*h)
    print("Done.")
