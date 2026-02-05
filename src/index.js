const PositionState = {
    EMPTY: 0,
    RED: 1,
    YELLOW: 2
}


class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
    }

    createGrid() {
        const grid = [];
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(PositionState.EMPTY);
            }
            grid.push(row);
        }
        return grid;
    }
}
class Player {
    constructor(name, pieceColor) {
        this._name = name;
        this._pieceColor = pieceColor;
    }
}

class Game {
    grid;
    players = [
        new Player('Player 1', PositionState.YELLOW),
        new Player('Player 2', PositionState.RED)
    ]
    winnerMessage = '';
    gameOver = false;
    constructor(rows, cols) {
        this.grid = new Grid(rows, cols);
        this.currentPlayer = PositionState.RED;
    }
    resetGame() {
        this.grid = new Grid(Settings.getRows(), Settings.getCols());
        this.currentPlayer = PositionState.RED;
        this.gameOver = false;
        this.winnerMessage = '';
        return this.grid.grid;
    }
    checkWin(connectN) {
        const grid = this.grid.grid
        const rows = this.grid.rows
        const cols = this.grid.cols
        const player = this.currentPlayer

        const directions = [
            { dr: 0, dc: 1 },   // →
            { dr: 1, dc: 0 },   // ↓
            { dr: 1, dc: 1 },   // ↘
            { dr: 1, dc: -1 }   // ↙
        ]

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {

                if (grid[r][c] !== player) continue

                for (const { dr, dc } of directions) {
                    let count = 1

                    let nr = r + dr
                    let nc = c + dc

                    while (
                        nr >= 0 &&
                        nr < rows &&
                        nc >= 0 &&
                        nc < cols &&
                        grid[nr][nc] === player
                    ) {
                        count++
                        if (count === connectN) return true
                        nr += dr
                        nc += dc
                    }
                }
            }
        }

        return false
    }

    makeMove(col, setGrid) {
        for (let r = this.grid.rows - 1; r >= 0; r--) {
            if (this.grid.grid[r][col] === PositionState.EMPTY) {
                this.grid.grid[r][col] = this.currentPlayer
                console.log(`Placed ${this.currentPlayer} at row ${r}, col ${col}`);
                setGrid([...this.grid.grid.map(row => [...row])])

                if (this.checkWin(4)) {
                    this.gameOver = true
                    this.winnerMessage = `Player ${this.currentPlayer === PositionState.RED ? 'Red' : 'Yellow'} wins!`
                    return this.winnerMessage

                }
                this.switchPlayer()
                break
            }
        }


    }


    switchPlayer() {
        this.currentPlayer = this.currentPlayer === PositionState.RED ? PositionState.YELLOW : PositionState.RED;
    }


}




class Settings {
    static rows = 6;
    static cols = 7;

    static getRows() {
        return this.rows;
    }

    static getCols() {
        return this.cols;
    }
    static setRows(newRows) {
        this.rows = newRows;
    }
    static setCols(newCols) {
        this.cols = newCols;
    }
}

export { Game, Settings, PositionState };