export function initChatbot() {
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  if (!chatMessages || !chatInput || !chatSend) {
    return;
  }

  const history = [];

  function addMessage(text, type) {
    const message = document.createElement("p");
    message.classList.add(type === "user" ? "user-message" : "bot-message");
    message.textContent = text;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const userText = chatInput.value.trim();

    if (userText === "") {
      return;
    }

    addMessage(userText, "user");
    history.push({
      role: "user",
      content: userText
    });

    chatInput.value = "";
    chatSend.disabled = true;
    chatSend.textContent = "Analyse...";

    const loadingMessage = document.createElement("p");
    loadingMessage.classList.add("bot-message");
    loadingMessage.textContent = "Stabilisation du tunnel spatio-temporel...";
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          history: history.slice(-8)
        })
      });

      const data = await response.json();

      loadingMessage.remove();

      if (!response.ok) {
        throw new Error(data.error || "Erreur chatbot");
      }

      addMessage(data.answer, "bot");

      history.push({
        role: "assistant",
        content: data.answer
      });
    } catch (error) {
      loadingMessage.remove();

      addMessage(
        "Impossible de contacter l’agent IA pour le moment. Le protocole de communication temporelle est instable.",
        "bot"
      );

      console.error("Erreur chatbot frontend :", error);
    } finally {
      chatSend.disabled = false;
      chatSend.textContent = "Envoyer";
    }
  }

  chatSend.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}