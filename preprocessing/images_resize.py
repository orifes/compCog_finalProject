from glob import glob
from PIL import Image
from tqdm import tqdm
from os import path
# Reducing the original database images's size to the desired dimensions (256*256)

FINAL_SIZE = 256

if __name__ == '__main__':
    to_copy = glob("images/CFD/*/*.jpg")
    for im_path in tqdm(to_copy):
        with open(im_path, "rb") as im_f:
            im = Image.open(im_f)
            w = int(im.size[0] * FINAL_SIZE / im.size[1])
            im = im.resize((w, FINAL_SIZE), Image.ANTIALIAS)
            to_cut = (w - FINAL_SIZE) // 2
            im = im.crop((to_cut, 0, w - to_cut, FINAL_SIZE))
        im.save("all_resized/" + path.basename(im_path))

