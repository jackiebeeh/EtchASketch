// Script for Etch A Sketch
let device = document.querySelector(".device");
let grid = document.querySelector(".grid");
let currentCell;

// Making grid
const makeGrid = () => {
    let grid = document.querySelector(".grid")
    for (let i = 0; i < currentValue; i++) {
        let newColumn = document.createElement("div");
        newColumn.classList.add("column");
        newColumn.id = "column" + i;
        
        grid.appendChild(newColumn);
        for (let j = 0; j < currentValue; j++) {
            let newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.setAttribute("x-coord", i);
            newCell.setAttribute("y-coord", j);
            newCell.style.backgroundColor = "#9c9c9c";
            newColumn.appendChild(newCell);
        }
    }
}

// Draw
const draw = function (e) {
    if (e.target.classList.contains("cell")) {
        currentCell = e.target;
        currentCell.style.backgroundColor = getColor();
        let xCoord = +(currentCell.getAttribute("x-coord"));
        let yCoord = +(currentCell.getAttribute("y-coord"));
        rotateButtons(xCoord, yCoord);
    }
}
grid.addEventListener("mouseover", draw, false);
grid.addEventListener("touchmove", (e) => {
    let myLocation = e.touches[0];
    let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    console.log(realTarget);
    currentCell = realTarget;
    currentCell.style.backgroundColor = getColor();
    let xCoord = +(currentCell.getAttribute("x-coord"));
    let yCoord = +(currentCell.getAttribute("y-coord"));
    rotateButtons(xCoord, yCoord);
});


// Different color settings
let setting = "original";
const colors = ["#BF1F2C", "#7F151D", "#FF293B", "#400A0F", "#E52535"];
function getColor() {
    if (setting === "original") {
        return "#262222";
    }
    else if (setting === "rainbow") {
        return randomColor();
    }
    else if (setting ==="darken") {
        let bgColor = getBackgroundColor();
        let shade = "rgb(0, 0, 0)";
        let percentage = "0.2";
        let result = blendRGBColors(bgColor, shade, percentage);
        return result;
    }
}
function randomColor() {
    let randomNumber = Math.floor(Math.random() * 5);
    let chosenColor = colors[randomNumber];
    return chosenColor;
}
function getBackgroundColor() {
    return currentCell.style.backgroundColor;
}
function blendRGBColors(bgColor, shade, percentage) {
    f=bgColor.split(","),
    t=shade.split(","),
    R=parseInt(f[0].slice(4)),
    G=parseInt(f[1]),
    B=parseInt(f[2]);

    return ("rgb("+
    (Math.round((parseInt(t[0].slice(4))-R)*percentage)+R)+","+
    (Math.round((parseInt(t[1])-G)*percentage)+G)+","+
    (Math.round((parseInt(t[2])-B)*percentage)+B)+")");
}

//  Button clicks
const leftButton = document.querySelector(".leftButton");
leftButton.addEventListener("click", () => {
    if (setting === "rainbow") {
        setting = "original";
        output.style.color = "antiquewhite";
    }
    else {
        setting = "rainbow";
        output.style.color = "red";
    }
});

const rightButton = document.querySelector(".rightButton");
rightButton.addEventListener("click", () => {
    if (setting === "darken") {
        setting = "original";
        output.style.color = "antiquewhite";
    }
    else {
        setting = "darken";
        output.style.color = "black";
    }
});

//  Button Rotation
let currentX = 0;
let currentY = 0;
let xRotation = 0;
let yRotation = 0;
let rotationDeg = 35;
function rotateButtons(x, y){
    if(x > currentX) {
      xRotation += rotationDeg;
      leftButton.style.transform = `rotate(${xRotation}deg)`;
    }if (x < currentX) {
      xRotation -= rotationDeg;
      leftButton.style.transform = `rotate(${xRotation}deg)`;
    }
    currentX = x;
  
    if(y > currentY){
      yRotation += rotationDeg;
      rightButton.style.transform = `rotate(${yRotation}deg)`;
    }if (y < currentY){
      yRotation -= rotationDeg;
      rightButton.style.transform = `rotate(${yRotation}deg)`;
    }
    currentY = y;
}

window.onload = rotateRightButton();
function rotateRightButton() {
    rightButton.style.transform = `rotate(140deg)`;
}

// Slider
let slider = document.getElementById("myRange");
let output = document.getElementById("output");
let currentValue = slider.value;
output.innerHTML = `${currentValue} x ${currentValue}`;
slider.oninput = function() {
    currentValue = this.value;
    output.innerHTML = `${this.value} x ${this.value}`;
    let grid = document.querySelector(".grid")
    grid.innerHTML = "";
    makeGrid();
}

window.onload = makeGrid();

// Shake to erase
let offsetX, offsetY;
let initialTop = device.style.top;
let initialLeft = device.style.left;
let shakeCount = 0;
let shakeZone = document.querySelector(".shakeZone");
let mousedown = 0;

device.addEventListener("mousedown", (e) => {
    grid.removeEventListener("mouseover", draw);
    shakeCount = 0;
    mousedown = 1;
    console.log(mousedown);
    offsetX = e.clientX - device.offsetLeft;
    offsetY = e.clientY - device.offsetTop;
    document.addEventListener("mousemove", move);
    shakeZoneCounter();
});

window.addEventListener("shake", () => {
    shakeCount += 1;
    console.log(`phone shake: ${shakeCount}`);
    if (shakeCount <= 100) {
        console.log(`shakeCount is ${shakeCount}`);
        shakeCount += 1;
        cells.forEach((cell) => {
            let bgColor = cell.style.backgroundColor;
            cell.style.backgroundColor = eraseColor(bgColor);   
        });
    }
})

function shakeZoneCounter() {
    let cells = document.querySelectorAll(".cell");
    shakeZone.addEventListener("mouseover", () => {
        if (shakeCount <= 100 && mousedown === 1) {
            console.log(`shakeCount is ${shakeCount}`);
            shakeCount += 1;
            cells.forEach((cell) => {
                let bgColor = cell.style.backgroundColor;
                cell.style.backgroundColor = eraseColor(bgColor);   
            });
        }
    });
}

function eraseColor(bgColor) {
    let shade = "rgb(156, 156, 156)";
    let percentage = "0.15";
    return blendRGBColors(bgColor, shade, percentage);
}

window.addEventListener("mouseup", () => {
    grid.addEventListener("mouseover", draw, false);
    mousedown = 0;
    console.log(mousedown);
    device.style.top = initialTop;
    device.style.left = initialLeft;
    document.removeEventListener("mousemove", move);
});

function move(e) {
    device.style.left = `${e.clientX - offsetX}px`;
    device.style.top = `${e.clientY - offsetY}px`;
}



// info button

let infoButton = document.querySelector(".infoButton");
let info = document.querySelector(".info");

infoButton.addEventListener("mouseenter", () => {
    console.log(`mouse enter info`);
    info.classList.add("visible");
    console.log(info.classList);
})

infoButton.addEventListener("mouseleave", () => {
    console.log(`mouse leave info`);
    info.classList.remove("visible");
    console.log(info.classList);
})

infoButton.addEventListener("touchstart", () => {
    console.log(`mouse enter info`);
    info.classList.add("visible");
    console.log(info.classList);
})

infoButton.addEventListener("touchend", () => {
    console.log(`mouse leave info`);
    info.classList.remove("visible");
    console.log(info.classList);
})
