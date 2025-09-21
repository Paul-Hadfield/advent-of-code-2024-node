import * as fs from "fs";

function onlyOne(value: string): boolean {
    const [firstPart] = value.split(": ");
    return convertToNumber(firstPart) === BigInt(7290);
}

function convertToNumber(value: string): bigint {
    return BigInt(value);
}

function processValues(
    runningTotal: bigint,
    remainingParts: bigint[],
    result: bigint
): boolean {
    //console.log("processValues", runningTotal, remainingParts, result);
    if (remainingParts.length === 2) {
        const value = convertToNumber(
            `${remainingParts[0]}${remainingParts[1]}`
        );
        if (runningTotal + value === result) {
            return true;
        }

        if (runningTotal * value === result) {
            return true;
        }

        if (
            processValues(
                convertToNumber(`${runningTotal}${remainingParts[0]}`),
                remainingParts.slice(1),
                result
            )
        ) {
            return true;
        }
    } else if (remainingParts.length === 1) {
        if (convertToNumber(`${runningTotal}${remainingParts[0]}`) === result) {
            return true;
        }
        if (runningTotal + remainingParts[0] === result) {
            return true;
        }

        if (runningTotal * remainingParts[0] === result) {
            return true;
        }

        return false;
    } else if (remainingParts.length > 2) {
        /*console.log(
            convertToNumber(`${runningTotal}${remainingParts[0]}`),
            remainingParts.slice(1),
            result
        );*/
        if (
            processValues(
                convertToNumber(`${runningTotal}${remainingParts[0]}`),
                remainingParts.slice(1),
                result
            )
        ) {
            return true;
        }
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

function processLine(acc: bigint, value: string): bigint {
    const [firstPart, secondPart] = value.split(": ");
    const result = convertToNumber(firstPart);
    const values = secondPart.split(" ").map(convertToNumber);

    if (values.length === 2) {
        if (result === convertToNumber(`${values[0]}${values[1]}`)) {
            return acc + result;
        }
    }

    if (processValues(values[0], values.slice(1), result)) {
        return acc + result;
    }

    return acc;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");
//console.log(data.filter(onlyOne).reduce(processLine, 0));
console.log(data.reduce(processLine, BigInt(0)));
