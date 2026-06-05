from reportlab.platypus import *

from reportlab.lib.styles import getSampleStyleSheet


def export_storybook(

story,

scenes,

images

):

    output="storybook.pdf"

    doc=SimpleDocTemplate(
        output
    )

    styles=getSampleStyleSheet()

    elements=[]


    elements.append(

        Paragraph(

        "StoryVerse AI Storybook",

        styles["Title"]

        )

    )

    elements.append(

        Spacer(
            1,
            20
        )

    )


    elements.append(

        Paragraph(

        story,

        styles["BodyText"]

        )

    )


    for i in range(

        len(scenes)

    ):

        elements.append(

        Spacer(
            1,
            20
        )

        )

        elements.append(

            Paragraph(

            f"Scene {i+1}",

            styles["Heading1"]

            )

        )

        elements.append(

            Paragraph(

            scenes[i],

            styles["BodyText"]

            )

        )

        if i<len(images):

            elements.append(

            Image(

            images[i],

            width=300,

            height=300

            )

            )


    doc.build(
        elements
    )

    return output