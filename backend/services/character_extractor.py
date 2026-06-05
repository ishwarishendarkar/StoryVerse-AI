import ollama
import json
import re


def extract_character(story):

    prompt=f"""

Analyze this story.

Extract MAIN character information.

Return ONLY JSON.

Example:

{{
"name":"Mira",
"appearance":"young pirate girl with black hair",
"outfit":"pirate coat",
"accessory":"gold compass",
"environment":"ocean adventure"
}}

Story:

{story}

"""

    response=ollama.chat(

        model="llama3",

        options={
            "temperature":0
        },

        messages=[

            {
                "role":"user",
                "content":prompt
            }

        ]

    )


    text=response["message"]["content"]


    print(
        text
    )


    # find json block

    match=re.search(

        r"\{.*\}",

        text,

        re.DOTALL

    )


    if match:

        try:

            return json.loads(

                match.group()

            )

        except:

            pass


    return {

        "name":"Story Hero",

        "appearance":"storybook character",

        "outfit":"adventure clothes",

        "accessory":"",

        "environment":"storybook world"

    }