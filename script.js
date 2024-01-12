// Script for Etch A Sketch


// Slider
let slider = document.getElementById("myRange");
let output = document.getElementById("output");
let currentValue = slider.value;
output.innerHTML = currentValue;
slider.oninput = function() {
    console.log(`input value`);
    currentValue = this.value
    output.innerHTML = this.value;
    let grid = document.querySelector(".grid")
    grid.innerHTML = "";
    makeGrid();
}

window.onload = makeGrid();


// Making grid
function makeGrid() {
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
            newColumn.appendChild(newCell);
        }
    }
}

// DIfferent color settings
let setting = "original";

function getColor() {
    if (setting === "original") {
        let originalColor = "rgb(38, 34, 34)";
        return originalColor;
    }
    if (setting === "rainbow") {
        let rainbowColor = randomColor();
        return rainbowColor;
    }
    if (setting ==="darken") {
        
    }
}
function randomColor() {
    let randomColor = "#" + (Math.floor(Math.random()*16777215).toString(16));
    return randomColor;
}

// Draw
let color = "rgb(38, 34, 34)";
let device = document.querySelector(".device");
device.addEventListener("mouseover", () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
        cell.style.backgroundColor = getColor();
        let xCoord = +(cell.getAttribute("x-coord"));
        let yCoord = +(cell.getAttribute("y-coord"));
        rotateButtons(xCoord, yCoord);
    });
    // cell.addEventListener("mouseleave", () => {
    //     setTimeout(() => { 
    //         cell.style.backgroundColor = "transparent";
    //     }, 5000);})
    });
});

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

