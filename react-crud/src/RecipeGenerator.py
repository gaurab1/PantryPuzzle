import re
import os
import openai




def generate_recipe():
    openai.api_key = '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'
    #openai.api_key = os.getenv("OPENAI_API_KEY")
    p = "All using Food, Create a list of recipes, each with a title, description, and ingredients."
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=p,
        temperature=0.9,
        max_tokens=2000,
        top_p=1,
    )
    #loop through and print each recipe
    for i in range(len(response.choices)):
        print(response.choices[i].text)
    return response.choices[0].text

if __name__ == "__main__":
    generate_recipe()