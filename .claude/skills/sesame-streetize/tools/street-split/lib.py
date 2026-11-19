import xml.etree.ElementTree as ET,re
ns='{http://www.w3.org/2000/svg}'
ET.register_namespace('','http://www.w3.org/2000/svg')
import os
SRC=os.environ.get('STREET_SVG','/Users/robsonlopes/Downloads/street.svg')
num=re.compile(r'-?\d*\.?\d+(?:e-?\d+)?')
def pbbox(d):
    xs=[];ys=[]
    for m in re.finditer(r'([MLHVCZ])([^MLHVCZ]*)',d):
        c=m.group(1); v=[float(x) for x in num.findall(m.group(2))]
        if c in 'ML': xs+=v[0::2]; ys+=v[1::2]
        elif c=='C': xs+=v[0::2]; ys+=v[1::2]
        elif c=='H': xs+=v
        elif c=='V': ys+=v
    return (min(xs),min(ys),max(xs),max(ys)) if xs and ys else None
def bbox(e):
    bs=[]
    if e.tag==ns+'path':
        b=pbbox(e.get('d','')); return b
    for k in e:
        b=bbox(k)
        if b: bs.append(b)
    if not bs: return None
    return (min(b[0] for b in bs),min(b[1] for b in bs),max(b[2] for b in bs),max(b[3] for b in bs))
def load():
    r=ET.parse(SRC).getroot()
    return r
