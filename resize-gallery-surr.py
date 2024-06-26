"""Gallery thumbnail creator

Simple script to take the images from the gallery on the website and 
create a set of thumbnail images that are pushed to the gallery-surr/thumbs
folder, in a max 200px resolution to optimize load times. Is meant to 
be run every time images are added to the gallery.

This tool accepts .png and .jpeg files. 

This script requires that `Pillow` version 9.5.0 be installed within the Python
environment you are running this script in. ( pip install Pillow==9.5.0 )

This file is not intended to be imported as a module.
"""
import colorsys
import math
import os
import shutil

from imagedominantcolor import DominantColor
from PIL import Image, ImageOps

cur_dir = __file__.rpartition('\\')[0]
            
thumbs_folder = f'{cur_dir}\\imgs\\gallery-surr\\thumbs\\'
pages_folder = f'{cur_dir}\\imgs\\gallery-surr\\pages\\'
count = 0
for filename in os.listdir(thumbs_folder):
    file_path = os.path.join(thumbs_folder, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
        #print(f"removed {count}/{len(os.listdir(thumbs_folder))}  {filename} from {thumbs_folder})", end="\r")
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))

count = 0
for filename in os.listdir(pages_folder):
    
    file_path = os.path.join(pages_folder, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
        #print(f"removed {count}/{len(os.listdir(pages_folder))}  {filename} from {pages_folder})", end="\r")
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))


list_of_imgs = os.listdir(f'{cur_dir}\\imgs\\gallery-surr')
list_of_imgs = [elm for elm in list_of_imgs if '.' in elm]

def step(r,g,b, repetitions=1):
    lum = math.sqrt( .241 * r + .691 * g + .068 * b )

    h, s, v = colorsys.rgb_to_hsv(r,g,b)

    h2 = int(h * repetitions)
    lum2 = int(lum * repetitions)
    v2 = int(v * repetitions)
    if h2 % 2 == 1:
        v2 = repetitions - v2
        lum = repetitions - lum
    return (h2, lum, v2)

sorted = []

count = 0
for img in list_of_imgs:
    #print(DominantColor(f'{cur_dir}\\imgs\\gallery-surr\\{img}').rgb)
    #sorted.append([DominantColor(f'{cur_dir}\\imgs\\gallery-surr\\{img}').rgb, img])
    sorted.append((DominantColor(f'{cur_dir}\\imgs\\gallery-surr\\{img}').rgb, img))
    #print(f"detected main color of {count}/{list_of_imgs}  {img}", end="\r")


sorted.sort(key=lambda  r_g_b: step(r_g_b[0][0], r_g_b[0][1], r_g_b[0][2], 8) )





for i in range(len(sorted)):
    if '.' in sorted[i][1]:  
        print(f"checking image ({i+1}/{len(sorted)})", end="\r")
        if(i==0):
            prev_img = f'{len(sorted) - 1}_{sorted[i-1][1]}'
        else:
            prev_img = f'{i-1}_{sorted[i-1][1]}'
        try:
            next_img = f'{i+1}_{sorted[i+1][1]}'
        except IndexError:
            next_img = f'{0}_{sorted[0][1]}'

        f = open(f'{cur_dir}\\imgs\\gallery-surr\\pages\\{i}_{sorted[i][1]}.html', 'w')
        f.write(
f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>gallery</title>
<link type="image/png" sizes="120x120" rel="icon" href="../../socialicons/nokkenlogo.png">
<meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
<link rel="stylesheet" href="../../../css/gallery.css">
</head>
<body>
<a href="../../../index.html"><div id="backbutton"><-</div></a>
<main>
<img id="img-bg" src="https://raw.githubusercontent.com/dual-shock/dual-shock.github.io/main/imgs/gallery-surr/thumbs/{i}_{sorted[i][1]}" alt="why no here">   
<div id="fg-container">
<img id="img-fg" src="https://raw.githubusercontent.com/dual-shock/dual-shock.github.io/main/imgs/gallery-surr/{sorted[i][1]}" alt="why no here">
</div>
<a href="{prev_img}.html" id="clickleft"><</a>        
<a href="{next_img}.html" id="clickright">></a>
</main>
</body>
<script>

</script>
</html>""")

        image = Image.open(f'{cur_dir}\\imgs\\gallery-surr\\{sorted[i][1]}')
        image = ImageOps.exif_transpose(image)  #correct quirk with images 
                                                #not rotating correctly
        image.thumbnail((400,400))
        image.save(f'{cur_dir}\\imgs\\gallery-surr\\thumbs\\{i}_{sorted[i][1]}')




