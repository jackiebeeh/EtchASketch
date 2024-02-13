// Script for Etch A Sketch

//Page loader
window.addEventListener("load", () => {
    loaderPage = document.getElementById("loader-page");
    loaderPage.classList.add("loaded");
})
setTimeout(() => {
    window.addEventListener("load", () => {
    loaderPage.remove();
})},2000)



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
let currentCell;
document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("cell")) {
        currentCell = e.target;
        currentCell.style.backgroundColor = getColor();
        let xCoord = +(currentCell.getAttribute("x-coord"));
        let yCoord = +(currentCell.getAttribute("y-coord"));
        rotateButtons(xCoord, yCoord);
    }
})

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
let device = document.querySelector(".device");
let offsetX, offsetY;
let initialTop = device.style.top;
let initialLeft = device.style.left;
let shakeZone = document.querySelector(".shakeZone");
let cells = document.querySelectorAll(".cell");
let mousedown = 0;
let shakeCount = 0;

device.addEventListener("mousedown", (e) => {
    mousedown = 1;
    console.log(mousedown);
    shakeCount = 0;
    offsetX = e.clientX - device.offsetLeft;
    offsetY = e.clientY - device.offsetTop;
    document.addEventListener("mousemove", move);
    shakeZoneCounter();
});

document.addEventListener("mouseup", () => {
    mousedown = 0;
    device.style.top = initialTop;
    device.style.left = initialLeft;
    console.log(mousedown);
    document.removeEventListener("mousemove", move);
})

function move(e) {
    device.style.left = `${e.clientX - offsetX}px`;
    device.style.top = `${e.clientY - offsetY}px`;
}

function shakeZoneCounter() {
    shakeZone.addEventListener("mouseenter", () => {
        console.log(`shakeZone mouse entered + shakeCount = ${shakeCount}`);
        if (shakeCount < 20 && mousedown === 1) {
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
    let percentage = "0.25";
    return blendRGBColors(bgColor, shade, percentage);
}