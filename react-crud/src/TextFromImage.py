from importlib.resources import path
import os, io
from google.cloud import vision
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
import pandas as pd
import re
import requests

# in the google cloud console, create a service account and download the credentials.json file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'propane-calling-399220-22840ac7b1fb.json'

client = vision.ImageAnnotatorClient()



def detectText(image_url, client=client):
    response = requests.get(image_url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch image from URL: {image_url}")

    # Read the image content
    content = response.content

    # Create an Image object
    image = vision_v1.types.Image(content=content)

    # Send the image to Google Cloud Vision API for text detection
    response = client.text_detection(image=image)

    # Extract and return the detected text annotations
    texts = response.text_annotations
    # with io.open (img, 'rb') as image_file:
    #     content = image_file.read()
    # image = vision_v1.types.Image(content=content)
    # response = client.text_detection(image=image)
    # texts = response.text_annotations

    #create an array of months 3 letter abbreviations in all caps
    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL",
                "AUG", "SEP", "OCT", "NOV", "DEC"]
    month_dict = {months[i]: str(i+1) for i in range(len(months))}
    
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
                if len(texts[i - 1].description) == 2 and len(texts[i + 1].description) >= 4:
                    if texts[i - 1].description.isdigit() and texts[i + 1].description[0:4].isdigit():
                        month = texts[i].description
                        day = texts[i - 1].description
                        year = texts[i + 1].description[0:4]
                        break
            if i + 2 < len(texts): #month day year one
                if len(texts[i + 1].description) == 2 and len(texts[i + 2].description) == 4:
                    if texts[i + 1].description.isdigit() and texts[i + 2].description.isdigit():
                        month = texts[i].description
                        day = texts[i + 1].description
                        year = texts[i + 2].description
                        break
        #check if string contains three letter month:
        if(len(texts[i].description) >= 9):
            if(texts[i].description[2:5] in months):
                month = texts[i].description[2:5]
                day = texts[i].description[0:2]
                year = texts[i].description[5:]
                break
            #if it is in format day.month.year
            if(texts[i].description[2] == "." and texts[i].description[6] == "."):
                #print("HEY!")
                month = texts[i].description[3:6]
                day = texts[i].description[0:2]
                year = texts[i].description[7:11]
                break


        #month/day/year 4 digit year
        pattern = r"^(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])/\d{4}$"
        if re.match(pattern, texts[i].description):
            month = months[ int(texts[i].description[0:2]) - 1]
            day = texts[i].description[3:5]
            year = texts[i].description[6:10]
            break
        #month/day/year 2 digit year
        pattern = r"^(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])/\d{2}$"
        if re.match(pattern, texts[i].description):
            month = months[ int(texts[i].description[0:2]) - 1]
            day = texts[i].description[3:5]
            year = "20" + texts[i].description[6:8] # the 20 needs to be changed every century
            break
    #print(texts) 
    return month_dict[month] + '/' + day + '/' + year





        

print(detectText("blob:http://localhost:3000/6700282f-cd4f-4f14-b551-47c841141cf6"))
#iterate through image path in the folder images
# for filename in os.listdir('./images'):
#     if filename.endswith(".jpg") or filename.endswith(".png"):
#         print(detectText("./images/" + filename))