import ollama
import re


def extract_scenes(story):

    prompt = f"""

Split this story into EXACTLY 5 chronological storyboard scenes.

Rules:

Scene 1 = beginning

Scene 2 = investigation / journey starts

Scene 3 = middle event

Scene 4 = climax

Scene 5 = ending

Return ONLY:

Scene 1:
...

Scene 2:
...

Scene 3:
...

Scene 4:
...

Scene 5:
...

Story:

{story}

"""

    response = ollama.chat(

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

    text = response["message"]["content"]


    scenes = re.split(

        r"Scene \d+:",

        text

    )


    scenes = [

        s.strip()

        for s in scenes

        if s.strip()

    ]


    while len(scenes)<5:

        scenes.append(
            "Story continuation"
        )


    return scenes[:5]