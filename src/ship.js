export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = new Array(length).fill(false); // Track hits for each part of the ship
    }

    isHit(position) {
        if (position >= 0 && position < this.length) {
            this.hits[position] = true; // Mark the part as hit
        }
    }

    isSunk() {
        return this.hits.every(hit => hit === true); // Ship is sunk if all parts are hit
    }
}

// module.exports = Ship;




// module.exports = Ship;
