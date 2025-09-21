import * as fs from "fs";

type Directions = "N" | "E" | "S" | "W";

type UNVISITED_CELL = { type: "Unvisited" };
type VISITED_CELL = { type: "Visited"; directions: Set<Directions> };
type BLOCKED_CELL = { type: "Blocked" };

type Cell = UNVISITED_CELL | BLOCKED_CELL | VISITED_CELL;

type Grid = Map<string, Cell>;

type Position = {
    type: "Position";
    x: number;
    y: number;
    direction: Directions;
};

type Escaped = {
    type: "Escaped";
};

type Stuck = {
    type: "Stuck";
};

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
            return {
                type: "Position",
                x: currentColumn,
                y: currentLine,
                direction: "N",
            };
        case ">":
            return {
                type: "Position",
                x: currentColumn,
                y: currentLine,
                direction: "E",
            };
        case "<":
            return {
                type: "Position",
                x: currentColumn,
                y: currentLine,
                direction: "W",
            };
        case "v":
            return {
                type: "Position",
                x: currentColumn,
                y: currentLine,
                direction: "S",
            };
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
                type: "Position",
                x: position.x,
                y: position.y - 1,
                direction: position.direction,
            };
        case "S":
            return {
                type: "Position",
                x: position.x,
                y: position.y + 1,
                direction: position.direction,
            };
        case "E":
            return {
                type: "Position",
                x: position.x + 1,
                y: position.y,
                direction: position.direction,
            };
        case "W":
            return {
                type: "Position",
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
    if (char === ".") {
        grid.set(`${currentLine}_${currentColumn}`, {
            type: "Unvisited",
        });
    } else {
        grid.set(`${currentLine}_${currentColumn}`, { type: "Blocked" });
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

function outOfBounds(
    nextPosition: Position,
    maxColumns: number,
    maxLines: number
): boolean {
    if (nextPosition.x < 0 || nextPosition.x >= maxColumns) {
        return true;
    }

    if (nextPosition.y < 0 || nextPosition.y >= maxLines) {
        return true;
    }

    return false;
}

function isStuck(directions: Set<Directions>, direction: Directions): boolean {
    return directions.has(direction);
}

function update(
    position: Position,
    grid: Grid,
    maxLines: number,
    maxColumns: number
): Position | Escaped | Stuck {
    const nextPosition = getNextPosition(position);

    if (outOfBounds(nextPosition, maxColumns, maxLines)) {
        return { type: "Escaped" };
    }

    const cell = grid.get(`${position.y}_${position.x}`);
    if (cell === undefined) {
        throw new Error("Cell not found");
    }

    if (cell.type === "Visited") {
        if (isStuck(cell.directions, position.direction)) {
            return { type: "Stuck" };
        }

        cell.directions.add(position.direction);
    } else {
        const directions = new Set<Directions>();
        directions.add(position.direction);
        grid.set(`${position.y}_${position.x}`, {
            type: "Visited",
            directions,
        });
    }

    const nextCell = grid.get(`${nextPosition.y}_${nextPosition.x}`);
    if (nextCell === undefined) {
        throw new Error("Next cell not found");
    }

    if (nextCell.type === "Blocked") {
        return rotate(position);
    }

    return nextPosition;
}

function resultsInStuck(
    startingPosition: Position,
    grid: Grid,
    maxLines: number,
    maxColumns: number,
    row: number,
    col: number
) {
    if (startingPosition.x !== col || startingPosition.y !== row) {
        if (grid.get(`${row}_${col}`)?.type === "Unvisited") {
            grid.set(`${row}_${col}`, { type: "Blocked" });
        } else {
            return false;
        }
    } else {
        return false;
    }

    let position: Position | Stuck | Escaped = { ...startingPosition };

    while (position.type === "Position") {
        position = update(position, grid, maxLines, maxColumns);
    }
    return position.type === "Stuck";
}

const data = fs.readFileSync("./data.txt").toString().split("\n");

const position = data.reduce(
    (startingPosition: Position | null, line: string, currentLine: number) =>
        findStartingPositionOnLine(startingPosition, line, currentLine),
    null
);

if (position === null) {
    throw new Error("No starting position found");
}

const grid = data.reduce(
    (currentGrid: Grid, line: string, currentLine: number) =>
        reduceLine(currentGrid, line, currentLine),
    new Map<string, Cell>()
);

const maxLines = getMaxLines(data);
const maxColumns = getMaxColumns(data);

let stuckCount = 0;
for (let row = 0; row < maxLines; row++) {
    for (let col = 0; col < maxColumns; col++) {
        console.log("processing", row, col);
        if (
            resultsInStuck(
                position,
                new Map(grid),
                maxLines,
                maxColumns,
                row,
                col
            )
        ) {
            stuckCount++;
        }
    }
}

console.log(stuckCount);
