import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const data = fs.readFileSync("./data.txt").toString();

function func(previousValue: number, currentValue: string): number {
    const parts = currentValue.match(regex2);
    if (parts) {
        const values = parts[0].split(",");
        previousValue =
            previousValue + parseInt(values[0]) * parseInt(values[1]);
    }

    return previousValue;
}

const regex1 = /mul\(\d+,\d+\)/g;
const regex2 = /\d+,\d+/;
const ops = data.match(regex1);

if (ops !== null) {
    console.log(ops.reduce(func, 0));
}

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
