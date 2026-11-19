import os
os.environ['STREET_SVG']='/Users/robsonlopes/Downloads/Park.svg'
import copy,subprocess,json
from lib import *
r=load()
main=list(r)[0]
top=[e for e in main if e.tag!=ns+'mask']
G=top[1]; gk=list(G)
defs=r.find(ns+'defs')
masks=[copy.deepcopy(m) for m in r.iter(ns+'mask')]
CLIP=main.get('clip-path'); GMASK=G.get('mask')
def rng(a,b): return list(range(a,b+1))
def items(spec):
    kind,idx=spec
    src=gk if kind=='g' else top
    return kind,[src[i] for i in idx]
def lbbox(spec):
    kind,its=items(spec)
    bs=[bbox(e) for e in its]; bs=[b for b in bs if b]
    return (min(b[0] for b in bs),min(b[1] for b in bs),max(b[2] for b in bs),max(b[3] for b in bs))
def make_svg(spec,vb,px,noclip=False):
    kind,its=items(spec)
    x,y,w,h=vb
    root=ET.Element(ns+'svg',{'width':str(round(w*px)),'height':str(round(h*px)),'viewBox':f'{x} {y} {w} {h}','fill':'none'})
    d=ET.SubElement(root,ns+'defs')
    for k in defs: d.append(copy.deepcopy(k))
    for m in masks: d.append(m)
    c=root if noclip else ET.SubElement(root,ns+'g',{'clip-path':CLIP})
    if kind=='g':
        g=ET.SubElement(c,ns+'g',{'mask':GMASK})
        for e in its: g.append(copy.deepcopy(e))
    else:
        for e in its: c.append(copy.deepcopy(e))
    return ET.tostring(root,encoding='unicode')
def render(spec,out,vb,px,q=86,noclip=False,pub=None):
    svg=make_svg(spec,vb,px,noclip)
    open(out+'.svg','w').write(svg)
    subprocess.run(['rsvg-convert',out+'.svg','-o',out+'.png'],check=True)
    if pub:
        subprocess.run(['cwebp','-quiet','-q',str(q),'-alpha_q','95','-m','6',out+'.png','-o',pub],check=True)
