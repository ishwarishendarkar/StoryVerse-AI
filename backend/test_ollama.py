import ollama

response = ollama.chat(
    model="llama3",
    options={"temperature": 0},
    messages=[
        {
            "role": "user",
            "content": "Extract the main character from this story: A young pirate girl named Mira sailed the ocean."
        }
    ]
)

print(response["message"]["content"])