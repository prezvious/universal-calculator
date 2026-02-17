import { createCalculatorLayout, animateReveal } from './utils.js';

export const physicsCalculators = {
  icon: "icon-physics",
  label: "Physics",
  subcategories: {
    kinematics: [
      {
        id: "projectile-motion-calculator",
        name: "Projectile Motion",
        description: "Calculate key parameters of projectile motion.",
        educationalHTML: `
            <div class="educational-section">
                <p>Projectile motion is a form of motion experienced by an object or particle that is projected near the Earth's surface and moves along a curved path under the action of gravity only.</p>
                <p>The horizontal motion is constant velocity:</p>
                \[ x(t) = v_0 \cos(\theta) t \]
                <p>The vertical motion is constant acceleration (gravity):</p>
                \[ y(t) = h_0 + v_0 \sin(\theta) t - \frac{1}{2}gt^2 \]
                <p>Where:</p>
                <ul>
                    <li>\( v_0 \) is the initial velocity.</li>
                    <li>\( \theta \) is the launch angle.</li>
                    <li>\( h_0 \) is the initial height.</li>
                    <li>\( g \) is the acceleration due to gravity (approx. \( 9.81 \, \text{m/s}^2 \)).</li>
                </ul>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="initial-velocity">Initial Velocity (m/s):</label>
                            <input type="number" id="initial-velocity" placeholder="Enter initial velocity">
                        </div>
                        <div class="form-group">
                            <label for="launch-angle">Launch Angle (degrees):</label>
                            <input type="number" id="launch-angle" placeholder="Enter angle" min="0" max="90">
                        </div>
                        <div class="form-group">
                            <label for="initial-height">Initial Height (m):</label>
                            <input type="number" id="initial-height" placeholder="Enter initial height" value="0">
                        </div>
                        <button id="calculate-projectile" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "projectile-result",
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
            .getElementById("calculate-projectile")
            .addEventListener("click", function () {
              const v0 = parseFloat(
                document.getElementById("initial-velocity").value
              );
              const angleInDegrees = parseFloat(
                document.getElementById("launch-angle").value
              );
              const h0 = parseFloat(
                document.getElementById("initial-height").value
              );
              const resultDiv = document.getElementById("projectile-result");

              if (isNaN(v0) || isNaN(angleInDegrees) || isNaN(h0)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              if (v0 < 0) {
                resultDiv.innerHTML = "Initial velocity must be non-negative";
                return;
              }

              if (h0 < 0) {
                resultDiv.innerHTML = "Initial height must be non-negative";
                return;
              }

              const angle = (angleInDegrees * Math.PI) / 180;
              const g = 9.81;
              const v0x = v0 * Math.cos(angle);
              const v0y = v0 * Math.sin(angle);
              const timeToMax = v0y / g;
              const maxHeight =
                h0 + v0y * timeToMax - 0.5 * g * timeToMax * timeToMax;
              const discriminant = v0y * v0y + 2 * g * h0;
              if (discriminant < 0) {
                resultDiv.innerHTML = "Invalid combination: projectile cannot reach the ground with these parameters";
                return;
              }
              const timeOfFlight =
                (v0y + Math.sqrt(discriminant)) / g;
              const range = v0x * timeOfFlight;

              let result = `Max Height: <strong>${maxHeight.toFixed(
                2
              )} m</strong><br>`;
              result += `Time to Max: <strong>${timeToMax.toFixed(
                2
              )} s</strong><br>`;
              result += `Flight Time: <strong>${timeOfFlight.toFixed(
                2
              )} s</strong><br>`;
              result += `Range: <strong>${range.toFixed(2)} m</strong>`;

              resultDiv.innerHTML = result;
            });
        },
      },
      {
        id: "free-fall-calculator",
        name: "Free Fall Calculator",
        description: "Calculate parameters for objects falling under gravity.",
        educationalHTML: `
            <div class="educational-section">
                <p>Free fall is any motion of a body where gravity is the only force acting upon it.</p>
                <p>The time \( t \) to fall from a height \( h \) is:</p>
                \[ t = \sqrt{\frac{2h}{g}} \]
                <p>The final velocity \( v \) at impact is:</p>
                \[ v = gt = \sqrt{2gh} \]
                <p>Where \( g \approx 9.81 \, \text{m/s}^2 \).</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="free-fall-height">Height (m):</label>
                            <input type="number" id="free-fall-height" placeholder="Enter initial height">
                        </div>
                        <div class="form-group">
                            <label for="gravity-value">Gravity (m/s²):</label>
                            <input type="number" id="gravity-value" placeholder="Enter g value" value="9.81">
                        </div>
                        <button id="calculate-free-fall" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "free-fall-result",
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
            .getElementById("calculate-free-fall")
            .addEventListener("click", function () {
              const height = parseFloat(
                document.getElementById("free-fall-height").value
              );
              const gravity = parseFloat(
                document.getElementById("gravity-value").value
              );
              const resultDiv = document.getElementById("free-fall-result");

              if (isNaN(height) || isNaN(gravity)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              if (height < 0 || gravity <= 0) {
                resultDiv.innerHTML = "Invalid height or gravity";
                return;
              }

              const time = Math.sqrt((2 * height) / gravity);
              const finalVelocity = gravity * time;

              let result = `Fall Time: <strong>${time.toFixed(
                2
              )} s</strong><br>`;
              result += `Impact Velocity: <strong>${finalVelocity.toFixed(
                2
              )} m/s</strong>`;

              resultDiv.innerHTML = result;
            });
        },
      },
    ],
    dynamics: [
      {
        id: "force-calculator",
        name: "Force Calculator",
        description: "Calculate force using Newton's Second Law: F = ma.",
        educationalHTML: `
            <div class="educational-section">
                <p>Newton's Second Law of Motion states that the force \( F \) acting on an object is equal to the mass \( m \) of that object times its acceleration \( a \).</p>
                \[ F = ma \]
                <p>Force is measured in Newtons (N), mass in kilograms (kg), and acceleration in meters per second squared (m/s²).</p>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="mass">Mass (kg):</label>
                            <input type="number" id="mass" placeholder="Enter mass">
                        </div>
                        <div class="form-group">
                            <label for="acceleration">Acceleration (m/s²):</label>
                            <input type="number" id="acceleration" placeholder="Enter acceleration">
                        </div>
                        <button id="calculate-force" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "force-result",
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
            .getElementById("calculate-force")
            .addEventListener("click", function () {
              const mass = parseFloat(document.getElementById("mass").value);
              const acceleration = parseFloat(
                document.getElementById("acceleration").value
              );
              const resultDiv = document.getElementById("force-result");

              if (isNaN(mass) || isNaN(acceleration)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              const force = mass * acceleration;
              resultDiv.innerHTML = `Force: <strong>${force.toFixed(
                2
              )} N</strong>`;
            });
        },
      },
      {
        id: "gravitational-force-calculator",
        name: "Gravitational Force",
        description: "Calculate gravitational force between two masses.",
        educationalHTML: `
            <div class="educational-section">
                <p>Newton's law of universal gravitation states that every particle attracts every other particle in the universe with a force.</p>
                \[ F = G \frac{m_1 m_2}{r^2} \]
                <p>Where:</p>
                <ul>
                    <li>\( F \) is the gravitational force.</li>
                    <li>\( G \) is the gravitational constant (\( 6.67430 \times 10^{-11} \, \text{N} \cdot \text{m}^2/\text{kg}^2 \)).</li>
                    <li>\( m_1 \) and \( m_2 \) are the masses of the objects.</li>
                    <li>\( r \) is the distance between the centers of the two masses.</li>
                </ul>
            </div>
        `,
        generateHTML: function () {
          const inputs = `
                        <div class="form-group">
                            <label for="mass1">Mass 1 (kg):</label>
                            <input type="number" id="mass1" placeholder="Enter mass 1">
                        </div>
                        <div class="form-group">
                            <label for="mass2">Mass 2 (kg):</label>
                            <input type="number" id="mass2" placeholder="Enter mass 2">
                        </div>
                        <div class="form-group">
                            <label for="distance">Distance (m):</label>
                            <input type="number" id="distance" placeholder="Enter distance">
                        </div>
                        <button id="calculate-gravity" class="calculate-btn">Calculate</button>
                    `;
          return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "gravity-result",
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
            .getElementById("calculate-gravity")
            .addEventListener("click", function () {
              const mass1 = parseFloat(document.getElementById("mass1").value);
              const mass2 = parseFloat(document.getElementById("mass2").value);
              const distance = parseFloat(
                document.getElementById("distance").value
              );
              const resultDiv = document.getElementById("gravity-result");

              if (isNaN(mass1) || isNaN(mass2) || isNaN(distance)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                return;
              }

              if (mass1 <= 0 || mass2 <= 0 || distance <= 0) {
                resultDiv.innerHTML = "Values must be positive";
                return;
              }

              const G = 6.6743e-11;
              const force = (G * (mass1 * mass2)) / (distance * distance);

              let formattedForce;
              if (force < 0.01) {
                formattedForce = force.toExponential(4);
              } else {
                formattedForce = force.toFixed(10);
              }

              resultDiv.innerHTML = `Force: <strong>${formattedForce} N</strong>`;
            });
        },
      },
    ],
  },
};
