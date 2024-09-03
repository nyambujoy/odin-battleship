const Ship = require('./ship');

class GameBoard {
    constructor() {
        this.height = 10;
        this.width = 10;
        this.board = Array.from({ length: this.height }, () => Array(this.width).fill(null));
        this.missedAttacks = [];
        this.ships = [];
    }

    placeShip(ship, startRow, startCol, orientation) {
        if (this.canPlaceShip(ship, startRow, startCol, orientation)) {
            for (let i = 0; i < ship.length; i++) {
                const row = orientation === 'horizontal' ? startRow : startRow + i;
                const col = orientation === 'horizontal' ? startCol + i : startCol;
                this.board[row][col] = ship;
            }
            this.ships.push(ship);
            return true;
        }
        return false;
    }

    canPlaceShip(ship, startRow, startCol, orientation) {
        for (let i = 0; i < ship.length; i++) {
            const row = orientation === 'horizontal' ? startRow : startRow + i;
            const col = orientation === 'horizontal' ? startCol + i : startCol;

            // Check if within bounds and not overlapping another ship
            if (row >= this.height || col >= this.width || this.board[row][col] !== null) {
                return false;
            }
        }
        return true;
    }

    receiveAttack(row, col) {
        const target = this.board[row][col];

        if (target && typeof target.isHit === 'function') {
            target.isHit();
            this.board[row][col] = 'hit'; // Mark as hit
            return true; // Hit
        } else {
            if (this.board[row][col] !== 'miss') {
                this.board[row][col] = 'miss'; // Mark as miss
                this.missedAttacks.push({ row, col });
            }
            return false; // Miss
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

module.exports = GameBoard;
