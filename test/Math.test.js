const operations = require('../controllers/Math')

test('suma 1 +2 debe ser 3', () => {
    expect(operations.Sumar(1,2)).toBe(3);
});

test('suma -1 + -4 debe ser -5', () => {
    expect(operations.Sumar(-1,-4)).toBe(-5);
});

test('suma -1 + -4 debe ser -5', () => {
    expect(operations.Sumar(-1,3)).toBe(2);
});
test('resta 5 - 3 debe ser 2', () => {
    expect(operations.Restar(5,3)).toBe(2);
});
test('resta 0 - 3 debe ser -3', () => {
    expect(operations.Restar(0,3)).toBe(-3);
});

test('resta -2 - -2 debe ser 0', () => {
    expect(operations.Restar(-2,-2)).toBe(0);
});

test('multiplica 3 * 4 debe ser 12', () => {
    expect(operations.Multiplicar(3,4)).toBe(12);
}); 
test('multiplica -3 * 4 debe ser -12', () => {
    expect(operations.Multiplicar(-3,4)).toBe(-12);
});