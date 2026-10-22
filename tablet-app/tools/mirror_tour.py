import math, os, re, sys, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor
BASE = "https://futeservices.com/26-27/Hiranadani/DOSTI/"
OUT = sys.argv[1]
def fetch(rel, required=True):
    dest = os.path.join(OUT, rel)
    if os.path.exists(dest): return True
    os.makedirs(os.path.dirname(dest) or OUT, exist_ok=True)
    try:
        data = urllib.request.urlopen(BASE + urllib.parse.quote(rel), timeout=60).read()
    except Exception as e:
        if required: print("FAIL", rel, e)
        return False
    open(dest, "wb").write(data); return True
for f in ["index.html", "pano2vr_player.js", "skin.js", "pano.xml", "preview.jpg"]:
    fetch(f, f != "preview.jpg")
xml = open(os.path.join(OUT, "pano.xml"), encoding="utf-8").read()
skin = open(os.path.join(OUT, "skin.js"), encoding="utf-8").read()
player = open(os.path.join(OUT, "pano2vr_player.js"), encoding="utf-8").read()
jobs = set(re.findall(r"'(images/[^']+)'", skin))
jobs |= set(re.findall(r'url="(media/[^"]+)"', xml))
jobs |= {"webxr/vrSkinHide.svg", "webxr/vrSkinShow.svg"}
for pano in re.findall(r"<panorama.*?</panorama>", xml, re.S):
    m = re.search(r'leveltilesize="(\d+)".*?leveltileurl="([^"]+)"', pano, re.S)
    tile = int(m.group(1)); url = m.group(2)
    for l, w in enumerate(sorted(int(x) for x in re.findall(r'<level [^>]*width="(\d+)"', pano))):
        n = math.ceil(w / tile)
        if l == 0:  # preview strip lives in an extra cube face
            jobs.add(url.replace('%c','6').replace('%l','0').replace('%x','0').replace('%y','0'))
        for c in range(6):
            for x in range(n):
                for y in range(n):
                    jobs.add(url.replace("%c", str(c)).replace("%l", str(l)).replace("%x", str(x)).replace("%y", str(y)))
print("files:", len(jobs))
with ThreadPoolExecutor(12) as ex:
    res = list(ex.map(fetch, sorted(jobs)))
print("ok:", sum(res), "failed:", len(res) - sum(res))
