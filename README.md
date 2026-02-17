# Universal Calculator

The **Universal Calculator** is a robust, modular web application offering a comprehensive suite of calculation tools for mathematics, physics, chemistry, statistics, and unit conversions. Built with a focus on usability, accuracy, and education, it features a responsive interface, offline capabilities, and detailed educational explanations for complex concepts.

## 🚀 Key Features

### 🧮 Comprehensive Calculator Categories

The application is organized into specialized domains:

* **Mathematics (Math)**
  * **Percentage:** Simple percentages, percent change, and percent error.
  * **Algebra:** Robust **Quadratic Equation Solver** (supports Standard, Vertex, and Factored forms with complex root support).
  * **Arithmetic:** Factorials, Arithmetic Sequences, and Combinations.
  * **Time:** Percentage of time elapsed/remaining calculators.

* **Physics**
  * **Kinematics:** **Projectile Motion Calculator** with rigorous input validation (guards against negative time/distance).
  * **Dynamics:** Force (F=ma), Gravitational Force, and Free Fall calculations.

* **Chemistry**
  * **Molar Mass:** Calculate molar mass from chemical formulas or by summing element counts (with built-in periodic table data).
  * **Solutions:** Mass Percentage Calculator for solutes, solvents, and solutions.
  * **Atomic Structure:** Calculate protons, neutrons, electrons based on atomic number and mass.

* **Statistics**
  * **Lottery Odds:** Calculate winning probabilities for standard lotteries and "bonus ball" games (e.g., Powerball) with precise hypergeometric distribution logic.
  * **Data Sets:** (Planned future expansion)

* **Converters**
  * **Length:** Metric and Imperial length conversions.
  * **Area:** Square meters, hectares, acres, etc.
  * **Temperature:** Celsius, Fahrenheit, Kelvin, Rankine conversions with educational context.

### 📚 Educational Context

Each calculator includes a "What is this?" feature. Clicking this button reveals a beautifully formatted explanation of the underlying concepts and formulas, rendered using **MathJax** for high-quality mathematical typesetting.

### 🔍 Advanced Search

A global search bar allows users to instantly filter calculators by name or category. The search is optimized for speed and keyboard accessibility (press `/` to focus).

### 🛡️ Robust & Safe

Recent updates have significantly improved the application's reliability:

* **Input Validation:** Guarded against crashes from invalid inputs (e.g., negative time in physics, division by zero in statistics).
* **Error Handling:** Clear, user-friendly error messages instead of silent failures.
* **Precision:** handled large number calculations (like factorials and combinations) with precision warnings where appropriate.

### 📱 Progressive Web App (PWA)

The application includes a `manifest.json` and Service Worker (`sw.js`), allowing it to be installed on mobile devices and function completely offline.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3 (Custom Properties, Flexbox, Grid), JavaScript (ES6 Modules).
* **Math Rendering:** MathJax.
* **Icons:** SVG Sprite system.
* **Architecture:** Modular JS files (`core.js`, `ui.js`, `math.js`, `physics.js`, etc.) for maintainability and scalability.

---

## 📦 Installation & Usage

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/universal-calculator.git
    cd universal-calculator
    ```

2. **Serve the application:**
    Since the app uses ES6 modules, it must be served over HTTP/HTTPS (not `file://`).
    You can use any static file server, for example:

    ```bash
    # Using npx (Node.js required)
    npx serve .
    ```

    Or simply open `index.html` via a local server extension in your IDE (e.g., Live Server for VS Code).

3. **Open in Browser:**
    Navigate to `http://localhost:3000` (or whatever port your server uses).

---

## 🤝 Contributing

Contributions are welcome! Please ensure any new calculators follow the modular structure in `js/` and include appropriate `educationalHTML` content.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
