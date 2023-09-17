from flask import Flask, request
from flask_cors import CORS
import re
import os
import openai
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)

@app.route('/recipe', methods=['POST'])
def generate_recipe():
    data = request.get_json()

    recipe = data['foodItem']
    print(recipe)
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")
    #openai.api_key = os.getenv("OPENAI_API_KEY")
    p = "All using " + recipe + ", Create a list of recipes, each with a title, description, and ingredients."
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=p,
        temperature=0.9,
        max_tokens=2000,
        top_p=1,
    )
    #loop through and print each recipe
    stringParagraph = ""
    for i in range(len(response.choices)):
        stringParagraph = stringParagraph + response.choices[i].text
    return stringParagraph

@app.route('/create', methods=['POST'])
def index():
    data = request.get_json()
    print("Hello")
    print(data)
    return 'Hello World!'

@app.route('/images', methods=['POST'])
def images():
    data = request.get_json()
    print("Hello")
    print(data)
    return 'Hello World!'
    

#create a default / route that returns hello world
@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=False, port=3001)

