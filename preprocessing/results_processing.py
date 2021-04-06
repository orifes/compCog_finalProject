import pandas as pd
import numpy as np
import os

ids_df = pd.read_csv("ids.csv")
NUMERICAL_COL_NAMES = ["introExtro", "chipGen", "dumSmart", "badGood"]
TRAITS = ["Introvert\Extrovert", "Miser\Generous", "Unsmart\Smart", "Bad\Good"]
COLS_NEEDED = ["name"] + NUMERICAL_COL_NAMES


def get_rating_from_file(file_path):
    """
    Extracting the scale ratings from the experiment plotted raw results file
    :param file_path: The path of the result file
    :return: Numpy array containing the image ratings ordered by image name
    """
    df = pd.read_csv(file_path)
    df = df.sort_values(by=["id"])
    df = pd.merge(df, ids_df)
    df[COLS_NEEDED].to_csv("out/" + os.path.basename(file_path))
    return df[NUMERICAL_COL_NAMES].to_numpy()


IM_NUM, TRAITS_NUM = 33, 4


def get_rating_vectors(dir_name):
    """
    Extracting all the ratings from the given directory
    :param dir_name: The name of the results directory
    :return: An array with each image average ratings from all files,
             and a list with each file ratings
    """
    ratings_sum = np.zeros((IM_NUM, TRAITS_NUM))
    ratings = []
    files = os.listdir(dir_name)
    for file_path in files:
        cur_rate = get_rating_from_file(os.path.join(dir_name, file_path))
        ratings_sum += cur_rate
        ratings.append(cur_rate)
    return ratings_sum / len(files), ratings


avg_vectors, all_vectors = get_rating_vectors("results")
