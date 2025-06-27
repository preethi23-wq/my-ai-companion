async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();
  if (!userText) return;
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = userText;
  chatBox.appendChild(userMsg);
  input.value = "";
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.textContent = "Typing...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });
    const data = await response.json();
    botMsg.textContent = data.reply;
  } catch {
    botMsg.textContent = "Oops! Something went wrong.";
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}