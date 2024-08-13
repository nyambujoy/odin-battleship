class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    isHit() {
        this.hits += 1;
        if (this.hits >= this.length) {
            this.sink();
        }
    }

    sink() {
        this.sunk = true;
    }

    isSunk() {
        return this.sunk;
    }
}

class GameBoard {
    constructor() {
        this.size = 10 * 10
    }
}

module.exports = Ship;
