let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let keyPressHeading = document.querySelector(".keyPress-heading");
let btnPressHeading = document.querySelector(".btnPress-heading")

document.addEventListener("keypress", function () {
  console.log("game is started");
  if (started == false) {
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  keyPressHeading.innerText = `Level ${level}`;
  btnPressHeading.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    keyPressHeading.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any kay to start the game.`;
    btnPressHeading.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press button to start the game.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    highestScore();
    reset();
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  if (window.innerWidth <= 900) {
    startButton.style.display = "inline-block";
  } else {
    startButton.style.display = "none";
  }
}

let highScore = 0;
function highestScore() {
  let h3 = document.querySelector("h3");

  if (level > highScore) {
    highScore = level;
  }
  h3.innerHTML = `Your highest score : <b>${highScore}</b>`;
}

let startButton = document.querySelector("button");
startButton.addEventListener("click", function() {
  if(started == false) {
    started = true;
    startButton.style.display = "none";
    levelUp();
  }
})