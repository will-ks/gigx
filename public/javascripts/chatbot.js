function main() {
  const chatbot = document.querySelector(".chatbot");
  const chatbotButton = document.querySelector(".chatbot-button");

  chatbotButton.addEventListener("click", () => {
    chatbot.classList.toggle("hidden");
    chatbotButton.innerText = "Foo";
  });
}

window.onload = main;
