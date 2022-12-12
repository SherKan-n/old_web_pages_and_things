const globsPositions = [
   ['0', '46%'], ['15%', '39%'], ['35%', '30%'], ['25%', '56%'], ['57%', '30%'], ['45%', '53%'], ['65%', '50%'], ['75%', '19%'], ['75%', '79%'],
   ['0', '46%'], ['15%', '39%'], ['35%', '30%'], ['25%', '56%'], ['57%', '30%'], ['45%', '53%'], ['65%', '50%'], ['75%', '19%'], ['75%', '79%'],
];

const globsColorOn = [
   //backgroundColor     borderColor      boxShadow
   ['blue', 'lightblue', 'whitesmoke'],
   ['red', 'lightred', 'whitesmoke'],
   ['green', 'lime', 'whitesmoke'],
   ['darkorange', 'yellow', 'whitesmoke'],
   ['magenta', 'pink', 'whitesmoke'],
   ['darkcyan', 'cyan', 'whitesmoke'],
   ['darkgreen', 'limeforest', 'whitesmoke'],
   ['gray', 'snow', 'whitesmoke'],
   ['gold', 'orange', 'whitesmoke'],
];

const firstContent = document.querySelector('.firstContent > div');
const secondContent = document.querySelector('.secondContent > div');

// let globsOn = {};
let globsOn = [], globStyle = 0, intervalStyle = {};

createGlobs(firstContent, secondContent);

function createGlobs(element1, element2) {
   for (let i = 0; i < Math.round(globsPositions.length / 2); i++) {
      const glob = document.createElement('div');
      glob.classList.add('glob');
      glob.id = i;
      // globsOn[i] = 0;
      globsOn.push(0);
      setPosition(glob, globsPositions[i]);
      setColors(glob, ['black', 'lightblue', 'lightcyan']);
      element1.appendChild(glob);
      intervalStyle[i] = setInterval(() => startLights(glob), 250);
   }
   for (let i = Math.round(globsPositions.length / 2); i < globsPositions.length; i++) {
      const glob = document.createElement('div');
      glob.classList.add('glob');
      glob.id = i;
      // globsOn[i] = 0;
      globsOn.push(0);
      setPosition(glob, globsPositions[i]);
      setColors(glob, ['black', 'lightblue', 'lightcyan']);
      element2.appendChild(glob);
      intervalStyle[i] = setInterval(() => startLights(glob), 250);
   }
}

function setPosition(element, position) {
   element.style.top = position[0];
   element.style.left = position[1];
   element.addEventListener("click", checkTheGlob);
}

function setColors(element, colors) {
   element.style.backgroundColor = colors[0];
   element.style.borderColor = colors[1];
   element.style.boxShadow = `0px 0px 15px ${colors[2]} inset`;
}

function checkTheGlob() {
   globsOn[this.id] = !globsOn[this.id];
   const rand = Math.floor(Math.random() * globsColorOn.length);
   const status = (globsOn[this.id] == 1) ? (true) : (false);
   setColors(this, ((status) ? (globsColorOn[rand]) : (['black', 'lightblue', 'lightcyan'])));
   const span = document.getElementById('countGlobsOn');
   // span.textContent = `Globs ON: ${Object.values(globsOn).filter(e => e).length}`;
   span.textContent = `Globs ON: ${globsOn.filter(e => e == 1).length}`;
}

function startLights(glob) {
   if (globStyle == 0) return
   if (globStyle == 1) globsOn[glob.id] = !globsOn[glob.id];
   else globsOn[glob.id] = Math.round(Math.random() * 1);
   const rand = Math.floor(Math.random() * globsColorOn.length);
   const status = (globsOn[glob.id] == 1) ? (true) : (false);
   setColors(glob, ((status) ? (globsColorOn[rand]) : (['black', 'lightblue', 'lightcyan'])));
   const span = document.getElementById('countGlobsOn');
   // span.textContent = `Globs ON: ${Object.values(globsOn).filter(e => e).length}`;
   span.textContent = `Globs ON: ${globsOn.filter(e => e == 1).length}`;
}

function changeStyle() {
   if (globStyle == 0) globStyle = 1;
   else if (globStyle == 1) globStyle = 2;
   else {
      globsOn = [];
      globStyle = 0;
      for (let x of document.querySelectorAll(".firstContent > div .glob")) {
         firstContent.removeChild(x);
         clearInterval(intervalStyle[x.id]);
      }
      for (let x of document.querySelectorAll(".secondContent > div .glob")) {
         secondContent.removeChild(x);
         clearInterval(intervalStyle[x.id]);
      }
      createGlobs(firstContent, secondContent);
      const span = document.getElementById('countGlobsOn');
      // span.textContent = `Globs ON: ${Object.values(globsOn).filter(e => e).length}`;
      span.textContent = `Globs ON: ${globsOn.filter(e => e == 1).length}`;
   }
}