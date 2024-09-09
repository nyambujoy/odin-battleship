const GameBoard = require('../board')
const Ship = require('../ship')

test('test that a ship has been placed correctly', () => {
    let ship = new Ship('carrier', 5)
    const gameBoard = new GameBoard()

    const placed = gameBoard.placeShip(ship, 0, 0, 'horizontal')
    expect(placed).toBe(true);
    expect(gameBoard.board[0][0]).toBe(ship)
    expect(gameBoard.board[0][1]).toBe(ship)
    expect(gameBoard.board[0][2]).toBe(ship)
    expect(gameBoard.board[0][3]).toBe(ship)
    expect(gameBoard.board[0][4]).toBe(ship)

})

test('test that the ships wont overlap', () => {
    let ship1 = new Ship('Submarine', 3)
    let ship2 = new Ship('destroyer', 3)

    const gameBoard = new GameBoard()
    gameBoard.placeShip(ship1, 0, 0, 'horizontal')
    const placed = gameBoard.placeShip(ship2, 0, 1, 'horizontal')
    expect(placed).toBe(false)


})


test('test that the attacks affect the ship', () => {
    let ship = new Ship('destroyer', 3)
    const gameBoard = new GameBoard()
    gameBoard.placeShip(ship, 0, 0, 'horizontal')
    let hit = gameBoard.receiveAttack(0, 0)
    expect(hit).toBe(true)
    expect(gameBoard.board[0][0]).toBe('hit')



})

test('receive miss correctly', () => {
    const gameBoard = new GameBoard()
    let ship = new Ship('destroyer', 3)

    gameBoard.placeShip(ship, 0, 0, 'horizontal')
    let hit = gameBoard.receiveAttack(5, 5)
    expect(hit).toBe(false)
    expect(gameBoard.board[5][5]).toBe('miss')
    expect(gameBoard.missedAttacks).toContainEqual({ row: 5, col: 5 })

})