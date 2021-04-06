from imageio import imread
from tqdm import tqdm
from os import listdir
import numpy as np
import tensorflow.keras as keras
import os

# Saving the latent vectors of all the relevant images

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
encoder = keras.models.load_model("enc.h5")
decoder = keras.models.load_model("dec.h5")
labels = listdir("exp_pics")
raw_images = []
for im in tqdm(labels):
    raw_images.append(np.array(imread("exp_pics/" + im)) / 255)
shape = raw_images[0].shape
to_cluster = np.reshape(raw_images, (len(raw_images), shape[0], shape[1], shape[2]))
latents = encoder.predict(to_cluster)

import pickle as pkl

with open("latents.pkl", "wb") as f:
    pkl.dump(latents, f)
with open("lables.pkl", "wb") as f:
    pkl.dump(labels, f)
