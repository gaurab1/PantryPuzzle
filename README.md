# PantryPuzzle
35% of commercial food products get expired before they can be consumed. In lines of sustainability, we propose a solution that allows users to automatically keep track of their food products in the fridge, and suggest recipes to utilize them or to donate them to people in need.
Check out our [YouTube demo video](https://www.youtube.com/watch?v=L6nTEobtefs&ab_channel=gaurabdas) and our [Devpost submission](https://devpost.com/software/pantrypuzzle)! 

# How to run

1) Fill in your personal OpenAI API key and React key in the .envs file.
2) pip install flask, pandas, google-cloud-vision, firebase_admin, flask_cors
3) cd into server, and run python server.py. This is the image input webpage, and if you want to upload an image you can do so in this link.
4) Open another terminal, cd into react_crude and run python app.py
5) Open another terminal, cd into react_crude and run npm install. Then run npm start. This is the main website!
