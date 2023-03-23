import pickle
import pandas as pd
import numpy as np
from flask import Flask
from flask import request
from flask_cors import cross_origin
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)


@app.route('/api/input', methods=["POST"])
@cross_origin()
def post_input():
    # Load model and data
    f = open('my_model.pkl', 'rb')
    mod = pickle.load(f)
    path = 'Sinhala_Singlish_Hate_Speech.csv'
    df = pd.read_csv(path)
    df = df.rename(columns={'Phrase': 'text', 'IsHateSpeech': 'label'})
    df = df.groupby('label').head(1000)
    df['label'] = df['label'].map({'YES': 'Hate Speech', 'NO': 'Non-Hate Speech'})

    # Get input text from user
    input_text = request.json.get('text')

    # Make prediction
    tfidf = TfidfVectorizer()
    tfidf.fit_transform(df['text'])
    text_features = tfidf.transform([input_text])
    predictions = mod.predict(text_features)
    final_prediction = np.array(predictions)
    return final_prediction.tolist()


if __name__ == '__main__':
    app.run()
