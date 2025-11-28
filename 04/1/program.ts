import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

function up(grid: string[], row: number, col: number): boolean {
    if (row < 3) {
        return false;
    }

    if (grid[row - 1][col] !== "M") {
        return false;
    }

    if (grid[row - 2][col] !== "A") {
        return false;
    }

    if (grid[row - 3][col] !== "S") {
        return false;
    }

    return true;
}

function upForward(grid: string[], row: number, col: number): boolean {
    if (row < 3) {
        return false;
    }

    if (col >= grid[row].length - 3) {
        return false;
    }

    if (grid[row - 1][col + 1] !== "M") {
        return false;
    }

    if (grid[row - 2][col + 2] !== "A") {
        return false;
    }

    if (grid[row - 3][col + 3] !== "S") {
        return false;
    }

    return true;
}

function forward(grid: string[], row: number, col: number): boolean {
    if (col >= grid[row].length - 3) {
        return false;
    }

    if (grid[row][col + 1] !== "M") {
        return false;
    }

    if (grid[row][col + 2] !== "A") {
        return false;
    }

    if (grid[row][col + 3] !== "S") {
        return false;
    }

    return true;
}

function downForward(grid: string[], row: number, col: number): boolean {
    if (row >= grid.length - 3) {
        return false;
    }

    if (col >= grid[row].length - 3) {
        return false;
    }

    if (grid[row + 1][col + 1] !== "M") {
        return false;
    }

    if (grid[row + 2][col + 2] !== "A") {
        return false;
    }

    if (grid[row + 3][col + 3] !== "S") {
        return false;
    }

    return true;
}

function down(grid: string[], row: number, col: number): boolean {
    if (row >= grid.length - 3) {
        return false;
    }

    if (grid[row + 1][col] !== "M") {
        return false;
    }

    if (grid[row + 2][col] !== "A") {
        return false;
    }

    if (grid[row + 3][col] !== "S") {
        return false;
    }

    return true;
}

function downBackward(grid: string[], row: number, col: number): boolean {
    if (col < 3) {
        return false;
    }

    if (row >= grid.length - 3) {
        return false;
    }

    if (grid[row + 1][col - 1] !== "M") {
        return false;
    }

    if (grid[row + 2][col - 2] !== "A") {
        return false;
    }

    if (grid[row + 3][col - 3] !== "S") {
        return false;
    }

    return true;
}

function backward(grid: string[], row: number, col: number): boolean {
    if (col < 3) {
        return false;
    }

    if (grid[row][col - 1] !== "M") {
        return false;
    }

    if (grid[row][col - 2] !== "A") {
        return false;
    }

    if (grid[row][col - 3] !== "S") {
        return false;
    }

    return true;
}

function upBackward(grid: string[], row: number, col: number): boolean {
    if (col < 3) {
        return false;
    }

    if (row < 3) {
        return false;
    }

    if (grid[row - 1][col - 1] !== "M") {
        return false;
    }

    if (grid[row - 2][col - 2] !== "A") {
        return false;
    }

    if (grid[row - 3][col - 3] !== "S") {
        return false;
    }

    return true;
}

const grid = fs.readFileSync("./data.txt").toString().split("\n");

let count = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === "X") {
            if (up(grid, row, col)) {
                count++;
            }
            if (upForward(grid, row, col)) {
                count++;
            }
            if (forward(grid, row, col)) {
                count++;
            }
            if (downForward(grid, row, col)) {
                count++;
            }
            if (down(grid, row, col)) {
                count++;
            }
            if (downBackward(grid, row, col)) {
                count++;
            }
            if (backward(grid, row, col)) {
                count++;
            }
            if (upBackward(grid, row, col)) {
                count++;
            }
        }
    }
}
console.log(count);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
