from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv
load_dotenv() 
openai.api_key = os.getenv("OPENAI_API_KEY")
app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI companion named Nova."},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response["choices"][0]["message"]["content"].strip()
    except Exception as e:
        reply = f"Error: {str(e)}"
    return jsonify({"reply": reply})
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
app.run(host="0.0.0.0", port=port)