import * as fs from "fs";
import { performance } from "perf_hooks";

const start = performance.now();

const data = fs.readFileSync("./data.txt", "utf8").trim().split("\n");

const vals1: number[] = [];
const counts2 = new Map<number, number>();

for (const line of data) {
    const [a, b] = line.replace(/\s\s+/g, " ").split(" ");
    const val1 = Number(a);
    const val2 = Number(b);
    vals1.push(val1);
    counts2.set(val2, (counts2.get(val2) ?? 0) + 1);
}

let result = 0;
for (const v of vals1) {
    result += v * (counts2.get(v) ?? 0);
}

console.log(result);
const durationMs = performance.now() - start;
console.log(`Execution time: ${durationMs.toFixed(3)}ms`);
