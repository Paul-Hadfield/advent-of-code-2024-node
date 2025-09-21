import * as fs from "fs";

const regex1 = new RegExp(/.*(\d)[^.]*/);

function diskmapPart(
    previousValue: string,
    currentValue: string,
    currentIndex: number,
    array: string[]
): string {
    if (currentIndex % 2 !== 0) {
        return previousValue + ".".repeat(parseInt(currentValue));
    }

    const value = parseInt(currentValue);
    const str = Math.floor((currentIndex + 1) / 2).toString();
    return previousValue + str.repeat(value);
}

function diskmap(value: string): string {
    return value.split("").reduce(diskmapPart, "");
}

function calcChecksum(
    previousValue: number,
    currentValue: string,
    currentIndex: number
): number {
    return previousValue + parseInt(currentValue) * currentIndex;
}

function checksum(value: string): number {
    return value.split("").reduce(calcChecksum, 0);
}

function defrag(value: string): string {
    const result = regex1.exec(value);

    const num = result![1];
    const firstDot = value.indexOf(".");
    const lastInstance = value.lastIndexOf(num);

    if (firstDot > lastInstance) {
        return value;
    }

    const arr = value.split("");
    arr[firstDot] = num;
    arr[lastInstance] = ".";
    return defrag(arr.join(""));
}

const data = fs.readFileSync("./data.txt").toString();

const dm = diskmap(data);
console.log("dm");
const df = defrag(dm).replace(/[\.]/g, "");
console.log("df");
const cs = checksum(df);
console.log("cs");

console.log(cs);
