const GameBoard = require('../board')
const Ship = require('../ship')

test("placing of carrier", () => {
    const gameBoard = new GameBoard()
    const carrier = new Ship('carrier', 5)

    gameBoard.placeShip(carrier, 0, 0, 'horizontal')
    expect(gameBoard.board[0][0]).toBe(carrier);
    expect(gameBoard.board[0][4]).toBe(carrier);

})

test('expecting to be attacked', () => {
    const gameBoard = new GameBoard()
    const carrier = new Ship('carrier', 5)

    gameBoard.placeShip(carrier, 0, 0, 'horizontal')

    expect(gameBoard.receiveAttack(0, 0)).toBe(true)
    expect(gameBoard.receiveAttack(1, 1)).toBe(false)
    expect(carrier.hits).toBe(1)


})

test('tracking missed attacks', () => {
    const gameBoard = new GameBoard();
    const carrier = new Ship('Carrier', 5);

    gameBoard.placeShip(carrier, 0, 0, 'horizontal');
    gameBoard.receiveAttack(1, 1); // Miss
    gameBoard.receiveAttack(2, 2); // Miss

    // Ensure no duplicates in missedAttacks
    expect(gameBoard.missedAttacks.length).toBe(2);
    expect(gameBoard.missedAttacks).toContainEqual({ row: 1, col: 1 });
    expect(gameBoard.missedAttacks).toContainEqual({ row: 2, col: 2 });
});
