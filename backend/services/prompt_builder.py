import ollama

from services.character_memory import get_character_profile


def build_prompts(scenes):

    prompts=[]

    character=get_character_profile()


    name=character.get(
        "name",
        "Story Hero"
    )

    appearance=character.get(
        "appearance",
        "storybook character"
    )

    outfit=character.get(
        "outfit",
        "adventure clothes"
    )

    accessory=character.get(
        "accessory",
        ""
    )


    for scene in scenes:

        prompt=f"""

Create ONE Stable Diffusion prompt.

IMPORTANT RULES:

1. Keep SAME character appearance in every scene.

Character:

Name:
{name}

Appearance:
{appearance}

Outfit:
{outfit}

Accessory:
{accessory}

Scene:

{scene}

Generate ONLY image prompt.

Format:

{name},

{appearance},

wearing {outfit},

holding {accessory},

[action from scene],

[environment from scene],

fantasy storybook illustration,

Disney Pixar style,

cinematic lighting,

ultra detailed,

children book art

NO explanation.

NO markdown.

ONLY prompt.

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

        text=text.replace(
            "\n",
            " "
        ).strip()

        prompts.append(
            text
        )


    return prompts