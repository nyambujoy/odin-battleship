import { GameBoard } from '../src/board.js';
import { Player } from '../src/player.js';
import { Ship } from '../src/ship.js';
import { DOMController } from '../src/dom.js';

const playerBoard = new GameBoard();
const computerBoard = new GameBoard();
const player = new Player('real', playerBoard);
const computer = new Player('computer', computerBoard);

// Create ships and place them (for now, placing at predefined coordinates)
const ships = [
    new Ship('Destroyer', 2),
    new Ship('Submarine', 3),
    new Ship('Cruiser', 3),
    new Ship('Battleship', 4),
    new Ship('Carrier', 5)
];

// Place ships on boards for both player and computer (static placement for now)
playerBoard.placeShip('horizontal', ships[0], 0);
computerBoard.placeShip('horizontal', ships[0], 0); // Randomize for computer later

// Render initial boards
DOMController.renderBoard(playerBoard, 'player-board');
DOMController.renderBoard(computerBoard, 'computer-board', true); // hide ships on the computer's board

// Add event listeners for the computer board squares
document.querySelectorAll('#computer-board .square').forEach((square, index) => {
    square.addEventListener('click', () => {
        const row = Math.floor(index / 10);
        const col = index % 10;

        // Player attacks computer's board
        const hit = player.attack(computer, row, col);
        DOMController.updateSquare('computer-board', row, col, hit);

        // Check for game over
        if (computerBoard.allShipsSunk()) {
            alert("Player Wins!");
        } else {
            // Computer attacks
            const computerMove = computer.randomAttack(player);
            DOMController.updateSquare('player-board', computerMove.row, computerMove.col, computerMove.hit);

            if (playerBoard.allShipsSunk()) {
                alert("Computer Wins!");
            }
        }
    });
});
