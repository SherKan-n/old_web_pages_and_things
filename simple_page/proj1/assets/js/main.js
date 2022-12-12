let mainElement, rightArrow, leftArrow, lengthItems = 0, index = 0, currentRoute = "#games";
//==============================================================
const games = [
   {
      "name": "Marble Wizard",
      "link": "https://www.crazygames.com/game/marble-wizard"
   },
   {
      "name": "Mystic Escape",
      "link": "https://www.crazygames.com/game/mystic-escape"
   },
   {
      "name": "Master of Runes",
      "link": "https://www.kiloo.com/en/master-of-runes"
   },
   {
      "name": "Doodle God",
      "link": "http://www.4j.com/Doodle-God-Fantasy-World-Of-Magic"
   },
   {
      "name": "Magikmon",
      "link": "https://www.crazygames.com/game/magikmon"
   },
   {
      "name": "Calturin",
      "link": "https://www.crazygames.com/game/calturin"
   }
];
const videos = ["D1vueg0A_7k", "9rDDhbaKE_8", "aHSAX493Z1k", "bha1yt1qMbk", "UCw-w1hFUL4"];
const heroes = ["Tinker Bell", "?", "Harry Potter", "Curaj", "Gandalf", "Merlin", "Doctor Strange"];
//==============================================================
function setRoute(route) {
   index = 0;
   currentRoute = route;
   initializeItems(route);
}
//==============================================================
async function initializeItems(route) {
   mainElement = document.getElementById("content");

   if (route != null) {
      await transitionRun(mainElement, 0);
      mainElement.innerHTML = null;
      transitionRun(mainElement, 1);
   }
   leftArrow = document.querySelector("i.left");
   rightArrow = document.querySelector("i.right");

   leftArrow.style.display = "none";
   rightArrow.style.display = "block";

   if (currentRoute == "#games") {
      for (let i = index; i < index + 3; i++) {
         const div_e = document.createElement("div");
         div_e.classList.add("tooltip");

         const a_content = document.createElement("a");
         a_content.href = games[i].link;

         const img_content = document.createElement("img");
         img_content.src = `./assets/imgs/games/joc${i}.jpeg`;

         const span_el = document.createElement("span");
         span_el.classList.add("tooltiptext");
         span_el.innerText = games[i].name;

         a_content.appendChild(img_content);
         div_e.appendChild(span_el);
         div_e.appendChild(a_content)
         mainElement.appendChild(div_e);
      }
      lengthItems = games.length;
   }
   if (currentRoute == "#videos") {
      for (let i = index; i < index + 3; i++) {
         const iframe_content = document.createElement("iframe");
         iframe_content.frameborder = "0";
         iframe_content.src = `https://www.youtube.com/embed/${videos[i]}?showinfo=0&amp;modestbranding=1`;
         mainElement.appendChild(iframe_content);
      }
      lengthItems = videos.length;
   }
   if (currentRoute == "#heroes") {
      for (let i = index; i < index + 3; i++) {
         const div_e = document.createElement("div");
         div_e.classList.add("tooltip");

         const img_content = document.createElement("img");
         img_content.src = `./assets/imgs/heroes/img${i}.jpg`;

         const span_el = document.createElement("span");
         span_el.classList.add("tooltiptext");
         span_el.innerText = heroes[i];

         div_e.appendChild(img_content);
         div_e.appendChild(span_el);
         mainElement.appendChild(div_e);
      }
      lengthItems = heroes.length;
   }
   if (lengthItems == 3) rightArrow.style.display = "none";
}
//==============================================================
function nextItems() {
   mainElement.innerHTML = null;
   index++;

   initializeItems();
   if (index > 0) leftArrow.style.display = "block";
   if (lengthItems - index == 3) rightArrow.style.display = "none";
}
//==============================================================
function backItems() {
   mainElement.innerHTML = null;
   index--;

   initializeItems();
   if (index > 0) leftArrow.style.display = "block";
   if (lengthItems - index == 3) rightArrow.style.display = "none";
}
//==============================================================
function transitionRun(element, option) {
   return new Promise((resolve, reject) => {
      const newspaperSpinning = (option == 0) ? ([{
         transform: 'scale(1)'
      }, {
         transform: 'scale(0)'
      }]) : ([{
         transform: 'scale(0)'
      }, {
         transform: 'scale(1)'
      }]);
      const newspaperTiming = {
         duration: 1500,
         iterations: 1
      };
      element.animate(newspaperSpinning, newspaperTiming);
      setTimeout(() => resolve(1), 1490);
   });
}