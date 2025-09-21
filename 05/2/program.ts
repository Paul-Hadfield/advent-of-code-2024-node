import * as fs from "fs";

const data = fs.readFileSync("./data.txt").toString().split("\n\n");
const pageOrderRules = data[0].split("\n").map((data) => data.split("|"));
const updates = data[1].split("\n");
//console.log(pageOrderRules);
//console.log(updates);

function validUpdatesOnly(update: string, pageOrderRules: string[][]): boolean {
    const pages = update.split(",");
    for (let i = 0; i < pages.length; i++) {
        const matching = pageOrderRules.filter((rule) => pages[i] === rule[0]);
        console.log(pages[i], matching);
        if (matching.length > 0) {
            const found = matching.filter((rule) => {
                const indexOf = pages.indexOf(rule[1]);
                if (indexOf === -1) {
                    return true;
                }
                return i < indexOf;
            });

            if (matching.length !== found.length) {
                return false;
            }
        }
    }

    return true;
}
function midValueOnly(value: string): number {
    const values = value.split(",");
    return parseInt(values[(values.length - 1) / 2]);
}

function sum(previousValue: number, currentValue: number): number {
    return previousValue + currentValue;
}

const valid = updates
    .filter((update) => validUpdatesOnly(update, pageOrderRules))
    .map(midValueOnly)
    .reduce(sum, 0);

console.log(valid);
