function main () {
  const chatbot = document.querySelector('.chatbot');
  const chatbotButton = document.querySelector('.chatbot-button');
  const closeChatbot = document.querySelector('.close');

  chatbotButton.addEventListener('click', event => {
    event.stopPropagation();
    chatbot.classList.remove('hidden');
    chatbotButton.classList.add('hidden');
  });

  // chatbot.addEventListener('click', event => {
  //   event.stopPropagation();
  // });

  closeChatbot.addEventListener('click', () => {
    chatbot.classList.add('hidden');
    chatbotButton.classList.remove('hidden');
  });
}

window.onload = main;
