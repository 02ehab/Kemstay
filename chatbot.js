function toggleChatbox() {
  const popup = document.getElementById("chatPopup");
  popup.classList.toggle("hidden");
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chatMessages");

  const userMsg = document.createElement("p");
  userMsg.textContent = "🧑‍💬 " + message;
  chatBox.appendChild(userMsg);

  const botMsg = document.createElement("p");
  botMsg.textContent = "🤖 شكرًا، سأحاول مساعدتك الآن...";
  chatBox.appendChild(botMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}
