import tensorflow as tf
from tensorflow.keras.models import load_model
import os
import cv2
import numpy as np

img = cv2.imread(
    "dragon.jpg",
    cv2.IMREAD_COLOR,
)

if img is None:
    print("Failed to read image file")
else:
    img = tf.convert_to_tensor(img)
    resize = tf.image.resize(img, (244, 244))
    classes = [
        "Couplets",
        "Dragons",
        "Envelopes",
        "FuCharacters",
        "Knots",
        "Lanterns",
        "Mooncakes",
        "PaperCuttings",
        "RiceBalls",
    ]
    new_model = load_model(
        os.path.join(
            "C:\\Users\\nar21\\OneDrive\\Desktop\\One Big Thing Project\\ML Model Stuff\\models",
            "imageclassifier.h5",
        )
    )
    new_model.compile(
        optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    )
    prediction = new_model.predict(np.expand_dims(resize / 244, 0))
    predicted_class = np.argmax(prediction)
    print(classes[predicted_class])
