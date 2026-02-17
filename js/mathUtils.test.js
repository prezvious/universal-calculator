import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimePercentage, combinations, calculateLotteryOdds } from './mathUtils.js';

// --- calculateTimePercentage Tests ---

test('calculateTimePercentage - valid inputs', () => {
  const result = calculateTimePercentage(100, 25);
  assert.strictEqual(result.percentageElapsed, 25);
  assert.strictEqual(result.percentageRemaining, 75);
});

test('calculateTimePercentage - boundary: elapsed is 0', () => {
  const result = calculateTimePercentage(100, 0);
  assert.strictEqual(result.percentageElapsed, 0);
  assert.strictEqual(result.percentageRemaining, 100);
});

test('calculateTimePercentage - boundary: elapsed equals total', () => {
  const result = calculateTimePercentage(50, 50);
  assert.strictEqual(result.percentageElapsed, 100);
  assert.strictEqual(result.percentageRemaining, 0);
});

test('calculateTimePercentage - error: total time is 0', () => {
  assert.throws(() => calculateTimePercentage(0, 0), {
    message: 'Total time must be greater than zero'
  });
});

test('calculateTimePercentage - error: total time is negative', () => {
  assert.throws(() => calculateTimePercentage(-10, 0), {
    message: 'Total time must be greater than zero'
  });
});

test('calculateTimePercentage - error: elapsed time is negative', () => {
  assert.throws(() => calculateTimePercentage(100, -5), {
    message: 'Elapsed time must be between 0 and total time'
  });
});

test('calculateTimePercentage - error: elapsed exceeds total', () => {
  assert.throws(() => calculateTimePercentage(100, 105), {
    message: 'Elapsed time must be between 0 and total time'
  });
});

test('calculateTimePercentage - error: NaN inputs', () => {
  assert.throws(() => calculateTimePercentage(NaN, 50), {
    message: 'Please enter valid numbers'
  });
  assert.throws(() => calculateTimePercentage(100, NaN), {
    message: 'Please enter valid numbers'
  });
});

// --- Combinations Tests ---

test('combinations - standard values', () => {
    assert.strictEqual(combinations(5, 2), 10);
    assert.strictEqual(combinations(6, 3), 20);
    assert.strictEqual(combinations(10, 5), 252);
    assert.strictEqual(combinations(49, 6), 13983816);
});

test('combinations - edge cases', () => {
    assert.strictEqual(combinations(5, 0), 1);
    assert.strictEqual(combinations(5, 5), 1);
    assert.strictEqual(combinations(5, 1), 5);
    assert.strictEqual(combinations(5, 6), 0);
    assert.strictEqual(combinations(0, 0), 1);
});

// --- Lottery Odds Tests ---

test('calculateLotteryOdds - simple case', () => {
    // Pool 10, Draw 2, Match 2
    // C(10, 2) = 45 total.
    // Ways to match: C(2, 2) = 1.
    // Ways to miss: C(8, 0) = 1.
    // Prob = 1/45 = 0.0222...
    const prob = calculateLotteryOdds(2, 2, 10);
    assert.ok(Math.abs(prob - (1/45)) < 1e-10);
});

test('calculateLotteryOdds - standard 6/49 jackpot', () => {
    const prob = calculateLotteryOdds(6, 6, 49);
    const expected = 1 / 13983816;
    assert.ok(Math.abs(prob - expected) < 1e-15);
});

test('calculateLotteryOdds - impossible', () => {
    const prob = calculateLotteryOdds(6, 7, 49);
    assert.strictEqual(prob, 0);
});

test('calculateLotteryOdds - pool smaller than draw', () => {
    const prob = calculateLotteryOdds(10, 5, 5); // Pool 5, Draw 10.
    assert.strictEqual(prob, 0);
});
