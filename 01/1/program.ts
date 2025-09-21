import * as fs from "fs";

const data = fs.readFileSync("./example.txt").toString().split("\n");
const data2 = data.reduce((acc: Array<Array<string>>, val: string) => {
    acc.push(val.replace(/\s\s+/g, " ").split(" "));
    return acc;
}, new Array<Array<string>>());

console.log(data2);

const vals1 = data2.map((data) => {
    return data[0];
});

const vals2 = data2.map((data) => {
    return data[1];
});

vals1.sort();
vals2.sort();

console.log(vals1, vals2);

const len = vals1.length;

var result = 0;
for (let i = 0; i < len; i++) {
    console.log(vals1[i], vals2[i]);
    result = result + Math.abs(parseInt(vals1[i]) - parseInt(vals2[i]));
}

console.log(result);
