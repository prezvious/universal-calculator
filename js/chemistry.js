import { createCalculatorLayout, animateReveal } from './utils.js';

const elements = [
    null, // 0 index filler,
    { name: "Hydrogen", symbol: "H", mass: 1.008 },
    { name: "Helium", symbol: "He", mass: 4.0026 },
    { name: "Lithium", symbol: "Li", mass: 6.94 },
    { name: "Beryllium", symbol: "Be", mass: 9.0122 },
    { name: "Boron", symbol: "B", mass: 10.81 },
    { name: "Carbon", symbol: "C", mass: 12.011 },
    { name: "Nitrogen", symbol: "N", mass: 14.007 },
    { name: "Oxygen", symbol: "O", mass: 15.999 },
    { name: "Fluorine", symbol: "F", mass: 18.998 },
    { name: "Neon", symbol: "Ne", mass: 20.180 },
    { name: "Sodium", symbol: "Na", mass: 22.990 },
    { name: "Magnesium", symbol: "Mg", mass: 24.305 },
    { name: "Aluminium", symbol: "Al", mass: 26.982 },
    { name: "Silicon", symbol: "Si", mass: 28.085 },
    { name: "Phosphorus", symbol: "P", mass: 30.974 },
    { name: "Sulfur", symbol: "S", mass: 32.06 },
    { name: "Chlorine", symbol: "Cl", mass: 35.45 },
    { name: "Argon", symbol: "Ar", mass: 39.948 },
    { name: "Potassium", symbol: "K", mass: 39.098 },
    { name: "Calcium", symbol: "Ca", mass: 40.078 },
    { name: "Scandium", symbol: "Sc", mass: 44.956 },
    { name: "Titanium", symbol: "Ti", mass: 47.867 },
    { name: "Vanadium", symbol: "V", mass: 50.942 },
    { name: "Chromium", symbol: "Cr", mass: 51.996 },
    { name: "Manganese", symbol: "Mn", mass: 54.938 },
    { name: "Iron", symbol: "Fe", mass: 55.845 },
    { name: "Cobalt", symbol: "Co", mass: 58.933 },
    { name: "Nickel", symbol: "Ni", mass: 58.693 },
    { name: "Copper", symbol: "Cu", mass: 63.546 },
    { name: "Zinc", symbol: "Zn", mass: 65.38 },
    { name: "Gallium", symbol: "Ga", mass: 69.723 },
    { name: "Germanium", symbol: "Ge", mass: 72.630 },
    { name: "Arsenic", symbol: "As", mass: 74.922 },
    { name: "Selenium", symbol: "Se", mass: 78.971 },
    { name: "Bromine", symbol: "Br", mass: 79.904 },
    { name: "Krypton", symbol: "Kr", mass: 83.798 },
    { name: "Rubidium", symbol: "Rb", mass: 85.468 },
    { name: "Strontium", symbol: "Sr", mass: 87.62 },
    { name: "Yttrium", symbol: "Y", mass: 88.906 },
    { name: "Zirconium", symbol: "Zr", mass: 91.224 },
    { name: "Niobium", symbol: "Nb", mass: 92.906 },
    { name: "Molybdenum", symbol: "Mo", mass: 95.95 },
    { name: "Technetium", symbol: "Tc", mass: 98 },
    { name: "Ruthenium", symbol: "Ru", mass: 101.07 },
    { name: "Rhodium", symbol: "Rh", mass: 102.91 },
    { name: "Palladium", symbol: "Pd", mass: 106.42 },
    { name: "Silver", symbol: "Ag", mass: 107.87 },
    { name: "Cadmium", symbol: "Cd", mass: 112.41 },
    { name: "Indium", symbol: "In", mass: 114.82 },
    { name: "Tin", symbol: "Sn", mass: 118.71 },
    { name: "Antimony", symbol: "Sb", mass: 121.76 },
    { name: "Tellurium", symbol: "Te", mass: 127.60 },
    { name: "Iodine", symbol: "I", mass: 126.90 },
    { name: "Xenon", symbol: "Xe", mass: 131.29 },
    { name: "Cesium", symbol: "Cs", mass: 132.91 },
    { name: "Barium", symbol: "Ba", mass: 137.33 },
    { name: "Lanthanum", symbol: "La", mass: 138.91 },
    { name: "Cerium", symbol: "Ce", mass: 140.12 },
    { name: "Praseodymium", symbol: "Pr", mass: 140.91 },
    { name: "Neodymium", symbol: "Nd", mass: 144.24 },
    { name: "Promethium", symbol: "Pm", mass: 145 },
    { name: "Samarium", symbol: "Sm", mass: 150.36 },
    { name: "Europium", symbol: "Eu", mass: 151.96 },
    { name: "Gadolinium", symbol: "Gd", mass: 157.25 },
    { name: "Terbium", symbol: "Tb", mass: 158.93 },
    { name: "Dysprosium", symbol: "Dy", mass: 162.50 },
    { name: "Holmium", symbol: "Ho", mass: 164.93 },
    { name: "Erbium", symbol: "Er", mass: 167.26 },
    { name: "Thulium", symbol: "Tm", mass: 168.93 },
    { name: "Ytterbium", symbol: "Yb", mass: 173.05 },
    { name: "Lutetium", symbol: "Lu", mass: 174.97 },
    { name: "Hafnium", symbol: "Hf", mass: 178.49 },
    { name: "Tantalum", symbol: "Ta", mass: 180.95 },
    { name: "Tungsten", symbol: "W", mass: 183.84 },
    { name: "Rhenium", symbol: "Re", mass: 186.21 },
    { name: "Osmium", symbol: "Os", mass: 190.23 },
    { name: "Iridium", symbol: "Ir", mass: 192.22 },
    { name: "Platinum", symbol: "Pt", mass: 195.08 },
    { name: "Gold", symbol: "Au", mass: 196.97 },
    { name: "Mercury", symbol: "Hg", mass: 200.59 },
    { name: "Thallium", symbol: "Tl", mass: 204.38 },
    { name: "Lead", symbol: "Pb", mass: 207.2 },
    { name: "Bismuth", symbol: "Bi", mass: 208.98 },
    { name: "Polonium", symbol: "Po", mass: 209 },
    { name: "Astatine", symbol: "At", mass: 210 },
    { name: "Radon", symbol: "Rn", mass: 222 },
    { name: "Francium", symbol: "Fr", mass: 223 },
    { name: "Radium", symbol: "Ra", mass: 226 },
    { name: "Actinium", symbol: "Ac", mass: 227 },
    { name: "Thorium", symbol: "Th", mass: 232.04 },
    { name: "Protactinium", symbol: "Pa", mass: 231.04 },
    { name: "Uranium", symbol: "U", mass: 238.03 },
    { name: "Neptunium", symbol: "Np", mass: 237 },
    { name: "Plutonium", symbol: "Pu", mass: 244 },
    { name: "Americium", symbol: "Am", mass: 243 },
    { name: "Curium", symbol: "Cm", mass: 247 },
    { name: "Berkelium", symbol: "Bk", mass: 247 },
    { name: "Californium", symbol: "Cf", mass: 251 },
    { name: "Einsteinium", symbol: "Es", mass: 252 },
    { name: "Fermium", symbol: "Fm", mass: 257 },
    { name: "Mendelevium", symbol: "Md", mass: 258 },
    { name: "Nobelium", symbol: "No", mass: 259 },
    { name: "Lawrencium", symbol: "Lr", mass: 262 },
    { name: "Rutherfordium", symbol: "Rf", mass: 267 },
    { name: "Dubnium", symbol: "Db", mass: 268 },
    { name: "Seaborgium", symbol: "Sg", mass: 271 },
    { name: "Bohrium", symbol: "Bh", mass: 272 },
    { name: "Hassium", symbol: "Hs", mass: 270 },
    { name: "Meitnerium", symbol: "Mt", mass: 276 },
    { name: "Darmstadtium", symbol: "Ds", mass: 281 },
    { name: "Roentgenium", symbol: "Rg", mass: 280 },
    { name: "Copernicium", symbol: "Cn", mass: 285 },
    { name: "Nihonium", symbol: "Nh", mass: 284 },
    { name: "Flerovium", symbol: "Fl", mass: 289 },
    { name: "Moscovium", symbol: "Mc", mass: 288 },
    { name: "Livermorium", symbol: "Lv", mass: 293 },
    { name: "Tennessine", symbol: "Ts", mass: 294 },
    { name: "Oganesson", symbol: "Og", mass: 294 }
];

export const chemistryCalculators = {
    icon: "icon-chemistry",
    label: "Chemistry",
    subcategories: {
        atomic: [
            {
                id: "atom-calculator",
                name: "Atom Calculator",
                description: "Calculate atomic number, mass number, and charge from protons, neutrons, and electrons.",
                educationalHTML: `
            <div class="educational-section">
                <h3>Definitions</h3>
                <ul>
                    <li><strong>Atom:</strong> The smallest constituent unit of matter that retains the properties of an element.</li>
                    <li><strong>Atom components:</strong> Positively-charged protons (p) and neutral neutrons (n) in the nucleus, with negatively-charged electrons (e) orbiting.</li>
                    <li><strong>Atomic number (Z):</strong> The number of protons. Identifies the element.</li>
                    <li><strong>Mass number (A):</strong> The sum of protons and neutrons.</li>
                </ul>

                <h3>Equations</h3>
                <p>If you know Z, A, and charge (z):</p>
                \\[ p = Z \\]
                \\[ n = A - Z \\]
                \\[ e = Z - z \\]

                <p>If you know p, n, and e:</p>
                \\[ Z = p \\]
                \\[ A = p + n \\]
                \\[ z = p - e \\]

                <h3>Ions</h3>
                <p><strong>Cation:</strong> Positively charged (more protons than electrons).</p>
                <p><strong>Anion:</strong> Negatively charged (more electrons than protons).</p>
            </div>
        `,
                generateHTML: function () {
                    // Two columns for inputs: Standard vs Composition
                    const inputs = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-secondary);">Properties</h4>
                        <div class="form-group">
                            <label for="atom-z">Atomic Number (Z):</label>
                            <input type="number" id="atom-z" placeholder="e.g. 11">
                        </div>
                        <div class="form-group">
                            <label for="atom-a">Mass Number (A):</label>
                            <input type="number" id="atom-a" placeholder="e.g. 23">
                        </div>
                        <div class="form-group">
                            <label for="atom-charge">Charge (z):</label>
                            <input type="number" id="atom-charge" placeholder="e.g. 0">
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-secondary);">Composition</h4>
                        <div class="form-group">
                            <label for="atom-p">Protons (p):</label>
                            <input type="number" id="atom-p" placeholder="e.g. 11">
                        </div>
                        <div class="form-group">
                            <label for="atom-n">Neutrons (n):</label>
                            <input type="number" id="atom-n" placeholder="e.g. 12">
                        </div>
                        <div class="form-group">
                            <label for="atom-e">Electrons (e):</label>
                            <input type="number" id="atom-e" placeholder="e.g. 11">
                        </div>
                    </div>
                </div>
            `;
                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "atom-result",
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

                    const inputs = {
                        z: document.getElementById("atom-z"),
                        a: document.getElementById("atom-a"),
                        charge: document.getElementById("atom-charge"),
                        p: document.getElementById("atom-p"),
                        n: document.getElementById("atom-n"),
                        e: document.getElementById("atom-e")
                    };

                    const resultDiv = document.getElementById("atom-result");

                    const updateResult = () => {
                        const z = parseInt(inputs.z.value);
                        const a = parseInt(inputs.a.value);

                        if (isNaN(z)) {
                            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values...</span>';
                            return;
                        }

                        if (z < 1 || z >= elements.length) {
                            resultDiv.innerHTML = 'Invalid atomic number.';
                            return;
                        }

                        // Element Lookup (safe — z is validated above)
                        const elementInfo = elements[z].name;
                        const symbol = elements[z].symbol;

                        // AZE Notation Logic
                        //   A
                        //     Sy
                        //   Z
                        const azeHtml = `
                    <div style="display: inline-block; text-align: left; vertical-align: middle; line-height: 1;">
                        <div style="font-size: 0.8em; margin-bottom: 2px;">${!isNaN(a) ? a : '?'}</div>
                        <div style="font-size: 0.8em;">${z}</div>
                    </div>
                    <div style="display: inline-block; font-size: 2em; font-weight: bold; vertical-align: middle; margin-left: 0.2rem;">${symbol}</div>
                `;

                        resultDiv.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        Your element is <strong>${elementInfo}</strong>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        AZE Notation:<br>
                        ${azeHtml}
                    </div>
                    <div>
                        Mass Number (A): <strong>${!isNaN(a) ? a : '-'}</strong>
                    </div>
                `;
                    };

                    // Bidirectional Logic
                    let isUpdating = false;

                    const updateFromProperties = () => {
                        if (isUpdating) return;
                        isUpdating = true;

                        const z = parseInt(inputs.z.value);
                        const a = parseInt(inputs.a.value);
                        const charge = parseInt(inputs.charge.value);

                        // Need Z to calculate anything useful usually
                        if (!isNaN(z)) {
                            inputs.p.value = z; // p = Z

                            if (!isNaN(a)) {
                                inputs.n.value = a - z; // n = A - Z
                            } else {
                                inputs.n.value = "";
                            }

                            if (!isNaN(charge)) {
                                inputs.e.value = z - charge; // e = Z - z
                            } else {
                                // If no charge entered, assume 0? The prompt says "In case of uncharged atoms...".
                                // If charge is empty, maybe don't calculate electrons yet? Or assume neutral?
                                // Let's leave e blank if charge blank.
                                inputs.e.value = "";
                            }
                        } else {
                            inputs.p.value = "";
                            inputs.n.value = "";
                            inputs.e.value = "";
                        }

                        updateResult();
                        isUpdating = false;
                    };

                    const updateFromComposition = () => {
                        if (isUpdating) return;
                        isUpdating = true;

                        const p = parseInt(inputs.p.value);
                        const n = parseInt(inputs.n.value);
                        const e = parseInt(inputs.e.value);

                        if (!isNaN(p)) {
                            inputs.z.value = p; // Z = p

                            if (!isNaN(n)) {
                                inputs.a.value = p + n; // A = p + n
                            } else {
                                inputs.a.value = "";
                            }

                            if (!isNaN(e)) {
                                inputs.charge.value = p - e; // z = p - e
                            } else {
                                inputs.charge.value = "";
                            }
                        } else {
                            inputs.z.value = "";
                            inputs.a.value = "";
                            inputs.charge.value = "";
                        }

                        updateResult();
                        isUpdating = false;
                    };

                    // Attach listeners
                    ['z', 'a', 'charge'].forEach(id => {
                        inputs[id].addEventListener('input', updateFromProperties);
                    });

                    ['p', 'n', 'e'].forEach(id => {
                        inputs[id].addEventListener('input', updateFromComposition);
                    });
                }
            }
        ],
        solutions: [
    {
    id: "dilution-factor-calculator",
    name: "Dilution Factor Calculator",
    description: "Calculate dilution factors (S:D and S:T) or volumes (initial, dilutant, final) for a solution.",
    educationalHTML: `
        <div class="educational-section">
            <h3>What is dilution factor?</h3>
            <p>The dilution factor (or dilution ratio) is the notation used to express how much of the original stock solution is present in the total solution after dilution. It is often given as a ratio but can also be given as an exponent; however, this calculator will only show it as a ratio. Regardless if the dilution factor is a ratio or exponent, it has two forms, either describing the parts of the stock solution to the parts of the dilutant added (S:D) or the parts of the stock solution to the parts of the total solution (S:T).</p>
            <p>As the difference between these two representations is very slight, an example would help ensure you don't get the wrong answers and mess up your experiment!</p>
            <p>Let's say you have a 10 cm³ aqueous solution of acyl chloride. However, this is too concentrated for your experiment, so you add 90 cm³ of water to further dilute the solution. You end up with 100 cm³ of acyl chloride. As you have 10 parts of the stock solution, and 90 parts of the dilutant, the S:D ratio is 1:9 (canceling down from 10:90). In the S:T notation the dilution factor is 1:10, you have 10 cm³ of the stock solution that now makes up a 100 cm³ solution.</p>
            <p>It is also worth noting that dilution factors only represent a loss of concentration – no molecules themselves are lost, just the number of them per mL decreases. This can be useful in several experimental situations. Although the dilution factor is just a handy way of thinking about dilutions, dilutions are very common, both in science and your day-to-day life. If you've ever made gravy, you've done a dilution. Ever washed your hands with soap? You've done a dilution.</p>

            <h3>Dilution factor formula</h3>
            <p>Now that we've discussed what the dilution factor is, let's get down to brass tacks and talk about the dilution factor formula. But first, a brief section on how to represent the dilution factor. As we mentioned above, the dilution factor is often expressed as a ratio of volumes. The simplest formula for both types of dilution factor is as follows:</p>
            <ul>
                <li>\[S:D = V_{stock} : V_{dilutant}\]</li>
                <li>\[S:T = V_{stock} : V_{total}\]</li>
            </ul>
            <p>If these volumes are expressed in the same units, you can cancel each side down using their greatest common factor, and you will end up with the simplest integer expression of the dilution factor. Some of you, however, may wish to express this ratio in the form 1:X, where X is how many parts of the dilutant/total solution there are for one part of the stock solution. This may leave you with some funny (not haha funny, but oh no funny) ratios, but their formulas are:</p>
            <ul>
                <li>\[S:D = 1 : (V_{dilutant} / V_{stock})\]</li>
                <li>\[S:T = 1 : (V_{total} / V_{stock})\]</li>
            </ul>
            <p>Due to the limitations in current technology, this is also how our calculator expresses your results. We hope you can forgive us for making you do extra work. You may also see the dilution factor expressed as an exponent, such as \\( 3^{-1} \\), \\( 5^{-3} \\), or \\( 10^{-4} \\). Now, do not be frightened by this new form! The exponent merely represents the ratio of the parts of the dilutant/total to the parts of the stock. Use the order of the ratio above:</p>
            <ul>
                <li>\\( S{:}D = \\text{exponent} : 1 \\)</li>
                <li>\\( S{:}T = \\text{exponent} : 1 \\)</li>
            </ul>
            <p>Now, you may or may not know that a number with a negative exponent is the same as putting that number as the denominator when the numerator is 1 and removing the negative sign. Our exponent calculator can help you understand this further, but for now, let's go through the examples we set out above:</p>
            <ul>
                <li>\\( 3^{-1} \\to \\frac{1}{3} : 1 \\to 1 : 3 \\)</li>
                <li>\\( 5^{-3} \\to \\frac{1}{5^3} : 1 \\to \\frac{1}{125} : 1 \\to 1 : 125 \\)</li>
                <li>\\( 10^{-4} \\to \\frac{1}{10^4} : 1 \\to \\frac{1}{10000} : 1 \\to 1 : 10000 \\)</li>
            </ul>

            <h3>How to calculate dilution factor</h3>
            <p>If you're still asking yourself, "how to find the dilution factor?", then we hope this section will answer all of your questions. So, just follow the steps below if you want to calculate the dilution factor by hand:</p>
            <ol>
                <li>Find any two of the following three values: volume of the stock solution (stock), volume of the dilutant (dilutant), and total volume of the solution (total). This can either be done theoretically (before your experiment) or experimentally (after your experiment).</li>
                <li>Use the two volumes to find the third. Use this equation: \\( V_{\\text{stock}} + V_{\\text{dilutant}} = V_{\\text{total}} \\). If you know which notation you would prefer to use (S:D or S:T), then you may not need this step, but we shall include it for completeness.</li>
                <li>Be sure that all the volumes in the ratios use the same unit.</li>
                <li>Decide which notation you require:</li>
                <ul>
                    <li>S:D = set the values of the stock and dilutant amount as a ratio — stock : dilutant</li>
                    <li>S:T = set the values of the stock and total amount as a ratio — stock : total</li>
                </ul>
                <li>If required, cancel down the fractions by finding the greatest common factor.</li>
            </ol>
        </div>
    `,
    generateHTML: function () {
        const units = [
            { val: 'mm3', label: 'cubic millimeters (mm³)' },
            { val: 'cm3', label: 'cubic centimeters (cm³)' },
            { val: 'dm3', label: 'cubic decimeters (dm³)' },
            { val: 'm3', label: 'cubic meters (m³)' },
            { val: 'in3', label: 'cubic inches (cu in)' },
            { val: 'ft3', label: 'cubic feet (cu ft)' },
            { val: 'yd3', label: 'cubic yards (cu yd)' },
            { val: 'ml', label: 'milliliters (ml)' },
            { val: 'l', label: 'liters (l)' },
            { val: 'us_gal', label: 'gallons (US) (US gal)' },
            { val: 'uk_gal', label: 'gallons (UK) (UK gal)' },
            { val: 'us_fl_oz', label: 'fluid ounces (US) (US fl oz)' },
            { val: 'uk_fl_oz', label: 'fluid ounces (UK) (UK fl oz)' }
        ];

        const createUnitSelect = (id, defaultUnit = 'ml') => {
            const options = units.map(u => `<option value="${u.val}" ${u.val === defaultUnit ? 'selected' : ''}>${u.label}</option>`).join('');
            return `
                <select id="${id}" style="flex: 1; min-width: 140px; margin-left: 0.5rem;">
                    ${options}
                </select>
            `;
        };

        const createInputGroup = (idPrefix, label, defaultUnit = 'ml') => {
            return `
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="${idPrefix}-val">${label}</label>
                    <div style="display: flex; align-items: stretch;">
                        <input type="number" id="${idPrefix}-val" placeholder="Value" style="flex: 1; min-width: 0;">
                        ${createUnitSelect(`${idPrefix}-unit`, defaultUnit)}
                    </div>
                </div>
            `;
        };

        const inputs = `
            ${createInputGroup('dilution-initial', 'Initial volume')}
            ${createInputGroup('dilution-dilutant', 'Dilutant volume')}
            ${createInputGroup('dilution-final', 'Final volume')}

            <div style="margin: 1.5rem 0; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                <h4 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-primary);">Dilution Factors</h4>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="dilution-st">Total to stock (S:T)</label>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="number" id="dilution-st" placeholder="Total" style="flex: 1;">
                        <span style="color: var(--text-secondary); font-weight: bold; font-size: 1.2rem;">/ 1</span>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="dilution-sd">Dilutant to stock (S:D)</label>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="number" id="dilution-sd" placeholder="Dilutant" style="flex: 1;">
                        <span style="color: var(--text-secondary); font-weight: bold; font-size: 1.2rem;">/ 1</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <button id="dilution-clear" class="btn btn-secondary" style="width: 100%;">Clear All</button>
            </div>
        `;

        return createCalculatorLayout(
            this.name,
            this.description,
            inputs,
            "dilution-result",
            true
        );
    },
    attachEvents: function () {
        const educationalBtn = document.getElementById("what-is-this-btn");
        if (educationalBtn) {
            educationalBtn.addEventListener("click", () => {
                animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
            });
        }

        const resultDiv = document.getElementById("dilution-result");
        resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values...</span>';

        const inputs = {
            initial: { val: document.getElementById('dilution-initial-val'), unit: document.getElementById('dilution-initial-unit') },
            dilutant: { val: document.getElementById('dilution-dilutant-val'), unit: document.getElementById('dilution-dilutant-unit') },
            final: { val: document.getElementById('dilution-final-val'), unit: document.getElementById('dilution-final-unit') },
            st: document.getElementById('dilution-st'),
            sd: document.getElementById('dilution-sd')
        };
        const clearBtn = document.getElementById('dilution-clear');

        // Conversion factors to ml
        const toMl = {
            'mm3': 0.001,
            'cm3': 1,
            'dm3': 1000,
            'm3': 1000000,
            'in3': 16.387064,
            'ft3': 28316.846592,
            'yd3': 764554.857984,
            'ml': 1,
            'l': 1000,
            'us_gal': 3785.411784,
            'uk_gal': 4546.09,
            'us_fl_oz': 29.5735295625,
            'uk_fl_oz': 28.4130625
        };

        const convertToMl = (val, unit) => val * toMl[unit];
        const convertFromMl = (val, unit) => val / toMl[unit];

        let isUpdating = false;

        const updateInputs = (source) => {
            if (isUpdating) return;
            isUpdating = true;

            const valInitial = parseFloat(inputs.initial.val.value);
            const valDilutant = parseFloat(inputs.dilutant.val.value);
            const valFinal = parseFloat(inputs.final.val.value);
            const valST = parseFloat(inputs.st.value);
            const valSD = parseFloat(inputs.sd.value);

            let mlInitial = isNaN(valInitial) ? null : convertToMl(valInitial, inputs.initial.unit.value);
            let mlDilutant = isNaN(valDilutant) ? null : convertToMl(valDilutant, inputs.dilutant.unit.value);
            let mlFinal = isNaN(valFinal) ? null : convertToMl(valFinal, inputs.final.unit.value);
            let st = isNaN(valST) ? null : valST;
            let sd = isNaN(valSD) ? null : valSD;

            // Handle ratios sync
            if (source === 'st' && st !== null && st > 1) {
                sd = st - 1;
                inputs.sd.value = sd.toString();
            } else if (source === 'sd' && sd !== null && sd > 0) {
                st = sd + 1;
                inputs.st.value = st.toString();
            }

            // Volume relationships: Initial + Dilutant = Final
            // We need 2 knowns (or 1 volume + ratio) to find everything
            let calcTarget = source;

            // Scenario 1: Initial & Dilutant known
            if (mlInitial !== null && mlDilutant !== null && ['initial', 'dilutant', 'unit'].includes(source)) {
                mlFinal = mlInitial + mlDilutant;
                inputs.final.val.value = convertFromMl(mlFinal, inputs.final.unit.value).toString();

                if (mlInitial > 0) {
                    st = mlFinal / mlInitial;
                    sd = mlDilutant / mlInitial;
                    inputs.st.value = st.toString();
                    inputs.sd.value = sd.toString();
                } else {
                    inputs.st.value = "";
                    inputs.sd.value = "";
                }
            }
            // Scenario 2: Initial & Final known
            else if (mlInitial !== null && mlFinal !== null && ['initial', 'final', 'unit'].includes(source)) {
                mlDilutant = mlFinal - mlInitial;
                if (mlDilutant >= 0) {
                    inputs.dilutant.val.value = convertFromMl(mlDilutant, inputs.dilutant.unit.value).toString();
                    st = mlFinal / mlInitial;
                    sd = mlDilutant / mlInitial;
                    inputs.st.value = st.toString();
                    inputs.sd.value = sd.toString();
                } else {
                    inputs.dilutant.val.value = "";
                    inputs.st.value = "";
                    inputs.sd.value = "";
                }
            }
            // Scenario 3: Dilutant & Final known
            else if (mlDilutant !== null && mlFinal !== null && ['dilutant', 'final', 'unit'].includes(source)) {
                mlInitial = mlFinal - mlDilutant;
                if (mlInitial > 0) {
                    inputs.initial.val.value = convertFromMl(mlInitial, inputs.initial.unit.value).toString();
                    st = mlFinal / mlInitial;
                    sd = mlDilutant / mlInitial;
                    inputs.st.value = st.toString();
                    inputs.sd.value = sd.toString();
                } else {
                    inputs.initial.val.value = "";
                    inputs.st.value = "";
                    inputs.sd.value = "";
                }
            }
            // Scenario 4: Initial & Ratio known
            else if (mlInitial !== null && st !== null && sd !== null && ['initial', 'st', 'sd', 'unit'].includes(source)) {
                mlFinal = mlInitial * st;
                mlDilutant = mlInitial * sd;
                inputs.final.val.value = convertFromMl(mlFinal, inputs.final.unit.value).toString();
                inputs.dilutant.val.value = convertFromMl(mlDilutant, inputs.dilutant.unit.value).toString();
            }
            // Scenario 5: Dilutant & Ratio known
            else if (mlDilutant !== null && sd !== null && sd > 0 && st !== null && ['dilutant', 'st', 'sd', 'unit'].includes(source)) {
                mlInitial = mlDilutant / sd;
                mlFinal = mlInitial * st;
                inputs.initial.val.value = convertFromMl(mlInitial, inputs.initial.unit.value).toString();
                inputs.final.val.value = convertFromMl(mlFinal, inputs.final.unit.value).toString();
            }
            // Scenario 6: Final & Ratio known
            else if (mlFinal !== null && st !== null && st > 0 && sd !== null && ['final', 'st', 'sd', 'unit'].includes(source)) {
                mlInitial = mlFinal / st;
                mlDilutant = mlInitial * sd;
                inputs.initial.val.value = convertFromMl(mlInitial, inputs.initial.unit.value).toString();
                inputs.dilutant.val.value = convertFromMl(mlDilutant, inputs.dilutant.unit.value).toString();
            }

            // Re-read after calculations to display result
            const currentInitial = parseFloat(inputs.initial.val.value);
            const currentDilutant = parseFloat(inputs.dilutant.val.value);
            const currentFinal = parseFloat(inputs.final.val.value);
            const currentST = parseFloat(inputs.st.value);
            const currentSD = parseFloat(inputs.sd.value);

            if (!isNaN(currentInitial) && !isNaN(currentFinal) && currentInitial > 0 && currentFinal >= currentInitial) {
                resultDiv.innerHTML = `
                    <div style="font-size: 1.1rem;">
                        <div>Dilution Factor (S:T) = <strong>1 : ${currentST.toFixed(2)}</strong></div>
                        <div style="margin-top: 0.5rem; font-size: 0.9em; color: var(--text-secondary);">
                            (${currentInitial.toFixed(4)} ${inputs.initial.unit.options[inputs.initial.unit.selectedIndex].text} in ${currentFinal.toFixed(4)} ${inputs.final.unit.options[inputs.final.unit.selectedIndex].text})
                        </div>
                    </div>
                `;
            } else if (isNaN(currentInitial) && isNaN(currentDilutant) && isNaN(currentFinal)) {
                 resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter at least two values...</span>';
            } else {
                 resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Waiting for more info...</span>';
            }

            isUpdating = false;
        };

        inputs.initial.val.addEventListener('input', () => updateInputs('initial'));
        inputs.dilutant.val.addEventListener('input', () => updateInputs('dilutant'));
        inputs.final.val.addEventListener('input', () => updateInputs('final'));

        inputs.initial.unit.addEventListener('change', () => updateInputs('unit'));
        inputs.dilutant.unit.addEventListener('change', () => updateInputs('unit'));
        inputs.final.unit.addEventListener('change', () => updateInputs('unit'));

        inputs.st.addEventListener('input', () => updateInputs('st'));
        inputs.sd.addEventListener('input', () => updateInputs('sd'));

        clearBtn.addEventListener('click', () => {
            isUpdating = true;
            inputs.initial.val.value = '';
            inputs.dilutant.val.value = '';
            inputs.final.val.value = '';
            inputs.st.value = '';
            inputs.sd.value = '';
            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values...</span>';
            isUpdating = false;
        });
    }
},
            {
                id: "concentration-calculator",
                name: "Concentration Calculator",
                description: "Calculate concentration as w/v%, w/w%, molarity, dilution, or from density.",
                educationalHTML: `
        <div class="educational-section">
            <h3>Solution Chemistry: Concentration Concepts</h3>

            <h4>1. Mass volume percent (w/v%)</h4>
            <p>Mass volume percent tells you how many grams of solute are present in every 100 mL of solution.</p>
            \\[ \\text{w/v\\%} = \\frac{\\text{mass of solute (g)}}{\\text{volume of solution (mL)}} \\times 100 \\]
            <p>The denominator is the total volume of the final solution, not just the solvent volume.</p>

            <h4>2. Mass percent (w/w%)</h4>
            <p>Mass percent tells you how many grams of solute are present in every 100 g of total solution.</p>
            \\[ \\text{w/w\\%} = \\frac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100 \\]
            \\[ \\text{mass of solution} = \\text{mass of solute} + \\text{mass of solvent} \\]

            <h4>3. Molarity concentration</h4>
            <p>Molarity is moles of solute per liter of solution.</p>
            \\[ M = \\frac{n}{V} \\]
            <p>Rearrangements:</p>
            \\[ n = M \\times V \\quad,\\quad V = \\frac{n}{M} \\]

            <h4>4. Solution dilution</h4>
            <p>Dilution keeps solute moles constant, so concentration and volume follow:</p>
            \\[ M_1 V_1 = M_2 V_2 \\]
            <p>\\( V_2 \\) is the final total volume after dilution.</p>

            <h4>5. Concentration from density</h4>
            <p>When density and mass percent are known, molarity is:</p>
            \\[ M = \\frac{\\rho \\times \\text{w/w\\%} \\times 10}{M_r} \\]
            <p>Use density (\\( \\rho \\)) in g/mL, w/w% as a percent number (for example 37), and molar mass (\\( M_r \\)) in g/mol.</p>
        </div>
    `,
                generateHTML: function () {
                    const massUnits = [
                        { val: 'mg', label: 'milligrams (mg)' },
                        { val: 'g', label: 'grams (g)' },
                        { val: 'kg', label: 'kilograms (kg)' },
                        { val: 'oz', label: 'ounces (oz)' },
                        { val: 'lb', label: 'pounds (lb)' }
                    ];

                    const volumeUnits = [
                        { val: 'mm3', label: 'cubic millimeters (mm3)' },
                        { val: 'dm3', label: 'cubic decimeters (dm3)' },
                        { val: 'm3', label: 'cubic meters (m3)' },
                        { val: 'in3', label: 'cubic inches (cu in)' },
                        { val: 'ft3', label: 'cubic feet (cu ft)' },
                        { val: 'ml', label: 'milliliters (mL)' },
                        { val: 'l', label: 'liters (l)' },
                        { val: 'us_fl_oz', label: 'fluid ounces (US) (US fl oz)' },
                        { val: 'uk_fl_oz', label: 'fluid ounces (UK) (UK fl oz)' }
                    ];

                    const createUnitOptions = (units, defaultUnit) => {
                        return units.map(unit => {
                            const selected = unit.val === defaultUnit ? 'selected' : '';
                            return `<option value="${unit.val}" ${selected}>${unit.label}</option>`;
                        }).join('');
                    };

                    const massOptions = createUnitOptions(massUnits, 'g');
                    const volumeOptions = createUnitOptions(volumeUnits, 'ml');

                    const createInputWithUnit = (idPrefix, label, options, placeholder = 'Enter value') => `
                <div class="form-group">
                    <label for="${idPrefix}-val">${label}</label>
                    <div style="display: flex; align-items: stretch;">
                        <input type="number" id="${idPrefix}-val" placeholder="${placeholder}" style="border-top-right-radius: 0; border-bottom-right-radius: 0; flex-grow: 1;">
                        <select id="${idPrefix}-unit" style="width: 220px; margin-left: -1px; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                            ${options}
                        </select>
                    </div>
                </div>
            `;

                    const createScalarInput = (id, label, suffix = '') => `
                <div class="form-group">
                    <label for="${id}">${label}</label>
                    <div style="display: flex; align-items: stretch;">
                        <input type="number" id="${id}" placeholder="Enter value" style="${suffix ? 'border-top-right-radius: 0; border-bottom-right-radius: 0;' : ''} flex-grow: 1;">
                        ${suffix ? `<div style="background: var(--bg-secondary); padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-left: none; border-radius: 0 0.5rem 0.5rem 0; white-space: nowrap;">${suffix}</div>` : ''}
                    </div>
                </div>
            `;

                    const inputs = `
            <div class="form-group">
                <label for="conc-mode">I want to calculate...</label>
                <select id="conc-mode">
                    <option value="wv">Mass volume percent (w/v%)</option>
                    <option value="ww">Mass percent (w/w%)</option>
                    <option value="molarity">Molarity concentration</option>
                    <option value="dilution">Solution dilution</option>
                    <option value="density">Concentration from density</option>
                </select>
            </div>

            <div id="conc-panel-wv" class="conc-mode-panel">
                ${createInputWithUnit('conc-wv-mass', 'Mass of solute', massOptions)}
                ${createInputWithUnit('conc-wv-volume', 'Volume of solution', volumeOptions)}
                ${createScalarInput('conc-wv-percent', 'Concentration', 'm/v %')}
            </div>

            <div id="conc-panel-ww" class="conc-mode-panel" style="display: none;">
                ${createInputWithUnit('conc-ww-solute', 'Mass of solute', massOptions)}
                ${createInputWithUnit('conc-ww-solution', 'Mass of solution', massOptions)}
                ${createScalarInput('conc-ww-percent', 'Mass percent', 'w/w %')}
            </div>

            <div id="conc-panel-molarity" class="conc-mode-panel" style="display: none;">
                ${createScalarInput('conc-molar-moles', 'Moles of solute (mol)')}
                ${createInputWithUnit('conc-molar-volume', 'Volume of solution', volumeOptions)}
                ${createScalarInput('conc-molarity', 'Molarity concentration', 'mol/L')}
            </div>

            <div id="conc-panel-dilution" class="conc-mode-panel" style="display: none;">
                ${createScalarInput('conc-dilution-m1', 'Initial concentration M1', 'mol/L')}
                ${createInputWithUnit('conc-dilution-v1', 'Initial volume V1', volumeOptions)}
                ${createScalarInput('conc-dilution-m2', 'Final concentration M2', 'mol/L')}
                ${createInputWithUnit('conc-dilution-v2', 'Final volume V2', volumeOptions)}
            </div>

            <div id="conc-panel-density" class="conc-mode-panel" style="display: none;">
                ${createScalarInput('conc-density', 'Density', 'g/mL')}
                ${createScalarInput('conc-density-ww', 'Mass percent (w/w%)', '%')}
                ${createScalarInput('conc-density-mm', 'Molar mass', 'g/mol')}
                ${createScalarInput('conc-density-molarity', 'Molarity', 'mol/L')}
            </div>

            <div style="margin-top: 1rem;">
                <button id="conc-clear" class="btn btn-secondary" style="width: 100%;">Clear All</button>
            </div>
        `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "concentration-result",
                        true
                    );
                },
                attachEvents: function () {
                    const educationalBtn = document.getElementById("what-is-this-btn");
                    if (educationalBtn) {
                        educationalBtn.addEventListener("click", () => {
                            animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
                        });
                    }

                    const resultDiv = document.getElementById("concentration-result");
                    const modeSelect = document.getElementById("conc-mode");

                    const panels = {
                        wv: document.getElementById("conc-panel-wv"),
                        ww: document.getElementById("conc-panel-ww"),
                        molarity: document.getElementById("conc-panel-molarity"),
                        dilution: document.getElementById("conc-panel-dilution"),
                        density: document.getElementById("conc-panel-density")
                    };

                    const placeholders = {
                        wv: "Enter any two values to solve the third value for w/v%.",
                        ww: "Enter any two values to solve the third value for w/w%.",
                        molarity: "Enter any two values to solve molarity, moles, or volume.",
                        dilution: "Enter any three values to solve the missing dilution variable.",
                        density: "Enter any three values to solve the fourth variable."
                    };

                    const setPlaceholder = (mode) => {
                        resultDiv.innerHTML = `<span style="opacity: 0.5; font-size: 1rem;">${placeholders[mode]}</span>`;
                    };

                    const formatNumber = (value, decimals = 6) => {
                        if (!Number.isFinite(value)) return '';
                        const fixed = value.toFixed(decimals);
                        return fixed.replace(/\.?0+$/, '');
                    };

                    const setInputValue = (input, value, decimals = 6) => {
                        input.value = formatNumber(value, decimals);
                    };

                    const massToG = {
                        mg: 0.001,
                        g: 1,
                        kg: 1000,
                        oz: 28.349523125,
                        lb: 453.59237
                    };

                    const volumeToMl = {
                        mm3: 0.001,
                        dm3: 1000,
                        m3: 1000000,
                        in3: 16.387064,
                        ft3: 28316.846592,
                        ml: 1,
                        l: 1000,
                        us_fl_oz: 29.5735295625,
                        uk_fl_oz: 28.4130625
                    };

                    const toGrams = (value, unit) => value * massToG[unit];
                    const fromGrams = (value, unit) => value / massToG[unit];
                    const toMl = (value, unit) => value * volumeToMl[unit];
                    const fromMl = (value, unit) => value / volumeToMl[unit];
                    const toL = (value, unit) => toMl(value, unit) / 1000;
                    const fromL = (value, unit) => fromMl(value * 1000, unit);

                    const getNumber = (input) => {
                        const parsed = parseFloat(input.value);
                        return Number.isFinite(parsed) ? parsed : null;
                    };

                    const hasNegative = (values) => values.some(v => v !== null && v < 0);

                    const refs = {
                        wv: {
                            massVal: document.getElementById("conc-wv-mass-val"),
                            massUnit: document.getElementById("conc-wv-mass-unit"),
                            volumeVal: document.getElementById("conc-wv-volume-val"),
                            volumeUnit: document.getElementById("conc-wv-volume-unit"),
                            percent: document.getElementById("conc-wv-percent")
                        },
                        ww: {
                            soluteVal: document.getElementById("conc-ww-solute-val"),
                            soluteUnit: document.getElementById("conc-ww-solute-unit"),
                            solutionVal: document.getElementById("conc-ww-solution-val"),
                            solutionUnit: document.getElementById("conc-ww-solution-unit"),
                            percent: document.getElementById("conc-ww-percent")
                        },
                        molarity: {
                            moles: document.getElementById("conc-molar-moles"),
                            volumeVal: document.getElementById("conc-molar-volume-val"),
                            volumeUnit: document.getElementById("conc-molar-volume-unit"),
                            molarity: document.getElementById("conc-molarity")
                        },
                        dilution: {
                            m1: document.getElementById("conc-dilution-m1"),
                            v1Val: document.getElementById("conc-dilution-v1-val"),
                            v1Unit: document.getElementById("conc-dilution-v1-unit"),
                            m2: document.getElementById("conc-dilution-m2"),
                            v2Val: document.getElementById("conc-dilution-v2-val"),
                            v2Unit: document.getElementById("conc-dilution-v2-unit")
                        },
                        density: {
                            density: document.getElementById("conc-density"),
                            ww: document.getElementById("conc-density-ww"),
                            molarMass: document.getElementById("conc-density-mm"),
                            molarity: document.getElementById("conc-density-molarity")
                        }
                    };

                    const updateWV = () => {
                        const massInput = refs.wv.massVal;
                        const massUnitInput = refs.wv.massUnit;
                        const volumeInput = refs.wv.volumeVal;
                        const volumeUnitInput = refs.wv.volumeUnit;
                        const percentInput = refs.wv.percent;

                        const mass = getNumber(massInput);
                        const volume = getNumber(volumeInput);
                        const percent = getNumber(percentInput);

                        let grams = mass === null ? null : toGrams(mass, massUnitInput.value);
                        let ml = volume === null ? null : toMl(volume, volumeUnitInput.value);
                        let wvPercent = percent;

                        if (hasNegative([grams, ml, wvPercent])) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Values must be non-negative.</span>';
                            return;
                        }

                        if (grams !== null && ml !== null && ml > 0) {
                            wvPercent = (grams / ml) * 100;
                            setInputValue(percentInput, wvPercent, 6);
                        } else if (wvPercent !== null && ml !== null && ml > 0) {
                            grams = (wvPercent * ml) / 100;
                            setInputValue(massInput, fromGrams(grams, massUnitInput.value), 6);
                        } else if (wvPercent !== null && grams !== null && wvPercent > 0) {
                            ml = (grams * 100) / wvPercent;
                            setInputValue(volumeInput, fromMl(ml, volumeUnitInput.value), 6);
                        } else {
                            setPlaceholder("wv");
                            return;
                        }

                        if (grams === null || ml === null || ml <= 0) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Provide valid values to compute w/v%.</span>';
                            return;
                        }

                        resultDiv.innerHTML = `
                            <div>Mass volume percent: <strong>${formatNumber((grams / ml) * 100, 4)}% (m/v)</strong></div>
                            <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                Equivalent to ${formatNumber((grams / ml) * 100, 4)} g per 100 mL of solution.
                            </div>
                        `;
                    };

                    const updateWW = () => {
                        const soluteMass = getNumber(refs.ww.soluteVal);
                        const solutionMass = getNumber(refs.ww.solutionVal);
                        const wwPercentInput = getNumber(refs.ww.percent);

                        let gSolute = soluteMass === null ? null : toGrams(soluteMass, refs.ww.soluteUnit.value);
                        let gSolution = solutionMass === null ? null : toGrams(solutionMass, refs.ww.solutionUnit.value);
                        let wwPercent = wwPercentInput;

                        if (hasNegative([gSolute, gSolution, wwPercent])) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Values must be non-negative.</span>';
                            return;
                        }

                        if (wwPercent !== null && wwPercent > 100) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Mass percent should be between 0 and 100.</span>';
                            return;
                        }

                        if (gSolute !== null && gSolution !== null && gSolution > 0) {
                            wwPercent = (gSolute / gSolution) * 100;
                            setInputValue(refs.ww.percent, wwPercent, 6);
                        } else if (wwPercent !== null && gSolution !== null) {
                            gSolute = gSolution * (wwPercent / 100);
                            setInputValue(refs.ww.soluteVal, fromGrams(gSolute, refs.ww.soluteUnit.value), 6);
                        } else if (wwPercent !== null && wwPercent > 0 && gSolute !== null) {
                            gSolution = gSolute * (100 / wwPercent);
                            setInputValue(refs.ww.solutionVal, fromGrams(gSolution, refs.ww.solutionUnit.value), 6);
                        } else {
                            setPlaceholder("ww");
                            return;
                        }

                        if (gSolution === null || gSolution <= 0 || gSolute === null || gSolute > gSolution) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Check that solution mass is positive and at least as large as solute mass.</span>';
                            return;
                        }

                        const gSolvent = gSolution - gSolute;
                        resultDiv.innerHTML = `
                            <div>Mass percent: <strong>${formatNumber((gSolute / gSolution) * 100, 4)}% (w/w)</strong></div>
                            <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                Solvent mass: ${formatNumber(gSolvent, 4)} g
                            </div>
                        `;
                    };

                    const updateMolarity = () => {
                        const molesInput = getNumber(refs.molarity.moles);
                        const volumeInput = getNumber(refs.molarity.volumeVal);
                        const molarityInput = getNumber(refs.molarity.molarity);

                        let moles = molesInput;
                        let liters = volumeInput === null ? null : toL(volumeInput, refs.molarity.volumeUnit.value);
                        let molarity = molarityInput;

                        if (hasNegative([moles, liters, molarity])) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Values must be non-negative.</span>';
                            return;
                        }

                        if (moles !== null && liters !== null && liters > 0) {
                            molarity = moles / liters;
                            setInputValue(refs.molarity.molarity, molarity, 6);
                        } else if (molarity !== null && liters !== null) {
                            moles = molarity * liters;
                            setInputValue(refs.molarity.moles, moles, 6);
                        } else if (molarity !== null && molarity > 0 && moles !== null) {
                            liters = moles / molarity;
                            setInputValue(refs.molarity.volumeVal, fromL(liters, refs.molarity.volumeUnit.value), 6);
                        } else {
                            setPlaceholder("molarity");
                            return;
                        }

                        if (moles === null || liters === null || liters <= 0) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Provide valid moles and volume for molarity.</span>';
                            return;
                        }

                        resultDiv.innerHTML = `
                            <div>Molarity: <strong>${formatNumber(moles / liters, 4)} mol/L</strong></div>
                            <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                (${formatNumber(moles, 4)} mol in ${formatNumber(liters, 4)} L)
                            </div>
                        `;
                    };

                    const updateDilution = () => {
                        let m1 = getNumber(refs.dilution.m1);
                        let v1 = getNumber(refs.dilution.v1Val);
                        let m2 = getNumber(refs.dilution.m2);
                        let v2 = getNumber(refs.dilution.v2Val);

                        let v1L = v1 === null ? null : toL(v1, refs.dilution.v1Unit.value);
                        let v2L = v2 === null ? null : toL(v2, refs.dilution.v2Unit.value);

                        if (hasNegative([m1, v1L, m2, v2L])) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Values must be non-negative.</span>';
                            return;
                        }

                        const known = [m1, v1L, m2, v2L].filter(v => v !== null).length;
                        if (known < 3) {
                            setPlaceholder("dilution");
                            return;
                        }

                        if (known === 3) {
                            if (m1 === null && v1L !== null && v1L > 0 && m2 !== null && v2L !== null) {
                                m1 = (m2 * v2L) / v1L;
                                setInputValue(refs.dilution.m1, m1, 6);
                            } else if (v1L === null && m1 !== null && m1 > 0 && m2 !== null && v2L !== null) {
                                v1L = (m2 * v2L) / m1;
                                setInputValue(refs.dilution.v1Val, fromL(v1L, refs.dilution.v1Unit.value), 6);
                            } else if (m2 === null && v2L !== null && v2L > 0 && m1 !== null && v1L !== null) {
                                m2 = (m1 * v1L) / v2L;
                                setInputValue(refs.dilution.m2, m2, 6);
                            } else if (v2L === null && m2 !== null && m2 > 0 && m1 !== null && v1L !== null) {
                                v2L = (m1 * v1L) / m2;
                                setInputValue(refs.dilution.v2Val, fromL(v2L, refs.dilution.v2Unit.value), 6);
                            }
                        }

                        if ([m1, v1L, m2, v2L].some(v => v === null || v <= 0)) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Dilution requires positive values and non-zero denominators.</span>';
                            return;
                        }

                        const left = m1 * v1L;
                        const right = m2 * v2L;
                        const relativeError = Math.abs(left - right) / Math.max(1, Math.abs(left), Math.abs(right));
                        const isMismatch = relativeError > 0.001;

                        const moleLine = isMismatch
                            ? `<div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                   Moles before dilution: ${formatNumber(left, 4)} mol<br>
                                   Moles after dilution: ${formatNumber(right, 4)} mol
                               </div>`
                            : `<div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                   Conserved moles: ${formatNumber(left, 4)} mol
                               </div>`;

                        const mismatchText = isMismatch
                            ? '<div style="margin-top: 0.5rem; color: #b46a00;">Current values do not exactly satisfy M1V1 = M2V2.</div>'
                            : '';

                        resultDiv.innerHTML = `
                            <div><strong>M1V1 = M2V2</strong></div>
                            <div style="margin-top: 0.5rem;">
                                ${formatNumber(m1, 4)} * ${formatNumber(v1L, 4)} = ${formatNumber(m2, 4)} * ${formatNumber(v2L, 4)}
                            </div>
                            ${moleLine}
                            ${mismatchText}
                        `;
                    };

                    const updateDensity = () => {
                        let density = getNumber(refs.density.density);
                        let ww = getNumber(refs.density.ww);
                        let molarMass = getNumber(refs.density.molarMass);
                        let molarity = getNumber(refs.density.molarity);

                        if (hasNegative([density, ww, molarMass, molarity])) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Values must be non-negative.</span>';
                            return;
                        }

                        if (ww !== null && ww > 100) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Mass percent (w/w%) must be between 0 and 100.</span>';
                            return;
                        }

                        const known = [density, ww, molarMass, molarity].filter(v => v !== null).length;
                        if (known < 3) {
                            setPlaceholder("density");
                            return;
                        }

                        if (known === 3) {
                            if (molarity === null && density !== null && ww !== null && molarMass !== null && molarMass > 0) {
                                molarity = (density * ww * 10) / molarMass;
                                setInputValue(refs.density.molarity, molarity, 6);
                            } else if (density === null && ww !== null && ww > 0 && molarMass !== null && molarity !== null) {
                                density = (molarity * molarMass) / (ww * 10);
                                setInputValue(refs.density.density, density, 6);
                            } else if (ww === null && density !== null && density > 0 && molarMass !== null && molarity !== null) {
                                ww = (molarity * molarMass) / (density * 10);
                                if (ww > 100) {
                                    resultDiv.innerHTML = '<span style="color: #c0392b;">Computed w/w% is greater than 100. Check your inputs.</span>';
                                    return;
                                }
                                setInputValue(refs.density.ww, ww, 6);
                            } else if (molarMass === null && molarity !== null && molarity > 0 && density !== null && ww !== null) {
                                molarMass = (density * ww * 10) / molarity;
                                setInputValue(refs.density.molarMass, molarMass, 6);
                            }
                        }

                        if ([density, ww, molarMass, molarity].some(v => v === null) || molarMass <= 0) {
                            resultDiv.innerHTML = '<span style="color: #c0392b;">Provide three valid values and ensure molar mass is greater than zero.</span>';
                            return;
                        }

                        const computedMolarity = (density * ww * 10) / molarMass;
                        const densityMismatch = molarity !== null
                            ? Math.abs(computedMolarity - molarity) / Math.max(1, Math.abs(computedMolarity), Math.abs(molarity)) > 0.001
                            : false;

                        const consistencyText = densityMismatch
                            ? `<div style="margin-top: 0.5rem; color: #b46a00;">
                                   Entered molarity (${formatNumber(molarity, 4)} mol/L) does not match density-based molarity.
                               </div>`
                            : '';

                        resultDiv.innerHTML = `
                            <div>Molarity from density data: <strong>${formatNumber(computedMolarity, 4)} mol/L</strong></div>
                            <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                                Formula used: M = (density * w/w% * 10) / molar mass
                            </div>
                            ${consistencyText}
                        `;
                    };

                    const updateActiveMode = () => {
                        const mode = modeSelect.value;
                        if (mode === "wv") updateWV();
                        else if (mode === "ww") updateWW();
                        else if (mode === "molarity") updateMolarity();
                        else if (mode === "dilution") updateDilution();
                        else if (mode === "density") updateDensity();
                    };

                    const showActivePanel = () => {
                        const mode = modeSelect.value;
                        Object.entries(panels).forEach(([key, panel]) => {
                            panel.style.display = key === mode ? "block" : "none";
                        });
                        setPlaceholder(mode);
                        updateActiveMode();
                    };

                    const valueInputIds = [
                        "conc-wv-mass-val", "conc-wv-volume-val", "conc-wv-percent",
                        "conc-ww-solute-val", "conc-ww-solution-val", "conc-ww-percent",
                        "conc-molar-moles", "conc-molar-volume-val", "conc-molarity",
                        "conc-dilution-m1", "conc-dilution-v1-val", "conc-dilution-m2", "conc-dilution-v2-val",
                        "conc-density", "conc-density-ww", "conc-density-mm", "conc-density-molarity"
                    ];

                    const convertBetweenUnits = (value, fromUnit, toUnit, kind) => {
                        if (fromUnit === toUnit) return value;
                        if (kind === "mass") {
                            return fromGrams(toGrams(value, fromUnit), toUnit);
                        }
                        return fromMl(toMl(value, fromUnit), toUnit);
                    };

                    const unitPairs = [
                        { valueId: "conc-wv-mass-val", unitId: "conc-wv-mass-unit", kind: "mass" },
                        { valueId: "conc-wv-volume-val", unitId: "conc-wv-volume-unit", kind: "volume" },
                        { valueId: "conc-ww-solute-val", unitId: "conc-ww-solute-unit", kind: "mass" },
                        { valueId: "conc-ww-solution-val", unitId: "conc-ww-solution-unit", kind: "mass" },
                        { valueId: "conc-molar-volume-val", unitId: "conc-molar-volume-unit", kind: "volume" },
                        { valueId: "conc-dilution-v1-val", unitId: "conc-dilution-v1-unit", kind: "volume" },
                        { valueId: "conc-dilution-v2-val", unitId: "conc-dilution-v2-unit", kind: "volume" }
                    ];

                    valueInputIds.forEach(id => {
                        const element = document.getElementById(id);
                        element.addEventListener("input", updateActiveMode);
                    });

                    unitPairs.forEach(({ valueId, unitId, kind }) => {
                        const valueInput = document.getElementById(valueId);
                        const unitSelect = document.getElementById(unitId);
                        unitSelect.dataset.prevUnit = unitSelect.value;

                        unitSelect.addEventListener("change", () => {
                            const currentValue = getNumber(valueInput);
                            const previousUnit = unitSelect.dataset.prevUnit || unitSelect.value;
                            const nextUnit = unitSelect.value;

                            if (currentValue !== null) {
                                const convertedValue = convertBetweenUnits(currentValue, previousUnit, nextUnit, kind);
                                setInputValue(valueInput, convertedValue, 6);
                            }

                            unitSelect.dataset.prevUnit = nextUnit;
                            updateActiveMode();
                        });
                    });

                    modeSelect.addEventListener("change", showActivePanel);

                    const clearBtn = document.getElementById("conc-clear");
                    clearBtn.addEventListener("click", () => {
                        valueInputIds.forEach(id => {
                            document.getElementById(id).value = "";
                        });
                        modeSelect.value = "wv";
                        showActivePanel();
                    });

                    showActivePanel();
                }
            },
            {
                id: "mass-percent-calculator",
                name: "Mass Percentage Calculator",
                description: "Calculate the mass percentage of a solute in a solution, a chemical component in a compound, or the percent composition of a mixture.",
                educationalHTML: `
        <div class="educational-section">
            <h3>Mass Percentage Calculator</h3>
            <p>This calculator determines the mass percentage of a solute in a solution or a specific component within a mixture. It also computes the percent composition of a compound based on its chemical formula.</p>

            <p>To use this tool, enter the mass of the solute and solvent (or the total mixture mass). Alternatively, input the chemical formula to find the percent composition by element.</p>

            <div style="background-color: #f0f7ff; color: #1a1a1a; padding: 10px; border-left: 5px solid #3498db; margin: 10px 0;">
                💡 Note: The mass percentage of a solution is independent of temperature.
            </div>

            <h3>Understanding Mass Percent</h3>
            <p>Mass percent expresses the concentration of a component in a mixture or compound. For solutions, it represents the ratio of the solute's mass to the total solution's mass as a percentage.</p>

            <p>Mass percent differs from percent composition:</p>
            <ul>
                <li><strong>Mass Percent:</strong> The percentage by mass of a component relative to the total mixture mass.</li>
                <li><strong>Percent Composition:</strong> The percentage by mass of each element within a compound.</li>
            </ul>

            <h3>Mass Percent Formulas</h3>
            <p>The calculation depends on whether you are analyzing a mixture or a solution.</p>

            <h4>1. Component in a Mixture</h4>
            \\[ \\text{Mass Percent} = \\left(\\frac{\\text{Mass of Component}}{\\text{Total Mass of Mixture}}\\right) \\times 100 \\]

            <h4>2. Solute in a Solution</h4>
            \\[ \\text{Mass Percent} = \\left(\\frac{\\text{Mass of Solute}}{\\text{Mass of Solution}}\\right) \\times 100 \\]

            <p>Where:</p>
            \\[ \\text{Mass of Solution} = \\text{Mass of Solute} + \\text{Mass of Solvent} \\]

            <p>You can rearrange this formula to find the mass of the solvent or solute if the total mass is known:</p>
            \\[ \\text{Mass of Solvent} = \\text{Mass of Solution} - \\text{Mass of Solute} \\]

            <h3>Calculating Percent Composition</h3>
            <p>To determine the percent composition of a compound:</p>
            <ol>
                <li>Identify the elements present.</li>
                <li>Determine the atomic mass of each element.</li>
                <li>Calculate the total molar mass of the compound.</li>
                <li>Divide the total mass of each element by the molar mass of the compound and multiply by 100.</li>
            </ol>
            <p>The sum of all individual percentages must equal 100%.</p>

            <h3>Example Calculation</h3>
            <p><strong>Problem:</strong> Calculate the mass percent of hydrochloric acid (HCl) in a solution containing 43 g of HCl and 200 g of water.</p>
            <p><strong>Solution:</strong></p>
            <ol>
                <li>Mass of Solute (HCl) = \\( 43 \\text{ g} \\)</li>
                <li>Mass of Solvent (Water) = \\( 200 \\text{ g} \\)</li>
                <li>Total Mass of Solution = \\( 43 \\text{ g} + 200 \\text{ g} = 243 \\text{ g} \\)</li>
                <li>\\( \\text{Mass Percent} = \\frac{43}{243} \\times 100 \\approx 17.70\\% \\)</li>
            </ol>
        </div>
    `,
                generateHTML: function () {
                    const units = [
                        { val: 'ug', label: 'micrograms (\u03BCg)' },
                        { val: 'mg', label: 'milligrams (mg)' },
                        { val: 'g', label: 'grams (g)' },
                        { val: 'dag', label: 'decagrams (dag)' },
                        { val: 'kg', label: 'kilograms (kg)' },
                        { val: 't', label: 'metric tons (t)' },
                        { val: 'oz', label: 'ounces (oz)' },
                        { val: 'lb', label: 'pounds (lb)' }
                    ];

                    const createUnitSelect = (id, defaultUnit = 'g') => {
                        const options = units.map(u => `<option value="${u.val}" ${u.val === defaultUnit ? 'selected' : ''}>${u.val}</option>`).join('');
                        return `
                <select id="${id}" style="width: 80px; flex-shrink: 0; margin-left: -1px; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                    ${options}
                </select>
            `;
                    };

                    const createInputGroup = (idPrefix, label, defaultUnit = 'g') => {
                        return `
                <div class="form-group">
                    <label for="${idPrefix}-val">${label}</label>
                    <div style="display: flex;">
                        <input type="number" id="${idPrefix}-val" placeholder="Enter value" style="border-top-right-radius: 0; border-bottom-right-radius: 0; flex-grow: 1;">
                        ${createUnitSelect(`${idPrefix}-unit`, defaultUnit)}
                    </div>
                </div>
            `;
                    };

                    // Element options for select
                    const elementOptions = elements.map((e, i) => {
                        if (!e) return '';
                        return `<option value="${i}">${e.symbol} - ${e.name}</option>`;
                    }).join('');

                    const elementSelectOptions = `<option value="">Select Element</option>${elementOptions}`;

                    const createCompositionRow = (index) => {
                        const num = ['1st', '2nd', '3rd', '4th', '5th', '6th'][index];
                        return `
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>No. of ${num} element atoms</label>
                    <div style="display: grid; grid-template-columns: 1fr 120px; gap: 0.5rem;">
                         <input type="number" id="comp-n${index}" placeholder="Count" min="0">
                         <select id="comp-e${index}">
                            ${elementSelectOptions}
                         </select>
                    </div>
                </div>
            `;
                    };

                    const inputs = `
            <div class="tabs" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <button class="tab-btn active" data-tab="tab-solute" style="flex: 1; padding: 0.5rem; background: none; border: none; border-bottom: 2px solid var(--primary-color); color: var(--primary-color); font-weight: bold; cursor: pointer;">Solute</button>
                <button class="tab-btn" data-tab="tab-chemical" style="flex: 1; padding: 0.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); cursor: pointer;">Chemical</button>
                <button class="tab-btn" data-tab="tab-composition" style="flex: 1; padding: 0.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); cursor: pointer;">Composition</button>
            </div>

            <!-- Tab 1: Solute -->
            <div id="tab-solute" class="tab-content">
                ${createInputGroup('solute-mass', 'Mass of solute')}
                ${createInputGroup('solvent-mass', 'Mass of solvent')}
                ${createInputGroup('solution-mass', 'Mass of solution')}

                <div class="form-group">
                    <label for="solute-percent">Mass percentage</label>
                    <div style="display: flex; align-items: center;">
                        <input type="number" id="solute-percent" placeholder="Result" style="border-top-right-radius: 0; border-bottom-right-radius: 0; flex-grow: 1;">
                        <div style="background: var(--bg-secondary); padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-left: none; border-radius: 0 0.5rem 0.5rem 0;">%</div>
                    </div>
                </div>
            </div>

            <!-- Tab 2: Chemical -->
            <div id="tab-chemical" class="tab-content" style="display: none;">
                ${createInputGroup('chemical-mass', 'Mass of chemical')}
                ${createInputGroup('compound-mass', 'Total mass of compound')}

                <div class="form-group">
                    <label for="chemical-percent">Mass percentage</label>
                    <div style="display: flex; align-items: center;">
                        <input type="number" id="chemical-percent" placeholder="Result" style="border-top-right-radius: 0; border-bottom-right-radius: 0; flex-grow: 1;">
                        <div style="background: var(--bg-secondary); padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-left: none; border-radius: 0 0.5rem 0.5rem 0;">%</div>
                    </div>
                </div>
            </div>

            <!-- Tab 3: Composition -->
            <div id="tab-composition" class="tab-content" style="display: none;">
                ${[0, 1, 2, 3, 4, 5].map(i => createCompositionRow(i)).join('')}
            </div>
        `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "mass-percent-result",
                        true
                    );
                },
                attachEvents: function () {
                    const resultDiv = document.getElementById("mass-percent-result");
                    const educationalBtn = document.getElementById("what-is-this-btn");

                    if (educationalBtn) {
                        educationalBtn.addEventListener("click", () => {
                            animateReveal(this.educationalHTML, document.getElementById("educational-content-container"));
                        });
                    }

                    // Tab Switching
                    const tabs = document.querySelectorAll('.tab-btn');
                    const contents = document.querySelectorAll('.tab-content');

                    tabs.forEach(tab => {
                        tab.addEventListener('click', () => {
                            // Update active tab style
                            tabs.forEach(t => {
                                t.classList.remove('active');
                                t.style.borderBottomColor = 'transparent';
                                t.style.color = 'var(--text-secondary)';
                                t.style.fontWeight = 'normal';
                            });
                            tab.classList.add('active');
                            tab.style.borderBottomColor = 'var(--primary-color)';
                            tab.style.color = 'var(--primary-color)';
                            tab.style.fontWeight = 'bold';

                            // Show content
                            contents.forEach(c => c.style.display = 'none');
                            document.getElementById(tab.dataset.tab).style.display = 'block';

                            // Clear result on tab switch
                            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values...</span>';
                        });
                    });

                    // --- Logic Shared ---
                    // Unit factors relative to grams
                    const factors = {
                        'ug': 1e-6, 'mg': 1e-3, 'g': 1, 'dag': 10, 'kg': 1000, 't': 1e6,
                        'oz': 28.349523125, 'lb': 453.59237
                    };

                    const toGrams = (val, unit) => val * factors[unit];
                    const fromGrams = (val, unit) => val / factors[unit];

                    // --- Tab 1: Solute Logic ---
                    const soluteInputs = {
                        solute: { val: document.getElementById('solute-mass-val'), unit: document.getElementById('solute-mass-unit') },
                        solvent: { val: document.getElementById('solvent-mass-val'), unit: document.getElementById('solvent-mass-unit') },
                        solution: { val: document.getElementById('solution-mass-val'), unit: document.getElementById('solution-mass-unit') },
                        percent: document.getElementById('solute-percent')
                    };

                    let isUpdatingSolute = false;

                    const updateSolute = (source) => {
                        if (isUpdatingSolute) return;
                        isUpdatingSolute = true;

                        const mSolute = parseFloat(soluteInputs.solute.val.value);
                        const uSolute = soluteInputs.solute.unit.value;

                        const mSolvent = parseFloat(soluteInputs.solvent.val.value);
                        const uSolvent = soluteInputs.solvent.unit.value;

                        const mSolution = parseFloat(soluteInputs.solution.val.value);
                        const uSolution = soluteInputs.solution.unit.value;

                        const percent = parseFloat(soluteInputs.percent.value);

                        // Normalize to grams
                        const gSolute = !isNaN(mSolute) ? toGrams(mSolute, uSolute) : null;
                        const gSolvent = !isNaN(mSolvent) ? toGrams(mSolvent, uSolvent) : null;
                        const gSolution = !isNaN(mSolution) ? toGrams(mSolution, uSolution) : null;

                        // Logic:
                        // 1. If Solute & Solvent -> Calc Solution & %
                        // 2. If Solution & Solute -> Calc Solvent & %
                        // 3. If Solution & Solvent -> Calc Solute & %
                        // 4. If % & Solution -> Calc Solute & Solvent
                        // 5. If % & Solute -> Calc Solution & Solvent

                        if (source === 'solute' || source === 'solvent') {
                            if (gSolute !== null && gSolvent !== null) {
                                const gTotal = gSolute + gSolvent;
                                soluteInputs.solution.val.value = fromGrams(gTotal, uSolution).toFixed(4);
                                soluteInputs.percent.value = ((gSolute / gTotal) * 100).toFixed(4);

                                resultDiv.innerHTML = `Mass Percentage: <strong>${((gSolute / gTotal) * 100).toFixed(2)}%</strong>`;
                            }
                        }

                        if (source === 'solution') {
                            // If we have solution and solute, find solvent
                            if (gSolution !== null && gSolute !== null) {
                                const gSolv = gSolution - gSolute;
                                soluteInputs.solvent.val.value = fromGrams(gSolv, uSolvent).toFixed(4);
                                soluteInputs.percent.value = ((gSolute / gSolution) * 100).toFixed(4);

                                resultDiv.innerHTML = `Mass Percentage: <strong>${((gSolute / gSolution) * 100).toFixed(2)}%</strong>`;
                            }
                            // If we have solution and solvent, find solute
                            else if (gSolution !== null && gSolvent !== null) {
                                const gSol = gSolution - gSolvent;
                                soluteInputs.solute.val.value = fromGrams(gSol, uSolute).toFixed(4);
                                soluteInputs.percent.value = ((gSol / gSolution) * 100).toFixed(4);

                                resultDiv.innerHTML = `Mass Percentage: <strong>${((gSol / gSolution) * 100).toFixed(2)}%</strong>`;
                            }
                        }

                        // Bidirectional Percent Logic
                        if (source === 'percent') {
                            if (!isNaN(percent) && percent > 0) {
                                if (gSolution !== null) {
                                    const gSol = gSolution * (percent / 100);
                                    const gSolv = gSolution - gSol;
                                    soluteInputs.solute.val.value = fromGrams(gSol, uSolute).toFixed(4);
                                    soluteInputs.solvent.val.value = fromGrams(gSolv, uSolvent).toFixed(4);
                                    resultDiv.innerHTML = `Solute: <strong>${fromGrams(gSol, uSolute).toFixed(2)} ${uSolute}</strong>`;
                                } else if (gSolute !== null) {
                                    const gSoln = gSolute / (percent / 100);
                                    const gSolv = gSoln - gSolute;
                                    soluteInputs.solution.val.value = fromGrams(gSoln, uSolution).toFixed(4);
                                    soluteInputs.solvent.val.value = fromGrams(gSolv, uSolvent).toFixed(4);
                                    resultDiv.innerHTML = `Solution: <strong>${fromGrams(gSoln, uSolution).toFixed(2)} ${uSolution}</strong>`;
                                }
                            }
                        }

                        isUpdatingSolute = false;
                    };

                    ['solute', 'solvent', 'solution'].forEach(key => {
                        soluteInputs[key].val.addEventListener('input', () => updateSolute(key));
                        soluteInputs[key].unit.addEventListener('change', () => updateSolute(key)); // Just re-trigger
                    });
                    soluteInputs.percent.addEventListener('input', () => updateSolute('percent'));


                    // --- Tab 2: Chemical Logic ---
                    const chemicalInputs = {
                        chemical: { val: document.getElementById('chemical-mass-val'), unit: document.getElementById('chemical-mass-unit') },
                        compound: { val: document.getElementById('compound-mass-val'), unit: document.getElementById('compound-mass-unit') },
                        percent: document.getElementById('chemical-percent')
                    };

                    let isUpdatingChemical = false;

                    const updateChemical = (source) => {
                        if (isUpdatingChemical) return;
                        isUpdatingChemical = true;

                        const mChem = parseFloat(chemicalInputs.chemical.val.value);
                        const uChem = chemicalInputs.chemical.unit.value;

                        const mComp = parseFloat(chemicalInputs.compound.val.value);
                        const uComp = chemicalInputs.compound.unit.value;

                        const percent = parseFloat(chemicalInputs.percent.value);

                        const gChem = !isNaN(mChem) ? toGrams(mChem, uChem) : null;
                        const gComp = !isNaN(mComp) ? toGrams(mComp, uComp) : null;

                        if (source === 'chemical' || source === 'compound') {
                            if (gChem !== null && gComp !== null) {
                                chemicalInputs.percent.value = ((gChem / gComp) * 100).toFixed(4);
                                resultDiv.innerHTML = `Mass Percentage: <strong>${((gChem / gComp) * 100).toFixed(2)}%</strong>`;
                            } else if (gChem !== null && !isNaN(percent)) {
                                // Find compound mass
                                // p = c/t * 100 => t = c / (p/100)
                                const gTotal = gChem / (percent / 100);
                                chemicalInputs.compound.val.value = fromGrams(gTotal, uComp).toFixed(4);
                                resultDiv.innerHTML = `Compound Mass: <strong>${fromGrams(gTotal, uComp).toFixed(2)} ${uComp}</strong>`;
                            } else if (gComp !== null && !isNaN(percent)) {
                                // Find chemical mass
                                const gPart = gComp * (percent / 100);
                                chemicalInputs.chemical.val.value = fromGrams(gPart, uChem).toFixed(4);
                                resultDiv.innerHTML = `Chemical Mass: <strong>${fromGrams(gPart, uChem).toFixed(2)} ${uChem}</strong>`;
                            }
                        }

                        if (source === 'percent') {
                            if (!isNaN(percent) && percent > 0) {
                                if (gComp !== null) {
                                    const gPart = gComp * (percent / 100);
                                    chemicalInputs.chemical.val.value = fromGrams(gPart, uChem).toFixed(4);
                                    resultDiv.innerHTML = `Chemical Mass: <strong>${fromGrams(gPart, uChem).toFixed(2)} ${uChem}</strong>`;
                                } else if (gChem !== null) {
                                    const gTotal = gChem / (percent / 100);
                                    chemicalInputs.compound.val.value = fromGrams(gTotal, uComp).toFixed(4);
                                    resultDiv.innerHTML = `Compound Mass: <strong>${fromGrams(gTotal, uComp).toFixed(2)} ${uComp}</strong>`;
                                }
                            }
                        }

                        isUpdatingChemical = false;
                    };

                    ['chemical', 'compound'].forEach(key => {
                        chemicalInputs[key].val.addEventListener('input', () => updateChemical(key));
                        chemicalInputs[key].unit.addEventListener('change', () => updateChemical(key));
                    });
                    chemicalInputs.percent.addEventListener('input', () => updateChemical('percent'));

                    // --- Tab 3: Composition Logic ---
                    const compInputs = [];
                    for (let i = 0; i < 6; i++) {
                        compInputs.push({
                            n: document.getElementById(`comp-n${i}`),
                            e: document.getElementById(`comp-e${i}`)
                        });
                    }

                    const updateComposition = () => {
                        let totalMass = 0;
                        const components = [];

                        // Collect data
                        let hasData = false;
                        compInputs.forEach((input, index) => {
                            const count = parseFloat(input.n.value);
                            const elemIndex = input.e.value;

                            if (!isNaN(count) && count > 0 && elemIndex !== '') {
                                hasData = true;
                                let mass = 0;
                                let symbol = '';
                                let name = '';

                                const idx = parseInt(elemIndex);
                                if (elements[idx]) {
                                    mass = elements[idx].mass;
                                    symbol = elements[idx].symbol;
                                    name = elements[idx].name;
                                }

                                if (mass > 0) {
                                    const totalComponentMass = count * mass;
                                    totalMass += totalComponentMass;
                                    components.push({ symbol, name, count, mass: totalComponentMass });
                                }
                            }
                        });

                        if (hasData && totalMass > 0) {
                            const results = components.map(c => {
                                const pct = (c.mass / totalMass) * 100;
                                return `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; border-bottom: 1px solid #eee;">
                            <span>${c.count} ${c.symbol} (${c.name})</span>
                            <strong>${pct.toFixed(3)}%</strong>
                        </div>`;
                            }).join('');

                            resultDiv.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        Total Molar Mass: <strong>${totalMass.toFixed(3)} g/mol</strong>
                    </div>
                    <div>
                        ${results}
                    </div>
                `;
                        } else if (hasData) {
                            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Invalid data...</span>';
                        } else {
                            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter counts and select elements...</span>';
                        }
                    };

                    compInputs.forEach(input => {
                        input.n.addEventListener('input', updateComposition);
                        input.e.addEventListener('change', updateComposition);
                    });
                }
            }
        ]
    }
};
