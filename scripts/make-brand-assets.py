# One-off: generate favicons and Open Graph image from the extracted logo mark.
from PIL import Image, ImageDraw, ImageFont, ImageOps
mark = Image.open('assets-src/brand/nissi-logo-mark.png').convert('RGBA')
PAPER = (246, 244, 239); OCEAN = (14, 39, 65); CRIMSON = (163, 36, 47); TEAL = (47, 90, 87)
SERIF = 'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2'
SANS = 'node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2'

def fit(im, size, pad=0.08, bg=None):
    s = int(size * (1 - 2 * pad))
    m = im.copy(); m.thumbnail((s, s), Image.LANCZOS)
    c = Image.new('RGBA', (size, size), bg or (0, 0, 0, 0))
    c.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return c

fit(mark, 32, 0.02).save('public/favicon-32.png')
fit(mark, 16, 0.0).save('public/favicon-16.png')
fit(mark, 180, 0.12, PAPER + (255,)).convert('RGB').save('public/apple-touch-icon.png')
fit(mark, 192, 0.1, PAPER + (255,)).save('public/icon-192.png')
fit(mark, 512, 0.1, PAPER + (255,)).save('public/icon-512.png')
fit(mark, 48, 0.02).save('public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
# web logo assets
m = mark.copy(); m.thumbnail((256, 256), Image.LANCZOS); m.save('public/brand/nissi-logo-mark-256.png')
m = mark.copy(); m.thumbnail((640, 640), Image.LANCZOS); m.save('public/brand/nissi-logo-mark-640.png')

# Open Graph 1200x630
W, H = 1200, 630
og = Image.new('RGB', (W, H), PAPER)
photo = Image.open('assets-src/photos/pl-rearing-hall.jpg').convert('RGB')
photo = ImageOps.fit(photo, (560, H), Image.LANCZOS, centering=(0.5, 0.55))
og.paste(photo, (W - 560, 0))
d = ImageDraw.Draw(og)
lm = mark.copy(); lm.thumbnail((120, 120), Image.LANCZOS)
og.paste(lm, (72, 70), lm)
f_name = ImageFont.truetype(SERIF, 64); f_name.set_variation_by_axes([600])
f_sub = ImageFont.truetype(SANS, 30); f_sub.set_variation_by_axes([400])
f_small = ImageFont.truetype(SANS, 24); f_small.set_variation_by_axes([600])
d.text((72, 230), 'Nissi Hatcheries', font=f_name, fill=OCEAN)
d.text((72, 320), 'Quality shrimp seed. Built on trust.', font=f_sub, fill=TEAL)
d.line((72, 395, 500, 395), fill=(205, 199, 188), width=2)
d.text((72, 420), 'CAA REG. NO. 56-9(179)/2022', font=f_small, fill=CRIMSON)
d.text((72, 460), 'Ponnada, U. Kothapalli Mandal', font=f_sub, fill=(60, 70, 78))
d.text((72, 500), 'Kakinada District, Andhra Pradesh', font=f_sub, fill=(60, 70, 78))
og.save('public/og-image.jpg', quality=88)
print('done')
