const msgContainer = document.getElementsByClassName('content')[0];
const msgButtonSend = document.getElementById('sendMSG');
//======================================================================================
let messages = [];
//======================================================================================
msgButtonSend.addEventListener('click', sendMessage);
//======================================================================================
setTimeout(() => loadMessages(), 2000);
//======================================================================================
function loadMessages() {
   messages = JSON.parse(localStorage.getItem("allMessagesBox")) || [];
   messages.forEach(msg => generateMessage(msgContainer, msg));
}
//======================================================================================
function sendMessage() {
   const msgElement = document.getElementsByTagName('textarea')[0];
   const msg = msgElement.value;

   if (msg.length < 1) return;

   const obj = {
      id: messages.length + 1,
      text: msg,
      date: new Date().toLocaleString("ro")
   };

   updateMessages(obj);
   generateMessage(msgContainer, obj);

   msgElement.value = null;
}
//======================================================================================
function generateMessage(mainElement, msg) {
   const { id, text, date } = msg;

   const mainDiv = document.createElement('div');
   mainDiv.classList.add('message');
   mainDiv.id = id;

   const p = document.createElement('p');
   p.innerText = text;
   mainDiv.appendChild(p);

   const closeX = document.createElement('span');
   closeX.classList.add('close-msg');
   closeX.innerHTML = '&times;';
   closeX.addEventListener('click', () => removeMessage(mainDiv));

   const spanDate = document.createElement('span');
   spanDate.classList.add('date');
   spanDate.innerText = date;

   mainDiv.appendChild(closeX);
   mainDiv.appendChild(spanDate);
   mainElement.appendChild(mainDiv);
}
//======================================================================================
function removeMessage(element) {
   messages = messages.filter(e => e.id != element.id);
   updateMessages(null);

   const alert = document.getElementsByClassName('alert')[0];
   alert.style.display = 'block';
   alert.style.opacity = '1';

   const close = document.getElementsByClassName("closebtn")[0];

   setTimeout(() => {
      alert.style.opacity = "0";
      setTimeout(() => alert.style.display = "none", 600);
   }, 2000);

   close.onclick = function () {
      const div = this.parentElement;
      div.style.opacity = "0";
      setTimeout(() => div.style.display = "none", 600);
   }
   element.remove();
}
//======================================================================================
function updateMessages(msg) {
   if (msg) messages.push(msg);
   localStorage.setItem("allMessagesBox", JSON.stringify(messages));
}