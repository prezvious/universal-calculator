// Generate Dilution Factor Calculator object to insert.
const newCalc = {
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
                <li>\\[S:D = V_{stock} : V_{dilutant}\\]</li>
                <li>\\[S:T = V_{stock} : V_{total}\\]</li>
            </ul>
            <p>If these volumes are expressed in the same units, you can cancel each side down using their greatest common factor, and you will end up with the simplest integer expression of the dilution factor. Some of you, however, may wish to express this ratio in the form 1:X, where X is how many parts of the dilutant/total solution there are for one part of the stock solution. This may leave you with some funny (not haha funny, but oh no funny) ratios, but their formulas are:</p>
            <ul>
                <li>\\[S:D = 1 : (V_{stock} / V_{dilutant})\\]</li>
                <li>\\[S:T = 1 : (V_{stock} / V_{total})\\]</li>
            </ul>
            <p>Due to the limitations in current technology, this is also how our calculator expresses your results. We hope you can forgive us for making you do extra work. You may also see the dilution factor expressed as an exponent, such as 3⁻¹, 5⁻³, or 10⁻⁴. Now, do not be frightened by this new form! The exponent merely represents the ratio of the parts of the dilutant/total to the parts of the stock. Use the order of the ratio above:</p>
            <ul>
                <li>S:D = exponent : 1</li>
                <li>S:T = exponent : 1</li>
            </ul>
            <p>Now, you may or may not know that a number with a negative exponent is the same as putting that number as the denominator when the numerator is 1 and removing the negative sign. Our exponent calculator can help you understand this further, but for now, let's go through the examples we set out above:</p>
            <ul>
                <li>3⁻¹ → 1/3 : 1 → 1/3 : 1 → 1 : 3</li>
                <li>5⁻³ → 1/5³ : 1 → 1/125 : 1 → 1 : 125</li>
                <li>10⁻⁴ → 1/10⁴ : 1 → 1/10000 : 1 → 1 : 10000</li>
            </ul>

            <h3>How to calculate dilution factor</h3>
            <p>If you're still asking yourself, "how to find the dilution factor?", then we hope this section will answer all of your questions. So, just follow the steps below if you want to calculate the dilution factor by hand:</p>
            <ol>
                <li>Find any two of the following three values: volume of the stock solution (stock), volume of the dilutant (dilutant), and total volume of the solution (total). This can either be done theoretically (before your experiment) or experimentally (after your experiment).</li>
                <li>Use the two volumes to find the third. Use this equation: stock + dilutant = total. If you know which notation you would prefer to use (S:D or S:T), then you may not need this step, but we shall include it for completeness.</li>
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
            const options = units.map(u => \`<option value="\${u.val}" \${u.val === defaultUnit ? 'selected' : ''}>\${u.label}</option>\`).join('');
            return \`
                <select id="\${id}" style="flex: 1; min-width: 140px; margin-left: 0.5rem;">
                    \${options}
                </select>
            \`;
        };

        const createInputGroup = (idPrefix, label, defaultUnit = 'ml') => {
            return \`
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="\${idPrefix}-val">\${label}</label>
                    <div style="display: flex; align-items: stretch;">
                        <input type="number" id="\${idPrefix}-val" placeholder="Value" style="flex: 1; min-width: 0;">
                        \${createUnitSelect(\`\${idPrefix}-unit\`, defaultUnit)}
                    </div>
                </div>
            \`;
        };

        const inputs = \`
            \${createInputGroup('dilution-initial', 'Initial volume')}
            \${createInputGroup('dilution-dilutant', 'Dilutant volume')}
            \${createInputGroup('dilution-final', 'Final volume')}

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
        \`;

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

                st = mlFinal / mlInitial;
                sd = mlDilutant / mlInitial;
                inputs.st.value = st.toString();
                inputs.sd.value = sd.toString();
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
            else if (mlInitial !== null && st !== null && ['initial', 'st', 'sd', 'unit'].includes(source)) {
                mlFinal = mlInitial * st;
                mlDilutant = mlInitial * sd;
                inputs.final.val.value = convertFromMl(mlFinal, inputs.final.unit.value).toString();
                inputs.dilutant.val.value = convertFromMl(mlDilutant, inputs.dilutant.unit.value).toString();
            }
            // Scenario 5: Dilutant & Ratio known
            else if (mlDilutant !== null && sd !== null && ['dilutant', 'st', 'sd', 'unit'].includes(source)) {
                mlInitial = mlDilutant / sd;
                mlFinal = mlInitial * st;
                inputs.initial.val.value = convertFromMl(mlInitial, inputs.initial.unit.value).toString();
                inputs.final.val.value = convertFromMl(mlFinal, inputs.final.unit.value).toString();
            }
            // Scenario 6: Final & Ratio known
            else if (mlFinal !== null && st !== null && ['final', 'st', 'sd', 'unit'].includes(source)) {
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
                resultDiv.innerHTML = \`
                    <div style="font-size: 1.1rem;">
                        <div>Dilution Factor (S:T) = <strong>1 : \${currentST.toFixed(2)}</strong></div>
                        <div style="margin-top: 0.5rem; font-size: 0.9em; color: var(--text-secondary);">
                            (\${currentInitial.toFixed(4)} \${inputs.initial.unit.options[inputs.initial.unit.selectedIndex].text} in \${currentFinal.toFixed(4)} \${inputs.final.unit.options[inputs.final.unit.selectedIndex].text})
                        </div>
                    </div>
                \`;
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
};
