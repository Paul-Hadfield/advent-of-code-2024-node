import * as fs from "fs";

function forward(grid: string[], row: number, col: number): boolean {
    if (row < 1 || row >= grid.length - 1) {
        return false;
    }

    if (col < 1 || col >= grid[row].length - 1) {
        return false;
    }

    if (grid[row - 1][col + 1] === "M") {
        if (grid[row + 1][col - 1] === "S") {
            return true;
        }

        return false;
    }

    if (grid[row - 1][col + 1] === "S") {
        if (grid[row + 1][col - 1] === "M") {
            return true;
        }

        return false;
    }

    return false;
}

function backward(grid: string[], row: number, col: number): boolean {
    if (row < 1 || row >= grid.length - 1) {
        return false;
    }

    if (col < 1 || col >= grid[row].length - 1) {
        return false;
    }
    if (grid[row - 1][col - 1] === "M") {
        if (grid[row + 1][col + 1] === "S") {
            return true;
        }

        return false;
    }

    if (grid[row - 1][col - 1] === "S") {
        if (grid[row + 1][col + 1] === "M") {
            return true;
        }

        return false;
    }

    return false;
}

const grid = fs.readFileSync("./data.txt").toString().split("\n");

let count = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === "A") {
            if (forward(grid, row, col) && backward(grid, row, col)) {
                count++;
            }
        }
    }
}
console.log(count);
