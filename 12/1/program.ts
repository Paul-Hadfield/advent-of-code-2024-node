import * as fs from "fs";

type Cell = {
    x: number;
    y: number;
    value: string;
    region: number;
    fences: {
        north: boolean;
        east: boolean;
        south: boolean;
        west: boolean;
    }
}

function processLine(currentArray: Cell[], line: string, yPos: number): Cell[] {
    return line.split("").reduce((acc: Cell[], val: string, xPos: number) => {
        acc.push({
            x: xPos,
            y: yPos,
            value: val,
            region: -1,
            fences: {
                north: true,
                east: true,
                south: true,
                west: true
            }
        });
        return acc;
    }, currentArray);
}

function loadFile(filePath: string): Cell[] {
    return fs.readFileSync(filePath)
        .toString()
        .split("\n")
        .reduce(processLine, new Array<Cell>());
}

function convertToDictionary(cells: Cell[]) : Map<string, Cell> {
    return cells.reduce((acc: Map<string, Cell>, cell: Cell) => {
        acc.set(`${cell.x}-${cell.y}`, cell);
        return acc;
    }, new Map<string, Cell>());
}

function processCell(cell: Cell, cellsDictionary: Map<string, Cell>, nextRegion: number): number {
    
    if (cell.x > 0) {
        const key = `${cell.x - 1}-${cell.y}`;
        const neighbour = cellsDictionary.get(key);
        if (neighbour?.value === cell.value) {
            neighbour.fences.east = false;
            cell.fences.west = false;
            cell.region = neighbour.region;
        }
    }

    if (cell.y > 0) {
        const key = `${cell.x}-${cell.y - 1}`;
        const neighbour = cellsDictionary.get(key);
        if (neighbour?.value === cell.value) {
            neighbour.fences.north = false;
            cell.fences.south = false;
            if (cell.region === -1) {
                cell.region = neighbour.region;
            }
        }
    }    

    if(cell.region === -1) {
        cell.region = nextRegion;
        nextRegion++;
    }

    return nextRegion;
}

function getRegionCost(regionCells: Cell[] | undefined): number {
    if (!regionCells) {
        return 0;
    }

    const regionSize = regionCells.length;
    const fencePanels = regionCells.reduce((acc: number, cell: Cell) => {
        return acc + (cell.fences.north ? 1 : 0) + (cell.fences.east ? 1 : 0) + (cell.fences.south ? 1 : 0) + (cell.fences.west ? 1 : 0);
    }, 0);

    console.log(`Region ${regionCells[0].region} (value: ${regionCells[0].value}) has size ${regionSize} and ${fencePanels} fence panels.`);

    return fencePanels * regionSize;
}

const cellsArray = loadFile("./example3.txt");
const cellsDictionary = convertToDictionary(cellsArray);

let nextRegion = 1;
cellsArray.forEach((cell) => {
    nextRegion = processCell(cell, cellsDictionary, nextRegion);
});

const cellsByRegion = cellsArray.reduce((acc: Map<number, Cell[]>, cell: Cell) => {
    const regionCells = acc.get(cell.region) || [];
    regionCells.push(cell);
    acc.set(cell.region, regionCells);
    return acc;
}, new Map<number, Cell[]>());

var cost = 0;
for (var i = 1; i < nextRegion; i++) {
    cost = cost + getRegionCost(cellsByRegion.get(i)); 
}

console.log(`Total cost: ${cost}`);

