import * as fs from "fs";

function isSafe(
    value: string,
    index: number,
    array: string[]
): "safe" | "unsafe" {
    const data = value.split(" ");

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

function countSafe(
    previousValue: number,
    currentValue: "safe" | "unsafe"
): number {
    return currentValue === "safe" ? previousValue + 1 : previousValue;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");
console.log(data.map(isSafe).reduce(countSafe, 0));
