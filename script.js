// Script for Etch A Sketch

// Making grid
function makeGrid() {
    let grid = document.querySelector(".grid")
    for (let i = 0; i < 16; i++) {
        let newColumn = document.createElement("div");
        newColumn.classList.add("column");
        newColumn.id = "column" + i;
        grid.appendChild(newColumn);
        for (let j = 0; j < 16; j++) {
            let newCell = document.createElement("div");
            newCell.classList.add("cell");
            newColumn.appendChild(newCell);
        }
    }
}
window.onload = makeGrid();

// Draw
let cells = document.querySelectorAll(".cell");
cells.forEach((x) => {
    x.addEventListener("mouseenter", () => {
        x.classList.add("draw");
    });
    x.addEventListener("mouseleave", () => {
        setTimeout(() => { 
            x.classList.remove("draw");
        }, 3000); 
    })
});

// Slider

let slider = document.getElementById("myRange");
let output = document.getElementById("output");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
