"""Gallery thumbnail creator

Simple script to take the images from the gallery on the website and 
create a set of thumbnail images that are pushed to the gallery/thumbs
folder, in a max 200px resolution to optimize load times. Is meant to 
be run every time images are added to the gallery.

This tool accepts .png and .jpeg files. 

This script requires that `Pillow` be installed within the Python
environment you are running this script in.

This file is not intended to be imported as a module.
"""
import os

from PIL import Image, ImageOps

cur_dir = __file__.rpartition('\\')[0]
            
list_of_imgs = os.listdir(f'{cur_dir}\\imgs\\gallery')
list_of_imgs = [elm for elm in list_of_imgs if '.' in elm]

for i in range(len(list_of_imgs)):
    if '.' in list_of_imgs[i]:
        prev_img = list_of_imgs[i-1]
        if i != len(list_of_imgs) - 1:
            next_img = list_of_imgs[i+1]
        else:
            next_img = list_of_imgs[0]

        f = open(f'{cur_dir}\\imgs\\gallery\\pages\\{list_of_imgs[i]}.html', 'w')
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
<img id="img-bg" src="https://raw.githubusercontent.com/dual-shock/dual-shock.github.io/main/imgs/gallery/thumbs/{list_of_imgs[i]}" alt="why no here">   
<div id="fg-container">
<img id="img-fg" src="https://raw.githubusercontent.com/dual-shock/dual-shock.github.io/main/imgs/gallery/{list_of_imgs[i]}" alt="why no here">
</div>
<a href="{prev_img}.html" id="clickleft"><</a>        
<a href="{next_img}.html" id="clickright">></a>
</main>
</body>
</html>""")

        image = Image.open(f'{cur_dir}\\imgs\\gallery\\{list_of_imgs[i]}')
        image = ImageOps.exif_transpose(image)  #correct quirk with images 
                                                #not rotating correctly
        image.thumbnail((400,400))
        image.save(f'{cur_dir}\\imgs\\gallery\\thumbs\\{list_of_imgs[i]}')




