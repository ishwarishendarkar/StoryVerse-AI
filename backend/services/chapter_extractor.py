import re

def extract_chapters(story):

    paragraphs = re.split(r"\n\s*\n", story)

    chapters = []

    current = ""

    MAX_CHAPTER_SIZE = 4000

    for para in paragraphs:

        if len(current) + len(para) > MAX_CHAPTER_SIZE:

            chapters.append(current)

            current = para

        else:

            current += "\n\n" + para

    if current:

        chapters.append(current)

    return chapters

'''import re


def extract_chapters(story):

    chapters=[]


    pattern=r"(Chapter\s+\d+.*?)(?=Chapter\s+\d+|$)"


    matches=re.findall(

        pattern,

        story,

        re.DOTALL | re.IGNORECASE

    )


    if matches:

        return matches


    # fallback

    parts=story.split("\n\n")


    chunk_size=1500


    current=""


    for part in parts:

        current+=part+" "


        if len(current)>chunk_size:

            chapters.append(
                current
            )

            current=""


    if current:

        chapters.append(
            current
        )


    return chapters
'''