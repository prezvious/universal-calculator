import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  adjugate,
  characteristicPolynomialCoefficients,
  cofactorMatrix,
  columnSpaceBasis,
  cramerRule,
  determinant,
  formatNumber,
  gramSchmidt,
  inverseByGaussJordan,
  nullSpaceBasis,
  parseMatrix,
  parseNumberToken,
  rank,
  rref,
  solveLinearProgram2D,
} from './linearAlgebraUtils.js';

test('parseNumberToken accepts decimals, scientific notation, and fractions', () => {
  assert.strictEqual(parseNumberToken('3/4'), 0.75);
  assert.strictEqual(parseNumberToken('-2.5e2'), -250);
  assert.throws(() => parseNumberToken('1/0'), /valid fraction/);
});

test('parseMatrix parses rectangular matrix text', () => {
  assert.deepStrictEqual(parseMatrix('1, 2; 3/2 4'), [
    [1, 2],
    [1.5, 4],
  ]);
  assert.throws(() => parseMatrix('1 2; 3'), /rectangular/);
});

test('rref and rank compute pivot structure', () => {
  const result = rref([
    [1, 2, 1],
    [2, 4, 2],
    [1, 1, 0],
  ]);
  assert.deepStrictEqual(result.matrix, [
    [1, 0, -1],
    [0, 1, 1],
    [0, 0, 0],
  ]);
  assert.deepStrictEqual(result.pivotColumns, [0, 1]);
  assert.strictEqual(rank(result.matrix), 2);
});

test('column and null space basis helpers use RREF pivots', () => {
  const A = [
    [1, 2, 3],
    [2, 4, 6],
  ];
  assert.deepStrictEqual(columnSpaceBasis(A), {
    pivotColumns: [0],
    basis: [[1, 2]],
  });
  assert.deepStrictEqual(nullSpaceBasis(A).basis, [
    [-2, 1, 0],
    [-3, 0, 1],
  ]);
});

test('determinant, cofactor matrix, adjugate, and inverse helpers work', () => {
  const A = [
    [1, 2],
    [3, 4],
  ];
  assert.strictEqual(determinant(A), -2);
  assert.deepStrictEqual(cofactorMatrix(A), [
    [4, -3],
    [-2, 1],
  ]);
  assert.deepStrictEqual(adjugate(A), [
    [4, -2],
    [-3, 1],
  ]);
  assert.deepStrictEqual(inverseByGaussJordan(A), [
    [-2, 1],
    [1.5, -0.5],
  ]);
});

test("Cramer's rule solves a nonsingular system", () => {
  const result = cramerRule(
    [
      [2, 1],
      [5, 3],
    ],
    [1, 2]
  );
  assert.strictEqual(result.detA, 1);
  assert.deepStrictEqual(result.solution, [1, -1]);
});

test('Gram-Schmidt returns an orthonormal basis and skips dependent vectors', () => {
  const result = gramSchmidt([
    [1, 0],
    [1, 1],
    [2, 2],
  ]);
  assert.strictEqual(result.orthonormal.length, 2);
  assert.deepStrictEqual(result.skipped, [2]);
  assert.strictEqual(formatNumber(result.orthonormal[1][0]), '0');
  assert.strictEqual(formatNumber(result.orthonormal[1][1]), '1');
});

test('characteristic polynomial coefficients are monic', () => {
  assert.deepStrictEqual(
    characteristicPolynomialCoefficients([
      [1, 2],
      [3, 4],
    ]),
    [1, -5, -2]
  );
});

test('linear programming corner-point solver finds optimum', () => {
  const result = solveLinearProgram2D(
    [3, 2],
    [
      { a: 1, b: 1, relation: '<=', c: 4 },
      { a: 1, b: 0, relation: '<=', c: 2 },
      { a: 0, b: 1, relation: '<=', c: 3 },
      { a: 1, b: 0, relation: '>=', c: 0 },
      { a: 0, b: 1, relation: '>=', c: 0 },
    ],
    'max'
  );
  assert.deepStrictEqual(result.optimum, { x: 2, y: 2, value: 10 });
});
