const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const pencilButton = document.getElementById("pencil");
const eraserButton = document.getElementById("eraser");
const undoButton = document.getElementById("undo")

// Initialise canvas
const ctx = canvas.getContext("2d");

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = 'round';
ctx.globalCompositeOperation = "source-over";

// Previous mouse positions
let prevX = null;
let prevY = null;

// Points of path and Array of paths
let currentPoints = [];
let pathsArray = [];

// Pencil and Eraser modes
let isEraser = false;
pencilButton.addEventListener("click", () => isEraser = false);
eraserButton.addEventListener("click", () => isEraser = true);


// Mouse drawing
let isDrawing = false;

let startMouse = (e) => {
  isDrawing = true;

  if (isEraser == false) {
  currentPoints = [];
  currentPoints.push({
    x: e.clientX,
    y: e.clientY
  })}
}

let moveMouse = (e) => {
  if (prevX == null || prevY == null) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  // Current mouse position
  let currentX = e.clientX;
  let currentY = e.clientY;

  if (isDrawing == true) {

    if (isEraser == true) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";

      currentPoints.push({
        x: e.clientX,
        y: e.clientY
      })
    }

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }

  prevX = currentX;
  prevY = currentY;
};

let endMouse = () => {
  isDrawing = false;

  pathsArray.push(currentPoints);
}

canvas.addEventListener("mousedown", startMouse);
canvas.addEventListener("mousemove", moveMouse);
canvas.addEventListener("mouseup", endMouse);


// Touch drawing
let startTouch = (e) => {
  isDrawing = true;
  e.preventDefault();
  ctx.beginPath();
  
  if (isEraser == false) {
    currentPoints = [];
    currentPoints.push({
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    })
  }
}

let moveTouch = (e) => {
  if (prevX == null || prevY == null) {
    prevX = e.touches[0].pageX;
    prevY = e.touches[0].pageY;
    return;
  }
  
  // Current mouse position
  let currentX = e.touches[0].pageX;
  let currentY = e.touches[0].pageY;

  e.preventDefault();
  
  if (isDrawing == true) {
    if (isEraser == true) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
    ctx.stroke();
    
    currentPoints.push({
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    });
  }

  prevX = currentX;
  prevY = currentY;
}

let endTouch = (e) => {
  isDrawing = false;

  e.preventDefault();
  pathsArray.push(currentPoints);
}

canvas.addEventListener("touchstart", startTouch);
canvas.addEventListener("touchmove", moveTouch);
canvas.addEventListener("touchend", endTouch);


// Undo function
undoButton.addEventListener("click", undo)

function undo() {
  console.log(pathsArray);
  pathsArray.pop();
  console.log(pathsArray);
  redrawPaths();
}

function redrawPaths() {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pathsArray.forEach(path => {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.stroke();
  })
}
