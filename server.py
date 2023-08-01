from flask import Flask, render_template, request, jsonify
from bot import ChatGPTBot

app = Flask(__name__)

# Instantiate the ChatGPTBot object
bot = ChatGPTBot('')  # Empty API key for initialization

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    user_message = request.json['message']
    bot_message = bot.chatting(user_message)
    return jsonify({'bot_response': bot_message})

@app.route('/save-key', methods=['POST'])
def save_key():
    key = request.json['key']
    try:
        bot.initialize_bot(key)
        return jsonify({'success': True})
    except Exception as e:
        print(e)
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)
