const chatWindow = document.getElementById('chat-window');
const userMessageInput = document.getElementById('user-message');
const updateKeyButton = document.getElementById('update-key');
const listenButton = document.getElementById('listen');
const clearHistoryButton = document.getElementById('clear-history');
const apiKeyDiv = document.getElementById('api-key');
const apiKeyInput = document.getElementById('key-input');
const saveKeyButton = document.getElementById('save-key');

let botMessage = '';

// Function to display messages in the chat window
function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = `${sender}: ${message}`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to send user's message to the server
function sendUserMessage() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage !== '') {
    displayMessage('You', userMessage);
    userMessageInput.value = '';
    fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        botMessage = data.bot_response;
        displayMessage('Bot', botMessage);
      })
      .catch((error) => console.error('Error:', error));
  }
}

// Event listener for Enter key press in the input field
userMessageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendUserMessage();
  }
});

// Event listener for 'Update API Key' button click
updateKeyButton.addEventListener('click', () => {
  apiKeyDiv.style.display = 'block';
});

// Event listener for 'Listen To Message' button click
listenButton.addEventListener('click', () => {
  // Implement the function to play the bot's message in audio here
  // For simplicity, we'll omit this part in the example.
});

// Event listener for 'Clear History' button click
clearHistoryButton.addEventListener('click', () => {
  chatWindow.innerHTML = '';
  botMessage = '';
});

// Event listener for 'Save Key' button click
saveKeyButton.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  if (apiKey !== '') {
    fetch('/save-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: apiKey }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          apiKeyDiv.style.display = 'none';
          displayMessage('System', '[Updating API Key...]');
          chatWindow.innerHTML = '';
          displayMessage('System', '[Chatbot loaded successfully. You may BEGIN your conversation now.]');
          sendUserMessage();
        } else {
          alert('Invalid API Key. Please ensure that a valid API key has been entered.');
        }
      })
      .catch((error) => console.error('Error:', error));
  }
});
