# Import Tensorflow and other Libraries
import numpy as np
import os
import tensorflow as tf
from tensorflow import keras
# Global Variables
class_names = ['Horse', 'No_horse']
new_model = tf.keras.models.load_model('model/saved_model')
img_height = 360
img_width = 640


def test_image(directory, file):
    file = directory + '\\' + file
    img = keras.preprocessing.image.load_img(
        file, target_size=(img_height, img_width)
    )
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = new_model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
            .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    return


directory = r"C:\Users\chase\Desktop\Capstone\Images\Val_v2\Occupied"
for filename in os.listdir(directory):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        test_image(directory, filename)
    else:
        continue
