from sklearn.decomposition import PCA
import pandas as pd
from popsom.popsom import map
import pickle


# Running the unsupervised algorithms on the encoder latent space

def save_pickle(to_save, file_name):
    with open(file_name, "wb") as f:
        pickle.dump(to_save, f)


def load_pickle(file_name):
    with open(file_name, "rb") as f:
        return pickle.load(f)


RUN_PCA = True
RUN_SOM = False
COL_SEP = ","
ROW_SEP = "\n"

if __name__ == '__main__':
    mini_set_labels = load_pickle("set_labels.pkl")
    latents = load_pickle("latents.pkl")
    latents_df = pd.DataFrame(latents)
    labels = load_pickle("labels.pkl")
    mini_set_indices = [i for i in range(len(labels)) if labels[i] in mini_set_labels]
    SQR_N = 3
    N = SQR_N * SQR_N
    if RUN_SOM:
        # Running the self organizing map algorithm on the latent vectors
        som = map(SQR_N, SQR_N)
        som.fit(latents_df, labels)
        som_clusters = som.projection()
        save_pickle(som, "som.pkl")
        # Getting each cluster prototype latent vector and saving it
        centers = []
        for i in range(SQR_N):
            for j in range(SQR_N):
                centers.append(som.neuron(i, j))
        save_pickle(centers, "som_centers.pkl")

        with open("som_clusters.csv", "w") as f:
            f.write(COL_SEP.join(["ind", "name", "som_cluster_x", "som_cluster_y", ROW_SEP]))
            for j in range(len(labels)):
                if labels[j] in mini_set_labels:
                    f.write(COL_SEP.join(
                        [str(j), labels[j], str(som_clusters["x"].iloc[j]), str(som_clusters["y"].iloc[j]), ROW_SEP]))

    if RUN_PCA:
        # Running the PCA algorithm and saving the coordinates by the first two components
        PCA_DIM = 93
        pca = PCA(PCA_DIM)
        pca_coords = pca.fit_transform(latents)
        save_pickle(pca_coords[mini_set_indices, :], f"pca_{PCA_DIM}.pkl")
        save_pickle(pca.components_, "pcaComponents.pkl")
        evr = pca.explained_variance_ratio_.cumsum() * 100
        save_pickle(pca_coords, "pca_coords.pkl")
        save_pickle(evr, "pca_evr.pkl")
        # Printing the value of explained variance by the first two principal components
        print(evr[1])

