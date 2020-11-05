import numpy as np
import tensorflow as tf
from tensorflow import keras
import sys


def test_image(d, f):
    class_names = ['Horse', 'No_horse']
    new_model = tf.keras.models.load_model('model/saved_model')
    img_height = 360
    img_width = 640

    file = d + f
    img = keras.preprocessing.image.load_img(
        file, target_size=(img_height, img_width)
    )
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = new_model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    return class_names[np.argmax(score)], 100 * np.max(score)


num_args = len(sys.argv)

if num_args == 3:
    directory = sys.argv[1]
    filename = sys.argv[2]
    test_image(directory, filename)
else:
    print("Usage arg1: Directory arg2: File name")
