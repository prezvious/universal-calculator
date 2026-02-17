import { createCalculatorLayout, animateReveal } from './utils.js';

export const otherCalculators = {
    icon: "icon-calc",
    label: "Other Calculators",
    subcategories: {
        planetary: [
            {
                id: "age-on-planets",
                name: "Planetary Age",
                description: "Calculate your age on other planets in our solar system.",
                educationalHTML: `
            <div class="educational-section">
                <h3>Orbital Periods & Planetary Years</h3>
                <p>Your age on a planet is determined by its orbital period—the time it takes for the planet to complete one full orbit around the Sun. This duration defines a "year" on that planet.</p>
                <p>Earth takes roughly 365.25 days to orbit the Sun. Other planets take different amounts of time depending on their distance from the Sun:</p>
                <ul>
                    <li><strong>Mercury:</strong> ~88 Earth days (0.24 Earth years)</li>
                    <li><strong>Venus:</strong> ~225 Earth days (0.62 Earth years)</li>
                    <li><strong>Mars:</strong> ~687 Earth days (1.88 Earth years)</li>
                    <li><strong>Jupiter:</strong> ~11.86 Earth years</li>
                    <li><strong>Saturn:</strong> ~29.45 Earth years</li>
                    <li><strong>Uranus:</strong> ~84 Earth years</li>
                    <li><strong>Neptune:</strong> ~165 Earth years</li>
                </ul>
                <p>To calculate your age on another planet, you divide your age in Earth years by that planet's orbital period in Earth years.</p>
                \[ \text{Age}_{\text{Planet}} = \frac{\text{Age}_{\text{Earth}}}{\text{Orbital Period}_{\text{Planet}}} \]
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
            <div class="form-group">
                <label>Choose Input Method:</label>
                <div class="formula-radio-group">
                    <label class="custom-radio-label">
                        <input type="radio" name="age-input-method" value="age" checked>
                        <span class="radio-mark"></span>
                        <span class="radio-text">Enter Age (Years)</span>
                    </label>
                    <label class="custom-radio-label">
                        <input type="radio" name="age-input-method" value="dob">
                        <span class="radio-mark"></span>
                        <span class="radio-text">Enter Date of Birth</span>
                    </label>
                </div>
            </div>
            <div id="age-input-container">
                <div class="form-group">
                    <label for="earth-age">Your Age (Earth Years):</label>
                    <input type="number" id="earth-age" placeholder="e.g., 25" min="0" step="0.1">
                </div>
            </div>
            <button id="calculate-planetary-age" class="calculate-btn">Calculate</button>
          `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "planetary-age-result",
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

                    const radios = document.querySelectorAll('input[name="age-input-method"]');
                    const inputContainer = document.getElementById("age-input-container");

                    radios.forEach(radio => {
                        radio.addEventListener("change", (e) => {
                            if (e.target.value === "age") {
                                inputContainer.innerHTML = `
                            <div class="form-group">
                                <label for="earth-age">Your Age (Earth Years):</label>
                                <input type="number" id="earth-age" placeholder="e.g., 25" min="0" step="0.1">
                            </div>
                        `;
                            } else {
                                inputContainer.innerHTML = `
                            <div class="form-group">
                                <label for="dob">Date of Birth:</label>
                                <input type="date" id="dob">
                            </div>
                        `;
                            }
                        });
                    });

                    document.getElementById("calculate-planetary-age").addEventListener("click", () => {
                        let earthAge = 0;
                        const method = document.querySelector('input[name="age-input-method"]:checked').value;
                        const resultDiv = document.getElementById("planetary-age-result");

                        if (method === "age") {
                            const ageInput = document.getElementById("earth-age");
                            earthAge = parseFloat(ageInput.value);
                            if (isNaN(earthAge) || earthAge < 0) {
                                resultDiv.innerHTML = "Please enter a valid age.";
                                return;
                            }
                        } else {
                            const dobInput = document.getElementById("dob");
                            if (!dobInput.value) {
                                resultDiv.innerHTML = "Please select a date of birth.";
                                return;
                            }
                            const dob = new Date(dobInput.value);
                            const now = new Date();
                            const diffTime = Math.abs(now - dob);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            earthAge = diffDays / 365.25;
                        }

                        // Orbital periods in Earth years
                        const planets = [
                            { name: "Mercury", period: 0.2408467 },
                            { name: "Venus", period: 0.61519726 },
                            { name: "Earth", period: 1.0 },
                            { name: "Mars", period: 1.8808158 },
                            { name: "Jupiter", period: 11.862615 },
                            { name: "Saturn", period: 29.447498 },
                            { name: "Uranus", period: 84.016846 },
                            { name: "Neptune", period: 164.79132 }
                        ];

                        let html = '<div class="planet-grid">';
                        planets.forEach(planet => {
                            const age = earthAge / planet.period;
                            html += `
                        <div class="planet-card">
                            <div class="planet-name">${planet.name}</div>
                            <div class="planet-age">${age.toFixed(2)}</div>
                            <div class="planet-unit">years</div>
                        </div>
                    `;
                        });
                        html += '</div>';

                        resultDiv.innerHTML = html;
                    });
                }
            },
            {
                id: "upload-time-calculator",
                name: "Upload Time",
                description: "Calculate how long it will take to upload a file based on its size and your upload speed.",
                educationalHTML: `
            <div class="educational-section">
                <h3>Understanding Data Size Units</h3>
                <p>How exactly do we measure the size of information stored on our computers?</p>
                <p>A bit (short for binary digit) is the smallest unit of information used for storing and processing digital data. It can assume only two values: 0 or 1. A group of 8 bits is what we call a byte.</p>
                <p>Bits and bytes are small units. Most file sizes are expressed in kilobytes, megabytes, and gigabytes.</p>

                <h4>Byte Conversion Chart</h4>
                <ul>
                    <li>8 bits = 1 byte (B)</li>
                    <li>1000 bytes = 1 kilobyte (KB)</li>
                    <li>1000 kilobytes = 1 megabyte (MB)</li>
                    <li>1000 megabytes = 1 gigabyte (GB)</li>
                    <li>1000 gigabytes = 1 terabyte (TB)</li>
                    <li>1000 terabytes = 1 petabyte (PB)</li>
                    <li>1000 petabytes = 1 exabyte (EB)</li>
                    <li>1000 exabytes = 1 zettabyte (ZB)</li>
                    <li>1000 zettabytes = 1 yottabyte (YB)</li>
                </ul>
                <p><em>Note: This calculator uses the decimal (SI) standard where 1 KB = 1000 B.</em></p>

                <h3>What is the difference between download and upload?</h3>
                <p><strong>Download:</strong> Receiving data from the internet (e.g., streaming movies, loading webpages).</p>
                <p><strong>Upload:</strong> Sending data to the internet (e.g., sending emails with attachments, video conferencing).</p>
                <p>The speed is limited by your bandwidth, typically measured in megabits per second (Mbps).</p>

                <p><strong>Caution:</strong> Don't confuse megabits (Mb) with megabytes (MB). 1 MB = 8 Mb.</p>

                <h3>How to calculate upload time</h3>
                <p>To calculate upload time:</p>
                \[ \text{Upload Time} = \frac{\text{File Size}}{\text{Upload Speed}} \]
                <p>Ensure both values are in the same unit (e.g., megabits or megabytes) before dividing.</p>
                <p>Example: 40 MB file at 16 Mbps upload speed.</p>
                <p>16 Mbps = 2 MBps (since 16 / 8 = 2).</p>
                <p>Time = 40 MB / 2 MBps = 20 seconds.</p>
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
            <div class="form-group">
                <label for="file-size">File Size:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="file-size" placeholder="Enter file size" min="0" step="any" style="flex: 2;">
                    <select id="size-unit" style="flex: 1;">
                        <option value="B">Bytes (B)</option>
                        <option value="KB">Kilobytes (KB)</option>
                        <option value="MB" selected>Megabytes (MB)</option>
                        <option value="GB">Gigabytes (GB)</option>
                        <option value="TB">Terabytes (TB)</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="upload-speed">Upload Speed:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="upload-speed" placeholder="Enter upload speed" min="0" step="any" style="flex: 2;">
                    <select id="speed-unit" style="flex: 1;">
                        <option value="bps">bits/sec</option>
                        <option value="Kbps">Kbps</option>
                        <option value="Mbps" selected>Mbps</option>
                        <option value="Gbps">Gbps</option>
                        <option value="Tbps">Tbps</option>
                    </select>
                </div>
            </div>
            <button id="calculate-upload-time" class="calculate-btn">Calculate Time</button>
          `;

                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "upload-time-result",
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

                    document.getElementById("calculate-upload-time").addEventListener("click", () => {
                        const fileSize = parseFloat(document.getElementById("file-size").value);
                        const sizeUnit = document.getElementById("size-unit").value;
                        const speed = parseFloat(document.getElementById("upload-speed").value);
                        const speedUnit = document.getElementById("speed-unit").value;
                        const resultDiv = document.getElementById("upload-time-result");

                        if (isNaN(fileSize) || isNaN(speed) || fileSize <= 0 || speed <= 0) {
                            resultDiv.innerHTML = "Please enter valid positive numbers.";
                            return;
                        }

                        // Convert everything to bits
                        let sizeInBits = 0;
                        // Using 1000 for KB as per prompt text
                        switch (sizeUnit) {
                            case "B": sizeInBits = fileSize * 8; break;
                            case "KB": sizeInBits = fileSize * 1000 * 8; break;
                            case "MB": sizeInBits = fileSize * 1000 * 1000 * 8; break;
                            case "GB": sizeInBits = fileSize * 1000 * 1000 * 1000 * 8; break;
                            case "TB": sizeInBits = fileSize * 1000 * 1000 * 1000 * 1000 * 8; break;
                        }

                        let speedInBitsPerSec = 0;
                        switch (speedUnit) {
                            case "bps": speedInBitsPerSec = speed; break;
                            case "Kbps": speedInBitsPerSec = speed * 1000; break;
                            case "Mbps": speedInBitsPerSec = speed * 1000 * 1000; break;
                            case "Gbps": speedInBitsPerSec = speed * 1000 * 1000 * 1000; break;
                            case "Tbps": speedInBitsPerSec = speed * 1000 * 1000 * 1000 * 1000; break;
                        }

                        const timeInSeconds = sizeInBits / speedInBitsPerSec;

                        // Format time
                        let timeString = "";
                        if (timeInSeconds < 60) {
                            timeString = `${timeInSeconds.toFixed(2)} seconds`;
                        } else if (timeInSeconds < 3600) {
                            const minutes = Math.floor(timeInSeconds / 60);
                            const seconds = (timeInSeconds % 60).toFixed(0);
                            timeString = `${minutes} min ${seconds} sec`;
                        } else if (timeInSeconds < 86400) {
                            const hours = Math.floor(timeInSeconds / 3600);
                            const minutes = Math.floor((timeInSeconds % 3600) / 60);
                            timeString = `${hours} hr ${minutes} min`;
                        } else {
                            const days = Math.floor(timeInSeconds / 86400);
                            const hours = Math.floor((timeInSeconds % 86400) / 3600);
                            timeString = `${days} days ${hours} hr`;
                        }

                        resultDiv.innerHTML = `Estimated Time: <strong>${timeString}</strong>`;
                    });
                }
            }
        ],
        security: [
            {
                id: "password-generator",
                name: "Password Generator",
                description: "Generate secure, random passwords entirely in your browser. Nothing is ever sent over the Internet.",
                educationalHTML: `
            <div class="educational-section">
                <h3>Password Security</h3>
                <p>A strong password is the first line of defence for your online accounts. Here are the key concepts behind password strength:</p>

                <h4>Password Entropy</h4>
                <p>Entropy measures the randomness (unpredictability) of a password. It is calculated as:</p>
                \[ E = L \times \log_2(R) \]
                <p>Where <strong>L</strong> is the password length and <strong>R</strong> is the size of the character pool (number of possible characters).</p>

                <h4>Strength Guidelines</h4>
                <ul>
                    <li><strong>&lt; 28 bits:</strong> Very Weak — easily cracked in seconds.</li>
                    <li><strong>28 – 35 bits:</strong> Weak — vulnerable to brute force.</li>
                    <li><strong>36 – 59 bits:</strong> Reasonable — adequate for low-value accounts.</li>
                    <li><strong>60 – 127 bits:</strong> Strong — suitable for most purposes.</li>
                    <li><strong>128+ bits:</strong> Very Strong — practically unbreakable.</li>
                </ul>

                <h4>Tips</h4>
                <ul>
                    <li>Use at least 16 characters.</li>
                    <li>Mix uppercase, lowercase, numbers, and symbols.</li>
                    <li>Never reuse passwords across sites.</li>
                    <li>Use a password manager to store them securely.</li>
                </ul>
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
            <div id="pw-display" class="pw-display">
                <span id="pw-output" class="pw-output" style="user-select: all; cursor: text;">—</span>
            </div>

            <div id="pw-strength-section" class="pw-strength-section" style="display: none;">
                <div class="pw-strength-bar-track">
                    <div id="pw-strength-bar" class="pw-strength-bar"></div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                    <span id="pw-strength-label" class="pw-strength-label"></span>
                    <span id="pw-entropy" style="font-size: 0.8rem; color: var(--text-secondary);"></span>
                </div>
            </div>

            <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
                <button id="pw-copy" class="calculate-btn" style="flex: 1; margin-top: 0; font-size: 0.9rem; padding: 0.7rem;" disabled>📋 Copy</button>
                <button id="pw-regenerate" class="calculate-btn" style="flex: 1; margin-top: 0; font-size: 0.9rem; padding: 0.7rem;" disabled>🔄 Regenerate</button>
            </div>

            <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.25rem 0;">

            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="pw-length">Password Length: <strong id="pw-length-display">16</strong></label>
                <input type="range" id="pw-length" min="4" max="128" value="16" class="pw-slider">
            </div>

            <div class="pw-options">
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-lower" checked><span class="pw-check-mark"></span> Lowercase (a-z)</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-upper" checked><span class="pw-check-mark"></span> Uppercase (A-Z)</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-numbers" checked><span class="pw-check-mark"></span> Numbers (0-9)</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-symbols" checked><span class="pw-check-mark"></span> Symbols (!@#$%...)</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-exclude-ambiguous"><span class="pw-check-mark"></span> Exclude Ambiguous (i l 1 L o 0 O)</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-exclude-brackets"><span class="pw-check-mark"></span> Exclude Brackets (&lt;&gt;()[]{})</label>
                <label class="pw-checkbox-label"><input type="checkbox" id="pw-no-repeat"><span class="pw-check-mark"></span> No Repeated Characters</label>
            </div>

            <button id="pw-generate" class="calculate-btn">⚡ Generate Password</button>
          `;
                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "password-result",
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

                    // Hide default result panel — this calculator shows results inline
                    const resultPanel = document.querySelector('.calculator-results');
                    if (resultPanel) resultPanel.style.display = 'none';
                    const wrapper = document.querySelector('.calculator-wrapper');
                    if (wrapper) wrapper.style.gridTemplateColumns = '1fr';

                    const lengthSlider = document.getElementById("pw-length");
                    const lengthDisplay = document.getElementById("pw-length-display");
                    const output = document.getElementById("pw-output");
                    const strengthSection = document.getElementById("pw-strength-section");
                    const strengthBar = document.getElementById("pw-strength-bar");
                    const strengthLabel = document.getElementById("pw-strength-label");
                    const entropyDisplay = document.getElementById("pw-entropy");
                    const copyBtn = document.getElementById("pw-copy");
                    const regenBtn = document.getElementById("pw-regenerate");
                    const generateBtn = document.getElementById("pw-generate");

                    const checkboxes = {
                        lower: document.getElementById("pw-lower"),
                        upper: document.getElementById("pw-upper"),
                        numbers: document.getElementById("pw-numbers"),
                        symbols: document.getElementById("pw-symbols"),
                        excludeAmbiguous: document.getElementById("pw-exclude-ambiguous"),
                        excludeBrackets: document.getElementById("pw-exclude-brackets"),
                        noRepeat: document.getElementById("pw-no-repeat"),
                    };

                    let currentPassword = "";

                    // Sync slider with display
                    lengthSlider.addEventListener("input", () => {
                        lengthDisplay.textContent = lengthSlider.value;
                    });

                    function getCharPool() {
                        const lower = "abcdefghijklmnopqrstuvwxyz";
                        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        const numbers = "0123456789";
                        const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
                        const ambiguous = "il1Lo0O";
                        const brackets = "<>()[]{}";

                        let pool = "";
                        if (checkboxes.lower.checked) pool += lower;
                        if (checkboxes.upper.checked) pool += upper;
                        if (checkboxes.numbers.checked) pool += numbers;
                        if (checkboxes.symbols.checked) pool += symbols;

                        if (checkboxes.excludeAmbiguous.checked) {
                            pool = pool.split("").filter(c => !ambiguous.includes(c)).join("");
                        }
                        if (checkboxes.excludeBrackets.checked) {
                            pool = pool.split("").filter(c => !brackets.includes(c)).join("");
                        }

                        return [...new Set(pool.split(""))]; // deduplicate
                    }

                    function generatePassword() {
                        const pool = getCharPool();
                        const length = parseInt(lengthSlider.value);

                        if (pool.length === 0) {
                            output.textContent = "Select at least one character type!";
                            strengthSection.style.display = "none";
                            copyBtn.disabled = true;
                            regenBtn.disabled = true;
                            return;
                        }

                        if (checkboxes.noRepeat.checked && length > pool.length) {
                            output.textContent = `Max ${pool.length} chars with no repeats`;
                            strengthSection.style.display = "none";
                            copyBtn.disabled = true;
                            regenBtn.disabled = true;
                            return;
                        }

                        const array = new Uint32Array(length);
                        crypto.getRandomValues(array);

                        let password = "";
                        const usedChars = new Set();

                        for (let i = 0; i < length; i++) {
                            if (checkboxes.noRepeat.checked) {
                                const available = pool.filter(c => !usedChars.has(c));
                                const char = available[array[i] % available.length];
                                usedChars.add(char);
                                password += char;
                            } else {
                                password += pool[array[i] % pool.length];
                            }
                        }

                        currentPassword = password;
                        runScrambleAnimation(password);
                        updateStrength(password, pool.length);
                        copyBtn.disabled = false;
                        regenBtn.disabled = false;
                    }

                    function runScrambleAnimation(finalPassword) {
                        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
                        let iteration = 0;
                        const totalIterations = 12;
                        const interval = setInterval(() => {
                            let display = "";
                            for (let i = 0; i < finalPassword.length; i++) {
                                if (i < (iteration / totalIterations) * finalPassword.length) {
                                    display += finalPassword[i];
                                } else {
                                    display += chars[Math.floor(Math.random() * chars.length)];
                                }
                            }
                            output.textContent = display;
                            output.classList.add("pw-scrambling");
                            iteration++;
                            if (iteration > totalIterations) {
                                clearInterval(interval);
                                output.textContent = finalPassword;
                                output.classList.remove("pw-scrambling");
                                output.classList.add("pw-reveal");
                                setTimeout(() => output.classList.remove("pw-reveal"), 400);
                            }
                        }, 40);
                    }

                    function updateStrength(password, poolSize) {
                        const entropy = password.length * Math.log2(poolSize);
                        let level, label, color, pct;

                        if (entropy < 28) {
                            level = 1; label = "Very Weak"; color = "#ef4444"; pct = 15;
                        } else if (entropy < 36) {
                            level = 2; label = "Weak"; color = "#f97316"; pct = 30;
                        } else if (entropy < 60) {
                            level = 3; label = "Reasonable"; color = "#eab308"; pct = 50;
                        } else if (entropy < 128) {
                            level = 4; label = "Strong"; color = "#22c55e"; pct = 75;
                        } else {
                            level = 5; label = "Very Strong"; color = "#10b981"; pct = 100;
                        }

                        strengthSection.style.display = "block";
                        strengthBar.style.width = pct + "%";
                        strengthBar.style.background = color;
                        strengthLabel.textContent = label;
                        strengthLabel.style.color = color;
                        entropyDisplay.textContent = `${entropy.toFixed(1)} bits entropy`;
                    }

                    generateBtn.addEventListener("click", generatePassword);
                    regenBtn.addEventListener("click", generatePassword);

                    copyBtn.addEventListener("click", () => {
                        if (!currentPassword) return;
                        navigator.clipboard.writeText(currentPassword).then(() => {
                            const original = copyBtn.textContent;
                            copyBtn.textContent = "✅ Copied!";
                            setTimeout(() => { copyBtn.textContent = original; }, 1500);
                        });
                    });
                }
            }
        ],
        converters: [
            {
                id: "roman-numeral-converter",
                name: "Roman Numeral Converter",
                description: "Convert between Arabic numbers and Roman numerals. Supports dates and multiple values with separators (-, ., /, |, or space).",
                educationalHTML: `
            <div class="educational-section">
                <h3>Roman Numerals</h3>
                <p>A Roman numeral is a system for expressing numbers that originated in the Roman Empire. It is still used in certain cases today, such as on clocks, book chapters, and for numbering large events like the Olympics and the Super Bowl.</p>

                <p>Roman numerals were widely used long after the fall of the Roman Empire until Arabic numerals started to replace them around the 14th century.</p>

                <h4>The Seven Symbols</h4>
                <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border-color);">
                            <th style="padding: 0.5rem; text-align: left;">Symbol</th>
                            <th style="padding: 0.5rem; text-align: left;">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding: 0.4rem;">I</td><td style="padding: 0.4rem;">1</td></tr>
                        <tr><td style="padding: 0.4rem;">V</td><td style="padding: 0.4rem;">5</td></tr>
                        <tr><td style="padding: 0.4rem;">X</td><td style="padding: 0.4rem;">10</td></tr>
                        <tr><td style="padding: 0.4rem;">L</td><td style="padding: 0.4rem;">50</td></tr>
                        <tr><td style="padding: 0.4rem;">C</td><td style="padding: 0.4rem;">100</td></tr>
                        <tr><td style="padding: 0.4rem;">D</td><td style="padding: 0.4rem;">500</td></tr>
                        <tr><td style="padding: 0.4rem;">M</td><td style="padding: 0.4rem;">1000</td></tr>
                    </tbody>
                </table>

                <h4>Subtractive Notation</h4>
                <p>When a smaller numeral appears before a larger one, it is subtracted. For example:</p>
                <ul>
                    <li><strong>IV</strong> = 5 − 1 = 4</li>
                    <li><strong>IX</strong> = 10 − 1 = 9</li>
                    <li><strong>XL</strong> = 50 − 10 = 40</li>
                    <li><strong>XC</strong> = 100 − 10 = 90</li>
                    <li><strong>CD</strong> = 500 − 100 = 400</li>
                    <li><strong>CM</strong> = 1000 − 100 = 900</li>
                </ul>

                <h4>Examples</h4>
                <ul>
                    <li>2024 → MMXXIV</li>
                    <li>63 → LXIII</li>
                    <li>1999 → MCMXCIX</li>
                </ul>
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
            <div class="form-group">
                <label for="roman-input">Enter a number or Roman numeral:</label>
                <input type="text" id="roman-input" placeholder="e.g. 2024 or MMXXIV or 2026/02/17" autocomplete="off" style="font-size: 1.1rem; letter-spacing: 0.05em;">
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: -0.75rem; margin-bottom: 1rem;">
                Supports separators: <code>-</code> <code>.</code> <code>/</code> <code>\\</code> <code>|</code> or space for dates/lists.
            </p>
            <div style="display: flex; gap: 0.5rem;">
                <button id="roman-convert" class="calculate-btn" style="flex: 2; margin-top: 0;">Convert</button>
                <button id="roman-clear" class="calculate-btn" style="flex: 1; margin-top: 0; background: var(--text-secondary);">Clear</button>
            </div>
          `;
                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "roman-result",
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

                    const input = document.getElementById("roman-input");
                    const convertBtn = document.getElementById("roman-convert");
                    const clearBtn = document.getElementById("roman-clear");
                    const resultDiv = document.getElementById("roman-result");

                    const romanMap = [
                        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
                        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
                        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
                    ];

                    const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

                    function intToRoman(num) {
                        if (num <= 0 || num > 3999) return null;
                        let result = "";
                        const steps = [];
                        let remaining = num;
                        for (const [value, symbol] of romanMap) {
                            while (remaining >= value) {
                                result += symbol;
                                remaining -= value;
                                steps.push({ symbol, value });
                            }
                        }
                        return { roman: result, steps };
                    }

                    function romanToInt(str) {
                        str = str.toUpperCase().trim();
                        if (!/^[IVXLCDM]+$/.test(str)) return null;

                        let total = 0;
                        const symbols = [];
                        const values = [];

                        for (let i = 0; i < str.length; i++) {
                            const curr = romanValues[str[i]];
                            const next = i + 1 < str.length ? romanValues[str[i + 1]] : 0;
                            if (curr === undefined) return null;

                            if (curr < next) {
                                total -= curr;
                                symbols.push(str[i]);
                                values.push(-curr);
                            } else {
                                total += curr;
                                symbols.push(str[i]);
                                values.push(curr);
                            }
                        }

                        // Validate by converting back
                        const back = intToRoman(total);
                        if (!back || back.roman !== str) return null;

                        return { value: total, symbols, values };
                    }

                    function isRoman(str) {
                        return /^[IVXLCDMivxlcdm]+$/.test(str.trim());
                    }

                    function convert() {
                        const raw = input.value.trim();
                        if (!raw) {
                            resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter a value…</span>';
                            return;
                        }

                        // Check for separators → multi-value mode
                        const separatorRegex = /[-.\\/| ]/;
                        const hasSeparator = separatorRegex.test(raw);

                        if (hasSeparator) {
                            // Find the separator character used
                            const sepMatch = raw.match(/[-.\\/| ]/);
                            const sep = sepMatch[0];
                            const parts = raw.split(separatorRegex).filter(p => p.length > 0);

                            if (parts.length === 0) {
                                resultDiv.innerHTML = "Invalid input.";
                                return;
                            }

                            const results = [];
                            let allValid = true;

                            for (const part of parts) {
                                const trimmed = part.trim();
                                if (/^\d+$/.test(trimmed)) {
                                    const num = parseInt(trimmed);
                                    const conv = intToRoman(num);
                                    if (!conv) { allValid = false; break; }
                                    results.push({ input: trimmed, output: conv.roman, type: "num" });
                                } else if (isRoman(trimmed)) {
                                    const conv = romanToInt(trimmed);
                                    if (!conv) { allValid = false; break; }
                                    results.push({ input: trimmed.toUpperCase(), output: conv.value.toString(), type: "roman" });
                                } else {
                                    allValid = false;
                                    break;
                                }
                            }

                            if (!allValid) {
                                resultDiv.innerHTML = "Invalid input. Numbers must be 1–3999, Roman numerals must use valid symbols (I, V, X, L, C, D, M).";
                                return;
                            }

                            const inputStr = results.map(r => r.input).join(sep);
                            const outputStr = results.map(r => r.output).join(sep);

                            resultDiv.innerHTML = `
                        <div style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">${inputStr} = ${outputStr}</div>
                    `;
                            return;
                        }

                        // Single value mode
                        if (/^\d+$/.test(raw)) {
                            const num = parseInt(raw);
                            if (num < 1 || num > 3999) {
                                resultDiv.innerHTML = "Number must be between 1 and 3999.";
                                return;
                            }
                            const conv = intToRoman(num);

                            // Build step-by-step
                            const symbolsStr = conv.steps.map(s => s.symbol).join(" + ");
                            const valuesStr = conv.steps.map(s => s.value).join(" + ");

                            resultDiv.innerHTML = `
                        <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem;">${conv.roman} = ${num}</div>
                        <div style="opacity: 0.8;">
                            <strong>Steps:</strong><br>
                            <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.95rem; line-height: 1.8;">
                                ${num} → ${symbolsStr}<br>
                                <span style="margin-left: 1.5rem;">= ${valuesStr}</span><br>
                                <span style="margin-left: 1.5rem;">= <strong>${conv.roman}</strong></span>
                            </div>
                        </div>
                    `;
                        } else if (isRoman(raw)) {
                            const conv = romanToInt(raw);
                            if (!conv) {
                                resultDiv.innerHTML = "Invalid Roman numeral.";
                                return;
                            }

                            const symbolsStr = conv.symbols.join(" + ");
                            const valuesStr = conv.values.map(v => v < 0 ? `(${v})` : v).join(" + ");

                            resultDiv.innerHTML = `
                        <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem;">${raw.toUpperCase()} = ${conv.value}</div>
                        <div style="opacity: 0.8;">
                            <strong>Steps:</strong><br>
                            <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.95rem; line-height: 1.8;">
                                ${raw.toUpperCase()} = ${symbolsStr}<br>
                                <span style="margin-left: 1.5rem;">= ${valuesStr}</span><br>
                                <span style="margin-left: 1.5rem;">= <strong>${conv.value}</strong></span>
                            </div>
                        </div>
                    `;
                        } else {
                            resultDiv.innerHTML = "Invalid input. Enter a number (1–3999) or Roman numeral (I, V, X, L, C, D, M).";
                        }
                    }

                    convertBtn.addEventListener("click", convert);
                    clearBtn.addEventListener("click", () => {
                        input.value = "";
                        resultDiv.innerHTML = '<span style="opacity: 0.5; font-size: 1rem;">Enter values and click Calculate</span>';
                    });
                }
            }
        ]
    }
};
