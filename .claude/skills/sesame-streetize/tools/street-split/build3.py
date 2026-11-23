# street3.svg (744 x 314, 2026-11-19): street2 plus 103 units on the right. Only the layers that changed are rendered (sky, far, street, fgback, wider than before); the characters,
# clouds, window and fgfront are the same art at the same place, so the street2 files are reused (s2-*, s3-fgfront). Run: STREET_SVG=~/Downloads/street3.svg python3 build3.py
# Ranges found by comparing the bounding boxes of street2 and street3: bg group 264 children = street2 + 2 (two new small far trees at 10-11, the ground at 46 is wider), so street2 index + 2 from 44 on;
# top 920 children = street2 + 5 (two new bushes at 44-45 and three at 53-55, all in the foreground back), so fgback is top 1-211 and the characters keep their order shifted by 5.
import copy,sys,os,subprocess
os.environ.setdefault('STREET_SVG','/Users/robsonlopes/Downloads/street3.svg')
from lib import *
import xml.etree.ElementTree as ET
r=load()
main=list(r)[0]
top=[e for e in main if e.tag!=ns+'mask']
bgk=list(top[0])
defs=r.find(ns+'defs')
masks=[copy.deepcopy(m) for m in r.iter(ns+'mask')]
rng=lambda a,b:list(range(a,b+1))
LAYERS={
 'sky':   ('bg',[0],(0,0,744,314),2),
 'far':   ('bg',rng(5,45),(0,123.279,744,77.71),6),
 'street':('bg',[i for i in rng(46,263) if i!=52],(0,0,744,314),6),
 'fgback':('top',rng(1,211),(148.149,218.85,595.851,95.15),6),
}
def make_svg(name):
    kind,idx,vb,px=LAYERS[name]
    items=[(bgk if kind=='bg' else top)[i] for i in idx]
    x,y,w,h=vb
    root=ET.Element(ns+'svg',{'width':str(round(w*px)),'height':str(round(h*px)),'viewBox':f'{x} {y} {w} {h}','fill':'none'})
    d=ET.SubElement(root,ns+'defs')
    for k in defs: d.append(copy.deepcopy(k))
    for m in masks: d.append(m)
    clip=ET.SubElement(root,ns+'g',{'clip-path':'url(#clip0_2063_2)'})
    if kind=='bg':
        g=ET.SubElement(clip,ns+'g',{'mask':'url(#mask0_2063_2)'})
        for e in items: g.append(copy.deepcopy(e))
    else:
        for e in items: clip.append(copy.deepcopy(e))
    return ET.tostring(root,encoding='unicode'),px,vb
if __name__=='__main__':
    out=sys.argv[1] if len(sys.argv)>1 else '/tmp/street3-out'
    os.makedirs(out,exist_ok=True)
    for name in LAYERS:
        svg,px,vb=make_svg(name)
        p=f'{out}/s4-{name}.svg'; open(p,'w').write(svg)
        subprocess.run(['rsvg-convert','-o',f'{out}/s4-{name}.png',p],check=True)
        subprocess.run(['cwebp','-q','82','-alpha_q','92','-m','6',f'{out}/s4-{name}.png','-o',f'{out}/s4-{name}.webp','-quiet'],check=True)
        print(name,vb,px,os.path.getsize(f'{out}/s4-{name}.webp'))
