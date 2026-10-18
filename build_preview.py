import json,base64,re,mimetypes
from pathlib import Path
root=Path(__file__).resolve().parent
data=json.loads((root/'.ktcc-raw-items.json').read_text())
# Keep listing URLs unchanged, embed each media file once in ASSETS mapping to avoid massive duplicated Base64.
assetpaths={x['image'] for x in data}
assetpaths.update('/visuals/hero-'+k+'.webp' for k in ['discover','market','digital','creators','events','startups','spaces','future','stories','impact'])
assets={}
for x in assetpaths:
    f=root/'public'/x.lstrip('/')
    mime=mimetypes.guess_type(str(f))[0] or 'application/octet-stream'
    assets[x]=f'data:{mime};base64,'+base64.b64encode(f.read_bytes()).decode('ascii')
css=(root/'app/globals.css').read_text()
css=css.replace('@tailwind base;','').replace('@tailwind components;','').replace('@tailwind utilities;','')
hero='data:image/svg+xml;base64,'+base64.b64encode((root/'public/visuals/hero-kutim.svg').read_bytes()).decode('ascii')
css=css.replace("url('/visuals/hero-kutim.svg')", "url('"+hero+"')")
logo='data:image/webp;base64,'+base64.b64encode((root/'public/brand/ktcc-logo.webp').read_bytes()).decode('ascii')
template=(root/'preview-template.html').read_text()
html=template.replace('__CSS__',css).replace('__DATA__',json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')).replace('__ASSETS__',json.dumps(assets,ensure_ascii=False,separators=(',',':'))).replace('__HERO__',hero).replace('__LOGO__',logo).replace('__CECE_HERO__','data:image/png;base64,'+base64.b64encode((root/'public/mascot/cece-hero.png').read_bytes()).decode('ascii')).replace('__CECE_ABOUT__','data:image/png;base64,'+base64.b64encode((root/'public/mascot/cece-about.png').read_bytes()).decode('ascii')).replace('__CECE_POSTER__','data:image/png;base64,'+base64.b64encode((root/'public/mascot/cece-poster.png').read_bytes()).decode('ascii'))
path=root/'KTCC_Interactive_Preview.html';path.write_text(html)
print('Preview created',str(path),f'{path.stat().st_size/1024:.1f} KB')
