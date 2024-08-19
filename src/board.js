require('./ship')

class GameBoard {
    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.ships = []
        this.missedAttacks = [];
    }
    placeShip(ship, startRow, startCol, orientation) {
        // check wheteher the ship can be placed on the borad
        for (let i = 0; i < ship.length; i++) {
            let row = startRow
            let col = startCol

            if (orientation === 'horizontal') {
                col += i
            } else if (orientation === 'vertical') {
                row += i
            }

            if (row >= 10 || col >= 10 || this.board[row][col] !== null) {
                throw new Error('Cannot place ship at these coordinates.');
            }
        }

        // place the ship
        for (let i = 0; i < ship.length; i++) {
            let row = startRow;
            let col = startCol;

            if (orientation === 'horizontal') {
                col += i;
            } else if (orientation === 'vertical') {
                row += i;
            }

            this.board[row][col] = ship;
        }

        this.ships.push(ship);
    }
    receiveAttack(row, col) {
        const target = this.board[row][col];

        // Check if the target is a Ship object and not a hit/miss marker
        if (target && typeof target.isHit === 'function') {
            target.isHit();
            this.board[row][col] = 'hit'; // Mark this position as hit
            return true; // Hit
        } else {
            if (!this.board[row][col] || this.board[row][col] !== 'miss') {
                this.board[row][col] = 'miss'; // Mark this position as miss
                this.missedAttacks.push({ row, col });
            }
            return false; // Miss
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk())
    }
}

module.exports = GameBoard