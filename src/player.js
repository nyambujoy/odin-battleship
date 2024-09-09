// const GameBoard = require('../src/board')
import { GameBoard } from "./board"

export class Player {
    constructor(type) {
        this.type = type
        this.gameBoard = new GameBoard()
    }
    getRandomCoordinates() {
        const row = Math.random() * this.gameBoard.height
        const col = Math.random() * this.gameBoard.width
        return [row, col]

    }
    attack(opponent, row, col) {
        return opponent.gameBoard.receiveAttack(row, col);
    }

}

// module.exports = Player;