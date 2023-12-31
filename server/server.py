import os
import sys
import random
sys.path.append('../react-crud/src/')
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from TextFromImage import detectText
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('lol.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()
doc_ref = db.collection("test_data").document('random' + str(random.randint(0, 10000)))
UPLOAD_FOLDER = '../images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods = ['GET','POST'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print(detectText(os.path.join(app.config['UPLOAD_FOLDER'], filename)))
            food, expiry = detectText(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            doc_ref.set({"food": food, "expirationDate": expiry})
            return redirect(url_for('upload_file',
                                    filename=filename))
    return '''
    <!doctype html>
    <title>Upload New Image</title>
    <h1>Upload New Image</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''


if __name__ == "__main__":
    app.run(debug=True)