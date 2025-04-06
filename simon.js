let gameseq = [];
let userseq = [];
let btns = ["red", "green", "blue", "yellow"];
let highscore = localStorage.getItem("highscore") || 0;

let started = false;
let level = 0;
let h3 = document.querySelector("h3");

let h2 = document.createElement("h2");
h2.innerText = `Your highest score is: ${highscore}`;
document.body.appendChild(h2);

document.addEventListener("keydown", function () {
    if (!started) {
        console.log("Game started with key");
        started = true;
        levelup();
    }
});

document.getElementById("startBtn").addEventListener("click", function () {
    if (!started) {
        console.log("Game started with button");
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random() * 4);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnflash(randbtn);
}

function score() {
    if (level > highscore) {
        highscore = level;
        localStorage.setItem("highscore", highscore);
    }
    h2.innerText = `Your highest score is: ${highscore}`;
}

function checkans(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        score();
        h3.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key or click start to try again`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = "aqua";
        }, 200);
        reset();
    }
}

function btnpress() {
    let btn = this;
    btnflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}