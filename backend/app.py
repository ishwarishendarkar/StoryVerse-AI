from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from services.pdf_processor import extract_pdf_text
from services.scene_extractor import extract_scenes
from services.prompt_builder import build_prompts
from services.image_generator import generate_images
from services.pdf_exporter import export_storybook

from services.character_extractor import extract_character
from services.character_memory import set_character_profile

from services.chapter_extractor import extract_chapters

import os


app = FastAPI()


# ---------------- CORS ----------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# ---------------- FOLDERS ----------------

UPLOAD_FOLDER = "uploads"

os.makedirs(

    UPLOAD_FOLDER,

    exist_ok=True

)

os.makedirs(

    "generated",

    exist_ok=True

)


# ---------------- STATIC ----------------

app.mount(

    "/generated",

    StaticFiles(

        directory="generated"

    ),

    name="generated"

)


# ---------------- REQUEST MODELS ----------------

class PromptRequest(

    BaseModel

):

    prompts:list[str]

    style:str="Disney Pixar"

    quality:str="Balanced"

    sceneCount:int=5



class ExportRequest(

    BaseModel

):

    story:str

    scenes:list[str]

    images:list[str]



class ChapterRequest(

    BaseModel

):

    chapter:str


# ---------------- HOME ----------------

@app.get("/")

def home():

    return {

        "message":

        "StoryVerse Backend Running"

    }


# ---------------- UPLOAD ----------------

@app.post("/upload")

async def upload_story(

    file:UploadFile=File(...)

):

    path=os.path.join(

        UPLOAD_FOLDER,

        file.filename

    )


    with open(

        path,

        "wb"

    ) as f:

        content=await file.read()

        f.write(

            content

        )


    # STORY

    story=extract_pdf_text(

        path

    )
    print("=" * 50)
    print("Story length:", len(story))
    print("First 500 chars:")
    print(story[:500])
    print("=" * 50)

    # CHAPTERS

    chapters=extract_chapters(

        story

    )


    selected_story=None

    character=None

    scenes=[]

    prompts=[]


    # SMALL STORY

    if len(chapters)<=1:

        selected_story=story


        character=extract_character(

            selected_story

        )


        set_character_profile(

            character

        )


        scenes=extract_scenes(

            selected_story

        )


        MAX_SCENES=5

        if len(scenes)>MAX_SCENES:

            scenes=scenes[:MAX_SCENES]


        prompts=build_prompts(

            scenes

        )


    return {

        "story":

        selected_story,


        "chapters":

        chapters,


        "character":

        character,


        "scenes":

        scenes,


        "prompts":

        prompts

    }


# ---------------- CHAPTER PROCESSING ----------------

@app.post(

"/chapter"

)

def process_chapter(

data:ChapterRequest

):

    character=extract_character(

        data.chapter

    )


    set_character_profile(

        character

    )


    scenes=extract_scenes(

        data.chapter

    )


    MAX_SCENES=5

    if len(scenes)>MAX_SCENES:

        scenes=scenes[:MAX_SCENES]


    prompts=build_prompts(

        scenes

    )


    return {

        "character":

        character,


        "scenes":

        scenes,


        "prompts":

        prompts

    }


# ---------------- GENERATE ----------------

@app.post("/generate")

def generate_storyboard(

    data:PromptRequest

):

    print(

        data.style

    )


    images=generate_images(

        prompts=data.prompts,

        style=data.style,

        quality=data.quality,

        scene_count=data.sceneCount

    )


    return {

        "images":

        images

    }


# ---------------- EXPORT ----------------

@app.post("/export")

def export_pdf(

    data:ExportRequest

):

    file=export_storybook(

        data.story,

        data.scenes,

        data.images

    )


    return {

        "file":

        file

    }