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
            newColumn.appendChild(newCell);
        }
    }
}

let device = document.querySelector(".device");
device.addEventListener("mouseover", () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((x) => {
    x.addEventListener("mouseenter", () => {
        x.classList.add("draw");
    });
    x.addEventListener("mouseleave", () => {
        setTimeout(() => { 
            x.classList.remove("draw");
        }, 3000);})
    });
});
// Draw








