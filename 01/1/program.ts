import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const lines = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

const vals1: number[] = [];
const vals2: number[] = [];

for (const line of lines) {
    if (!line) continue;
    // Split on whitespace, avoiding the regex replace + extra array allocations.
    const [a, b] = line.split(/\s+/);
    vals1.push(Number(a));
    vals2.push(Number(b));
}

vals1.sort((a, b) => a - b);
vals2.sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < vals1.length; i++) {
    result += Math.abs(vals1[i] - vals2[i]);
}

console.log(result);

const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
