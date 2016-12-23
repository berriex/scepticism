function closeDialog(){
  var scepticism = document.querySelector('.scepticism-box');
  scepticism.parentNode.removeChild( scepticism );
}

function addBox(){
  if (window.self === window.top) {

      var body = document.querySelector('body');
      var mainBox = document.createElement('div');
      var container = document.createElement('div');

      mainBox.setAttribute('class', 'scepticism-box')
      container.setAttribute('class', 'scepticism-container')

      var hr = document.createElement('hr');

      var closeButton = document.createElement('input');
      closeButton.type = 'button';
      closeButton.value = 'Ok, ho capito! Chiudi';
      closeButton.onclick = closeDialog;
      closeButton.setAttribute('class', 'scepticism-close')

      var content = document.createElement('ul');
      content.setAttribute('class', 'scepticism-content');

      container.appendChild(content);
      container.appendChild(hr);
      container.appendChild(closeButton);
      mainBox.appendChild(container); //add the text node to the newly created div.
      body.appendChild(mainBox);
  }
}

function appendMessage(message){
  var scepticism = document.querySelector('.scepticism-box');
  if( scepticism === null){
    addBox();
  }
  var scepticismMessage = document.querySelector('.scepticism-content');
  var messageBox = document.createElement('li');
  messageBox.setAttribute('class', 'scepticism-messageBox');

  var listName = document.createElement('div');
  listName.setAttribute('class', 'scepticism-messageBox-list')
  listName.textContent = message.list;

  var messageText = document.createElement('div');
  messageText.setAttribute('class', 'scepticism-messageBox-message')
  messageText.textContent = message.message;

  messageBox.appendChild(listName);
  messageBox.appendChild(messageText);

  scepticismMessage.appendChild(messageBox);
}

chrome.runtime.onMessage.addListener( (message) => {
  appendMessage(message);
});

addBox()
