const Ship = require('../src/ship');

export class GameBoard {
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

                // Again, ensure the row and col are within bounds (redundant, but safe)
                if (row < this.height && col < this.width && row >= 0 && col >= 0) {
                    this.board[row][col] = { ship, part: i };
                }
            }
            this.ships.push(ship);
            return true;
        }
        return false; // Can't place ship
    }


    canPlaceShip(ship, startRow, startCol, orientation) {
        for (let i = 0; i < ship.length; i++) {
            const row = orientation === 'horizontal' ? startRow : startRow + i;
            const col = orientation === 'horizontal' ? startCol + i : startCol;

            // Ensure row and col are within bounds before accessing the board
            if (row >= this.height || col >= this.width || row < 0 || col < 0) {
                return false; // Out of bounds
            }

            // Check if the space is already occupied
            if (this.board[row][col] !== null) {
                return false; // Space is already taken by another ship
            }
        }
        return true; // Can place ship
    }

    receiveAttack(row, col) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            throw new Error(`Invalid attack coordinates: (${row}, ${col})`);
        }

        const target = this.board[row][col];

        if (target && target.ship) {
            target.ship.isHit(target.part); // Hit the specific part of the ship
            this.board[row][col] = 'hit';
            return true; // Hit
        } else {
            if (this.board[row][col] !== 'miss') {
                this.board[row][col] = 'miss';
                this.missedAttacks.push({ row, col });
            }
            return false; // Miss
        }
    }


    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

// module.exports = GameBoard;
