export const DOMController = {
    renderBoard(gameBoard, boardId, hideShips = false) {
        const boardElement = document.getElementById(boardId);
        boardElement.innerHTML = ''; // Clear previous board

        for (let row = 0; row < gameBoard.height; row++) {
            for (let col = 0; col < gameBoard.width; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = row;
                square.dataset.col = col;

                if (gameBoard.board[row][col] && !hideShips) {
                    square.style.backgroundColor = 'grey'; // Display ship position
                }
                boardElement.appendChild(square);
            }
        }
    },

    updateSquare(boardId, row, col, hit) {
        const boardElement = document.getElementById(boardId);
        const square = boardElement.querySelector(`[data-row='${row}'][data-col='${col}']`);
        if (hit) {
            square.style.backgroundColor = 'red'; // Hit
        } else {
            square.style.backgroundColor = 'blue'; // Miss
        }
    }
};
