import { Logo } from "./Logo.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const FPS = 60;
const frameInterval = 1000 / FPS;

let lastFrame = 0;
let canvasWidth;
let canvasHeight;
let animationId = null;

let logo;

function init() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (!logo) {
    logo = new Logo(
      canvasWidth / 2,
      canvasHeight / 2,
      600,
      150,
      0,
      0,
      canvasWidth,
      canvasHeight,
      "white",
      150,
      context,
      "img/HONOR_Logo.png",
      0.7,
    );
  } else {
    logo.maxX = canvasWidth;
    logo.maxY = canvasHeight;

    logo.x = Math.min(logo.x, canvasWidth - logo.width / 2);
    logo.y = Math.min(logo.y, canvasHeight - logo.height / 2);
  }

  lastFrame = performance.now();
  animate();
}

function animate(timeStamp) {
  animationId = requestAnimationFrame(animate);

  const deltaTime = timeStamp - lastFrame;

  if (deltaTime > 0) {
    logo.move(deltaTime);
  }

  if (deltaTime >= frameInterval) {
    draw();
    lastFrame = timeStamp;
  }
}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  logo.draw();
}

window.addEventListener("load", init);
window.addEventListener("resize", init);
