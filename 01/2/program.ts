import * as fs from "fs";

import { performance } from "perf_hooks";
const start = performance.now();

function getCounts(val1: string, vals2: string[]): number {
    let count = 0;

    vals2.forEach((data) => {
        if (val1 === data) count++;
    });
    return count;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");
const data2 = data.reduce((acc: Array<Array<string>>, val: string) => {
    acc.push(val.replace(/\s\s+/g, " ").split(" "));
    return acc;
}, new Array<Array<string>>());

const vals1 = data2.map((data) => {
    return data[0];
});

const vals2 = data2.map((data) => {
    return data[1];
});

vals1.sort();
vals2.sort();

const len = vals1.length;

var result = 0;
for (let i = 0; i < len; i++) {
    const count = getCounts(vals1[i], vals2);
    result = result + parseInt(vals1[i]) * count;
}

console.log(result);
const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
