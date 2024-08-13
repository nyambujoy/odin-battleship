const Ship = require('../ship');

test("the carrier is hit once", () => {
    const carrier = new Ship("carrier", 5);
    expect(carrier.length).toBe(5);
    carrier.isHit();
    expect(carrier.hits).toBe(1);
});