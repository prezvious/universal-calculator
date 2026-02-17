import { createCalculatorLayout, animateReveal } from './utils.js';
import { calculateTimePercentage } from './mathUtils.js';

export const mathCalculators = {
  icon: "icon-math",
  label: "Math",
  subcategories: {
    percentage: [
      {
        id: "percentage-calculator",
        name: "Percentage Calculator",
        description:
          "Calculate what percent one number is of another, or find a percentage of a number.",
        // specific to this calculator:
        educationalHTML: `
            <div class="educational-section">
                <p>To find the percentage of a number, use the formula:</p>
                \\[ \\text{Result} = \\frac{\\text{Value} \\times \\text{Percentage}}{100} \\]
                <p>Example: 20% of 50 is \\( \\frac{50 \\times 20}{100} = 10 \\).</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="percent-value">Value:</label>
                            <input type="number" id="percent-value" placeholder="Enter value">
                        </div>
                        <div class="form-group">
                            <label for="percent-percentage">Percentage (%):</label>
                            <input type="number" id="percent-percentage" placeholder="Enter percentage">
                        </div>
                        <button id="calculate-percentage" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "percentage-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }

          const calculate = () => {
            const value = parseFloat(
              document.getElementById("percent-value").value
            );
            const percentage = parseFloat(
              document.getElementById("percent-percentage").value
            );
            const resultDiv = document.getElementById("percentage-result");

            if (isNaN(value) || isNaN(percentage)) {
              resultDiv.innerHTML = '<span style="opacity: 0.5;">Enter values...</span>';
              return;
            }

            const result = (value * percentage) / 100;
            resultDiv.innerHTML = `${percentage}% of ${value} = <strong>${result.toFixed(
              2
            )}</strong>`;
          };

          document.getElementById("calculate-percentage").addEventListener("click", calculate);
          document.getElementById("percent-value").addEventListener("input", calculate);
          document.getElementById("percent-percentage").addEventListener("input", calculate);
        },
      },
      {
        id: "percent-error-calculator",
        name: "Percent Error Calculator",
        description:
          "Calculate the percentage error between a measured value and the actual value.",
        educationalHTML: `
            <div class="educational-section">
                <p>The percentage error is the difference between an approximate or measured value and an exact or known value.</p>
                <p>The formula is:</p>
                \\[ \\text{Percent Error} = \\left| \\frac{\\text{Measured} - \\text{Actual}}{\\text{Actual}} \\right| \\times 100\\% \\]
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="actual-value">Actual Value:</label>
                            <input type="number" id="actual-value" placeholder="Enter actual value">
                        </div>
                        <div class="form-group">
                            <label for="measured-value">Measured Value:</label>
                            <input type="number" id="measured-value" placeholder="Enter measured value">
                        </div>
                        <button id="calculate-percent-error" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "percent-error-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document
            .getElementById("calculate-percent-error")
            .addEventListener("click", function () {
              const actualValue = parseFloat(
                document.getElementById("actual-value").value
              );
              const measuredValue = parseFloat(
                document.getElementById("measured-value").value
              );
              const resultDiv = document.getElementById(
                "percent-error-result"
              );

              if (isNaN(actualValue) || isNaN(measuredValue)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              if (actualValue === 0) {
                resultDiv.innerHTML = "Actual value cannot be zero";
                return;
              }

              const percentError =
                Math.abs((measuredValue - actualValue) / actualValue) * 100;
              resultDiv.innerHTML = `Percent Error: <strong>${percentError.toFixed(
                2
              )}%</strong>`;
            });
        },
      },
      {
        id: "time-percentage-calculator",
        name: "Time Percentage Calculator",
        description: "Calculate the percentage of time elapsed or remaining.",
        educationalHTML: `
            <div class="educational-section">
                <p>To calculate the percentage of time elapsed:</p>
                \\[ \\text{Percentage Elapsed} = \\frac{\\text{Elapsed Time}}{\\text{Total Time}} \\times 100\\% \\]
                <p>To calculate the percentage of time remaining:</p>
                \\[ \\text{Percentage Remaining} = 100\\% - \\text{Percentage Elapsed} \\]
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="total-time">Total Time (minutes):</label>
                            <input type="number" id="total-time" placeholder="Enter total time">
                        </div>
                        <div class="form-group">
                            <label for="elapsed-time">Elapsed Time (minutes):</label>
                            <input type="number" id="elapsed-time" placeholder="Enter elapsed time">
                        </div>
                        <button id="calculate-time-percentage" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "time-percentage-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document
            .getElementById("calculate-time-percentage")
            .addEventListener("click", function () {
              const totalTime = parseFloat(
                document.getElementById("total-time").value
              );
              const elapsedTime = parseFloat(
                document.getElementById("elapsed-time").value
              );
              const resultDiv = document.getElementById(
                "time-percentage-result"
              );

              try {
                const { percentageElapsed, percentageRemaining } = calculateTimePercentage(totalTime, elapsedTime);

                let result = `Elapsed: <strong>${percentageElapsed.toFixed(
                  2
                )}%</strong><br>`;
                result += `Remaining: <strong>${percentageRemaining.toFixed(
                  2
                )}%</strong>`;

                resultDiv.innerHTML = result;
              } catch (error) {
                resultDiv.innerHTML = error.message;
              }
            });
        },
      },
      {
        id: "percentage-change-calculator",
        name: "Percentage Change Calculator",
        description: "Calculate the percentage change between an initial and final value. Reports increase or decrease automatically.",
        educationalHTML: `
            <div class="educational-section">
                <h3>Percent Change Formula</h3>
                <p>The percent change formula is as follows:</p>
                \[ \%\text{ change} = 100 \times \frac{\text{final} - \text{initial}}{|\text{initial}|} \]
                <p>The vertical lines surrounding a number (in this case, <code>initial</code>) indicate it is the <strong>absolute value</strong>, or modulus. Mathematicians define the absolute value <code>|x|</code> of a number <code>x</code> as its distance from 0.</p>
                <p>If the result is positive, it is a <strong>percent increase</strong>. If negative, it is a <strong>percent decrease</strong>.</p>

                <h4>What is percentage change?</h4>
                <p>Percent change differs from percent increase and percent decrease because we can see both directions of the change. By contrast, the percent change calculator yields an answer "<em>x percent increase</em>" if the final value is larger than the initial value; otherwise, it outputs "<em>x percent decrease</em>".</p>

                <h4>Example</h4>
                <p>If the initial value is 200 and the final value is 250:</p>
                <ol>
                    <li>Difference: 250 − 200 = 50</li>
                    <li>Divide by |200|: 50 / 200 = 0.25</li>
                    <li>Multiply by 100: 25%</li>
                </ol>
                <p>Result: <strong>25% increase</strong>.</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
            <div class="form-group">
                <label for="pchange-initial">Initial Value</label>
                <input type="number" id="pchange-initial" placeholder="Enter initial value" step="any">
            </div>
            <div class="form-group">
                <label for="pchange-final">Final Value</label>
                <input type="number" id="pchange-final" placeholder="Enter final value" step="any">
            </div>
            <button id="calculate-pchange" class="calculate-btn">Calculate</button>
          `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "pchange-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document.getElementById("calculate-pchange").addEventListener("click", function () {
            const initial = parseFloat(document.getElementById("pchange-initial").value);
            const final_ = parseFloat(document.getElementById("pchange-final").value);
            const resultDiv = document.getElementById("pchange-result");

            if (isNaN(initial) || isNaN(final_)) {
              resultDiv.innerHTML = "Please enter valid numbers.";
              return;
            }
            if (initial === 0) {
              resultDiv.innerHTML = "Initial value cannot be zero (division by zero).";
              return;
            }

            const diff = final_ - initial;
            const pctChange = (diff / Math.abs(initial)) * 100;
            const direction = pctChange >= 0 ? "increase" : "decrease";
            const absPct = Math.abs(pctChange);

            let html = `
                    <div style="margin-bottom: 1.25rem;">
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                            Percent Change: <strong style="font-size: 1.4rem;">${absPct.toFixed(4)}%</strong>
                        </div>
                        <div style="font-size: 0.95rem; color: var(--text-secondary);">
                            ${final_} is a <strong>${absPct.toFixed(2)}% ${direction}</strong> of ${initial}.
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1rem 0;">
                    <div>
                        <strong>Steps:</strong>
                        <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.9rem; line-height: 2;">
                            1. Difference: ${final_} − ${initial} = ${diff}<br>
                            2. Divide by |${initial}|: ${diff} / ${Math.abs(initial)} = ${(diff / Math.abs(initial)).toFixed(6)}<br>
                            3. Multiply by 100: <strong>${pctChange.toFixed(4)}%</strong>
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1rem 0;">
                    <div>
                        <strong>Difference</strong>
                        <div style="margin-top: 0.35rem; font-size: 0.85rem; color: var(--text-secondary);">Final Value − Initial Value</div>
                        <div style="font-size: 1.3rem; font-weight: 600; margin-top: 0.25rem; color: ${diff >= 0 ? '#22c55e' : '#ef4444'};">${diff}</div>
                    </div>
                `;
            resultDiv.innerHTML = html;
          });
        },
      },
      {
        id: "percentage-decrease-calculator",
        name: "Percentage Decrease Calculator",
        description: "Calculate the percentage decrease between an original value and a new value.",
        educationalHTML: `
            <div class="educational-section">
                <h3>Percent Decrease Formula</h3>
                <p>The percent decrease formula is:</p>
                \[ \%\text{ decrease} = 100 \times \frac{\text{initial} - \text{final}}{|\text{initial}|} \]

                <h4>How do I calculate percent decrease?</h4>
                <ol>
                    <li>Find the difference between the original and new value: <code>a − b</code>.</li>
                    <li>Divide this difference by the absolute value of the original value: <code>(a − b) / |a|</code>.</li>
                    <li>Multiply the result by 100 to convert it into percentages.</li>
                </ol>

                <h4>Example</h4>
                <p>Suppose the original value is 750 and the new value is 590:</p>
                <ol>
                    <li>Compute their difference: 750 − 590 = 160</li>
                    <li>Divide 160 by 750 to get 0.2133</li>
                    <li>Multiply by 100 to get <strong>21.33%</strong></li>
                </ol>
                <p>Result: <strong>21.33% decrease</strong>.</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
            <div class="form-group">
                <label for="pdecrease-initial">Initial Value (Original)</label>
                <input type="number" id="pdecrease-initial" placeholder="Enter original value" step="any">
            </div>
            <div class="form-group">
                <label for="pdecrease-final">Final Value (New)</label>
                <input type="number" id="pdecrease-final" placeholder="Enter new value" step="any">
            </div>
            <button id="calculate-pdecrease" class="calculate-btn">Calculate</button>
          `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "pdecrease-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document.getElementById("calculate-pdecrease").addEventListener("click", function () {
            const initial = parseFloat(document.getElementById("pdecrease-initial").value);
            const final_ = parseFloat(document.getElementById("pdecrease-final").value);
            const resultDiv = document.getElementById("pdecrease-result");

            if (isNaN(initial) || isNaN(final_)) {
              resultDiv.innerHTML = "Please enter valid numbers.";
              return;
            }
            if (initial === 0) {
              resultDiv.innerHTML = "Initial value cannot be zero (division by zero).";
              return;
            }

            const diff = initial - final_;
            const pctDecrease = (diff / Math.abs(initial)) * 100;

            let label, color;
            if (pctDecrease >= 0) {
              label = "decrease";
              color = "#ef4444";
            } else {
              label = "increase (negative decrease)";
              color = "#22c55e";
            }

            let html = `
                    <div style="margin-bottom: 1.25rem;">
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                            Decrease (%): <strong style="font-size: 1.4rem;">${pctDecrease.toFixed(4)}%</strong>
                        </div>
                        <div style="font-size: 0.95rem; color: var(--text-secondary);">
                            ${final_} is a <strong>${Math.abs(pctDecrease).toFixed(2)}% ${label}</strong> of ${initial}.
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1rem 0;">
                    <div>
                        <strong>Steps:</strong>
                        <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.9rem; line-height: 2;">
                            1. Difference: ${initial} − ${final_} = ${diff}<br>
                            2. Divide by |${initial}|: ${diff} / ${Math.abs(initial)} = ${(diff / Math.abs(initial)).toFixed(6)}<br>
                            3. Multiply by 100: <strong>${pctDecrease.toFixed(4)}%</strong>
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1rem 0;">
                    <div>
                        <strong>Difference</strong>
                        <div style="margin-top: 0.35rem; font-size: 0.85rem; color: var(--text-secondary);">Final Value − Initial Value</div>
                        <div style="font-size: 1.3rem; font-weight: 600; margin-top: 0.25rem; color: ${color};">${-(diff)}</div>
                    </div>
                `;
            resultDiv.innerHTML = html;
          });
        },
      },
    ],
    algebra: [
      {
        id: "quadratic-equation-calculator",
        name: "Quadratic Equation",
        description:
          "Solve quadratic equations using Standard, Vertex, or Factored forms.",
        educationalHTML: `
              <div class="educational-section">
                <h3>What is the quadratic formula?</h3>
                <p>The quadratic formula is the solution of a second-degree polynomial equation of the following form:</p>
                \[ Ax^2 + Bx + C = 0 \]
                <p>If you can rewrite your equation in this form, it means that it can be solved with the quadratic formula. A solution to this equation is also called a root of the equation.</p>
                <p>The quadratic formula is as follows:</p>
                \[ x = \frac{-B \pm \sqrt{\Delta}}{2A} \]
                <p>where:</p>
                \[ \Delta = B^2 - 4AC \]
                <p>Using this formula, you can find the solutions to any quadratic equation. Note that there are three possible options for obtaining a result:</p>
                <ul>
                  <li>The quadratic equation has two unique roots when \( \Delta > 0 \). Then, the first solution of the quadratic formula is \( x_1 = \frac{-B + \sqrt{\Delta}}{2A} \), and the second is \( x_2 = \frac{-B - \sqrt{\Delta}}{2A} \).</li>
                  <li>The quadratic equation has only one root when \( \Delta = 0 \). The solution is equal to \( x = \frac{-B}{2A} \). It is sometimes called a repeated or double root.</li>
                  <li>The quadratic equation has no real solutions for \( \Delta < 0 \).</li>
                </ul>
                <p>You can also graph the function \( y = Ax^2 + Bx + C \). Its shape is a parabola, and the roots of the quadratic equation are the x-intercepts of this function.</p>

                <h3 style="margin-top: 1.5rem;">Coefficients of a quadratic equation</h3>
                <p>\( A \), \( B \), and \( C \) are the coefficients of the quadratic equation. They are all real numbers, not dependent on \( x \). If \( A = 0 \), then the equation is not quadratic, but linear.</p>
                <p>If \( B^2 < 4AC \), then the discriminant \( \Delta \) will be negative. It means that such an equation has no real roots.</p>

                <h4 style="margin-top: 1rem;">How to use the quadratic formula solver</h4>
                <p>Write down your equation. Let's assume it is \( 4x^2 + 3x - 7 = -4 - x \).</p>
                <p>Bring the equation to the form \( Ax^2 + Bx + C = 0 \). In this example, we will do it in the following steps:</p>
                <ol>
                  <li>\( 4x^2 + 3x - 7 = -4 - x \)</li>
                  <li>\( 4x^2 + (3 + 1)x + (-7 + 4) = 0 \)</li>
                  <li>\( 4x^2 + 4x - 3 = 0 \)</li>
                </ol>
                <p>Calculate the discriminant.</p>
                <p>\( \Delta = B^2 - 4AC = 4^2 - 4 \times 4 \times (-3) = 16 + 48 = 64 \).</p>
                <p>Decide whether the discriminant is greater, equal, or lower than 0. In our case, the discriminant is greater than 0, which means that this equation has two unique roots.</p>
                <p>Calculate the two roots using the quadratic formula.</p>
                <p>\( x_1 = \frac{-B + \sqrt{\Delta}}{2A} = \frac{-4 + \sqrt{64}}{2 \times 4} = \frac{-4 + 8}{8} = \frac{4}{8} = 0.5 \)</p>
                <p>\( x_2 = \frac{-B - \sqrt{\Delta}}{2A} = \frac{-4 - \sqrt{64}}{2 \times 4} = \frac{-4 - 8}{8} = \frac{-12}{8} = -1.5 \)</p>
                <p>The roots of your equation are \( x_1 = 0.5 \) and \( x_2 = -1.5 \).</p>

                <h3 style="margin-top: 1.5rem;">Solving quadratic equations with a negative discriminant</h3>
                <p>Even though the quadratic formula calculator indicates when the equation has no real roots, it is possible to find the solution of a quadratic equation with a negative discriminant. These roots will be complex numbers.</p>
                <p>Each complex number is a sum of real and imaginary parts. The imaginary part is always equal to the number \( i = \sqrt{-1} \) multiplied by a real number.</p>
                <p>The quadratic formula remains the same in this case.</p>
                \[ x = \frac{-B \pm \sqrt{\Delta}}{2A} \]
                <p>Notice that, as \( \Delta < 0 \), the square root of the discriminant will be an imaginary value. Hence:</p>
                <p>\( \text{Re}(x) = \frac{-B}{2A} \)</p>
                <p>\( \text{Im}(x) = \pm \frac{\sqrt{|\Delta|}}{2A} \)</p>
              </div>
        `,
        generateHTML: function () {
          const formSelector = `
            <div class="form-group">
              <label>Formula Form:</label>
              <div class="formula-radio-group">
                <label class="custom-radio-label">
                  <input type="radio" name="quad-form" value="standard" checked>
                  <span class="radio-mark"></span>
                  <span class="radio-text">Ax² + Bx + C = 0</span>
                </label>
                <label class="custom-radio-label">
                  <input type="radio" name="quad-form" value="vertex">
                  <span class="radio-mark"></span>
                  <span class="radio-text">A(x - H)² + K = 0</span>
                </label>
                <label class="custom-radio-label">
                  <input type="radio" name="quad-form" value="factored">
                  <span class="radio-mark"></span>
                  <span class="radio-text">A(x - x₁)(x - x₂) = 0</span>
                </label>
              </div>
            </div>
          `;

          const inputs = `
                      ${formSelector}
                      <div id="dynamic-inputs">
                        <!-- Standard Form Inputs (Default) -->
                        <div class="form-group">
                            <label for="quad-a">A:</label>
                            <input type="number" id="quad-a" placeholder="Enter coefficient A">
                        </div>
                        <div class="form-group">
                            <label for="quad-b">B:</label>
                            <input type="number" id="quad-b" placeholder="Enter coefficient B">
                        </div>
                        <div class="form-group">
                            <label for="quad-c">C:</label>
                            <input type="number" id="quad-c" placeholder="Enter coefficient C">
                        </div>
                      </div>
                      <div class="form-group" style="margin-top: 1rem;">
                          <label style="font-weight: normal; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                              <input type="checkbox" id="allow-complex"> Allow negative discriminant
                          </label>
                      </div>
                      <button id="calculate-quadratic" class="calculate-btn">Solve</button>
                  `;

          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "quadratic-result",
            true // Enable "What is this?" button
          );
        },
        attachEvents: function () {
          // Attach "What is this?" event
          const whatIsThisBtn = document.getElementById("what-is-this-btn");
          if (whatIsThisBtn && this.educationalHTML) {
            whatIsThisBtn.addEventListener("click", () => {
              const container = document.getElementById("educational-content-container");
              animateReveal(this.educationalHTML, container);
              // Hide button after click? Or keep it? User might want to re-read.
              // "wait short time... see text". Usually we show it and maybe disable button or just let it stay.
            });
          }

          // Form Switching Logic
          const formRadios = document.querySelectorAll('input[name="quad-form"]');
          const dynamicInputs = document.getElementById("dynamic-inputs");

          formRadios.forEach(radio => {
            radio.addEventListener("change", (e) => {
              const form = e.target.value;
              let html = "";
              if (form === "standard") {
                html = `
                  <div class="form-group"><label for="quad-a">A:</label><input type="number" id="quad-a" placeholder="Enter coefficient A"></div>
                  <div class="form-group"><label for="quad-b">B:</label><input type="number" id="quad-b" placeholder="Enter coefficient B"></div>
                  <div class="form-group"><label for="quad-c">C:</label><input type="number" id="quad-c" placeholder="Enter coefficient C"></div>
                `;
              } else if (form === "vertex") {
                html = `
                  <div class="form-group"><label for="quad-a">A:</label><input type="number" id="quad-a" placeholder="Enter coefficient A"></div>
                  <div class="form-group"><label for="quad-h">H (Vertex x):</label><input type="number" id="quad-h" placeholder="Enter H"></div>
                  <div class="form-group"><label for="quad-k">K (Vertex y):</label><input type="number" id="quad-k" placeholder="Enter K"></div>
                `;
              } else if (form === "factored") {
                html = `
                  <div class="form-group"><label for="quad-a">A:</label><input type="number" id="quad-a" placeholder="Enter coefficient A"></div>
                  <div class="form-group"><label for="quad-x1">x₁ (First root):</label><input type="number" id="quad-x1" placeholder="Enter x₁"></div>
                  <div class="form-group"><label for="quad-x2">x₂ (Second root):</label><input type="number" id="quad-x2" placeholder="Enter x₂"></div>
                `;
              }
              dynamicInputs.innerHTML = html;
              document.getElementById("quadratic-result").innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values and click Solve</span>';
              if (document.getElementById("quadratic-explanation")) {
                document.getElementById("quadratic-explanation").innerHTML = '';
              }
            });
          });

          // Inject the explanation div dynamically
          const resultContainer = document.getElementById("quadratic-result");
          if (resultContainer && !document.getElementById("quadratic-explanation")) {
            const expl = document.createElement("div");
            expl.id = "quadratic-explanation";
            expl.style.marginTop = "1.5rem";
            expl.style.borderTop = "1px solid rgba(255,255,255,0.2)";
            expl.style.paddingTop = "1rem";
            expl.style.fontSize = "0.9rem";
            expl.style.lineHeight = "1.6";
            resultContainer.parentNode.insertBefore(expl, resultContainer.nextSibling);
            // Ensure it's before the educational button/container if they exist
            // The helper structure: result -> button -> educational
            // resultContainer.nextSibling might be the button.
            // insertBefore inserts before the button. Correct.
          }

          document
            .getElementById("calculate-quadratic")
            .addEventListener("click", function () {
              const form = document.querySelector('input[name="quad-form"]:checked').value;
              const allowComplex = document.getElementById("allow-complex").checked;
              const resultDiv = document.getElementById("quadratic-result");
              // We need to re-query explanation div or ensure it exists
              let explanationDiv = document.getElementById("quadratic-explanation");
              if (!explanationDiv) {
                // Create if missing (e.g. if we didn't inject it properly above)
                explanationDiv = document.createElement("div");
                explanationDiv.id = "quadratic-explanation";
                resultDiv.parentNode.insertBefore(explanationDiv, resultDiv.nextSibling);
              }

              let result = "";
              let explanation = "";

              if (form === "standard") {
                const a = parseFloat(document.getElementById("quad-a").value);
                const b = parseFloat(document.getElementById("quad-b").value);
                const c = parseFloat(document.getElementById("quad-c").value);

                if (isNaN(a) || isNaN(b) || isNaN(c)) {
                  resultDiv.innerHTML = "Please enter valid coefficients";
                  return;
                }
                if (a === 0) {
                  resultDiv.innerHTML = "Not a quadratic equation (A = 0)";
                  return;
                }

                const discriminant = b * b - 4 * a * c;
                explanation += `<strong>Step 1: Identify coefficients</strong><br>A = ${a}, B = ${b}, C = ${c}<br><br>`;
                explanation += `<strong>Step 2: Calculate Discriminant (Δ)</strong><br>Δ = B² - 4AC<br>Δ = (${b})² - 4(${a})(${c})<br>Δ = ${b * b} - ${4 * a * c}<br>Δ = ${discriminant}<br><br>`;

                if (discriminant > 0) {
                  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                  result = `x₁ = <strong>${x1.toFixed(4)}</strong><br>x₂ = <strong>${x2.toFixed(4)}</strong>`;
                  explanation += `<strong>Step 3: Apply Quadratic Formula</strong><br>Since Δ > 0, there are two real roots.<br>x = (-B ± √Δ) / 2A<br>x = (-(${b}) ± √${discriminant}) / (2 × ${a})<br><br>`;
                  explanation += `x₁ = (${-b} + ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = <strong>${x1.toFixed(4)}</strong><br>`;
                  explanation += `x₂ = (${-b} - ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = <strong>${x2.toFixed(4)}</strong>`;
                } else if (discriminant === 0) {
                  const x = -b / (2 * a);
                  result = `x = <strong>${x.toFixed(4)}</strong> (Double Root)`;
                  explanation += `<strong>Step 3: Apply Quadratic Formula</strong><br>Since Δ = 0, there is one repeated real root.<br>x = -B / 2A<br>x = -(${b}) / (2 × ${a})<br>x = ${-b} / ${2 * a}<br>x = <strong>${x.toFixed(4)}</strong>`;
                } else {
                  if (allowComplex) {
                    const realPart = -b / (2 * a);
                    const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
                    result = `x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i<br>x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`;
                    explanation += `<strong>Step 3: Apply Quadratic Formula</strong><br>Since Δ < 0, the roots are complex.<br>x = (-B ± √Δ) / 2A<br>x = (-(${b}) ± √${discriminant}) / (2 × ${a})<br><br>`;
                    explanation += `Real Part: -B / 2A = ${realPart.toFixed(4)}<br>`;
                    explanation += `Imaginary Part: √|Δ| / 2A = √${Math.abs(discriminant)} / ${2 * a} = ${imaginaryPart.toFixed(4)}i<br>`;
                  } else {
                    result = "No real roots (Δ < 0)";
                    explanation += `<strong>Step 3: Analyze Discriminant</strong><br>Since Δ < 0, there are no real roots for this equation.<br>Enable "Allow negative discriminant" to see complex solutions.`;
                  }
                }

              } else if (form === "vertex") {
                const a = parseFloat(document.getElementById("quad-a").value);
                const h = parseFloat(document.getElementById("quad-h").value);
                const k = parseFloat(document.getElementById("quad-k").value);

                if (isNaN(a) || isNaN(h) || isNaN(k)) {
                  resultDiv.innerHTML = "Please enter valid values";
                  return;
                }
                if (a === 0) {
                  resultDiv.innerHTML = "A cannot be 0";
                  return;
                }

                // Equation: A(x - H)^2 + K = 0
                // (x - H)^2 = -K/A
                explanation += `<strong>Step 1: Set up the equation</strong><br>${a}(x - ${h})² + ${k} = 0<br><br>`;
                explanation += `<strong>Step 2: Isolate the squared term</strong><br>${a}(x - ${h})² = -${k}<br>(x - ${h})² = ${-k}/${a}<br>`;

                const rightSide = -k / a;
                explanation += `(x - ${h})² = ${rightSide}<br><br>`;

                if (rightSide > 0) {
                  const sqrtVal = Math.sqrt(rightSide);
                  const x1 = h + sqrtVal;
                  const x2 = h - sqrtVal;
                  result = `x₁ = <strong>${x1.toFixed(4)}</strong><br>x₂ = <strong>${x2.toFixed(4)}</strong>`;
                  explanation += `<strong>Step 3: Take the square root</strong><br>x - ${h} = ±√${rightSide}<br>x - ${h} = ±${sqrtVal.toFixed(4)}<br><br>`;
                  explanation += `<strong>Step 4: Solve for x</strong><br>x = ${h} ± ${sqrtVal.toFixed(4)}<br>`;
                  explanation += `x₁ = ${h} + ${sqrtVal.toFixed(4)} = <strong>${x1.toFixed(4)}</strong><br>`;
                  explanation += `x₂ = ${h} - ${sqrtVal.toFixed(4)} = <strong>${x2.toFixed(4)}</strong>`;
                } else if (rightSide === 0) {
                  const x = h;
                  result = `x = <strong>${x.toFixed(4)}</strong>`;
                  explanation += `<strong>Step 3: Solve for x</strong><br>(x - ${h})² = 0 implies x - ${h} = 0<br>x = <strong>${h}</strong>`;
                } else {
                  if (allowComplex) {
                    const sqrtVal = Math.sqrt(Math.abs(rightSide));
                    result = `x₁ = ${h} + ${sqrtVal.toFixed(4)}i<br>x₂ = ${h} - ${sqrtVal.toFixed(4)}i`;
                    explanation += `<strong>Step 3: Take the square root</strong><br>Since the right side is negative, we use imaginary numbers.<br>x - ${h} = ±√${rightSide}<br>x - ${h} = ±${sqrtVal.toFixed(4)}i<br><br>`;
                    explanation += `<strong>Step 4: Solve for x</strong><br>x = ${h} ± ${sqrtVal.toFixed(4)}i`;
                  } else {
                    result = "No real roots";
                    explanation += `<strong>Step 3: Analyze</strong><br>Since (x - ${h})² equals a negative number (${rightSide}), there are no real solutions.`;
                  }
                }

              } else if (form === "factored") {
                const a = parseFloat(document.getElementById("quad-a").value);
                const x1 = parseFloat(document.getElementById("quad-x1").value);
                const x2 = parseFloat(document.getElementById("quad-x2").value);

                if (isNaN(a) || isNaN(x1) || isNaN(x2)) {
                  resultDiv.innerHTML = "Please enter valid values";
                  return;
                }
                if (a === 0) {
                  resultDiv.innerHTML = "A cannot be 0";
                  return;
                }

                // Roots are directly x1 and x2
                result = `x₁ = <strong>${x1}</strong><br>x₂ = <strong>${x2}</strong>`;
                explanation += `<strong>Step 1: Analyze the Factored Form</strong><br>Equation: ${a}(x - ${x1})(x - ${x2}) = 0<br><br>`;
                explanation += `<strong>Step 2: Zero Product Property</strong><br>If the product of factors is zero, at least one of the factors must be zero.<br>`;
                explanation += `Either (x - ${x1}) = 0  OR  (x - ${x2}) = 0<br><br>`;
                explanation += `<strong>Step 3: Solve for x</strong><br>x = ${x1}<br>x = ${x2}`;
              }

              resultDiv.innerHTML = result;
              explanationDiv.innerHTML = explanation;
            });
        },
      },
      {
        id: "discriminant-calculator",
        name: "Discriminant Calculator",
        description:
          "Calculate the discriminant (b² - 4ac) of a quadratic equation.",
        educationalHTML: `
            <div class="educational-section">
                <p>The discriminant of a quadratic equation \( ax^2 + bx + c = 0 \) is given by:</p>
                \[ \Delta = b^2 - 4ac \]
                <p>The value of the discriminant determines the nature of the roots:</p>
                <ul>
                    <li>If \( \Delta > 0 \), there are two distinct real roots.</li>
                    <li>If \( \Delta = 0 \), there is exactly one real root (repeated).</li>
                    <li>If \( \Delta < 0 \), there are no real roots (two complex conjugate roots).</li>
                </ul>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="disc-a">a:</label>
                            <input type="number" id="disc-a" placeholder="Enter coefficient a">
                        </div>
                        <div class="form-group">
                            <label for="disc-b">b:</label>
                            <input type="number" id="disc-b" placeholder="Enter coefficient b">
                        </div>
                        <div class="form-group">
                            <label for="disc-c">c:</label>
                            <input type="number" id="disc-c" placeholder="Enter coefficient c">
                        </div>
                        <button id="calculate-discriminant" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "discriminant-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document
            .getElementById("calculate-discriminant")
            .addEventListener("click", function () {
              const a = parseFloat(document.getElementById("disc-a").value);
              const b = parseFloat(document.getElementById("disc-b").value);
              const c = parseFloat(document.getElementById("disc-c").value);
              const resultDiv = document.getElementById("discriminant-result");

              if (isNaN(a) || isNaN(b) || isNaN(c)) {
                resultDiv.innerHTML = "Please enter valid coefficients";
                return;
              }

              const discriminant = b * b - 4 * a * c;
              let result = `Discriminant = <strong>${discriminant}</strong><br><br>`;

              if (discriminant > 0) {
                result += "Two distinct real roots.";
              } else if (discriminant === 0) {
                result += "One repeated real root.";
              } else {
                result += "Two complex roots.";
              }

              resultDiv.innerHTML = result;
            });
        },
      },
    ],
    arithmetic: [
      {
        id: "arithmetic-sequence-calculator",
        name: "Arithmetic Sequence",
        description: "Calculate terms and sum of an arithmetic sequence.",
        educationalHTML: `
            <div class="educational-section">
                <p>An arithmetic sequence is a sequence of numbers such that the difference between the consecutive terms is constant.</p>
                <p>The \( n \)-th term \( a_n \) is given by:</p>
                \[ a_n = a_1 + (n-1)d \]
                <p>The sum of the first \( n \) terms \( S_n \) is:</p>
                \[ S_n = \frac{n}{2}(a_1 + a_n) \]
                <p>Where \( a_1 \) is the first term and \( d \) is the common difference.</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="first-term">First Term (a₁):</label>
                            <input type="number" id="first-term" placeholder="Enter first term">
                        </div>
                        <div class="form-group">
                            <label for="common-difference">Common Difference (d):</label>
                            <input type="number" id="common-difference" placeholder="Enter common difference">
                        </div>
                        <div class="form-group">
                            <label for="n-terms">Number of Terms (n):</label>
                            <input type="number" id="n-terms" placeholder="Enter number of terms">
                        </div>
                        <button id="calculate-arithmetic" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "arithmetic-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document
            .getElementById("calculate-arithmetic")
            .addEventListener("click", function () {
              const a1 = parseFloat(
                document.getElementById("first-term").value
              );
              const d = parseFloat(
                document.getElementById("common-difference").value
              );
              const n = parseInt(document.getElementById("n-terms").value);
              const resultDiv = document.getElementById("arithmetic-result");

              if (isNaN(a1) || isNaN(d) || isNaN(n)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              if (n <= 0 || !Number.isInteger(n)) {
                resultDiv.innerHTML = "Terms must be a positive integer";
                return;
              }

              const an = a1 + (n - 1) * d;
              const sum = (n / 2) * (a1 + an);

              let result = `nth Term (a<sub>n</sub>): <strong>${an.toFixed(
                2
              )}</strong><br>`;
              result += `Sum of ${n} terms: <strong>${sum.toFixed(
                2
              )}</strong>`;

              resultDiv.innerHTML = result;
            });
        },
      },
      {
        id: "factorial-calculator",
        name: "Factorial Calculator",
        description: "Calculate the factorial of a non-negative integer n (n!).",
        educationalHTML: `
            <div class="educational-section">
                <p>The factorial of a non-negative integer \( n \), denoted by \( n! \), is the product of all positive integers less than or equal to \( n \).</p>
                \[ n! = n \times (n-1) \times (n-2) \times \dots \times 3 \times 2 \times 1 \]
                <p>For example, \( 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 \).</p>
                <p>By definition, \( 0! = 1 \).</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="factorial-n">n:</label>
                            <input type="number" id="factorial-n" placeholder="Enter integer n" min="0" step="1">
                        </div>
                        <button id="calculate-factorial" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "factorial-result",
            true
          );
        },
        attachEvents: function () {
          const btn = document.getElementById("what-is-this-btn");
          if (btn) {
            btn.addEventListener("click", () => {
              animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
          }
          document
            .getElementById("calculate-factorial")
            .addEventListener("click", function () {
              const n = parseInt(document.getElementById("factorial-n").value);
              const resultDiv = document.getElementById("factorial-result");

              if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
                resultDiv.innerHTML = "Please enter a non-negative integer";
                return;
              }

              let factorial = 1;
              for (let i = 2; i <= n; i++) {
                factorial *= i;
                if (!isFinite(factorial)) {
                  resultDiv.innerHTML = "Result too large";
                  return;
                }
              }

              resultDiv.innerHTML = `${n}! = <strong>${factorial}</strong>`;
            });
        },
      },
    ],
  },
};
