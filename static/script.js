async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;
  appendMessage("You", message);
  input.value = "";
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  appendMessage("Nova", data.reply);
}
function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageEl = document.createElement("div");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}