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

// Draw
let color = "rgb(38, 34, 34)";
let device = document.querySelector(".device");
device.addEventListener("mouseover", () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
        cell.style.backgroundColor = color;
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

//  Button Rotation
let currentX = -1;
let currentY = -1;
let xRotation = 0;
let yRotation = 0;
let rotationDeg = 40;
function rotateButtons(x, y){
    const leftButton = document.querySelector(".leftButton");
  
    if(x > currentX) {
      xRotation += rotationDeg;
      leftButton.style.transform = `rotate(${xRotation}deg)`;
    }if (x < currentX) {
      xRotation -= rotationDeg;
      leftButton.style.transform = `rotate(${xRotation}deg)`;
    }
  
    currentX = x;
  
    const rightButton = document.querySelector(".rightButton");
  
    if(y > currentY){
      yRotation += rotationDeg;
      rightButton.style.transform = `rotate(${yRotation}deg)`;
    }if (y < currentY){
      yRotation -= rotationDeg;
      rightButton.style.transform = `rotate(${yRotation}deg)`;
    }
  
    currentY = y;
}