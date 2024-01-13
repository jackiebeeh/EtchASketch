// Script for Etch A Sketch

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

let currentCell;

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
    // THIS NEEDS TO BE FIXED!!!
    else if (setting ==="darken") {
        let result = blendRGBColors();
        return result;
    }
}

function blendRGBColors() {
    let bgColor = getBackgroundColor();
    if (bgColor === undefined) {
        console.log(`undefined bgColor`);
    }
    console.log(bgColor);
    let shade = "rgb(0, 0, 0)";
    let percentage = "0.1";
    let f=bgColor.split(","),t=shade.split(","),R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return ("rgba("+(Math.round((parseInt(t[0].slice(4))-R)*percentage)+R)+","+(Math.round((parseInt(t[1])-G)*percentage)+G)+","+(Math.round((parseInt(t[2])-B)*percentage)+B)+")");
}

// Get background color of current cell:
function getBackgroundColor() {
    return currentCell.style.backgroundColor;
}

function randomColor() {
    let randomNumber = Math.floor(Math.random() * 5);
    let chosenColor = colors[randomNumber];
    return chosenColor;
}

// Draw
let device = document.querySelector(".device");
device.addEventListener("mouseenter", () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            currentCell = cell;
            cell.style.backgroundColor = getColor();
            let xCoord = +(cell.getAttribute("x-coord"));
            let yCoord = +(cell.getAttribute("y-coord"));
            rotateButtons(xCoord, yCoord);
        });
        return;
    // cell.addEventListener("mouseleave", () => {
    //     setTimeout(() => { 
    //         cell.style.backgroundColor = "transparent";
    //     }, 5000);})
    });
});

//  Button clicks
const leftButton = document.querySelector(".leftButton");
leftButton.addEventListener("click", () => {
    if (setting === "rainbow") {
        setting = "original";
    }
    else {
        setting = "rainbow";
    }
});

const rightButton = document.querySelector(".rightButton");
rightButton.addEventListener("click", () => {
    if (setting === "darken") {
        setting = "original";
    }
    else {
        setting = "darken";
    }
});

//  Button Rotation
let currentX = -1;
let currentY = -1;
let xRotation = 0;
let yRotation = 0;
let rotationDeg = 40;
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
output.innerHTML = currentValue;
slider.oninput = function() {
    currentValue = this.value;
    output.innerHTML = this.value;
    let grid = document.querySelector(".grid")
    grid.innerHTML = "";
    makeGrid();
}



window.onload = makeGrid();