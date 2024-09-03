# odin-battleship

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