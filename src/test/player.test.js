
const GameBoard = require('../board');
const Player = require('../player')
// const Ship = require('../ship')



test('Player has its own GameBoard', () => {
    const player = new Player('real');
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
});

test('Real player can attack and register hits', () => {
    const player1 = new Player('real');
    const player2 = new Player('real');

    const ship = new (require('../ship'))('Destroyer', 1);
    player2.gameBoard.placeShip(ship, 0, 0, 'horizontal');

    const result = player1.attack(player2, 0, 0);
    expect(result).toBe(true); // Expecting a hit
    expect(player2.gameBoard.board[0][0]).toBe('hit');
});

test('Computer player attacks randomly', () => {
    const computer = new Player('computer');
    const opponent = new Player('real');

    const spy = jest.spyOn(opponent.gameBoard, 'receiveAttack');
    computer.attack(opponent);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});
