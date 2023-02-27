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
list_of_thumbs = os.listdir(f'{cur_dir}\\imgs\\gallery\\thumbs')

for img in list_of_imgs:
    if '.' in img and img not in list_of_thumbs:
        print(img)
        image = Image.open(f'{cur_dir}\\imgs\\gallery\\{img}')
        image = ImageOps.exif_transpose(image)  #correct quirk with images 
                                                #not rotating correctly
        image.thumbnail((200,200))
        image.save(f'{cur_dir}\\imgs\\gallery\\thumbs\\{img}')


