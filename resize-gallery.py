import os

from PIL import Image

cur_dir = __file__.rpartition('\\')[0]

list_of_imgs = os.listdir(f'{cur_dir}\\imgs\\gallery')

for img in list_of_imgs:
    if '_thumb' not in img:
        image = Image.open(f'{cur_dir}\\imgs\\gallery\\{img}')
        image.thumbnail((200,200))
        image.save(f'{cur_dir}\\imgs\\gallery\\{img[:-len(os.path.splitext(img)[1])]}_thumb{os.path.splitext(img)[1]}')


