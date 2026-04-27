export const MAX_MATRIX_SIZE = 6;
export const EPSILON = 1e-10;

export function parseNumberToken(token, label = "Value") {
  const text = String(token ?? "").trim();
  if (!text) {
    throw new Error(`${label} is required`);
  }

  if (text.includes("/")) {
    const parts = text.split("/").map((part) => part.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error(`${label} must be a number or a simple fraction`);
    }
    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      throw new Error(`${label} must be a valid fraction`);
    }
    return numerator / denominator;
  }

  const value = Number(text);
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a real number`);
  }
  return value;
}

export function parseMatrix(text, label = "Matrix") {
  const rows = String(text ?? "")
    .trim()
    .split(/\n|;/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row, rowIndex) =>
      row
        .split(/[\s,]+/)
        .filter(Boolean)
        .map((value, columnIndex) => parseNumberToken(value, `${label} entry (${rowIndex + 1}, ${columnIndex + 1})`))
    );

  validateMatrix(rows, label);
  return rows;
}

export function parseVector(text, label = "Vector") {
  const vector = String(text ?? "")
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean)
    .map((value, index) => parseNumberToken(value, `${label} entry ${index + 1}`));

  if (!vector.length) {
    throw new Error(`${label} is required`);
  }
  if (vector.length > MAX_MATRIX_SIZE) {
    throw new Error(`${label} can contain at most ${MAX_MATRIX_SIZE} entries`);
  }
  return vector;
}

export function validateMatrix(matrix, label = "Matrix") {
  if (!Array.isArray(matrix) || !matrix.length) {
    throw new Error(`${label} must contain at least one row`);
  }
  if (matrix.length > MAX_MATRIX_SIZE) {
    throw new Error(`${label} can have at most ${MAX_MATRIX_SIZE} rows`);
  }

  const columns = Array.isArray(matrix[0]) ? matrix[0].length : 0;
  if (!columns) {
    throw new Error(`${label} must contain at least one column`);
  }
  if (columns > MAX_MATRIX_SIZE) {
    throw new Error(`${label} can have at most ${MAX_MATRIX_SIZE} columns`);
  }

  matrix.forEach((row, rowIndex) => {
    if (!Array.isArray(row) || row.length !== columns) {
      throw new Error(`${label} must be rectangular`);
    }
    row.forEach((value, columnIndex) => {
      if (!Number.isFinite(value)) {
        throw new Error(`${label} entry (${rowIndex + 1}, ${columnIndex + 1}) must be a real number`);
      }
    });
  });
}

export function shape(matrix) {
  validateMatrix(matrix);
  return { rows: matrix.length, columns: matrix[0].length };
}

export function isSquare(matrix) {
  const { rows, columns } = shape(matrix);
  return rows === columns;
}

export function requireSquare(matrix, label = "Matrix") {
  if (!isSquare(matrix)) {
    throw new Error(`${label} must be square`);
  }
}

export function cloneMatrix(matrix) {
  validateMatrix(matrix);
  return matrix.map((row) => row.slice());
}

export function cleanNumber(value, epsilon = EPSILON) {
  if (Math.abs(value) < epsilon) {
    return 0;
  }
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < epsilon) {
    return rounded;
  }
  const roundedDecimal = Number(value.toFixed(12));
  if (Math.abs(value - roundedDecimal) < epsilon) {
    return roundedDecimal;
  }
  return value;
}

export function cleanMatrix(matrix, epsilon = EPSILON) {
  return matrix.map((row) => row.map((value) => cleanNumber(value, epsilon)));
}

export function formatNumber(value, precision = 8) {
  const cleaned = cleanNumber(Number(value));
  if (!Number.isFinite(cleaned)) {
    return String(cleaned);
  }
  if (Number.isInteger(cleaned)) {
    return String(cleaned);
  }
  return cleaned.toFixed(precision).replace(/\.?0+$/, "");
}

export function matrixAdd(A, B) {
  requireSameShape(A, B);
  return A.map((row, i) => row.map((value, j) => cleanNumber(value + B[i][j])));
}

export function matrixSubtract(A, B) {
  requireSameShape(A, B);
  return A.map((row, i) => row.map((value, j) => cleanNumber(value - B[i][j])));
}

export function matrixScalarMultiply(A, scalar) {
  validateMatrix(A);
  return A.map((row) => row.map((value) => cleanNumber(value * scalar)));
}

export function matrixMultiply(A, B) {
  validateMatrix(A, "Matrix A");
  validateMatrix(B, "Matrix B");
  if (A[0].length !== B.length) {
    throw new Error("The number of columns in Matrix A must equal the number of rows in Matrix B");
  }

  return A.map((row) =>
    B[0].map((_, columnIndex) =>
      cleanNumber(row.reduce((sum, value, k) => sum + value * B[k][columnIndex], 0))
    )
  );
}

export function hadamardProduct(A, B) {
  requireSameShape(A, B);
  return A.map((row, i) => row.map((value, j) => cleanNumber(value * B[i][j])));
}

export function tensorProduct(A, B) {
  validateMatrix(A, "Matrix A");
  validateMatrix(B, "Matrix B");
  const result = [];
  for (const rowA of A) {
    for (const rowB of B) {
      const row = [];
      for (const valueA of rowA) {
        for (const valueB of rowB) {
          row.push(cleanNumber(valueA * valueB));
        }
      }
      result.push(row);
    }
  }
  return result;
}

export function transpose(A) {
  validateMatrix(A);
  return A[0].map((_, columnIndex) => A.map((row) => row[columnIndex]));
}

export function trace(A) {
  requireSquare(A);
  return cleanNumber(A.reduce((sum, row, index) => sum + row[index], 0));
}

export function identityMatrix(size) {
  if (!Number.isInteger(size) || size < 1 || size > MAX_MATRIX_SIZE) {
    throw new Error(`Matrix size must be an integer from 1 to ${MAX_MATRIX_SIZE}`);
  }
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
  );
}

export function matrixPower(A, exponent) {
  requireSquare(A);
  if (!Number.isInteger(exponent) || exponent < 0 || exponent > 12) {
    throw new Error("The exponent must be an integer from 0 to 12");
  }
  let result = identityMatrix(A.length);
  let base = cloneMatrix(A);
  let power = exponent;

  while (power > 0) {
    if (power % 2 === 1) {
      result = matrixMultiply(result, base);
    }
    power = Math.floor(power / 2);
    if (power > 0) {
      base = matrixMultiply(base, base);
    }
  }
  return result;
}

export function determinant(A) {
  requireSquare(A);
  const n = A.length;
  if (n === 1) {
    return cleanNumber(A[0][0]);
  }
  if (n === 2) {
    return cleanNumber(A[0][0] * A[1][1] - A[0][1] * A[1][0]);
  }

  let total = 0;
  for (let column = 0; column < n; column += 1) {
    const sign = column % 2 === 0 ? 1 : -1;
    total += sign * A[0][column] * determinant(minorMatrix(A, 0, column));
  }
  return cleanNumber(total);
}

export function minorMatrix(A, rowToRemove, columnToRemove) {
  requireSquare(A);
  return A
    .filter((_, rowIndex) => rowIndex !== rowToRemove)
    .map((row) => row.filter((_, columnIndex) => columnIndex !== columnToRemove));
}

export function cofactor(A, row, column) {
  requireSquare(A);
  const sign = (row + column) % 2 === 0 ? 1 : -1;
  return cleanNumber(sign * determinant(minorMatrix(A, row, column)));
}

export function cofactorMatrix(A) {
  requireSquare(A);
  if (A.length === 1) {
    return [[1]];
  }
  return A.map((row, i) => row.map((_, j) => cofactor(A, i, j)));
}

export function adjugate(A) {
  return transpose(cofactorMatrix(A));
}

export function inverseByGaussJordan(A) {
  requireSquare(A);
  const n = A.length;
  const augmented = A.map((row, i) => row.concat(identityMatrix(n)[i]));
  const { matrix } = rref(augmented);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const expected = i === j ? 1 : 0;
      if (Math.abs(matrix[i][j] - expected) > EPSILON) {
        throw new Error("Matrix A is singular and does not have an inverse");
      }
    }
  }
  return cleanMatrix(matrix.map((row) => row.slice(n)));
}

export function rref(inputMatrix, epsilon = EPSILON) {
  const matrix = cloneMatrix(inputMatrix);
  const rows = matrix.length;
  const columns = matrix[0].length;
  const pivotColumns = [];
  let pivotRow = 0;

  for (let column = 0; column < columns && pivotRow < rows; column += 1) {
    let bestRow = pivotRow;
    for (let row = pivotRow + 1; row < rows; row += 1) {
      if (Math.abs(matrix[row][column]) > Math.abs(matrix[bestRow][column])) {
        bestRow = row;
      }
    }

    if (Math.abs(matrix[bestRow][column]) <= epsilon) {
      continue;
    }

    [matrix[pivotRow], matrix[bestRow]] = [matrix[bestRow], matrix[pivotRow]];

    const pivot = matrix[pivotRow][column];
    for (let j = column; j < columns; j += 1) {
      matrix[pivotRow][j] /= pivot;
    }

    for (let row = 0; row < rows; row += 1) {
      if (row === pivotRow) {
        continue;
      }
      const factor = matrix[row][column];
      if (Math.abs(factor) <= epsilon) {
        continue;
      }
      for (let j = column; j < columns; j += 1) {
        matrix[row][j] -= factor * matrix[pivotRow][j];
      }
    }

    pivotColumns.push(column);
    pivotRow += 1;
  }

  return { matrix: cleanMatrix(matrix, epsilon), pivotColumns };
}

export function rank(A) {
  return rref(A).pivotColumns.length;
}

export function rowSpaceBasis(A) {
  const reduced = rref(A).matrix;
  return reduced.filter((row) => row.some((value) => Math.abs(value) > EPSILON));
}

export function columnSpaceBasis(A) {
  validateMatrix(A);
  const { pivotColumns } = rref(A);
  return {
    pivotColumns,
    basis: pivotColumns.map((column) => A.map((row) => row[column])),
  };
}

export function nullSpaceBasis(A) {
  validateMatrix(A);
  const { matrix, pivotColumns } = rref(A);
  const columns = A[0].length;
  const pivotSet = new Set(pivotColumns);
  const freeColumns = [];
  for (let column = 0; column < columns; column += 1) {
    if (!pivotSet.has(column)) {
      freeColumns.push(column);
    }
  }

  const basis = freeColumns.map((freeColumn) => {
    const vector = Array(columns).fill(0);
    vector[freeColumn] = 1;
    pivotColumns.forEach((pivotColumn, pivotRow) => {
      vector[pivotColumn] = cleanNumber(-matrix[pivotRow][freeColumn]);
    });
    return vector;
  });

  return { freeColumns, basis };
}

export function solveLinearSystem(A, b) {
  validateMatrix(A, "Coefficient matrix");
  if (!Array.isArray(b) || b.length !== A.length) {
    throw new Error("The constant vector must have one entry for each row of Matrix A");
  }
  b.forEach((value, index) => {
    if (!Number.isFinite(value)) {
      throw new Error(`Constant vector entry ${index + 1} must be a real number`);
    }
  });

  const augmented = A.map((row, i) => row.concat(b[i]));
  const { matrix, pivotColumns } = rref(augmented);
  const variableCount = A[0].length;

  const inconsistent = matrix.some((row) => {
    const leftIsZero = row.slice(0, variableCount).every((value) => Math.abs(value) <= EPSILON);
    return leftIsZero && Math.abs(row[variableCount]) > EPSILON;
  });
  if (inconsistent) {
    return { type: "inconsistent", rref: matrix, pivotColumns };
  }

  const coefficientPivots = pivotColumns.filter((column) => column < variableCount);
  const solution = Array(variableCount).fill(0);
  coefficientPivots.forEach((pivotColumn, pivotRow) => {
    solution[pivotColumn] = cleanNumber(matrix[pivotRow][variableCount]);
  });

  return {
    type: coefficientPivots.length === variableCount ? "unique" : "infinite",
    solution,
    rref: matrix,
    pivotColumns: coefficientPivots,
    freeColumns: Array.from({ length: variableCount }, (_, i) => i).filter((i) => !coefficientPivots.includes(i)),
  };
}

export function cramerRule(A, b) {
  requireSquare(A, "Coefficient matrix");
  if (b.length !== A.length) {
    throw new Error("The constant vector must match the number of equations");
  }
  const detA = determinant(A);
  if (Math.abs(detA) <= EPSILON) {
    throw new Error("Cramer's rule requires det(A) to be nonzero");
  }

  const determinants = A.map((_, column) => {
    const replaced = A.map((row, rowIndex) =>
      row.map((value, columnIndex) => (columnIndex === column ? b[rowIndex] : value))
    );
    return determinant(replaced);
  });

  return {
    detA,
    determinants,
    solution: determinants.map((value) => cleanNumber(value / detA)),
  };
}

export function linearCombination(coefficients, vectors) {
  if (!Array.isArray(vectors) || !vectors.length) {
    throw new Error("At least one vector is required");
  }
  if (coefficients.length !== vectors.length) {
    throw new Error("The number of coefficients must match the number of vectors");
  }
  const width = vectors[0].length;
  vectors.forEach((vector) => {
    if (vector.length !== width) {
      throw new Error("All vectors must have the same dimension");
    }
  });

  return Array.from({ length: width }, (_, column) =>
    cleanNumber(vectors.reduce((sum, vector, row) => sum + coefficients[row] * vector[column], 0))
  );
}

export function gramSchmidt(vectors) {
  if (!Array.isArray(vectors) || !vectors.length) {
    throw new Error("At least one vector is required");
  }
  const width = vectors[0].length;
  vectors.forEach((vector) => {
    if (vector.length !== width) {
      throw new Error("All vectors must have the same dimension");
    }
  });

  const orthonormal = [];
  const skipped = [];

  vectors.forEach((vector, index) => {
    let current = vector.slice();
    for (const basisVector of orthonormal) {
      const projectionScale = dot(current, basisVector);
      current = current.map((value, i) => value - projectionScale * basisVector[i]);
    }

    const length = norm(current);
    if (length <= EPSILON) {
      skipped.push(index);
      return;
    }
    orthonormal.push(current.map((value) => cleanNumber(value / length)));
  });

  return { orthonormal, skipped };
}

export function characteristicPolynomialCoefficients(A) {
  requireSquare(A);
  const n = A.length;
  let B = identityMatrix(n);
  const coefficients = [1];

  for (let k = 1; k <= n; k += 1) {
    const AB = matrixMultiply(A, B);
    const coefficient = cleanNumber(-trace(AB) / k);
    coefficients.push(coefficient);
    B = matrixAdd(AB, matrixScalarMultiply(identityMatrix(n), coefficient));
  }

  return coefficients;
}

export function solveLinearProgram2D(objective, constraints, goal = "max") {
  if (!Array.isArray(objective) || objective.length !== 2) {
    throw new Error("The objective function must have x and y coefficients");
  }
  if (!Array.isArray(constraints) || constraints.length < 2) {
    throw new Error("At least two constraints are required");
  }

  const normalizedGoal = goal === "min" ? "min" : "max";
  const normalizedConstraints = constraints.map((constraint, index) => normalizeConstraint(constraint, index));
  const points = [];

  for (let i = 0; i < normalizedConstraints.length; i += 1) {
    for (let j = i + 1; j < normalizedConstraints.length; j += 1) {
      const point = intersectConstraints(normalizedConstraints[i], normalizedConstraints[j]);
      if (!point) {
        continue;
      }
      if (isPointFeasible(point, normalizedConstraints)) {
        addUniquePoint(points, point);
      }
    }
  }

  if (!points.length) {
    return { feasiblePoints: [], optimum: null };
  }

  const feasiblePoints = points
    .map((point) => ({
      x: cleanNumber(point.x),
      y: cleanNumber(point.y),
      value: cleanNumber(objective[0] * point.x + objective[1] * point.y),
    }))
    .sort((a, b) => a.x - b.x || a.y - b.y);

  const optimum = feasiblePoints.reduce((best, point) => {
    if (!best) {
      return point;
    }
    return normalizedGoal === "max"
      ? point.value > best.value + EPSILON ? point : best
      : point.value < best.value - EPSILON ? point : best;
  }, null);

  return { feasiblePoints, optimum };
}

function requireSameShape(A, B) {
  validateMatrix(A, "Matrix A");
  validateMatrix(B, "Matrix B");
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
}

function dot(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function normalizeConstraint(constraint, index) {
  const relation = constraint.relation || constraint.operator;
  if (!["<=", ">=", "="].includes(relation)) {
    throw new Error(`Constraint ${index + 1} must use <=, >=, or =`);
  }
  const normalized = {
    a: Number(constraint.a),
    b: Number(constraint.b),
    relation,
    c: Number(constraint.c),
  };
  if (!Number.isFinite(normalized.a) || !Number.isFinite(normalized.b) || !Number.isFinite(normalized.c)) {
    throw new Error(`Constraint ${index + 1} must contain real numbers`);
  }
  if (Math.abs(normalized.a) <= EPSILON && Math.abs(normalized.b) <= EPSILON) {
    throw new Error(`Constraint ${index + 1} must contain x or y`);
  }
  return normalized;
}

function intersectConstraints(first, second) {
  const determinantValue = first.a * second.b - second.a * first.b;
  if (Math.abs(determinantValue) <= EPSILON) {
    return null;
  }
  return {
    x: (first.c * second.b - second.c * first.b) / determinantValue,
    y: (first.a * second.c - second.a * first.c) / determinantValue,
  };
}

function isPointFeasible(point, constraints) {
  return constraints.every((constraint) => {
    const lhs = constraint.a * point.x + constraint.b * point.y;
    if (constraint.relation === "<=") {
      return lhs <= constraint.c + EPSILON;
    }
    if (constraint.relation === ">=") {
      return lhs >= constraint.c - EPSILON;
    }
    return Math.abs(lhs - constraint.c) <= EPSILON;
  });
}

function addUniquePoint(points, point) {
  const duplicate = points.some(
    (existing) => Math.abs(existing.x - point.x) <= EPSILON && Math.abs(existing.y - point.y) <= EPSILON
  );
  if (!duplicate) {
    points.push(point);
  }
}
