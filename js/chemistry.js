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
                <li>Mass of Solute (HCl) = 43 g</li>
                <li>Mass of Solvent (Water) = 200 g</li>
                <li>Total Mass of Solution = 43 g + 200 g = 243 g</li>
                <li>Mass Percent = (43 / 243) × 100 ≈ 17.70%</li>
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
                        'oz': 28.3495, 'lb': 453.592
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
