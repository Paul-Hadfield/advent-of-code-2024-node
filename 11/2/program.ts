import * as fs from "fs";

const MULTIPLIER = 2024;

const BLINKS = 25

function processStone(previousValue: number, currentValue: string, currentBlink: number, numberOfBlinks: number): number {

    if (currentBlink === 1) {
        console.log(`root stone ${currentValue}`);
    }

    if (currentValue === "0") {
        if (currentBlink === numberOfBlinks) {
            return previousValue + 1;
        }

        return processStone(previousValue, "1", currentBlink + 1, numberOfBlinks);
    }
    
    const length = currentValue.length;
    if (length % 2 === 0) {
        if (currentBlink === numberOfBlinks) {
            return previousValue + 2;
        }

        const middle = length / 2;
        const leftPart = currentValue.slice(0, middle);
        const rightPart = currentValue.slice(middle);
        const numericValue = parseInt(rightPart);
        const parsedRightPart = numericValue > 0 ? numericValue.toString() : "0";

        return previousValue +
            processStone(0, leftPart, currentBlink + 1, numberOfBlinks) +
            processStone(0, parsedRightPart, currentBlink + 1, numberOfBlinks);

    }
    
    if (currentBlink === numberOfBlinks) {
        return previousValue + 1;
    }

    return processStone(previousValue, (parseInt(currentValue) * MULTIPLIER).toString(), currentBlink + 1, numberOfBlinks);
}

const data = fs.readFileSync("./data.txt").toString().split(" ");

console.log('Start');
const stones = data.reduce((previousValue: number, currentValue: string) => processStone(previousValue, currentValue, 1, BLINKS), 0)
console.log(stones);

