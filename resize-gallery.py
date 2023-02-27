import os

from PIL import Image, ImageOps

cur_dir = __file__.rpartition('\\')[0]

list_of_imgs = os.listdir(f'{cur_dir}\\imgs\\gallery')
list_of_thumbs = os.listdir(f'{cur_dir}\\imgs\\gallery\\thumbs')

for img in list_of_imgs:
    if '.' in img and img not in list_of_thumbs:
        print(img)
        image = Image.open(f'{cur_dir}\\imgs\\gallery\\{img}')
        image = ImageOps.exif_transpose(image)
        image.thumbnail((200,200))
        image.save(f'{cur_dir}\\imgs\\gallery\\thumbs\\{img}')


