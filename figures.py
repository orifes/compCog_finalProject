from compCog_finalProject.preprocessing.results_processing import get_rating_vectors, TRAITS
import matplotlib.pyplot as plt
from clustering import load_pickle
from sklearn.decomposition import PCA
import numpy as np
import pandas as pd
import os
import tensorflow.keras as keras

# Plotting an example to the different ratings by different participants
avg_vectors, all_vectors = get_rating_vectors("results")
fig, ax = plt.subplots(1, 2)
for ax_ind, img_ind in enumerate([5, 17]):
    image_ratings = all_vectors[0][img_ind, :]
    for rating in all_vectors[1:]:
        image_ratings = np.row_stack([image_ratings, rating[img_ind, :]])
    a = ax[ax_ind]
    a.scatter([1] * 5, image_ratings[:, 0])
    a.scatter([2] * 5, image_ratings[:, 1])
    a.scatter([3] * 5, image_ratings[:, 2])
    a.scatter([4] * 5, image_ratings[:, 3])
    a.set_ylim((0, 100))
    a.set_ylabel("Rating Scale Units (0-100)")
    a.set_xticks(range(1, 5))
    a.set_xticklabels(TRAITS)
fig.suptitle("Two Examples of Participant's Ratings Differentiation")
plt.show()
# Plotting the mapping to two first principal components dimensions
PCA_DIM = 93
pca = load_pickle("PCA_93.pkl")
pca_coords = load_pickle("pca_coords.pkl")
evr = load_pickle("pca_evr.pkl")
plt.plot(np.arange(PCA_DIM) + 1, evr, '.-')
plt.title('PCA Explained Variance Over Dimension Reduction')
plt.xlabel('Number of Components (the Dimensions of The Data Vectors)')
plt.ylabel('Percentage of Explained Variance out of All of The Variance')
plt.show()
plt.scatter(pca_coords[:, 0], pca_coords[:, 1], c='orange')
plt.title('PCA Mapping')
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.show()

# Plotting comparisons between mappinp of images to the visual latent space and to traits by participants
mean_traits_vectors_df = pd.read_csv("mean_vectors.csv")
som_centers_df = pd.read_csv("som_clusters.csv")

TRAIT_IND = 3
NUM_COLS = ["introExtro", "chipGen", "dumSmart", "badGood"]
TRAITS = ["Introvert\Extrovert", "Miser\Generous", "Unsmart\Smart", "Bad\Good"]


def plot_arrow(fig, pts):
    """Plots an arrow on the given figure between the given points"""
    fig.arrow(pts[0][0], pts[0][1], pts[1][0] - pts[0][0], pts[1][1] - pts[0][1], color="orange", head_width=2,
              length_includes_head=True)


def plot_som_clusters(file_path, sub_plot, trait_ind, title):
    """
    Plots the mean rating value of specific trait for each of the SOM created clusters
    :param file_path: Path to the result file
    :param sub_plot: The sub plot to draw on
    :param trait_ind: The index of the trait to be plotted
    :param title: The title of the sub plot
    :return: The scatter points that was drawn
    """
    participant_df = pd.read_csv(file_path)
    som_df = pd.concat([som_centers_df["som_cluster_x"], som_centers_df["som_cluster_y"], participant_df[NUM_COLS]],
                       axis=1)
    som_df = som_df.groupby(["som_cluster_x", "som_cluster_y"]).mean().reset_index()
    sub_plot.set_title(title, loc='left')
    sub_plot.set_xticks(range(3))
    sub_plot.set_yticks(range(3))
    scatter_points = sub_plot.scatter(som_df["som_cluster_x"], som_df["som_cluster_y"], c=som_df[NUM_COLS[trait_ind]],
                                      s=1500,
                                      cmap="coolwarm", marker="s")
    scatter_points.set_clim(0, 100)
    return scatter_points


def plot_full_som_clusters(trait_ind):
    """
    Plots the SOM cluster mean trait values of each participant and the mean ratings
    :param trait_ind: The index of the trait to be plotted
    """
    fig, ax = plt.subplots(2, 3)
    for i, res_file_path in enumerate(os.listdir("out")):
        r_num = 1 - round(i / 3)
        c_num = i % 3
        title = '{})'.format(chr(97 + r_num * 3 + c_num))
        plot_som_clusters("out/" + res_file_path, ax[r_num][c_num], trait_ind, title)
    scatter_points = plot_som_clusters("all_data.csv", ax[1][2], trait_ind, "f)")
    fig.colorbar(scatter_points)
    fig.suptitle(f"Mapping to SOM Grid and The Human Ratings on {TRAITS[trait_ind]} Scale ")
    plt.show()


def plot_pca_mapping_comparison(file_path, sub_graph, title, visual_pca_coords):
    """
    Plots the coordinates of each image mapping to both visual and trait based principal components
    with an arrow between the point of visual PCs to the point of traits PCs.
    :param file_path: Path to the result file
    :param sub_graph: The sub plot to draw on
    :param title: The title to the sub plot
    :param visual_pca_coords: Ordered coordinates of the first two principal
           components of the encoder latent space
    """
    participant_df = pd.read_csv(file_path)
    participant_rating = participant_df[NUM_COLS].to_numpy()
    pca = PCA(2)
    pca.fit(participant_rating)
    traits_pca_coords = pca.transform(participant_rating)
    coords_pair = list(zip(traits_pca_coords, visual_pca_coords))
    for pair in coords_pair:
        plot_arrow(sub_graph, pair)
    sub_graph.set_title(title, loc='left')
    sub_graph.set_xlabel('PC 1')
    sub_graph.set_ylabel('PC 2')
    sub_graph.scatter(visual_pca_coords[:, 0], visual_pca_coords[:, 1],
                      c="green", s=4)
    sub_graph.scatter(traits_pca_coords[:, 0], traits_pca_coords[:, 1], c='red', s=4)


def plot_full_pca_mapping_comp():
    """
    Plots PCA mapping comparison for each participant and the mean ratings
    """
    fig, ax = plt.subplots(2, 3)
    visual_pca_coords = load_pickle("pca_2.pkl")
    for i, res_file_path in enumerate(os.listdir("out")):
        r_num = 1 - round(i / 3)
        c_num = i % 3
        plot_pca_mapping_comparison("out/" + res_file_path, ax[r_num][c_num], '{})'.format(chr(97 + r_num * 3 + c_num)),
                                    visual_pca_coords)
    plot_pca_mapping_comparison("mean_vectors.csv", ax[1][2], "f)", visual_pca_coords)
    fig.suptitle(
        f"The Relations Between the PCA Coordinates of the Neural "
        f"Network Output and the PCA Coordinates of the Human Ratings")
    plt.show()


def plot_trait_pca_mapping(file_path, sub_graph, trait_ind, title, visual_pca_coords):
    """
    Plots the values of specific trait ratings of each image that represented by the coordinates of the first
    two principal components
    :param file_path: Path to the result file
    :param sub_graph: The sub plot to draw on
    :param trait_ind: The index of the trait to be plotted
    :param title: The title to the sub plot
    :param visual_pca_coords: Ordered coordinates of the first two principal
           components of the encoder latent space
    :return: The scatter points that was drawn
    """
    participant_df = pd.read_csv(file_path)
    participant_rating = participant_df[NUM_COLS].to_numpy()
    scatter_points = sub_graph.scatter(visual_pca_coords[:, 0], visual_pca_coords[:, 1],
                                       c=participant_rating[:, trait_ind],
                                       s=30, cmap="coolwarm")
    sub_graph.set_title(title, loc='left')
    sub_graph.set_xlabel('PC 1')
    sub_graph.set_ylabel('PC 2')
    scatter_points.set_clim(0, 100)
    return scatter_points


def plot_full_trait_pca_mapping(trait_ind):
    """
    Plots the values of specific trait ratings of each image that represented by the coordinates of the first
    two principal components
    :param trait_ind: The index of the trait to be plotted
    :return:
    """
    fig, ax = plt.subplots(2, 3)
    visual_pca_coords = load_pickle("pca_2.pkl")
    for i, res_file_path in enumerate(os.listdir("out")):
        r_num = 1 - round(i / 3)
        c_num = i % 3
        plot_trait_pca_mapping("out/" + res_file_path, ax[r_num][c_num], trait_ind,
                               '{})'.format(chr(97 + r_num * 3 + c_num)),
                               visual_pca_coords)
    scatter_points = plot_trait_pca_mapping("mean_vectors.csv", ax[1][2], trait_ind, "f)", visual_pca_coords)
    fig.colorbar(scatter_points)
    fig.suptitle(
        f"The Relations Between the PCA Coordinates of the Neural Network Output and"
        f" the Human Ratings on {TRAITS[TRAIT_IND]} Scale")
    plt.show()


plot_full_som_clusters(TRAIT_IND)
plot_full_pca_mapping_comp()
plot_full_trait_pca_mapping(TRAIT_IND)
# Plotting the output images by inputting the SOM cluster centers latent vectors to the decoder

SQR_OF_SOM_CLUSTERS_NUM = 3
IMAGE_DIM = (256, 256, 3)
centers = np.array(load_pickle("som_centers.pkl"))
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
decoder = keras.models.load_model("dec.h5")
decoded = decoder.predict(centers)
fig, ax = plt.subplots(SQR_OF_SOM_CLUSTERS_NUM, SQR_OF_SOM_CLUSTERS_NUM)

for i in range(SQR_OF_SOM_CLUSTERS_NUM):
    for j in range(SQR_OF_SOM_CLUSTERS_NUM):
        ax[i, j].imshow(np.reshape(decoded[i * SQR_OF_SOM_CLUSTERS_NUM + j], IMAGE_DIM))
plt.show()
