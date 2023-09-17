import requests

path = r'C:\Users\gaura\Downloads\hackmit\images\quasadilla.jpg'
x = requests.post('https://api.spoonacular.com/food/images/classify?&apiKey=99f9daa54aae4bf587f31efcf558bc20', path)
print(x)
