from importlib.resources import path
import os, io
from google.cloud import vision
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
import pandas as pd

# in the google cloud console, create a service account and download the credentials.json file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./react-crud/src/propane-calling-399220-22840ac7b1fb.json'

client = vision.ImageAnnotatorClient()

def detectText(img):
    with io.open (img, 'rb') as image_file:
        content = image_file.read()
    image = vision_v1.types.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    #create an array of months 3 letter abbreviations in all caps
    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL",
                "AUG", "SEP", "OCT", "NOV", "DEC"]
    
    #print each thing in texts
    #find something related to BEST BY or BES BY or EXPIRY, and get the date that comes after it
    
    #loop through the texts, find part where text says BEST and BY. just return the strings including
    #that, and after it:
    
    #this is what we want to do:
    #loop through the texts, find the element that says a month by checking of months[i] is in the text.
    #once we do that, get the date and year. 

    month = ""
    day = ""
    year = ""

    for i in range(len(texts)):
        if texts[i].description in months:
            if i + 1 < len(texts) and i - 1 >= 0: #day month year
                #check if i - 1 is a two digit number and
                #check if i + 1 is a four digit number. if so
                #check both lenght and that they are numbers
                if len(texts[i - 1].description) == 2 and len(texts[i + 1].description) == 4:
                    if texts[i - 1].description.isdigit() and texts[i + 1].description.isdigit():
                        month = texts[i].description
                        day = texts[i - 1].description
                        year = texts[i + 1].description
                        break
            if i + 2 < len(texts): #month day year one
                if len(texts[i + 1].description) == 2 and len(texts[i + 2].description) == 4:
                    if texts[i + 1].description.isdigit() and texts[i + 2].description.isdigit():
                        month = texts[i].description
                        day = texts[i + 1].description
                        year = texts[i + 2].description
                        break
        #alternatively, check if text is in format month/day/year:
    print("Month: " + month)
    print("Day: " + day)
    print("Year: " + year)





        


image = './images/mandarin4.jpg'
print(detectText(image))