from diffusers import StableDiffusionPipeline
import torch
import os


pipe=None


def get_pipe():

    global pipe

    if pipe is None:

        device=(

            "cuda"

            if torch.cuda.is_available()

            else "cpu"

        )

        print(
            f"Loading on {device}"
        )

        pipe=StableDiffusionPipeline.from_pretrained(

            "runwayml/stable-diffusion-v1-5",

            torch_dtype=(

                torch.float16

                if device=="cuda"

                else torch.float32

            )

        )

        pipe=pipe.to(device)


        if device=="cpu":

            pipe.enable_attention_slicing()


    return pipe



os.makedirs(

"generated",

exist_ok=True

)



def generate_images(

prompts,

style="Disney Pixar",

quality="Balanced",

scene_count=5

):

    model=get_pipe()

    image_paths=[]

    prompts=prompts[:scene_count]


    # SPEED OPTIMIZATION

    steps=20

    guidance=8

    size=512


    if quality=="Fast":

        steps=10

        size=512


    elif quality=="High":

        steps=30

        size=640


    style_map={


"Disney Pixar":

"""

Disney Pixar movie frame,

3d animated storybook,

cinematic lighting,

children illustration

""",



"Anime":

"""

Studio Ghibli style,

anime story illustration,

Makoto Shinkai scenery,

beautiful anime background

""",



"Watercolor":

"""

storybook watercolor painting,

soft brush strokes

""",



"Comic":

"""

graphic novel illustration,

comic artwork

"""

}


    style_prompt=style_map.get(

        style,

        ""

    )


    consistency_prompt="""

same character,

same face,

same clothes,

same hairstyle

"""


    negative_prompt="""

blurry,

low quality,

duplicate body,

extra limbs,

bad anatomy,

toy character,

chibi,

watermark

"""


    for i,prompt in enumerate(

    prompts

    ):

        final_prompt=f"""

{prompt}

STYLE:

{style_prompt}

{consistency_prompt}

masterpiece

high quality

storybook composition

"""


        image=model(

            prompt=final_prompt,

            negative_prompt=negative_prompt,

            num_inference_steps=steps,

            guidance_scale=guidance,

            height=size,

            width=size

        ).images[0]


        path=f"generated/scene_{i+1}.png"

        image.save(path)

        image_paths.append(path)


    return image_paths