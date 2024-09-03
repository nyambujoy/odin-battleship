const GameBoard = require('../board')
const Ship = require('../ship')

test('test that a ship has been placed correctly', () => {
    let ship = new Ship('carrier', 5)
    const gameBoard = new GameBoard()

    const placed = gameBoard.placeShip(ship, 0, 0, 'horizontal')
    expect(placed.toBe(true));
})
