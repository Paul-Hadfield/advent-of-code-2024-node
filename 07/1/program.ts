import * as fs from "fs";

function convertToNumber(value: string): number {
    return parseInt(value);
}

function processValues(
    runningTotal: number,
    remainingParts: number[],
    result: number
): boolean {
    if (remainingParts.length === 1) {
        if (runningTotal + remainingParts[0] === result) {
            return true;
        }

        if (runningTotal * remainingParts[0] === result) {
            return true;
        }

        return false;
    }

    if (
        processValues(
            runningTotal + remainingParts[0],
            remainingParts.slice(1),
            result
        )
    ) {
        return true;
    }

    return processValues(
        runningTotal * remainingParts[0],
        remainingParts.slice(1),
        result
    );
}

function processLine(acc: number, value: string): number {
    const [firstPart, secondPart] = value.split(": ");
    const result = convertToNumber(firstPart);
    const values = secondPart.split(" ").map(convertToNumber);

    if (processValues(values[0], values.slice(1), result)) {
        return acc + result;
    }

    return acc;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");

console.log(data);

console.log(data.reduce(processLine, 0));
