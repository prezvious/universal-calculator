import { createCalculatorLayout, animateReveal } from './utils.js';
import {
  MAX_MATRIX_SIZE,
  adjugate,
  characteristicPolynomialCoefficients,
  cleanNumber,
  cofactorMatrix,
  columnSpaceBasis,
  cramerRule,
  determinant,
  formatNumber,
  gramSchmidt,
  hadamardProduct,
  inverseByGaussJordan,
  linearCombination,
  matrixAdd,
  matrixMultiply,
  matrixPower,
  matrixScalarMultiply,
  matrixSubtract,
  nullSpaceBasis,
  parseNumberToken,
  rank,
  rref,
  solveLinearProgram2D,
  solveLinearSystem,
  tensorProduct,
  trace,
  transpose,
} from './linearAlgebraUtils.js';

const RESULT_ID = "linear-algebra-result";

const MODES = [
  {
    id: "operations",
    label: "Matrix Operations",
    tools: [
      ["add", "Add"],
      ["subtract", "Subtract"],
      ["multiply", "Multiply"],
      ["scalar", "Scalar"],
      ["power", "Power"],
      ["transpose", "Transpose"],
      ["trace", "Trace"],
      ["hadamard", "Hadamard"],
      ["tensor", "Tensor"],
    ],
  },
  {
    id: "determinant",
    label: "Determinant & Inverse",
    tools: [
      ["determinant", "Determinant"],
      ["cofactorExpansion", "Cofactor Expansion"],
      ["cofactorMatrix", "Cofactor Matrix"],
      ["adjugate", "Adjugate"],
      ["inverse", "Inverse"],
      ["pseudoinverse", "Pseudoinverse"],
    ],
  },
  {
    id: "properties",
    label: "Matrix Properties",
    tools: [
      ["rank", "Rank"],
      ["norm", "Norm"],
      ["condition", "Condition Number"],
      ["characteristic", "Characteristic Polynomial"],
      ["singularValues", "Singular Values"],
    ],
  },
  {
    id: "systems",
    label: "Systems & Vector Spaces",
    tools: [
      ["linearSystem", "Linear System"],
      ["cramer", "Cramer's Rule"],
      ["gaussJordan", "Gauss-Jordan"],
      ["rref", "RREF"],
      ["linearCombination", "Linear Combination"],
      ["columnSpace", "Column Space"],
      ["nullSpace", "Null Space"],
      ["independence", "Linear Independence"],
      ["gramSchmidt", "Gram-Schmidt"],
    ],
  },
  {
    id: "eigenvalues",
    label: "Eigenvalues",
    tools: [
      ["eigenvalues", "Eigenvalues"],
      ["eigenvectors", "Eigenvectors"],
      ["eigenCharacteristic", "Characteristic Polynomial"],
      ["diagonalization", "Diagonalization"],
    ],
  },
  {
    id: "decompositions",
    label: "Decompositions",
    tools: [
      ["lu", "LU"],
      ["qr", "QR"],
      ["cholesky", "Cholesky"],
      ["svd", "SVD"],
      ["polar", "Polar"],
    ],
  },
  {
    id: "linearProgramming",
    label: "Linear Programming",
    tools: [
      ["cornerPoints", "Corner Points"],
      ["optimalValue", "Optimal Value"],
    ],
  },
];

const TOOL_LABELS = new Map(MODES.flatMap((mode) => mode.tools));

function createInitialState() {
  const firstTools = Object.fromEntries(MODES.map((mode) => [mode.id, mode.tools[0][0]]));
  return {
    modeId: MODES[0].id,
    toolByMode: firstTools,
    matrices: {
      A: {
        rows: 2,
        columns: 2,
        values: [
          ["1", "2"],
          ["3", "4"],
        ],
      },
      B: {
        rows: 2,
        columns: 2,
        values: [
          ["5", "6"],
          ["7", "8"],
        ],
      },
      V: {
        rows: 3,
        columns: 2,
        values: [
          ["1", "0"],
          ["1", "1"],
          ["2", "2"],
        ],
      },
    },
    vectors: {
      b: { size: 2, values: ["5", "11"] },
      coefficients: { size: 3, values: ["2", "-1", "3"] },
    },
    scalar: "2",
    power: "2",
    normType: "fro",
    expansionAxis: "row",
    expansionIndex: "1",
    lp: {
      goal: "max",
      objectiveX: "3",
      objectiveY: "2",
      includeNonnegative: true,
      constraints: [
        { a: "1", b: "1", relation: "<=", c: "4" },
        { a: "1", b: "0", relation: "<=", c: "2" },
        { a: "0", b: "1", relation: "<=", c: "3" },
      ],
    },
  };
}

export const linearAlgebraCalculator = {
  id: "linear-algebra-calculator",
  name: "Linear Algebra Calculator",
  description: "Work with matrices, systems, vector spaces, eigenvalues, decompositions, and two-variable linear programming.",
  educationalHTML: `
    <div class="educational-section">
      <h3>Linear Algebra</h3>
      <p>Linear algebra studies vectors, vector spaces, matrices, and linear transformations. In this calculator, matrices contain real numbers, so a typical matrix is written as \\( A \\in \\mathbb{R}^{m \\times n} \\).</p>

      <h4>Matrix Operations</h4>
      <p>Matrix addition and subtraction are defined entry by entry for matrices with the same size. Matrix multiplication combines rows of the first matrix with columns of the second matrix:</p>
      \\[
        (AB)_{ij}=\\sum_{k=1}^{n}a_{ik}b_{kj}
      \\]
      <p>The product \\( AB \\) is defined only when the number of columns of \\( A \\) equals the number of rows of \\( B \\).</p>

      <h4>Determinants and Inverses</h4>
      <p>The determinant is defined for square matrices. It detects whether a matrix is invertible and can be computed by cofactor expansion:</p>
      \\[
        \\det(A)=\\sum_j a_{ij}C_{ij}
      \\]
      <p>If \\( \\det(A)\\ne 0 \\), then the inverse exists and satisfies \\( AA^{-1}=I \\) and \\( A^{-1}A=I \\).</p>
      \\[
        A^{-1}=\\frac{1}{\\det(A)}\\operatorname{adj}(A)
      \\]

      <h4>Rank, Spaces, and Systems</h4>
      <p>Row reduction turns a matrix into reduced row echelon form. The pivot columns determine rank and help describe the column space and null space.</p>
      \\[
        \\operatorname{rank}(A)=\\text{number of pivot columns}
      \\]
      <p>A linear system \\( Ax=b \\) can have one solution, infinitely many solutions, or no solution depending on the pivot structure of the augmented matrix.</p>

      <h4>Eigenvalues and Decompositions</h4>
      <p>An eigenvalue \\( \\lambda \\) and eigenvector \\( v\\ne 0 \\) satisfy \\( Av=\\lambda v \\). Eigenvalues come from the characteristic polynomial:</p>
      \\[
        \\chi_A(\\lambda)=\\det(\\lambda I-A)
      \\]
      <p>Decompositions rewrite a matrix as a product of structured matrices, such as \\( A=LU \\), \\( A=QR \\), or \\( A=U\\Sigma V^T \\).</p>

      <h4>Linear Programming</h4>
      <p>For two-variable linear programming, the optimum of a bounded feasible region occurs at a corner point. The calculator evaluates feasible intersections of constraint boundary lines.</p>
      \\[
        z=c_1x+c_2y
      \\]
    </div>
  `,
  generateHTML: function () {
    const inputs = `
      <div class="linear-algebra-calculator">
        <div id="linear-algebra-mode-tabs" class="la-mode-tabs" role="tablist" aria-label="Linear algebra modes"></div>
        <div id="linear-algebra-tool-tabs" class="la-tool-tabs" role="tablist" aria-label="Linear algebra tools"></div>
        <div id="linear-algebra-fields" class="la-fields"></div>
        <button id="calculate-linear-algebra" class="calculate-btn" type="button">Calculate</button>
      </div>
    `;

    return createCalculatorLayout(this.name, this.description, inputs, RESULT_ID, true);
  },
  attachEvents: function () {
    const state = createInitialState();
    const resultDiv = document.getElementById(RESULT_ID);
    const modeTabs = document.getElementById("linear-algebra-mode-tabs");
    const toolTabs = document.getElementById("linear-algebra-tool-tabs");
    const fields = document.getElementById("linear-algebra-fields");
    const calculateBtn = document.getElementById("calculate-linear-algebra");
    const educationalBtn = document.getElementById("what-is-this-btn");

    if (educationalBtn) {
      educationalBtn.addEventListener("click", () => {
        animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
      });
    }

    const currentMode = () => MODES.find((mode) => mode.id === state.modeId);
    const currentTool = () => state.toolByMode[state.modeId];

    const setPlaceholder = () => {
      resultDiv.innerHTML = '<span class="result-placeholder">Choose a mode and calculate.</span>';
    };

    const render = () => {
      renderModeTabs(modeTabs, state);
      renderToolTabs(toolTabs, currentMode(), currentTool());
      fields.innerHTML = renderFields(state, currentTool());
      bindFieldEvents(fields, state, render);
      setPlaceholder();
    };

    modeTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-la-mode]");
      if (!button) {
        return;
      }
      state.modeId = button.dataset.laMode;
      render();
    });

    toolTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-la-tool]");
      if (!button) {
        return;
      }
      state.toolByMode[state.modeId] = button.dataset.laTool;
      render();
    });

    calculateBtn.addEventListener("click", () => {
      try {
        const html = calculateResult(state, currentTool());
        resultDiv.innerHTML = html;
        typeset(resultDiv);
      } catch (error) {
        resultDiv.innerHTML = `<div class="la-alert">${escapeHTML(error.message)}</div>`;
      }
    });

    render();
  },
};

function renderModeTabs(container, state) {
  container.innerHTML = MODES.map((mode) => `
    <button class="la-mode-btn ${mode.id === state.modeId ? "active" : ""}" type="button" data-la-mode="${mode.id}" role="tab" aria-selected="${mode.id === state.modeId}">
      ${mode.label}
    </button>
  `).join("");
}

function renderToolTabs(container, mode, toolId) {
  container.innerHTML = mode.tools.map(([id, label]) => `
    <button class="la-tool-btn ${id === toolId ? "active" : ""}" type="button" data-la-tool="${id}" role="tab" aria-selected="${id === toolId}">
      ${label}
    </button>
  `).join("");
}

function renderFields(state, tool) {
  if (state.modeId === "linearProgramming") {
    return renderLinearProgrammingFields(state);
  }

  const parts = [];

  if (["linearCombination", "independence", "gramSchmidt"].includes(tool)) {
    parts.push(renderMatrixEditor(state, "V", "Vectors", "Vectors are treated as rows."));
  } else {
    parts.push(renderMatrixEditor(state, "A", "Matrix A"));
  }

  if (["add", "subtract", "multiply", "hadamard", "tensor"].includes(tool)) {
    parts.push(renderMatrixEditor(state, "B", "Matrix B"));
  }

  if (tool === "scalar") {
    parts.push(renderScalarInput(state));
  }

  if (tool === "power") {
    parts.push(renderPowerInput(state));
  }

  if (tool === "norm") {
    parts.push(renderNormSelect(state));
  }

  if (tool === "cofactorExpansion") {
    parts.push(renderExpansionControls(state));
  }

  if (["linearSystem", "cramer", "gaussJordan"].includes(tool)) {
    parts.push(renderVectorEditor(state, "b", "Vector b", state.matrices.A.rows));
  }

  if (tool === "linearCombination") {
    parts.push(renderVectorEditor(state, "coefficients", "Coefficients", state.matrices.V.rows));
  }

  return parts.join("");
}

function renderMatrixEditor(state, key, label, note = "") {
  const matrix = state.matrices[key];
  ensureMatrixSize(matrix);
  const rows = optionList(MAX_MATRIX_SIZE, matrix.rows);
  const columns = optionList(MAX_MATRIX_SIZE, matrix.columns);
  const cells = [];

  for (let row = 0; row < matrix.rows; row += 1) {
    for (let column = 0; column < matrix.columns; column += 1) {
      const value = matrix.values[row]?.[column] ?? "0";
      cells.push(`
        <input type="text" inputmode="decimal" value="${escapeAttribute(value)}" aria-label="${label} row ${row + 1} column ${column + 1}" data-matrix-cell="${key}" data-row="${row}" data-column="${column}">
      `);
    }
  }

  return `
    <section class="la-card la-matrix-editor">
      <div class="la-card-header">
        <h4>${label}</h4>
        <div class="la-dimension-controls">
          <label>
            Rows
            <select data-matrix-dimension="${key}" data-dimension="rows">${rows}</select>
          </label>
          <label>
            Columns
            <select data-matrix-dimension="${key}" data-dimension="columns">${columns}</select>
          </label>
        </div>
      </div>
      ${note ? `<p class="la-note">${note}</p>` : ""}
      <div class="la-matrix-grid" style="--la-columns: ${matrix.columns};">
        ${cells.join("")}
      </div>
    </section>
  `;
}

function renderVectorEditor(state, key, label, desiredSize = null) {
  const vector = state.vectors[key];
  if (desiredSize) {
    vector.size = desiredSize;
  }
  ensureVectorSize(vector);
  const cells = [];
  for (let index = 0; index < vector.size; index += 1) {
    const value = vector.values[index] ?? "0";
    cells.push(`
      <input type="text" inputmode="decimal" value="${escapeAttribute(value)}" aria-label="${label} entry ${index + 1}" data-vector-cell="${key}" data-index="${index}">
    `);
  }

  return `
    <section class="la-card">
      <div class="la-card-header">
        <h4>${label}</h4>
        <span class="la-chip">${vector.size} entries</span>
      </div>
      <div class="la-vector-grid">${cells.join("")}</div>
    </section>
  `;
}

function renderScalarInput(state) {
  return `
    <section class="la-card">
      <label class="form-group">
        Scalar
        <input type="text" inputmode="decimal" value="${escapeAttribute(state.scalar)}" data-la-scalar>
      </label>
    </section>
  `;
}

function renderPowerInput(state) {
  return `
    <section class="la-card">
      <label class="form-group">
        Exponent
        <input type="number" min="0" max="12" step="1" value="${escapeAttribute(state.power)}" data-la-power>
      </label>
    </section>
  `;
}

function renderNormSelect(state) {
  return `
    <section class="la-card">
      <label class="form-group">
        Norm
        <select data-la-norm>
          <option value="fro" ${state.normType === "fro" ? "selected" : ""}>Frobenius</option>
          <option value="1" ${state.normType === "1" ? "selected" : ""}>1-norm</option>
          <option value="inf" ${state.normType === "inf" ? "selected" : ""}>Infinity norm</option>
          <option value="2" ${state.normType === "2" ? "selected" : ""}>2-norm</option>
        </select>
      </label>
    </section>
  `;
}

function renderExpansionControls(state) {
  return `
    <section class="la-card la-expansion-controls">
      <label class="form-group">
        Expansion
        <select data-la-expansion-axis>
          <option value="row" ${state.expansionAxis === "row" ? "selected" : ""}>Row</option>
          <option value="column" ${state.expansionAxis === "column" ? "selected" : ""}>Column</option>
        </select>
      </label>
      <label class="form-group">
        Index
        <input type="number" min="1" max="${MAX_MATRIX_SIZE}" step="1" value="${escapeAttribute(state.expansionIndex)}" data-la-expansion-index>
      </label>
    </section>
  `;
}

function renderLinearProgrammingFields(state) {
  const constraints = state.lp.constraints.map((constraint, index) => `
    <div class="la-lp-row" data-lp-row="${index}">
      <input type="text" inputmode="decimal" value="${escapeAttribute(constraint.a)}" aria-label="Constraint ${index + 1} x coefficient" data-lp-field="a" data-index="${index}">
      <span>x +</span>
      <input type="text" inputmode="decimal" value="${escapeAttribute(constraint.b)}" aria-label="Constraint ${index + 1} y coefficient" data-lp-field="b" data-index="${index}">
      <span>y</span>
      <select aria-label="Constraint ${index + 1} relation" data-lp-field="relation" data-index="${index}">
        <option value="&lt;=" ${constraint.relation === "<=" ? "selected" : ""}>&lt;=</option>
        <option value="&gt;=" ${constraint.relation === ">=" ? "selected" : ""}>&gt;=</option>
        <option value="=" ${constraint.relation === "=" ? "selected" : ""}>=</option>
      </select>
      <input type="text" inputmode="decimal" value="${escapeAttribute(constraint.c)}" aria-label="Constraint ${index + 1} value" data-lp-field="c" data-index="${index}">
      <button class="la-icon-btn" type="button" data-remove-constraint="${index}" aria-label="Remove constraint">&times;</button>
    </div>
  `).join("");

  return `
    <section class="la-card">
      <div class="la-card-header">
        <h4>Objective</h4>
        <select data-lp-goal aria-label="Optimization goal">
          <option value="max" ${state.lp.goal === "max" ? "selected" : ""}>Maximize</option>
          <option value="min" ${state.lp.goal === "min" ? "selected" : ""}>Minimize</option>
        </select>
      </div>
      <div class="la-lp-objective">
        <span>z =</span>
        <input type="text" inputmode="decimal" value="${escapeAttribute(state.lp.objectiveX)}" aria-label="Objective x coefficient" data-lp-objective="x">
        <span>x +</span>
        <input type="text" inputmode="decimal" value="${escapeAttribute(state.lp.objectiveY)}" aria-label="Objective y coefficient" data-lp-objective="y">
        <span>y</span>
      </div>
    </section>
    <section class="la-card">
      <div class="la-card-header">
        <h4>Constraints</h4>
        <button class="btn btn-secondary la-small-btn" type="button" data-add-constraint>Add Constraint</button>
      </div>
      <label class="la-checkbox-row">
        <input type="checkbox" data-lp-nonnegative ${state.lp.includeNonnegative ? "checked" : ""}>
        <span>Use x >= 0 and y >= 0</span>
      </label>
      <div class="la-lp-constraints">${constraints}</div>
    </section>
  `;
}

function bindFieldEvents(container, state, render) {
  container.querySelectorAll("[data-matrix-cell]").forEach((input) => {
    input.addEventListener("input", () => {
      const matrix = state.matrices[input.dataset.matrixCell];
      matrix.values[Number(input.dataset.row)][Number(input.dataset.column)] = input.value;
    });
  });

  container.querySelectorAll("[data-matrix-dimension]").forEach((select) => {
    select.addEventListener("change", () => {
      const matrix = state.matrices[select.dataset.matrixDimension];
      matrix[select.dataset.dimension] = Number(select.value);
      ensureMatrixSize(matrix);
      render();
    });
  });

  container.querySelectorAll("[data-vector-cell]").forEach((input) => {
    input.addEventListener("input", () => {
      const vector = state.vectors[input.dataset.vectorCell];
      vector.values[Number(input.dataset.index)] = input.value;
    });
  });

  const scalar = container.querySelector("[data-la-scalar]");
  if (scalar) {
    scalar.addEventListener("input", () => {
      state.scalar = scalar.value;
    });
  }

  const power = container.querySelector("[data-la-power]");
  if (power) {
    power.addEventListener("input", () => {
      state.power = power.value;
    });
  }

  const norm = container.querySelector("[data-la-norm]");
  if (norm) {
    norm.addEventListener("change", () => {
      state.normType = norm.value;
    });
  }

  const expansionAxis = container.querySelector("[data-la-expansion-axis]");
  if (expansionAxis) {
    expansionAxis.addEventListener("change", () => {
      state.expansionAxis = expansionAxis.value;
    });
  }

  const expansionIndex = container.querySelector("[data-la-expansion-index]");
  if (expansionIndex) {
    expansionIndex.addEventListener("input", () => {
      state.expansionIndex = expansionIndex.value;
    });
  }

  bindLinearProgrammingEvents(container, state, render);
}

function bindLinearProgrammingEvents(container, state, render) {
  const goal = container.querySelector("[data-lp-goal]");
  if (goal) {
    goal.addEventListener("change", () => {
      state.lp.goal = goal.value;
    });
  }

  const nonnegative = container.querySelector("[data-lp-nonnegative]");
  if (nonnegative) {
    nonnegative.addEventListener("change", () => {
      state.lp.includeNonnegative = nonnegative.checked;
    });
  }

  container.querySelectorAll("[data-lp-objective]").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.dataset.lpObjective === "x") {
        state.lp.objectiveX = input.value;
      } else {
        state.lp.objectiveY = input.value;
      }
    });
  });

  container.querySelectorAll("[data-lp-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const constraint = state.lp.constraints[Number(input.dataset.index)];
      constraint[input.dataset.lpField] = input.value;
    });
    input.addEventListener("change", () => {
      const constraint = state.lp.constraints[Number(input.dataset.index)];
      constraint[input.dataset.lpField] = input.value;
    });
  });

  const addButton = container.querySelector("[data-add-constraint]");
  if (addButton) {
    addButton.addEventListener("click", () => {
      state.lp.constraints.push({ a: "1", b: "1", relation: "<=", c: "1" });
      render();
    });
  }

  container.querySelectorAll("[data-remove-constraint]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.lp.constraints.length <= 1) {
        return;
      }
      state.lp.constraints.splice(Number(button.dataset.removeConstraint), 1);
      render();
    });
  });
}

function calculateResult(state, tool) {
  const label = TOOL_LABELS.get(tool) || "Result";
  switch (tool) {
    case "add":
      return matrixResult(label, matrixAdd(readMatrix(state, "A"), readMatrix(state, "B")), "\\(A+B\\)");
    case "subtract":
      return matrixResult(label, matrixSubtract(readMatrix(state, "A"), readMatrix(state, "B")), "\\(A-B\\)");
    case "multiply":
      return matrixResult(label, matrixMultiply(readMatrix(state, "A"), readMatrix(state, "B")), "\\(AB\\)");
    case "scalar":
      return matrixResult(label, matrixScalarMultiply(readMatrix(state, "A"), parseNumberToken(state.scalar, "Scalar")), "\\(cA\\)");
    case "power":
      return matrixResult(label, matrixPower(readMatrix(state, "A"), Number(state.power)), "\\(A^k\\)");
    case "transpose":
      return matrixResult(label, transpose(readMatrix(state, "A")), "\\(A^T\\)");
    case "trace":
      return scalarResult(label, trace(readMatrix(state, "A")), "\\(\\operatorname{tr}(A)\\)");
    case "hadamard":
      return matrixResult(label, hadamardProduct(readMatrix(state, "A"), readMatrix(state, "B")), "\\(A\\circ B\\)");
    case "tensor":
      return matrixResult(label, tensorProduct(readMatrix(state, "A"), readMatrix(state, "B")), "\\(A\\otimes B\\)");
    case "determinant":
      return scalarResult(label, determinantWithEngine(readMatrix(state, "A")), "\\(\\det(A)\\)");
    case "cofactorExpansion":
      return cofactorExpansionResult(state);
    case "cofactorMatrix":
      return matrixResult(label, cofactorMatrix(readMatrix(state, "A")), "\\(C(A)\\)");
    case "adjugate":
      return matrixResult(label, adjugate(readMatrix(state, "A")), "\\(\\operatorname{adj}(A)=C(A)^T\\)");
    case "inverse":
      return matrixResult(label, inverseWithEngine(readMatrix(state, "A")), "\\(A^{-1}\\)");
    case "pseudoinverse":
      return matrixResult(label, pseudoInverseWithEngine(readMatrix(state, "A")), "\\(A^+\\)");
    case "rank":
      return scalarResult(label, rankWithSvd(readMatrix(state, "A")), "\\(\\operatorname{rank}(A)\\)");
    case "norm":
      return scalarResult(label, normWithEngine(readMatrix(state, "A"), state.normType), normFormula(state.normType));
    case "condition":
      return scalarResult(label, conditionNumber(readMatrix(state, "A")), "\\(\\kappa_2(A)=\\sigma_{\\max}/\\sigma_{\\min}\\)");
    case "characteristic":
    case "eigenCharacteristic":
      return characteristicResult(readMatrix(state, "A"));
    case "singularValues":
      return vectorResult(label, singularValues(readMatrix(state, "A")), "\\(\\sigma_i\\)");
    case "linearSystem":
      return linearSystemResult(state);
    case "cramer":
      return cramerResult(state);
    case "gaussJordan":
      return gaussJordanResult(state);
    case "rref":
      return rrefResult(readMatrix(state, "A"));
    case "linearCombination":
      return linearCombinationResult(state);
    case "columnSpace":
      return columnSpaceResult(readMatrix(state, "A"));
    case "nullSpace":
      return nullSpaceResult(readMatrix(state, "A"));
    case "independence":
      return independenceResult(readMatrix(state, "V"));
    case "gramSchmidt":
      return gramSchmidtResult(readMatrix(state, "V"));
    case "eigenvalues":
      return eigenResult(readMatrix(state, "A"), false);
    case "eigenvectors":
      return eigenResult(readMatrix(state, "A"), true);
    case "diagonalization":
      return diagonalizationResult(readMatrix(state, "A"));
    case "lu":
      return luResult(readMatrix(state, "A"));
    case "qr":
      return qrResult(readMatrix(state, "A"));
    case "cholesky":
      return choleskyResult(readMatrix(state, "A"));
    case "svd":
      return svdResult(readMatrix(state, "A"));
    case "polar":
      return polarResult(readMatrix(state, "A"));
    case "cornerPoints":
    case "optimalValue":
      return linearProgrammingResult(state, tool === "optimalValue");
    default:
      throw new Error("Unsupported linear algebra tool");
  }
}

function readMatrix(state, key) {
  const matrix = state.matrices[key];
  ensureMatrixSize(matrix);
  const rows = [];
  for (let row = 0; row < matrix.rows; row += 1) {
    const values = [];
    for (let column = 0; column < matrix.columns; column += 1) {
      values.push(parseNumberToken(matrix.values[row]?.[column] ?? "0", `Matrix ${key} entry (${row + 1}, ${column + 1})`));
    }
    rows.push(values);
  }
  return rows;
}

function readVector(state, key) {
  const vector = state.vectors[key];
  ensureVectorSize(vector);
  return vector.values.slice(0, vector.size).map((value, index) => parseNumberToken(value, `${key} entry ${index + 1}`));
}

function ensureMatrixSize(matrix) {
  matrix.rows = Math.min(MAX_MATRIX_SIZE, Math.max(1, Number(matrix.rows) || 1));
  matrix.columns = Math.min(MAX_MATRIX_SIZE, Math.max(1, Number(matrix.columns) || 1));
  for (let row = 0; row < matrix.rows; row += 1) {
    if (!Array.isArray(matrix.values[row])) {
      matrix.values[row] = [];
    }
    for (let column = 0; column < matrix.columns; column += 1) {
      if (matrix.values[row][column] == null) {
        matrix.values[row][column] = "0";
      }
    }
  }
}

function ensureVectorSize(vector) {
  vector.size = Math.min(MAX_MATRIX_SIZE, Math.max(1, Number(vector.size) || 1));
  for (let index = 0; index < vector.size; index += 1) {
    if (vector.values[index] == null) {
      vector.values[index] = "0";
    }
  }
}

function determinantWithEngine(A) {
  const math = window.math;
  if (math?.det) {
    return cleanNumber(Number(math.det(A)));
  }
  return determinant(A);
}

function inverseWithEngine(A) {
  const math = window.math;
  if (math?.inv) {
    return cleanMatrix(toPlainArray(math.inv(A)));
  }
  return inverseByGaussJordan(A);
}

function pseudoInverseWithEngine(A) {
  const math = window.math;
  if (math?.pinv) {
    return cleanMatrix(toPlainArray(math.pinv(A)));
  }
  const ml = getMlMatrix();
  return cleanMatrix(toPlainArray(ml.pseudoInverse(new ml.Matrix(A))));
}

function rankWithSvd(A) {
  const svd = createSvd(A);
  return svd.rank ?? rank(A);
}

function singularValues(A) {
  return createSvd(A).diagonal.map((value) => cleanNumber(value));
}

function conditionNumber(A) {
  const svd = createSvd(A);
  if (Number.isFinite(svd.condition)) {
    return cleanNumber(svd.condition);
  }
  const values = svd.diagonal.filter((value) => Math.abs(value) > 1e-10);
  if (!values.length || values.length < svd.diagonal.length) {
    return Infinity;
  }
  return cleanNumber(Math.max(...values) / Math.min(...values));
}

function normWithEngine(A, type) {
  if (type === "2") {
    const values = singularValues(A);
    return values.length ? Math.max(...values) : 0;
  }
  const math = window.math;
  if (math?.norm) {
    const normType = type === "1" ? 1 : type === "inf" ? "inf" : "fro";
    return cleanNumber(Number(math.norm(A, normType)));
  }
  const ml = getMlMatrix();
  return cleanNumber(new ml.Matrix(A).norm());
}

function createSvd(A) {
  const ml = getMlMatrix();
  return new ml.SingularValueDecomposition(new ml.Matrix(A), { autoTranspose: true });
}

function getMlMatrix() {
  const ml = window.mlMatrix;
  if (!ml?.Matrix) {
    throw new Error("The linear algebra engine is still loading. Try again in a moment.");
  }
  return ml;
}

function cofactorExpansionResult(state) {
  const A = readMatrix(state, "A");
  if (A.length !== A[0].length) {
    throw new Error("Matrix A must be square");
  }
  const size = A.length;
  const index = Number(state.expansionIndex) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= size) {
    throw new Error(`The expansion index must be from 1 to ${size}`);
  }
  const cofactors = cofactorMatrix(A);
  const terms = [];
  let value = 0;

  for (let i = 0; i < size; i += 1) {
    const entry = state.expansionAxis === "row" ? A[index][i] : A[i][index];
    const cofactorValue = state.expansionAxis === "row" ? cofactors[index][i] : cofactors[i][index];
    value += entry * cofactorValue;
    terms.push(`${formatNumber(entry)}(${formatNumber(cofactorValue)})`);
  }

  return `
    ${scalarResult("Cofactor Expansion", cleanNumber(value), "\\(\\det(A)\\)")}
    <div class="la-step">\\[\\det(A)=${terms.join(" + ")}\\]</div>
  `;
}

function characteristicResult(A) {
  const coefficients = characteristicPolynomialCoefficients(A);
  return `
    <div class="la-result-block">
      <h4>Characteristic Polynomial</h4>
      <div class="la-formula">\\[\\chi_A(\\lambda)=${polynomialLatex(coefficients)}\\]</div>
      <div class="la-muted">This uses the monic convention \\(\\chi_A(\\lambda)=\\det(\\lambda I-A)\\).</div>
    </div>
  `;
}

function linearSystemResult(state) {
  const A = readMatrix(state, "A");
  const b = readVector(state, "b");
  const result = solveLinearSystem(A, b);
  const typeText = {
    unique: "Unique solution",
    infinite: "Infinitely many solutions",
    inconsistent: "No solution",
  }[result.type];
  const solution = result.solution ? vectorTable(result.solution, "x") : "";

  return `
    <div class="la-result-block">
      <h4>${typeText}</h4>
      ${solution}
    </div>
    ${matrixResult("RREF of [A | b]", result.rref, "\\([A\\mid b]\\)", false)}
  `;
}

function cramerResult(state) {
  const result = cramerRule(readMatrix(state, "A"), readVector(state, "b"));
  return `
    ${vectorResult("Solution", result.solution, "\\(x_i=\\det(A_i)/\\det(A)\\)", false)}
    <div class="la-result-block">
      <h4>Determinants</h4>
      <p>\\(\\det(A)=${formatNumber(result.detA)}\\)</p>
      <p>${result.determinants.map((value, index) => `\\(\\det(A_${index + 1})=${formatNumber(value)}\\)`).join(" ")}</p>
    </div>
  `;
}

function gaussJordanResult(state) {
  const A = readMatrix(state, "A");
  const b = readVector(state, "b");
  return matrixResult("Gauss-Jordan RREF", rref(A.map((row, i) => row.concat(b[i]))).matrix, "\\([A\\mid b]\\)");
}

function rrefResult(A) {
  const result = rref(A);
  return `
    ${matrixResult("Reduced Row Echelon Form", result.matrix, "\\(\\operatorname{rref}(A)\\)", false)}
    <div class="la-result-block">
      <h4>Pivot Columns</h4>
      <p>${result.pivotColumns.length ? result.pivotColumns.map((column) => column + 1).join(", ") : "None"}</p>
    </div>
  `;
}

function linearCombinationResult(state) {
  const vectors = readMatrix(state, "V");
  const coefficients = readVector(state, "coefficients");
  return vectorResult("Linear Combination", linearCombination(coefficients, vectors), "\\(c_1v_1+\\cdots+c_kv_k\\)");
}

function columnSpaceResult(A) {
  const result = columnSpaceBasis(A);
  return `
    <div class="la-result-block">
      <h4>Pivot Columns</h4>
      <p>${result.pivotColumns.length ? result.pivotColumns.map((column) => column + 1).join(", ") : "None"}</p>
    </div>
    ${basisResult("Column Space Basis", result.basis)}
  `;
}

function nullSpaceResult(A) {
  const result = nullSpaceBasis(A);
  return basisResult("Null Space Basis", result.basis.length ? result.basis : [[0]]);
}

function independenceResult(vectors) {
  const vectorRank = rank(vectors);
  const independent = vectorRank === vectors.length;
  return `
    <div class="la-result-block">
      <h4>${independent ? "Linearly Independent" : "Linearly Dependent"}</h4>
      <p>\\(\\operatorname{rank}=${vectorRank}\\) for ${vectors.length} row vector${vectors.length === 1 ? "" : "s"}.</p>
    </div>
  `;
}

function gramSchmidtResult(vectors) {
  const result = gramSchmidt(vectors);
  return `
    ${basisResult("Orthonormal Basis", result.orthonormal)}
    <div class="la-result-block">
      <h4>Dependent Inputs</h4>
      <p>${result.skipped.length ? result.skipped.map((index) => index + 1).join(", ") : "None"}</p>
    </div>
  `;
}

function eigenResult(A, includeVectors) {
  const math = window.math;
  if (math?.eigs) {
    const result = math.eigs(A);
    const values = toPlainArray(result.values);
    const vectors = result.eigenvectors || [];
    const valuesHtml = vectorTable(values.map((value) => formatMathValue(value)), "\\lambda", true);
    const vectorsHtml = includeVectors && vectors.length
      ? `<div class="la-result-block"><h4>Eigenvectors</h4>${vectors.map((item, index) => vectorTable(toPlainArray(item.vector).map((value) => formatMathValue(value)), `v_${index + 1}`, true)).join("")}</div>`
      : "";
    return `<div class="la-result-block"><h4>Eigenvalues</h4>${valuesHtml}</div>${vectorsHtml}`;
  }

  const ml = getMlMatrix();
  const result = new ml.EigenvalueDecomposition(new ml.Matrix(A));
  const values = result.realEigenvalues.map((real, index) => formatComplexParts(real, result.imaginaryEigenvalues[index]));
  const vectorsHtml = includeVectors ? matrixResult("Eigenvector Matrix", result.eigenvectorMatrix.to2DArray(), "\\(P\\)", false) : "";
  return `<div class="la-result-block"><h4>Eigenvalues</h4>${vectorTable(values, "\\lambda", true)}</div>${vectorsHtml}`;
}

function diagonalizationResult(A) {
  const ml = getMlMatrix();
  const result = new ml.EigenvalueDecomposition(new ml.Matrix(A));
  if (result.imaginaryEigenvalues.some((value) => Math.abs(value) > 1e-10)) {
    throw new Error("Diagonalization display supports real eigenvalues in this version");
  }
  const P = result.eigenvectorMatrix;
  const D = result.diagonalMatrix;
  const Pinv = ml.inverse(P);
  return `
    ${matrixResult("P", P.to2DArray(), "\\(P\\)", false)}
    ${matrixResult("D", D.to2DArray(), "\\(D\\)", false)}
    ${matrixResult("P inverse", Pinv.to2DArray(), "\\(P^{-1}\\)", false)}
    <div class="la-step">\\[A=PDP^{-1}\\]</div>
  `;
}

function luResult(A) {
  const ml = getMlMatrix();
  const result = new ml.LuDecomposition(new ml.Matrix(A));
  return `
    ${matrixResult("L", result.lowerTriangularMatrix.to2DArray(), "\\(L\\)", false)}
    ${matrixResult("U", result.upperTriangularMatrix.to2DArray(), "\\(U\\)", false)}
    <div class="la-result-block"><h4>Pivot Permutation</h4><p>${result.pivotPermutationVector.join(", ")}</p></div>
  `;
}

function qrResult(A) {
  const ml = getMlMatrix();
  const result = new ml.QrDecomposition(new ml.Matrix(A));
  return `
    ${matrixResult("Q", result.orthogonalMatrix.to2DArray(), "\\(Q\\)", false)}
    ${matrixResult("R", result.upperTriangularMatrix.to2DArray(), "\\(R\\)", false)}
    <div class="la-step">\\[A=QR\\]</div>
  `;
}

function choleskyResult(A) {
  const ml = getMlMatrix();
  const result = new ml.CholeskyDecomposition(new ml.Matrix(A));
  return `
    ${matrixResult("L", result.lowerTriangularMatrix.to2DArray(), "\\(L\\)", false)}
    <div class="la-step">\\[A=LL^T\\]</div>
  `;
}

function svdResult(A) {
  const svd = createSvd(A);
  return `
    ${matrixResult("U", svd.leftSingularVectors.to2DArray(), "\\(U\\)", false)}
    ${matrixResult("Sigma", svd.diagonalMatrix.to2DArray(), "\\(\\Sigma\\)", false)}
    ${matrixResult("V", svd.rightSingularVectors.to2DArray(), "\\(V\\)", false)}
    ${vectorResult("Singular Values", svd.diagonal, "\\(\\sigma_i\\)", false)}
    <div class="la-step">\\[A=U\\Sigma V^T\\]</div>
  `;
}

function polarResult(A) {
  if (A.length !== A[0].length) {
    throw new Error("Polar decomposition is shown for square matrices in this version");
  }
  const svd = createSvd(A);
  const U = svd.leftSingularVectors;
  const V = svd.rightSingularVectors;
  const S = svd.diagonalMatrix;
  const Q = U.mmul(V.transpose());
  const H = V.mmul(S).mmul(V.transpose());
  return `
    ${matrixResult("Orthogonal Factor", Q.to2DArray(), "\\(Q\\)", false)}
    ${matrixResult("Positive Semidefinite Factor", H.to2DArray(), "\\(H\\)", false)}
    <div class="la-step">\\[A=QH\\]</div>
  `;
}

function linearProgrammingResult(state, showOptimumOnly) {
  const objective = [
    parseNumberToken(state.lp.objectiveX, "Objective x coefficient"),
    parseNumberToken(state.lp.objectiveY, "Objective y coefficient"),
  ];
  const constraints = state.lp.constraints.map((constraint, index) => ({
    a: parseNumberToken(constraint.a, `Constraint ${index + 1} x coefficient`),
    b: parseNumberToken(constraint.b, `Constraint ${index + 1} y coefficient`),
    relation: constraint.relation,
    c: parseNumberToken(constraint.c, `Constraint ${index + 1} value`),
  }));
  if (state.lp.includeNonnegative) {
    constraints.push({ a: 1, b: 0, relation: ">=", c: 0 });
    constraints.push({ a: 0, b: 1, relation: ">=", c: 0 });
  }
  const result = solveLinearProgram2D(objective, constraints, state.lp.goal);
  if (!result.optimum) {
    return '<div class="la-alert">No feasible corner points were found.</div>';
  }
  const optimum = `
    <div class="la-result-block">
      <h4>${state.lp.goal === "max" ? "Maximum" : "Minimum"}</h4>
      <p>\\((x,y)=(${formatNumber(result.optimum.x)}, ${formatNumber(result.optimum.y)})\\)</p>
      <p>\\(z=${formatNumber(result.optimum.value)}\\)</p>
    </div>
  `;
  return showOptimumOnly ? optimum : `${cornerTable(result.feasiblePoints)}${optimum}`;
}

function scalarResult(title, value, formula = "") {
  return `
    <div class="la-result-block">
      <h4>${title}</h4>
      ${formula ? `<div class="la-formula">${formula}</div>` : ""}
      <div class="la-scalar">${formatNumber(value)}</div>
    </div>
  `;
}

function matrixResult(title, matrix, formula = "", wrap = true) {
  const html = `
    <div class="la-result-block">
      <h4>${title}</h4>
      ${formula ? `<div class="la-formula">${formula}</div>` : ""}
      ${matrixTable(matrix)}
    </div>
  `;
  return wrap ? html : html;
}

function vectorResult(title, vector, formula = "", wrap = true) {
  const html = `
    <div class="la-result-block">
      <h4>${title}</h4>
      ${formula ? `<div class="la-formula">${formula}</div>` : ""}
      ${vectorTable(vector)}
    </div>
  `;
  return wrap ? html : html;
}

function basisResult(title, vectors) {
  return `
    <div class="la-result-block">
      <h4>${title}</h4>
      ${vectors.length ? vectors.map((vector, index) => vectorTable(vector, `v_${index + 1}`)).join("") : "<p>None</p>"}
    </div>
  `;
}

function matrixTable(matrix) {
  const rows = toPlainArray(matrix).map((row) => `
    <tr>${row.map((value) => `<td>${escapeHTML(formatDisplayValue(value))}</td>`).join("")}</tr>
  `).join("");
  return `<div class="la-table-wrap"><table class="la-matrix-table">${rows}</table></div>`;
}

function vectorTable(vector, label = "v", preformatted = false) {
  const entries = vector.map((value, index) => `
    <tr>
      <th>${label}${vector.length > 1 ? `<sub>${index + 1}</sub>` : ""}</th>
      <td>${preformatted ? escapeHTML(String(value)) : escapeHTML(formatDisplayValue(value))}</td>
    </tr>
  `).join("");
  return `<div class="la-table-wrap"><table class="la-vector-table">${entries}</table></div>`;
}

function cornerTable(points) {
  const rows = points.map((point) => `
    <tr>
      <td>${formatNumber(point.x)}</td>
      <td>${formatNumber(point.y)}</td>
      <td>${formatNumber(point.value)}</td>
    </tr>
  `).join("");
  return `
    <div class="la-result-block">
      <h4>Feasible Corner Points</h4>
      <div class="la-table-wrap">
        <table class="la-vector-table">
          <thead><tr><th>x</th><th>y</th><th>z</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function polynomialLatex(coefficients) {
  const degree = coefficients.length - 1;
  const terms = [];
  coefficients.forEach((coefficient, index) => {
    const power = degree - index;
    const value = cleanNumber(coefficient);
    if (Math.abs(value) <= 1e-10) {
      return;
    }
    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "+";
    const coefficientText = absValue === 1 && power > 0 ? "" : formatNumber(absValue);
    const variableText = power === 0 ? "" : power === 1 ? "\\lambda" : `\\lambda^{${power}}`;
    terms.push({ sign, text: `${coefficientText}${variableText}` || "1" });
  });

  if (!terms.length) {
    return "0";
  }

  return terms.map((term, index) => {
    if (index === 0) {
      return term.sign === "-" ? `-${term.text}` : term.text;
    }
    return ` ${term.sign} ${term.text}`;
  }).join("");
}

function normFormula(type) {
  if (type === "1") {
    return "\\(\\|A\\|_1\\)";
  }
  if (type === "inf") {
    return "\\(\\|A\\|_{\\infty}\\)";
  }
  if (type === "2") {
    return "\\(\\|A\\|_2=\\sigma_{\\max}\\)";
  }
  return "\\(\\|A\\|_F\\)";
}

function formatDisplayValue(value) {
  if (typeof value === "number") {
    return formatNumber(value);
  }
  if (typeof value === "string") {
    return value;
  }
  return formatMathValue(value);
}

function formatMathValue(value) {
  if (typeof value === "number") {
    return formatNumber(value);
  }
  if (value && typeof value === "object" && "re" in value && "im" in value) {
    return formatComplexParts(Number(value.re), Number(value.im));
  }
  if (value && typeof value.toString === "function") {
    return value.toString();
  }
  return String(value);
}

function formatComplexParts(real, imaginary) {
  const cleanedReal = cleanNumber(real);
  const cleanedImaginary = cleanNumber(imaginary);
  if (Math.abs(cleanedImaginary) <= 1e-10) {
    return formatNumber(cleanedReal);
  }
  if (Math.abs(cleanedReal) <= 1e-10) {
    return `${formatNumber(cleanedImaginary)}i`;
  }
  return `${formatNumber(cleanedReal)} ${cleanedImaginary < 0 ? "-" : "+"} ${formatNumber(Math.abs(cleanedImaginary))}i`;
}

function toPlainArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => (Array.isArray(item) ? item.slice() : item));
  }
  if (value?.toArray) {
    return value.toArray();
  }
  if (value?.to2DArray) {
    return value.to2DArray();
  }
  return value;
}

function optionList(max, selected) {
  return Array.from({ length: max }, (_, index) => {
    const value = index + 1;
    return `<option value="${value}" ${value === selected ? "selected" : ""}>${value}</option>`;
  }).join("");
}

function typeset(element) {
  if (window.MathJax) {
    window.MathJax.typesetPromise([element]).catch((error) => {
      console.error("MathJax typesetting failed:", error);
    });
  }
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
