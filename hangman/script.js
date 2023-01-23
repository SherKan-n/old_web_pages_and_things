const wordsArray = [
   'Future', 'Picnic', 'Agonistic',
   'Garland', 'Protect', 'Airline', 'Gigantic',
   'Publish', 'Bandit', 'Goofy', 'Quadrangle',
   'Banquet', 'Government', 'Recount', 'Binoculars',
   'Grandnieces', 'Redoubtable', 'Biologist', 'Handbook',
   'Reflection', 'Blackboard', 'Himself', 'Reporter',
   'Board', 'Indulge', 'Ring', 'Bookworm',
   'Inflatable', 'Salesclerk', 'Butterscotch', 'Inimical',
   'Snapshot', 'Camera', 'Interim', 'Shellfish',
   'Campus', 'Invest', 'Ship', 'Catfish',
   'Jackpot', 'Significance', 'Carsick', 'Kitchenette',
   'Sometimes', 'Celebrate', 'Law', 'Sublime',
   'Celery', 'Life', 'Tabletop', 'Citizen',
   'Lifeline', 'Teamwork', 'Coloring', 'Love',
   'Tennis', 'Compact', 'Magnificent', 'Timesaving',
   'Dark', 'Malevolence', 'Tree', 'Damage',
   'Man', 'Termination', 'Dangerous', 'Mascot',
   'Underestimate', 'Decorum', 'Marshmallow', 'Vineyard',
   'Endorse', 'Mine', 'War', 'Engender',
   'Moonwalk', 'Way', 'Erratic', 'Near',
   'Wealth', 'Envelope', 'Wednesday',
   'Etymology', 'Newborn', 'World', 'Eyewitness',
   'Noisome', 'Xerox', 'Eulogy', 'Owl',
   'You', 'Fish', 'Parenthesis', 'Zestful',
   'Food', 'Perpetrator', 'Foreclose', 'Phone',
   "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar",
   "Cat", "Crocodile", "Deer", "Dinosaur", "Dog", "Duck", "Elephant",
   "Fox", "Frog", "Gorilla", "Horse", "Jaguar", "Kingfisher", "Koala",
   "Lemur", "Leopard", "Lion", "Llama", "Monkey", "Parrot",
   "Pig", "Pigeon", "Rabbit", "Raccoon", "Rail", "Ram",
   "Rat", "Rhinoceros", "Scorpion", "Shark", "Sheep", "Snake",
   "Sparrow", "Spider", "Tiger", "Turtle", "Wildcat",
   "Wolf", "Worm", "Yak", "Zebra"
];

let word = {
   name: '',
   letters: [],
   discovered: 0,
   attempts: 0
};

const lines = document.getElementsByClassName('lines');
const wordElement = document.getElementsByClassName('word')[0];
const lettersElement = document.getElementsByClassName('letters')[0];

initializeGame();

function generateLetters() {
   for (let i = 65; i < 91; i++) {
      const span = document.createElement('span');
      span.innerText = String.fromCharCode(i);
      span.addEventListener('click', checkLetter);
      lettersElement.appendChild(span);
   }

   for (let line of lines) {
      line.classList.add('invisible');
   }
}


function generateWord() {
   const rand = Math.floor(Math.random() * wordsArray.length);

   word.name = wordsArray[rand];
   word.letters = wordsArray[rand].toUpperCase().split("");

   for (let letter of word.letters) {
      const span = document.createElement('span');
      span.innerHTML = '&zwnj;';
      span.id = letter;

      const div = document.createElement('div');
      div.classList.add('line');

      span.appendChild(div);
      wordElement.appendChild(span);
   }
}


function checkLetter() {
   this.style.opacity = 0;
   this.style.cursor = 'context-menu';
   this.removeEventListener('click', checkLetter);

   if (word.letters.some(e => e == this.innerText)) {
      const element = document.querySelectorAll('.word > span');
      for (let x of element) {
         if (x.id == this.innerText) {
            x.innerText = this.innerText;
            word.discovered++;
         }
      }
      if (word.name.length == word.discovered && word.attempts < 10) gameOver('win')
   }
   else {
      for (let line of lines) {
         if (line.classList.contains('invisible')) {
            word.attempts++;
            line.classList.remove('invisible');
            if (word.attempts == 10) gameOver('lose');
            break;
         }
      }
   }
}


function gameOver(option) {
   const letters = document.querySelectorAll('.letters span');
   for (let letter of letters) letter.removeEventListener('click', checkLetter);

   const textLoseWin = document.getElementById('text-lose-win');
   const textHeader = document.querySelector('.modal-lose-win > h2');
   const aliveFace = document.getElementsByClassName('alive')[0];
   const deathFace = document.getElementsByClassName('death')[0];
   const corectWord = document.querySelector('.modal-lose-win > span:last-of-type');

   corectWord.style.color = "gold";
   corectWord.style.fontFamily = "Tahoma,sans-serif";
   corectWord.textContent = word.name;

   if (option == 'lose') {
      deathFace.classList.remove('invisible');
      aliveFace.classList.add('invisible');

      textHeader.classList.add('lose')

      textLoseWin.textContent = 'Better luck next time!';
      textLoseWin.classList.add('lose')
   }
   else {
      deathFace.classList.remove('invisible');

      textHeader.classList.add('win')

      textLoseWin.textContent = 'Congratulations you won !';
      textLoseWin.classList.add('win')
   }

   const modal = document.getElementsByClassName('modal-lose-win')[0];
   modal.style.display = 'block';
}


function initializeGame() {
   generateWord();
   generateLetters();

   const aliveFace = document.getElementsByClassName('alive')[0];
   const deathFace = document.getElementsByClassName('death')[0];
   const modal = document.getElementsByClassName('modal-lose-win')[0];

   const againButton = document.getElementsByClassName('again')[0];
   againButton.addEventListener('click', () => {
      wordElement.innerHTML = '';
      lettersElement.innerHTML = '';

      word = {
         name: '',
         letters: [],
         discovered: 0,
         attempts: 0
      };
      generateWord();
      generateLetters();

      modal.style.display = 'none';
      deathFace.classList.add('invisible');
      aliveFace.classList.remove('invisible');
   });

   const cancelButton = document.getElementsByClassName('cancel')[0];
   cancelButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to close the game?')) window.close();
   });
}