import copy,subprocess,sys,json,os,base64
from lib import *
r=load()
main=list(r)[0]
top=[e for e in main if e.tag!=ns+'mask']
bg=top[0]
bgk=list(bg)
defs=r.find(ns+'defs')
masks=[copy.deepcopy(m) for m in r.iter(ns+'mask')]
def sub(parent,idx):
    return [list(parent)[i] for i in idx]
def rng(a,b): return list(range(a,b+1))
LAYERS={
 'sky':   ('bg',[0]),
 'clouds':('bg',rng(1,4)+[50]),
 'far':   ('bg',rng(5,43)),
 'street':('bg',[i for i in rng(44,261) if i!=50]),
 'abby':  ('top',rng(207,375)),
 'cookie':('top',rng(376,451)),
 'zoe':   ('top',rng(452,561)),
 'elmo':  ('top',rng(562,635)),
 'tango': ('top',rng(652,695)),
 'fgback':('top',rng(1,43)+rng(44,206)),
 'fgfront':('top',rng(636,651)+rng(696,914)),
}
def layer_items(name):
    kind,idx=LAYERS[name]
    return (kind,[ (bgk if kind=='bg' else top)[i] for i in idx])
def layer_bbox(name):
    kind,items=layer_items(name)
    bs=[bbox(e) for e in items]; bs=[b for b in bs if b]
    return (min(b[0] for b in bs),min(b[1] for b in bs),max(b[2] for b in bs),max(b[3] for b in bs))
def make_svg(name,vb,px,noclip=False):
    kind,items=layer_items(name)
    x,y,w,h=vb
    root=ET.Element(ns+'svg',{'width':str(round(w*px)),'height':str(round(h*px)),'viewBox':f'{x} {y} {w} {h}','fill':'none'})
    d=ET.SubElement(root,ns+'defs')
    for k in defs: d.append(copy.deepcopy(k))
    for m in masks: d.append(m)
    clip=root if noclip else ET.SubElement(root,ns+'g',{'clip-path':'url(#clip0_2063_2)'})
    if kind=='bg':
        g=ET.SubElement(clip,ns+'g',{'mask':'url(#mask0_2063_2)'})
        for e in items: g.append(copy.deepcopy(e))
    else:
        for e in items: clip.append(copy.deepcopy(e))
    return ET.tostring(root,encoding='unicode')
