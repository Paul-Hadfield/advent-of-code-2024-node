import * as fs from "fs";

const UNVISITED_CELL = ".";
const VISITED_CELL = "X";
const BLOCKED_CELL = "#";

type Cell = typeof UNVISITED_CELL | typeof BLOCKED_CELL | typeof VISITED_CELL;

type Grid = Map<string, Cell>;

type Position = {
    x: number;
    y: number;
    direction: "N" | "E" | "S" | "W";
};

function countVisited(count: number, currentValue: Cell): number {
    return currentValue === VISITED_CELL ? count + 1 : count;
}

function findStartingPositionInLine(
    startingPosition: Position | null,
    char: string,
    currentColumn: number,
    currentLine: number
): Position | null {
    if (startingPosition !== null) {
        return startingPosition;
    }

    switch (char) {
        case "^":
            return { x: currentColumn, y: currentLine, direction: "N" };
        case ">":
            return { x: currentColumn, y: currentLine, direction: "E" };
        case "<":
            return { x: currentColumn, y: currentLine, direction: "W" };
        case "v":
            return { x: currentColumn, y: currentLine, direction: "S" };
        default:
            return null;
    }
}

function findStartingPositionOnLine(
    startingPosition: Position | null,
    line: string,
    currentLine: number
): Position | null {
    return line
        .split("")
        .reduce(
            (
                currentStartingPosition: Position | null,
                char: string,
                currentColumn: number
            ) =>
                findStartingPositionInLine(
                    currentStartingPosition,
                    char,
                    currentColumn,
                    currentLine
                ),
            startingPosition
        );
}

function getMaxColumns(data: string[]): number {
    return data[0].length;
}

function getMaxLines(data: string[]): number {
    return data.length;
}

function getNextPosition(position: Position): Position {
    switch (position.direction) {
        case "N":
            return {
                x: position.x,
                y: position.y - 1,
                direction: position.direction,
            };
        case "S":
            return {
                x: position.x,
                y: position.y + 1,
                direction: position.direction,
            };
        case "E":
            return {
                x: position.x + 1,
                y: position.y,
                direction: position.direction,
            };
        case "W":
            return {
                x: position.x - 1,
                y: position.y,
                direction: position.direction,
            };
    }
}

function reduceColumns(
    grid: Grid,
    char: string,
    currentColumn: number,
    currentLine: number
): Grid {
    if (char === BLOCKED_CELL) {
        grid.set(`${currentLine}_${currentColumn}`, BLOCKED_CELL);
    } else {
        grid.set(`${currentLine}_${currentColumn}`, UNVISITED_CELL);
    }

    return grid;
}

function reduceLine(grid: Grid, line: string, currentLine: number): Grid {
    return line
        .split("")
        .reduce(
            (currentGrid: Grid, char: string, currentColumn: number) =>
                reduceColumns(currentGrid, char, currentColumn, currentLine),
            grid
        );
}

function rotate(position: Position): Position {
    switch (position.direction) {
        case "N":
            return { ...position, direction: "E" };
        case "E":
            return { ...position, direction: "S" };
        case "S":
            return { ...position, direction: "W" };
        case "W":
            return { ...position, direction: "N" };
    }
}

function update(
    position: Position,
    grid: Grid,
    maxLines: number,
    maxColumns: number
): Position | null {
    const nextPosition = getNextPosition(position);

    if (nextPosition.x < 0 || nextPosition.x > maxColumns) {
        return null;
    }

    if (nextPosition.y < 0 || nextPosition.y > maxLines) {
        return null;
    }

    grid.set(`${position.y}_${position.x}`, VISITED_CELL);

    if (grid.get(`${nextPosition.y}_${nextPosition.x}`) === BLOCKED_CELL) {
        return rotate(position);
    }

    return nextPosition;
}

const data = fs.readFileSync("./data.txt").toString().split("\n");

let position = data.reduce(
    (startingPosition: Position | null, line: string, currentLine: number) =>
        findStartingPositionOnLine(startingPosition, line, currentLine),
    null
);

const grid = data.reduce(
    (currentGrid: Grid, line: string, currentLine: number) =>
        reduceLine(currentGrid, line, currentLine),
    new Map<string, Cell>()
);

const maxLines = getMaxLines(data);
const maxColumns = getMaxColumns(data);
while (position) {
    position = update(position, grid, maxLines, maxColumns);
}

console.log([...grid.values()].reduce(countVisited, 0));
