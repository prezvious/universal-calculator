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

export function parseBigIntStrict(value, label = "Value") {
  if (typeof value === "bigint") {
    return value;
  }

  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      throw new Error(`${label} must be an integer`);
    }

    return BigInt(value);
  }

  const text = String(value).trim();
  if (!/^[+-]?\d+$/.test(text)) {
    throw new Error(`${label} must be an integer`);
  }

  return BigInt(text);
}

export function modBigInt(value, modulus) {
  const m = parseBigIntStrict(modulus, "Modulus");
  if (m <= 0n) {
    throw new Error("Modulus must be a positive integer");
  }

  return ((parseBigIntStrict(value) % m) + m) % m;
}

export function gcdBigInt(a, b) {
  let x = parseBigIntStrict(a);
  let y = parseBigIntStrict(b);

  if (x < 0n) x = -x;
  if (y < 0n) y = -y;

  while (y !== 0n) {
    const next = x % y;
    x = y;
    y = next;
  }

  return x;
}

function extendedGcdBigInt(a, b) {
  let oldR = parseBigIntStrict(a);
  let r = parseBigIntStrict(b);
  let oldS = 1n;
  let s = 0n;

  while (r !== 0n) {
    const quotient = oldR / r;
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
  }

  return { gcd: oldR < 0n ? -oldR : oldR, coefficient: oldS };
}

export function modularInverse(a, modulus) {
  const m = parseBigIntStrict(modulus, "Modulus");
  if (m <= 0n) {
    throw new Error("Modulus must be a positive integer");
  }

  if (m === 1n) {
    return 0n;
  }

  const { gcd, coefficient } = extendedGcdBigInt(a, m);
  if (gcd !== 1n) {
    throw new Error("Modular inverse exists only when gcd(a, m) = 1");
  }

  return modBigInt(coefficient, m);
}

export function modPowBigInt(base, exponent, modulus, options = {}) {
  const m = parseBigIntStrict(modulus, "Modulus");
  const k = parseBigIntStrict(exponent, "Exponent");
  if (m <= 0n) {
    throw new Error("Modulus must be a positive integer");
  }
  if (k < 0n) {
    throw new Error("Exponent must be non-negative");
  }

  const maxSteps = options.maxSteps ?? 128;
  let result = 1n % m;
  let baseResidue = modBigInt(base, m);
  let remainingExponent = k;
  let bitIndex = 0;
  const steps = [];
  let truncated = false;

  while (remainingExponent > 0n) {
    const bit = remainingExponent % 2n;
    const resultBefore = result;

    if (bit === 1n) {
      result = (result * baseResidue) % m;
    }

    if (steps.length < maxSteps) {
      steps.push({
        bitIndex,
        bit: Number(bit),
        baseResidue,
        resultBefore,
        resultAfter: result
      });
    } else {
      truncated = true;
    }

    baseResidue = (baseResidue * baseResidue) % m;
    remainingExponent /= 2n;
    bitIndex += 1;
  }

  return {
    result,
    steps,
    stepsTruncated: truncated
  };
}

function isPrimeSmall(n) {
  if (n < 2n) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;

  for (let divisor = 3n; divisor * divisor <= n; divisor += 2n) {
    if (n % divisor === 0n) {
      return false;
    }
  }

  return true;
}

function eulerPhiSmall(n) {
  let remaining = n;
  let result = n;

  for (let factor = 2n; factor * factor <= remaining; factor += 1n) {
    if (remaining % factor !== 0n) {
      continue;
    }

    while (remaining % factor === 0n) {
      remaining /= factor;
    }

    result -= result / factor;
  }

  if (remaining > 1n) {
    result -= result / remaining;
  }

  return result;
}

export function getPowerModReductionInfo(base, exponent, modulus, factorLimit = 1000000n) {
  const a = parseBigIntStrict(base, "Base");
  const k = parseBigIntStrict(exponent, "Exponent");
  const m = parseBigIntStrict(modulus, "Modulus");
  if (m <= 0n) {
    throw new Error("Modulus must be a positive integer");
  }

  const gcd = gcdBigInt(a, m);
  const canFactor = m > 1n && m <= factorLimit;
  const info = {
    gcd,
    isCoprime: gcd === 1n,
    canFactor,
    factorLimit,
    isPrime: null,
    phi: null,
    reducedExponent: null,
    theorem: null
  };

  if (!canFactor) {
    return info;
  }

  info.isPrime = isPrimeSmall(m);

  if (info.isCoprime) {
    info.phi = info.isPrime ? m - 1n : eulerPhiSmall(m);
    info.reducedExponent = k >= 0n ? k % info.phi : null;
    info.theorem = info.isPrime ? "Fermat" : "Euler";
  }

  return info;
}

export function calculatePowerMod(base, exponent, modulus, options = {}) {
  const a = parseBigIntStrict(base, "Base");
  const k = parseBigIntStrict(exponent, "Exponent");
  const m = parseBigIntStrict(modulus, "Modulus");
  if (m <= 0n) {
    throw new Error("Modulus must be a positive integer");
  }

  let effectiveBase = a;
  let effectiveExponent = k;
  let inverse = null;

  if (k < 0n) {
    if (!options.allowNegativeExponent) {
      throw new Error("Negative exponents require the negative exponent option");
    }

    inverse = modularInverse(a, m);
    effectiveBase = inverse;
    effectiveExponent = -k;
  }

  const powerResult = modPowBigInt(effectiveBase, effectiveExponent, m, {
    maxSteps: options.maxSteps
  });

  return {
    base: a,
    exponent: k,
    modulus: m,
    effectiveBase,
    effectiveExponent,
    inverse,
    result: powerResult.result,
    steps: powerResult.steps,
    stepsTruncated: powerResult.stepsTruncated,
    gcd: gcdBigInt(a, m),
    binaryExponent: effectiveExponent.toString(2),
    reductionInfo: getPowerModReductionInfo(effectiveBase, effectiveExponent, m)
  };
}
