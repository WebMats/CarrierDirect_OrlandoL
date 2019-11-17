const { genId } = require('./products');


test('should generate a defined id', () => {
    expect(genId()).toBeDefined();
})

test('should generate an id that is not falsy', () => {
    expect(genId()).not.toBeFalsy();
})