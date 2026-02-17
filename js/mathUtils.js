/**
 * Calculates the percentage of time elapsed and remaining.
 * @param {number} totalTime - The total time.
 * @param {number} elapsedTime - The elapsed time.
 * @returns {Object} An object containing percentageElapsed and percentageRemaining.
 * @throws {Error} If inputs are invalid.
 */
export function calculateTimePercentage(totalTime, elapsedTime) {
  if (isNaN(totalTime) || isNaN(elapsedTime)) {
    throw new Error("Please enter valid numbers");
  }

  if (totalTime <= 0) {
    throw new Error("Total time must be greater than zero");
  }

  if (elapsedTime < 0 || elapsedTime > totalTime) {
    throw new Error("Elapsed time must be between 0 and total time");
  }

  const percentageElapsed = (elapsedTime / totalTime) * 100;
  const percentageRemaining = 100 - percentageElapsed;

  return {
    percentageElapsed,
    percentageRemaining
  };
}

/**
 * Calculates the number of combinations (n choose k).
 * @param {number} n - The total number of items.
 * @param {number} k - The number of items to choose.
 * @returns {number} The number of combinations.
 */
export function combinations(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k > n / 2) k = n - k;

  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = res * (n - i + 1) / i;
  }
  if (res > Number.MAX_SAFE_INTEGER) {
    console.warn(`combinations(${n}, ${k}): result exceeds MAX_SAFE_INTEGER; precision may be lost.`);
  }
  return Math.round(res);
}

/**
 * Calculates the probability of matching exactly `matches` numbers in a standard lottery draw.
 * Uses the hypergeometric distribution with the assumption that the ticket size equals
 * the number of balls drawn (standard lottery model).
 * P(X=matches) = [C(ballsDrawn, matches) * C(poolSize - ballsDrawn, ballsDrawn - matches)] / C(poolSize, ballsDrawn)
 * @param {number} ballsDrawn - The number of balls drawn (also the ticket size).
 * @param {number} matches - The number of matches desired.
 * @param {number} poolSize - The total number of balls in the pool.
 * @returns {number} The probability of matching exactly `matches` numbers.
 */
export function calculateLotteryOdds(ballsDrawn, matches, poolSize) {
  const waysToMatch = combinations(ballsDrawn, matches);
  const waysToMiss = combinations(poolSize - ballsDrawn, ballsDrawn - matches);
  const totalCombinations = combinations(poolSize, ballsDrawn);

  if (totalCombinations === 0) return 0;

  return (waysToMatch * waysToMiss) / totalCombinations;
}
