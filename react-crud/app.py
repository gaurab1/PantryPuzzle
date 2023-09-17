from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    app.run(debug=True, port=3001)

