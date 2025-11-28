import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

function checkSafe(data: string[]): "safe" | "unsafe" {
    const initialDiff = parseInt(data[1]) - parseInt(data[0]);
    if (initialDiff === 0 || Math.abs(initialDiff) > 3) {
        return "unsafe";
    }
    const initialDirection = initialDiff > 0 ? "Up" : "Down";

    for (let i = 2; i <= data.length - 1; i++) {
        const diff = parseInt(data[i]) - parseInt(data[i - 1]);
        if (diff === 0 || Math.abs(diff) > 3) {
            return "unsafe";
        }

        const direction = diff > 0 ? "Up" : "Down";

        if (direction !== initialDirection) {
            return "unsafe";
        }
    }
    return "safe";
}

function stripElement(data: string[], i: number): string[] {
    const newData = new Array<string>();
    for (let x = 0; x < data.length; x++) {
        if (x !== i) {
            newData.push(data[x]);
        }
    }
    return newData;
}

function isSafe(value: string): "safe" | "unsafe" {
    const data = value.split(" ");

    if (checkSafe(data) === "safe") {
        return "safe";
    }

    for (let i = 0; i < value.length; i++) {
        if (checkSafe(stripElement(data, i)) === "safe") {
            return "safe";
        }
    }

    return "unsafe";
}

function countSafe(
    previousValue: number,
    currentValue: "safe" | "unsafe"
): number {
    return currentValue === "safe" ? previousValue + 1 : previousValue;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");
console.log(data.map(isSafe).reduce(countSafe, 0));

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
