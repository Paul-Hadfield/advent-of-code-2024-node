import * as fs from "fs";

const MULTIPLIER = BigInt(2024);

function blink(previousValue: string[], currentValue: string, currentIndex: number, array: string[]): string[] {
    
    if (currentValue === "0") {
        previousValue.push("1");
        return previousValue;
    }
    
    const length = currentValue.length;
    if (length % 2 === 0) {
        const middle = length / 2;
        const leftPart = currentValue.slice(0, middle);
        const rightPart = currentValue.slice(middle);
        previousValue.push(leftPart);
        const numericValue = BigInt(rightPart);
        previousValue.push(numericValue > 0 ? numericValue.toString() : "0");
        return previousValue;
    }

    previousValue.push((BigInt(currentValue) * MULTIPLIER).toString());
    return previousValue;

}

const data = fs.readFileSync("./data.txt").toString().split(" ");
let working = data;
const blinks = 75

// console.log(working);
for (let i = 0; i < blinks; i++) {
    console.log(`Blink ${i + 1}`);
    working = working.reduce(blink, new Array<string>);
    // console.log(working);
}

console.log(working.length < 20 ? working : working.length)

