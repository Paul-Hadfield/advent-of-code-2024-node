import * as fs from "fs";

function func(previousValue: number, currentValue: string): number {
    const parts = currentValue.match(regex2);
    if (parts) {
        const values = parts[0].split(",");
        previousValue =
            previousValue + parseInt(values[0]) * parseInt(values[1]);
    }

    return previousValue;
}

function processDo(instructions: string): string[] {
    const place = instructions.indexOf("don't()");
    if (place > -1) {
        const part1 = instructions.substring(0, place);
        const part2 = instructions.substring(place + 7);

        console.log(instructions);
        console.log(part1);
        console.log(part2);
        return [part1, ...processDont(part2)];
    }

    return [instructions];
}

function processDont(instructions: string): string[] {
    const place = instructions.indexOf("do()");
    if (place > -1) {
        const part1 = instructions.substring(0, place);
        const part2 = instructions.substring(place + 4);

        console.log(instructions);
        console.log(part1);
        console.log(part2);
        return processDo(part2);
    }

    return [];
}

const data = fs.readFileSync("./data.txt").toString();
const parsed = processDo(data).join("");

const regex1 = /mul\(\d+,\d+\)/g;
const regex2 = /\d+,\d+/;
const ops = parsed.match(regex1);
if (ops !== null) {
    console.log(ops.reduce(func, 0));
}
