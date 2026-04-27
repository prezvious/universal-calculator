import { createCalculatorLayout, animateReveal, createIconHeading } from './utils.js';

export const convertersCalculators = {
    icon: "icon-converter",
    label: "Converters",
    subcategories: {
        length: [
            {
                id: "length-converter",
                name: "Length Converter",
                description: "Convert between various metric and imperial length units.",
                educationalHTML: `
            <div class="qa-section" style="font-size: 0.9rem; color: var(--text-secondary);">
               ${createIconHeading("h4", "icon-ruler", "Understanding Length Measurement")}
               <p style="margin-bottom: 1rem; line-height: 1.7;">
                   Length is one of the most fundamental physical quantities. Two major systems of measurement coexist worldwide:
                   the <strong>Metric System</strong> (SI), used by most countries, and the <strong>Imperial System</strong>, used primarily in the United States, Liberia, and Myanmar.
               </p>

               ${createIconHeading("h4", "icon-flask", "The Metric System (SI Units)")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   The metric system is based on powers of 10, making conversions straightforward. The <strong>meter</strong> is the base unit, officially defined as the distance light travels in a vacuum in \\( \\frac{1}{299{,}792{,}458} \\) of a second.
               </p>
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Kilometer (km) = <strong>1,000</strong> Meters</li>
                   <li style="margin-bottom: 0.3rem;">1 Meter (m) = <strong>100</strong> Centimeters</li>
                   <li style="margin-bottom: 0.3rem;">1 Centimeter (cm) = <strong>10</strong> Millimeters</li>
                   <li style="margin-bottom: 0.3rem;">1 Millimeter (mm) = <strong>1,000</strong> Micrometers (µm)</li>
                   <li style="margin-bottom: 0.3rem;">1 Micrometer (µm) = <strong>1,000</strong> Nanometers (nm)</li>
               </ul>

               ${createIconHeading("h4", "icon-chart", "The Imperial System")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   The imperial system evolved from older English units. Unlike the metric system, conversion factors are not uniform, which is why a converter tool like this is essential.
               </p>
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Mile = <strong>1,760</strong> Yards = <strong>5,280</strong> Feet</li>
                   <li style="margin-bottom: 0.3rem;">1 Yard = <strong>3</strong> Feet = <strong>36</strong> Inches</li>
                   <li style="margin-bottom: 0.3rem;">1 Foot = <strong>12</strong> Inches</li>
               </ul>

               ${createIconHeading("h4", "icon-convert", "Key Cross-System Conversions")}
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Inch = <strong>2.54</strong> Centimeters (exact)</li>
                   <li style="margin-bottom: 0.3rem;">1 Foot = <strong>0.3048</strong> Meters (exact)</li>
                   <li style="margin-bottom: 0.3rem;">1 Yard = <strong>0.9144</strong> Meters (exact)</li>
                   <li style="margin-bottom: 0.3rem;">1 Mile ≈ <strong>1.609344</strong> Kilometers (exact)</li>
                   <li style="margin-bottom: 0.3rem;">1 Meter ≈ <strong>3.281</strong> Feet ≈ <strong>39.37</strong> Inches</li>
               </ul>

               ${createIconHeading("h4", "icon-space", "Astronomical Distances")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   A <strong>light year</strong> is the distance light travels in one year in a vacuum — approximately <strong>9.461 × 10¹⁵ meters</strong> (about 5.879 trillion miles). It is used to express distances between stars and galaxies.
               </p>
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;"><em>The nearest star (Proxima Centauri) is about <strong>4.24</strong> light years away.</em></li>
                   <li style="margin-bottom: 0.3rem;"><em>The Milky Way galaxy is about <strong>100,000</strong> light years across.</em></li>
               </ul>

               ${createIconHeading("h4", "icon-lightbulb", "Practical Examples")}
               <ul style="list-style: none; padding: 0;">
                   <li style="margin-bottom: 0.4rem;"><strong>Q: How tall is a 6-foot person in cm?</strong><br>6 × 30.48 = <strong>182.88 cm</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: How far is a 5K run in miles?</strong><br>5 ÷ 1.609 ≈ <strong>3.107 miles</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: A 100-yard football field in meters?</strong><br>100 × 0.9144 = <strong>91.44 meters</strong></li>
               </ul>
            </div>
        `,
                generateHTML: function () {
                    const units = [
                        { value: "meter", label: "Meter (m)" },
                        { value: "kilometer", label: "Kilometer (km)" },
                        { value: "centimeter", label: "Centimeter (cm)" },
                        { value: "millimeter", label: "Millimeter (mm)" },
                        { value: "micrometer", label: "Micrometer (µm)" },
                        { value: "nanometer", label: "Nanometer (nm)" },
                        { value: "mile", label: "Mile (mi)" },
                        { value: "yard", label: "Yard (yd)" },
                        { value: "foot", label: "Foot (ft)" },
                        { value: "inch", label: "Inch (in)" },
                        { value: "light_year", label: "Light Year (ly)" }
                    ];

                    let fromOptions = "";
                    let toOptions = "";
                    units.forEach(u => {
                        fromOptions += `<option value="${u.value}"${u.value === 'meter' ? ' selected' : ''}>${u.label}</option>`;
                        toOptions += `<option value="${u.value}"${u.value === 'centimeter' ? ' selected' : ''}>${u.label}</option>`;
                    });

                    const inputsHTML = `
                <div class="converter-layout">
                    <div class="converter-panel converter-from">
                        <div class="converter-panel-header">From</div>
                        <div class="form-group">
                            <input type="number" id="length-from-value" value="1" placeholder="Enter value">
                        </div>
                        <div class="form-group">
                            <select id="length-from-unit">${fromOptions}</select>
                        </div>
                    </div>

                    <div class="converter-swap-section">
                        <button id="length-switch-btn" class="converter-swap-btn" title="Swap Units">
                            <svg class="icon" aria-hidden="true"><use href="#icon-convert"></use></svg>
                        </button>
                    </div>

                    <div class="converter-panel converter-to">
                        <div class="converter-panel-header">To</div>
                        <div class="form-group">
                            <input type="number" id="length-to-value" readonly placeholder="Result">
                        </div>
                        <div class="form-group">
                            <select id="length-to-unit">${toOptions}</select>
                        </div>
                    </div>
                </div>

                <div id="length-final-result" class="converter-final-result"></div>

                <div id="length-all-conversions" class="converter-all-results"></div>
            `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputsHTML,
                        "length-result-container",
                        true
                    );
                },
                attachEvents: function () {
                    const unitsData = {
                        meter: 1,
                        kilometer: 1000,
                        centimeter: 0.01,
                        millimeter: 0.001,
                        micrometer: 1e-6,
                        nanometer: 1e-9,
                        mile: 1609.344,
                        yard: 0.9144,
                        foot: 0.3048,
                        inch: 0.0254,
                        light_year: 9.4607e15
                    };

                    const unitLabels = {
                        meter: "Meter",
                        kilometer: "Kilometer",
                        centimeter: "Centimeter",
                        millimeter: "Millimeter",
                        micrometer: "Micrometer",
                        nanometer: "Nanometer",
                        mile: "Mile",
                        yard: "Yard",
                        foot: "Foot",
                        inch: "Inch",
                        light_year: "Light Year"
                    };

                    const unitAbbrev = {
                        meter: "m", kilometer: "km", centimeter: "cm",
                        millimeter: "mm", micrometer: "µm", nanometer: "nm",
                        mile: "mi", yard: "yd", foot: "ft", inch: "in",
                        light_year: "ly"
                    };

                    // Hide the default result panel since we're using a custom layout
                    const resultPanel = document.querySelector('.calculator-results');
                    if (resultPanel) resultPanel.style.display = 'none';

                    // Adjust the grid to be single column since we're hiding the result panel
                    const wrapper = document.querySelector('.calculator-wrapper');
                    if (wrapper) wrapper.style.gridTemplateColumns = '1fr';

                    const fromValueInput = document.getElementById("length-from-value");
                    const fromUnitSelect = document.getElementById("length-from-unit");
                    const toValueInput = document.getElementById("length-to-value");
                    const toUnitSelect = document.getElementById("length-to-unit");
                    const switchBtn = document.getElementById("length-switch-btn");
                    const finalResult = document.getElementById("length-final-result");
                    const allConversions = document.getElementById("length-all-conversions");

                    const educationalBtn = document.getElementById("what-is-this-btn");
                    if (educationalBtn && this.educationalHTML) {
                        educationalBtn.addEventListener("click", () => {
                            const container = document.getElementById("educational-content-container");
                            animateReveal(this.educationalHTML, container);
                        });
                    }

                    function formatValue(num) {
                        if (num === 0) return '0';
                        if (Math.abs(num) < 1e-4 || Math.abs(num) > 1e9) {
                            return num.toExponential(6);
                        }
                        return parseFloat(num.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 8 });
                    }

                    function updateConversions() {
                        const val = parseFloat(fromValueInput.value);
                        const fromUnit = fromUnitSelect.value;
                        const toUnit = toUnitSelect.value;

                        if (isNaN(val) || val === 0) {
                            toValueInput.value = "";
                            finalResult.innerHTML = '';
                            allConversions.innerHTML = '';
                            return;
                        }

                        const baseMeters = val * unitsData[fromUnit];

                        // Update To Input
                        const resultVal = baseMeters / unitsData[toUnit];
                        toValueInput.value = formatValue(resultVal);

                        // Update final result display
                        finalResult.innerHTML = `
                    <div class="converter-result-equation">
                        <span class="converter-result-from">${formatValue(val)} ${unitLabels[fromUnit]}</span>
                        <span class="converter-result-equals">=</span>
                        <span class="converter-result-to">${formatValue(resultVal)} ${unitLabels[toUnit]}</span>
                    </div>
                `;

                        // Build all conversions grid
                        let gridHTML = '<div class="converter-grid-title">All Conversions</div><div class="converter-grid">';
                        for (const [key, label] of Object.entries(unitLabels)) {
                            if (key === fromUnit) continue;
                            const converted = baseMeters / unitsData[key];
                            const isActive = key === toUnit ? ' active' : '';
                            gridHTML += `
                        <div class="converter-grid-item${isActive}">
                            <span class="converter-grid-value">${formatValue(converted)}</span>
                            <span class="converter-grid-unit">${label} (${unitAbbrev[key]})</span>
                        </div>
                    `;
                        }
                        gridHTML += '</div>';
                        allConversions.innerHTML = gridHTML;
                    }

                    function updateFrom() {
                        const val = parseFloat(toValueInput.value);
                        const fromUnit = fromUnitSelect.value;
                        const toUnit = toUnitSelect.value;

                        if (isNaN(val)) {
                            fromValueInput.value = "";
                            finalResult.innerHTML = "";
                            allConversions.innerHTML = '';
                            return;
                        }

                        const baseMeters = val * unitsData[toUnit];
                        const resultVal = baseMeters / unitsData[fromUnit];
                        fromValueInput.value = formatValue(resultVal);
                        updateConversions();
                    }

                    function swap() {
                        const oldFromUnit = fromUnitSelect.value;
                        const oldToUnit = toUnitSelect.value;

                        fromUnitSelect.value = oldToUnit;
                        toUnitSelect.value = oldFromUnit;

                        // Animate the swap button
                        switchBtn.classList.add('rotating');
                        setTimeout(() => switchBtn.classList.remove('rotating'), 300);

                        updateConversions();
                    }

                    fromValueInput.addEventListener("input", updateConversions);
                    fromUnitSelect.addEventListener("change", updateConversions);
                    toUnitSelect.addEventListener("change", updateConversions);
                    switchBtn.addEventListener("click", swap);

                    updateConversions();
                }
            },

        ],
        area: [
            {
                id: "area-converter",
                name: "Area Converter",
                description: "Convert between various metric and imperial area units.",
                educationalHTML: `
            <div class="qa-section" style="font-size: 0.9rem; color: var(--text-secondary);">
               ${createIconHeading("h4", "icon-area", "Understanding Area Measurement")}
               <p style="margin-bottom: 1rem; line-height: 1.7;">
                   Area measures the size of a two-dimensional surface. Since area is derived from length, area units are the <strong>square</strong> of their corresponding length units. This means conversion factors are squared too — e.g., since 1 m = 100 cm, then \\( 1 \\, \\text{m}^2 = 10{,}000 \\, \\text{cm}^2 \\).
               </p>

               ${createIconHeading("h4", "icon-flask", "Metric Area Units (SI)")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   The base SI unit of area is the <strong>square meter</strong> (m²). Larger areas use hectares or square kilometers, while tiny areas use square millimeters or smaller.
               </p>
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Square Kilometer (km²) = <strong>1,000,000</strong> m²</li>
                   <li style="margin-bottom: 0.3rem;">1 Hectare (ha) = <strong>10,000</strong> m²</li>
                   <li style="margin-bottom: 0.3rem;">1 Are (a) = <strong>100</strong> m²</li>
                   <li style="margin-bottom: 0.3rem;">1 m² = <strong>10,000</strong> cm²</li>
                   <li style="margin-bottom: 0.3rem;">1 cm² = <strong>100</strong> mm²</li>
               </ul>

               ${createIconHeading("h4", "icon-chart", "Imperial & US Customary Area Units")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   The imperial system uses square feet, square yards, acres, and square miles. The <strong>acre</strong> is the most common land measurement unit in the US and UK.
               </p>
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Square Mile (mi²) = <strong>640</strong> Acres</li>
                   <li style="margin-bottom: 0.3rem;">1 Acre = <strong>43,560</strong> ft² ≈ <strong>4,047</strong> m²</li>
                   <li style="margin-bottom: 0.3rem;">1 Square Yard (yd²) = <strong>9</strong> ft²</li>
                   <li style="margin-bottom: 0.3rem;">1 Square Foot (ft²) = <strong>144</strong> in²</li>
               </ul>

               ${createIconHeading("h4", "icon-convert", "Key Cross-System Conversions")}
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">1 Square Inch = <strong>6.4516</strong> cm² (exact)</li>
                   <li style="margin-bottom: 0.3rem;">1 Square Foot = <strong>0.0929</strong> m²</li>
                   <li style="margin-bottom: 0.3rem;">1 Acre = <strong>0.4047</strong> Hectares</li>
                   <li style="margin-bottom: 0.3rem;">1 Hectare ≈ <strong>2.471</strong> Acres</li>
                   <li style="margin-bottom: 0.3rem;">1 Square Mile ≈ <strong>2.59</strong> km²</li>
               </ul>

               ${createIconHeading("h4", "icon-chart", "Are vs Acre")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   Despite similar names, an <strong>are</strong> and an <strong>acre</strong> are very different. One are equals \\( 100 \\, \\text{m}^2 \\) (a 10m × 10m square), while one acre equals approximately \\( 4{,}047 \\, \\text{m}^2 \\) — about <strong>40.47 times</strong> larger.
               </p>

               ${createIconHeading("h4", "icon-lightbulb", "Practical Examples")}
               <ul style="list-style: none; padding: 0;">
                   <li style="margin-bottom: 0.4rem;"><strong>Q: How big is a soccer field in acres?</strong><br>A standard soccer field is ~7,140 m² ≈ <strong>1.76 acres</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: A 2,000 sq ft apartment in m²?</strong><br>2,000 × 0.0929 ≈ <strong>185.8 m²</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: How many hectares in a square mile?</strong><br>1 mi² ≈ <strong>259 hectares</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: A quarter-acre lot in sq ft?</strong><br>0.25 × 43,560 = <strong>10,890 ft²</strong></li>
               </ul>
            </div>
        `,
                generateHTML: function () {
                    const units = [
                        { value: "sq_m", label: "Square Meter (m²)" },
                        { value: "sq_km", label: "Square Kilometer (km²)" },
                        { value: "sq_cm", label: "Square Centimeter (cm²)" },
                        { value: "sq_mm", label: "Square Millimeter (mm²)" },
                        { value: "hectare", label: "Hectare (ha)" },
                        { value: "are", label: "Are (a)" },
                        { value: "decare", label: "Decare (da)" },
                        { value: "acre", label: "Acre (ac)" },
                        { value: "sq_mi", label: "Square Mile (mi²)" },
                        { value: "sq_yd", label: "Square Yard (yd²)" },
                        { value: "sq_ft", label: "Square Foot (ft²)" },
                        { value: "sq_in", label: "Square Inch (in²)" },
                        { value: "sq_dm", label: "Square Decimeter (dm²)" },
                        { value: "sq_um", label: "Square Micrometer (µm²)" },
                        { value: "sq_nm", label: "Square Nanometer (nm²)" },
                        { value: "sq_pm", label: "Square Picometer (pm²)" },
                        { value: "sq_angstrom", label: "Square Ångström (Å²)" },
                        { value: "sq_mil", label: "Square Mil (mil²)" },
                        { value: "cmil", label: "Circular Mil (cmil)" },
                        { value: "kcmil", label: "Kilo Circular Mil (kcmil)" },
                        { value: "soccer_field", label: "Soccer Field" }
                    ];

                    let fromOptions = "";
                    let toOptions = "";
                    units.forEach(u => {
                        fromOptions += `<option value="${u.value}"${u.value === 'sq_m' ? ' selected' : ''}>${u.label}</option>`;
                        toOptions += `<option value="${u.value}"${u.value === 'sq_ft' ? ' selected' : ''}>${u.label}</option>`;
                    });

                    const inputsHTML = `
                        <div class="converter-layout">
                            <div class="converter-panel converter-from">
                                <div class="converter-panel-header">From</div>
                                <div class="form-group">
                                    <input type="number" id="area-from-value" value="1" placeholder="Enter value">
                                </div>
                                <div class="form-group">
                                    <select id="area-from-unit">${fromOptions}</select>
                                </div>
                            </div>

                            <div class="converter-swap-section">
                                <button id="area-switch-btn" class="converter-swap-btn" title="Swap Units">
                                    <svg class="icon" aria-hidden="true"><use href="#icon-convert"></use></svg>
                                </button>
                            </div>

                            <div class="converter-panel converter-to">
                                <div class="converter-panel-header">To</div>
                                <div class="form-group">
                                    <input type="number" id="area-to-value" readonly placeholder="Result">
                                </div>
                                <div class="form-group">
                                    <select id="area-to-unit">${toOptions}</select>
                                </div>
                            </div>
                        </div>

                        <div id="area-final-result" class="converter-final-result"></div>

                        <div id="area-all-conversions" class="converter-all-results"></div>
                    `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputsHTML,
                        "area-result",
                        true
                    );
                },
                attachEvents: function () {
                    const unitsData = {
                        sq_m: { factor: 1, label: "Square Meter", abbrev: "m²" },
                        sq_km: { factor: 1e6, label: "Square Kilometer", abbrev: "km²" },
                        sq_cm: { factor: 1e-4, label: "Square Centimeter", abbrev: "cm²" },
                        sq_mm: { factor: 1e-6, label: "Square Millimeter", abbrev: "mm²" },
                        hectare: { factor: 10000, label: "Hectare", abbrev: "ha" },
                        are: { factor: 100, label: "Are", abbrev: "a" },
                        decare: { factor: 1000, label: "Decare", abbrev: "da" },
                        acre: { factor: 4046.8564224, label: "Acre", abbrev: "ac" },
                        sq_mi: { factor: 2589988.110336, label: "Square Mile", abbrev: "mi²" },
                        sq_yd: { factor: 0.83612736, label: "Square Yard", abbrev: "yd²" },
                        sq_ft: { factor: 0.09290304, label: "Square Foot", abbrev: "ft²" },
                        sq_in: { factor: 0.00064516, label: "Square Inch", abbrev: "in²" },
                        sq_dm: { factor: 1e-2, label: "Square Decimeter", abbrev: "dm²" },
                        sq_um: { factor: 1e-12, label: "Square Micrometer", abbrev: "µm²" },
                        sq_nm: { factor: 1e-18, label: "Square Nanometer", abbrev: "nm²" },
                        sq_pm: { factor: 1e-24, label: "Square Picometer", abbrev: "pm²" },
                        sq_angstrom: { factor: 1e-20, label: "Square Ångström", abbrev: "Å²" },
                        sq_mil: { factor: 6.4516e-10, label: "Square Mil", abbrev: "mil²" },
                        cmil: { factor: 5.06707479e-10, label: "Circular Mil", abbrev: "cmil" },
                        kcmil: { factor: 5.06707479e-7, label: "Kilo Circular Mil", abbrev: "kcmil" },
                        soccer_field: { factor: 7140, label: "Soccer Field", abbrev: "field" }
                    };

                    // Hide the default result panel
                    const resultPanel = document.querySelector('.calculator-results');
                    if (resultPanel) resultPanel.style.display = 'none';

                    // Adjust grid to single column
                    const wrapper = document.querySelector('.calculator-wrapper');
                    if (wrapper) wrapper.style.gridTemplateColumns = '1fr';

                    const fromValueInput = document.getElementById("area-from-value");
                    const fromUnitSelect = document.getElementById("area-from-unit");
                    const toValueInput = document.getElementById("area-to-value");
                    const toUnitSelect = document.getElementById("area-to-unit");
                    const switchBtn = document.getElementById("area-switch-btn");
                    const finalResult = document.getElementById("area-final-result");
                    const allConversions = document.getElementById("area-all-conversions");

                    const educationalBtn = document.getElementById("what-is-this-btn");
                    if (educationalBtn && this.educationalHTML) {
                        educationalBtn.addEventListener("click", () => {
                            const container = document.getElementById("educational-content-container");
                            animateReveal(this.educationalHTML, container);
                        });
                    }

                    function formatValue(num) {
                        if (num === 0) return '0';
                        if (Math.abs(num) < 1e-4 || Math.abs(num) > 1e9) {
                            return num.toExponential(6);
                        }
                        return parseFloat(num.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 8 });
                    }

                    function updateConversions() {
                        const val = parseFloat(fromValueInput.value);
                        const fromUnit = fromUnitSelect.value;
                        const toUnit = toUnitSelect.value;

                        if (isNaN(val) || val === 0) {
                            toValueInput.value = "";
                            finalResult.innerHTML = '';
                            allConversions.innerHTML = '';
                            return;
                        }

                        const baseM2 = val * unitsData[fromUnit].factor;

                        // Update To Input
                        const resultVal = baseM2 / unitsData[toUnit].factor;
                        toValueInput.value = formatValue(resultVal);

                        // Update final result display
                        finalResult.innerHTML = `
                            <div class="converter-result-equation">
                                <span class="converter-result-from">${formatValue(val)} ${unitsData[fromUnit].label}</span>
                                <span class="converter-result-equals">=</span>
                                <span class="converter-result-to">${formatValue(resultVal)} ${unitsData[toUnit].label}</span>
                            </div>
                        `;

                        // Build all conversions grid
                        let gridHTML = '<div class="converter-grid-title">All Conversions</div><div class="converter-grid">';
                        for (const [key, data] of Object.entries(unitsData)) {
                            if (key === fromUnit) continue;
                            const converted = baseM2 / data.factor;
                            const isActive = key === toUnit ? ' active' : '';
                            gridHTML += `
                                <div class="converter-grid-item${isActive}">
                                    <span class="converter-grid-value">${formatValue(converted)}</span>
                                    <span class="converter-grid-unit">${data.label} (${data.abbrev})</span>
                                </div>
                            `;
                        }
                        gridHTML += '</div>';
                        allConversions.innerHTML = gridHTML;
                    }

                    function updateFrom() {
                        const val = parseFloat(toValueInput.value);
                        const fromUnit = fromUnitSelect.value;
                        const toUnit = toUnitSelect.value;

                        if (isNaN(val)) {
                            fromValueInput.value = "";
                            finalResult.innerHTML = "";
                            allConversions.innerHTML = '';
                            return;
                        }

                        const baseM2 = val * unitsData[toUnit].factor;
                        const resultVal = baseM2 / unitsData[fromUnit].factor;
                        fromValueInput.value = formatValue(resultVal);
                        updateConversions();
                    }

                    function swap() {
                        const oldFromUnit = fromUnitSelect.value;
                        const oldToUnit = toUnitSelect.value;

                        fromUnitSelect.value = oldToUnit;
                        toUnitSelect.value = oldFromUnit;

                        // Animate the swap button
                        switchBtn.classList.add('rotating');
                        setTimeout(() => switchBtn.classList.remove('rotating'), 300);

                        updateConversions();
                    }

                    fromValueInput.addEventListener("input", updateConversions);
                    fromUnitSelect.addEventListener("change", updateConversions);
                    toUnitSelect.addEventListener("change", updateConversions);
                    switchBtn.addEventListener("click", swap);

                    updateConversions();
                },
            },
        ],
        temperature: [
            {
                id: "temperature-converter",
                name: "Temperature Converter",
                description: "Convert between Celsius, Fahrenheit, Kelvin, and Rankine.",
                educationalHTML: `
            <div class="qa-section" style="font-size: 0.9rem; color: var(--text-secondary);">
               ${createIconHeading("h4", "icon-thermometer", "Understanding Temperature Scales")}
               <p style="margin-bottom: 1rem; line-height: 1.7;">
                   Temperature measures the average kinetic energy of particles in a substance. Unlike length or area, temperature conversions involve <strong>offsets</strong> (not just multiplication), because each scale has a different zero point.
               </p>

               ${createIconHeading("h4", "icon-flask", "Celsius (°C) — Metric/SI")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   Devised by Anders Celsius in 1742. Based on the properties of water: <strong>0 °C</strong> = freezing point, <strong>100 °C</strong> = boiling point (at standard atmospheric pressure). Used by most countries worldwide.
               </p>

               ${createIconHeading("h4", "icon-chart", "Fahrenheit (°F) — Imperial")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   Proposed by Daniel Fahrenheit in 1724. Water freezes at <strong>32 °F</strong> and boils at <strong>212 °F</strong>. Primarily used in the United States for weather and cooking.
               </p>

               ${createIconHeading("h4", "icon-flask", "Kelvin (K) — Absolute/Scientific")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   The SI base unit of temperature. Starts at <strong>absolute zero</strong> (0 K = −273.15 °C), the lowest physically possible temperature where all molecular motion ceases. Same degree size as Celsius: \\( K = {^\\circ}\\text{C} + 273.15 \\).
               </p>

               ${createIconHeading("h4", "icon-chart", "Rankine (°R) — Absolute/Imperial")}
               <p style="margin-bottom: 0.5rem; line-height: 1.7;">
                   Like Kelvin but using Fahrenheit-sized degrees. Starts at absolute zero (0 °R). Used in some engineering contexts: \\( {^\\circ}\\text{R} = {^\\circ}\\text{F} + 459.67 \\).
               </p>

               ${createIconHeading("h4", "icon-convert", "Key Conversion Formulas")}
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;">°F = °C × <strong>9/5</strong> + 32</li>
                   <li style="margin-bottom: 0.3rem;">°C = (°F − 32) × <strong>5/9</strong></li>
                   <li style="margin-bottom: 0.3rem;">K = °C + <strong>273.15</strong></li>
                   <li style="margin-bottom: 0.3rem;">°R = °F + <strong>459.67</strong></li>
               </ul>

               ${createIconHeading("h4", "icon-chart", "Notable Temperatures")}
               <ul style="list-style: none; padding: 0; margin-bottom: 1rem;">
                   <li style="margin-bottom: 0.3rem;"><strong>Absolute Zero:</strong> 0 K = −273.15 °C = −459.67 °F</li>
                   <li style="margin-bottom: 0.3rem;"><strong>−40° Crossover:</strong> −40 °C = −40 °F (the only point where both scales meet!)</li>
                   <li style="margin-bottom: 0.3rem;"><strong>Human Body:</strong> 37 °C = 98.6 °F = 310.15 K</li>
                   <li style="margin-bottom: 0.3rem;"><strong>Room Temperature:</strong> ~20–22 °C = ~68–72 °F</li>
               </ul>

               ${createIconHeading("h4", "icon-lightbulb", "Practical Examples")}
               <ul style="list-style: none; padding: 0;">
                   <li style="margin-bottom: 0.4rem;"><strong>Q: How hot is 350 °F (oven) in °C?</strong><br>(350 − 32) × 5/9 ≈ <strong>176.7 °C</strong></li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: Is 38 °C a fever?</strong><br>38 °C = 100.4 °F — yes, anything above 37.5 °C / 99.5 °F is considered a fever.</li>
                   <li style="margin-bottom: 0.4rem;"><strong>Q: What is room temperature in Kelvin?</strong><br>~20 °C + 273.15 = <strong>293.15 K</strong></li>
               </ul>
            </div>
        `,
                generateHTML: function () {
                    const units = [
                        { value: "celsius", label: "Celsius (°C)" },
                        { value: "fahrenheit", label: "Fahrenheit (°F)" },
                        { value: "kelvin", label: "Kelvin (K)" },
                        { value: "rankine", label: "Rankine (°R)" }
                    ];

                    let fromOptions = "";
                    let toOptions = "";
                    units.forEach(u => {
                        fromOptions += `<option value="${u.value}"${u.value === 'celsius' ? ' selected' : ''}>${u.label}</option>`;
                        toOptions += `<option value="${u.value}"${u.value === 'fahrenheit' ? ' selected' : ''}>${u.label}</option>`;
                    });

                    const inputsHTML = `
                        <div class="converter-layout">
                            <div class="converter-panel converter-from">
                                <div class="converter-panel-header">From</div>
                                <div class="form-group">
                                    <input type="number" id="temp-from-value" value="0" placeholder="Enter value">
                                </div>
                                <div class="form-group">
                                    <select id="temp-from-unit">${fromOptions}</select>
                                </div>
                            </div>

                            <div class="converter-swap-section">
                                <button id="temp-switch-btn" class="converter-swap-btn" title="Swap Units">
                                    <svg class="icon" aria-hidden="true"><use href="#icon-convert"></use></svg>
                                </button>
                            </div>

                            <div class="converter-panel converter-to">
                                <div class="converter-panel-header">To</div>
                                <div class="form-group">
                                    <input type="number" id="temp-to-value" readonly placeholder="Result">
                                </div>
                                <div class="form-group">
                                    <select id="temp-to-unit">${toOptions}</select>
                                </div>
                            </div>
                        </div>

                        <div id="temp-final-result" class="converter-final-result"></div>

                        <div id="temp-all-conversions" class="converter-all-results"></div>
                    `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputsHTML,
                        "temp-result",
                        true
                    );
                },
                attachEvents: function () {
                    const unitLabels = {
                        celsius: { label: "Celsius", abbrev: "°C" },
                        fahrenheit: { label: "Fahrenheit", abbrev: "°F" },
                        kelvin: { label: "Kelvin", abbrev: "K" },
                        rankine: { label: "Rankine", abbrev: "°R" }
                    };

                    // Convert any unit to Celsius (base)
                    function toCelsius(value, unit) {
                        switch (unit) {
                            case 'celsius': return value;
                            case 'fahrenheit': return (value - 32) * 5 / 9;
                            case 'kelvin': return value - 273.15;
                            case 'rankine': return (value - 491.67) * 5 / 9;
                            default: return value;
                        }
                    }

                    // Convert from Celsius to any unit
                    function fromCelsius(celsius, unit) {
                        switch (unit) {
                            case 'celsius': return celsius;
                            case 'fahrenheit': return celsius * 9 / 5 + 32;
                            case 'kelvin': return celsius + 273.15;
                            case 'rankine': return (celsius + 273.15) * 9 / 5;
                            default: return celsius;
                        }
                    }

                    // Hide the default result panel
                    const resultPanel = document.querySelector('.calculator-results');
                    if (resultPanel) resultPanel.style.display = 'none';

                    // Adjust grid to single column
                    const wrapper = document.querySelector('.calculator-wrapper');
                    if (wrapper) wrapper.style.gridTemplateColumns = '1fr';

                    const fromValueInput = document.getElementById("temp-from-value");
                    const fromUnitSelect = document.getElementById("temp-from-unit");
                    const toValueInput = document.getElementById("temp-to-value");
                    const toUnitSelect = document.getElementById("temp-to-unit");
                    const switchBtn = document.getElementById("temp-switch-btn");
                    const finalResult = document.getElementById("temp-final-result");
                    const allConversions = document.getElementById("temp-all-conversions");

                    const educationalBtn = document.getElementById("what-is-this-btn");
                    if (educationalBtn && this.educationalHTML) {
                        educationalBtn.addEventListener("click", () => {
                            const container = document.getElementById("educational-content-container");
                            animateReveal(this.educationalHTML, container);
                        });
                    }

                    function formatValue(num) {
                        if (num === 0) return '0';
                        if (Math.abs(num) < 1e-4 && num !== 0) {
                            return num.toExponential(4);
                        }
                        // Avoid double rounding: just use toLocaleString with max fraction digits
                        return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
                    }

                    function updateConversions() {
                        const val = parseFloat(fromValueInput.value);
                        const fromUnit = fromUnitSelect.value;
                        const toUnit = toUnitSelect.value;

                        if (isNaN(val)) {
                            toValueInput.value = "";
                            finalResult.innerHTML = '';
                            allConversions.innerHTML = '';
                            return;
                        }

                        const celsius = toCelsius(val, fromUnit);
                        const resultVal = fromCelsius(celsius, toUnit);
                        toValueInput.value = formatValue(resultVal);

                        // Update final result display
                        finalResult.innerHTML = `
                            <div class="converter-result-equation">
                                <span class="converter-result-from">${formatValue(val)} ${unitLabels[fromUnit].label}</span>
                                <span class="converter-result-equals">=</span>
                                <span class="converter-result-to">${formatValue(resultVal)} ${unitLabels[toUnit].label}</span>
                            </div>
                        `;

                        // Build all conversions grid
                        let gridHTML = '<div class="converter-grid-title">All Conversions</div><div class="converter-grid">';
                        for (const [key, data] of Object.entries(unitLabels)) {
                            if (key === fromUnit) continue;
                            const converted = fromCelsius(celsius, key);
                            const isActive = key === toUnit ? ' active' : '';
                            gridHTML += `
                                <div class="converter-grid-item${isActive}">
                                    <span class="converter-grid-value">${formatValue(converted)}</span>
                                    <span class="converter-grid-unit">${data.label} (${data.abbrev})</span>
                                </div>
                            `;
                        }
                        gridHTML += '</div>';
                        allConversions.innerHTML = gridHTML;
                    }

                    function swap() {
                        const oldFromUnit = fromUnitSelect.value;
                        const oldToUnit = toUnitSelect.value;

                        fromUnitSelect.value = oldToUnit;
                        toUnitSelect.value = oldFromUnit;

                        switchBtn.classList.add('rotating');
                        setTimeout(() => switchBtn.classList.remove('rotating'), 300);

                        updateConversions();
                    }

                    fromValueInput.addEventListener("input", updateConversions);
                    fromUnitSelect.addEventListener("change", updateConversions);
                    toUnitSelect.addEventListener("change", updateConversions);
                    switchBtn.addEventListener("click", swap);

                    updateConversions();
                },
            },
        ],
    },
};
