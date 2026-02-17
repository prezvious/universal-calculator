import { createCalculatorLayout, animateReveal } from './utils.js';
import { combinations, calculateLotteryOdds } from './mathUtils.js';

// --- Helper Functions ---









export const statisticsCalculators = {
    icon: "icon-statistics",
    label: "Statistics",
    subcategories: {
        lottery: [
            {
                id: "lottery-calculator",
                name: "Lottery Calculator",
                description: "Calculate the odds of winning a lottery jackpot or other prize tiers.",
                educationalHTML: `
            <div class="educational-section">
                <h3>How does the lottery odds calculator work?</h3>
                <p>The lottery calculator determines the probability of winning based on the hypergeometric distribution.</p>
                <p><strong>The Formula:</strong></p>
                \\[ P = \\frac{\\binom{k}{m} \\times \\binom{n-k}{k-m}}{\\binom{n}{k}} \\]
                <p>Where:</p>
                <ul>
                    <li><strong>n:</strong> Total balls in the pool.</li>
                    <li><strong>k:</strong> Balls drawn (and on your ticket).</li>
                    <li><strong>m:</strong> Number of matches.</li>
                </ul>

                <h3>Bonus Balls</h3>
                <p><strong>Type 1: From Remaining Pool</strong></p>
                <p>Calculates the odds of matching <em>m-1</em> main numbers plus the bonus ball drawn from the remaining numbers.</p>

                <p><strong>Type 2: From Bonus Pool</strong></p>
                <p>Calculates the odds of matching main numbers AND bonus numbers from a separate pool (e.g., Powerball).</p>
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
                <div class="form-group">
                    <label>Game Type:</label>
                    <div class="formula-radio-group">
                        <label class="custom-radio-label">
                            <input type="radio" name="lottery-type" value="standard" checked>
                            <span class="radio-mark"></span>
                            <span class="radio-text">Standard</span>
                        </label>
                        <label class="custom-radio-label">
                            <input type="radio" name="lottery-type" value="bonus-remaining">
                            <span class="radio-mark"></span>
                            <span class="radio-text">Bonus (Remaining Pool)</span>
                        </label>
                        <label class="custom-radio-label">
                            <input type="radio" name="lottery-type" value="bonus-pool">
                            <span class="radio-mark"></span>
                            <span class="radio-text">Bonus (Separate Pool)</span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="lottery-drawn">Balls to be drawn (k):</label>
                    <input type="number" id="lottery-drawn" placeholder="e.g. 6" min="1">
                </div>
                <div class="form-group">
                    <label for="lottery-matches">Number of matches (m):</label>
                    <input type="number" id="lottery-matches" placeholder="e.g. 6" min="0">
                    <small id="matches-hint" style="display:none; color: var(--text-secondary);">Calculates for m-1 matches + Bonus</small>
                </div>
                <div class="form-group">
                    <label for="lottery-pool">Number of balls in pool (n):</label>
                    <input type="number" id="lottery-pool" placeholder="e.g. 49" min="1">
                </div>

                <div id="bonus-pool-inputs" style="display: none; border-top: 1px dashed var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                    <h4>Bonus Pool Settings</h4>
                    <div class="form-group">
                        <label for="bonus-drawn">Bonus Balls to drawn:</label>
                        <input type="number" id="bonus-drawn" placeholder="e.g. 1" min="1">
                    </div>
                    <div class="form-group">
                        <label for="bonus-matches">Matches with bonus pool:</label>
                        <input type="number" id="bonus-matches" placeholder="e.g. 1" min="0">
                    </div>
                    <div class="form-group">
                        <label for="bonus-pool-size">Balls in bonus pool:</label>
                        <input type="number" id="bonus-pool-size" placeholder="e.g. 10" min="1">
                    </div>
                </div>

                <button id="calculate-lottery" class="calculate-btn">Calculate Odds</button>
            `;
                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "lottery-result",
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

                    // Toggle Inputs
                    const radios = document.getElementsByName("lottery-type");
                    const bonusPoolInputs = document.getElementById("bonus-pool-inputs");
                    const matchesHint = document.getElementById("matches-hint");

                    radios.forEach(radio => {
                        radio.addEventListener("change", (e) => {
                            if (e.target.value === "bonus-pool") {
                                bonusPoolInputs.style.display = "block";
                                matchesHint.style.display = "none";
                            } else if (e.target.value === "bonus-remaining") {
                                bonusPoolInputs.style.display = "none";
                                matchesHint.style.display = "block";
                            } else {
                                bonusPoolInputs.style.display = "none";
                                matchesHint.style.display = "none";
                            }
                        });
                    });

                    document.getElementById("calculate-lottery").addEventListener("click", () => {
                        const k = parseInt(document.getElementById("lottery-drawn").value);
                        const m = parseInt(document.getElementById("lottery-matches").value);
                        const n = parseInt(document.getElementById("lottery-pool").value);
                        const type = document.querySelector('input[name="lottery-type"]:checked').value;
                        const resultDiv = document.getElementById("lottery-result");

                        if (isNaN(k) || isNaN(m) || isNaN(n)) {
                            resultDiv.innerHTML = "Please enter valid numbers for the main pool.";
                            return;
                        }
                        if (m > k) {
                            resultDiv.innerHTML = "Matches cannot exceed balls drawn.";
                            return;
                        }
                        if (k > n) {
                            resultDiv.innerHTML = "Balls drawn cannot exceed pool size.";
                            return;
                        }
                        if (k >= n && type === "bonus-remaining") {
                            resultDiv.innerHTML = "Pool size must be greater than balls drawn for bonus calculation.";
                            return;
                        }

                        let probability = 0;

                        if (type === "standard") {
                            probability = calculateLotteryOdds(k, m, n);
                        } else if (type === "bonus-remaining") {
                            // Bonus from Remaining: Match m-1 Main + 1 Bonus
                            // P = [C(k, m-1) * C(n-k-1, k-(m-1)-1)] / C(n, k)
                            // Note: This assumes only 1 bonus ball is drawn.
                            // If m=0, handled gracefully? m-1 = -1 -> returns 0.

                            if (m < 1) {
                                resultDiv.innerHTML = "Need at least 1 match for bonus calculation.";
                                return;
                            }

                            const mainMatches = m - 1;
                            const bonusMatches = 1;

                            // Ways to match main: Choose m-1 from k winners
                            const waysMain = combinations(k, mainMatches);

                            // Ways to match bonus: Choose 1 from 1 bonus ball (which is drawn from remaining n-k)
                            // Wait, the bonus ball is a specific ball drawn from n-k.
                            // Correct formula logic for "Match m-1 Main and the Bonus Ball":
                            // 1. Choose m-1 winning main numbers: C(k, m-1)
                            // 2. The bonus ball is drawn from the remaining n-k balls.
                            //    We need our ticket's remaining k-(m-1) numbers to include the bonus ball.
                            //    Actually, let's use the standard "Success/Total" approach.
                            //    Total outcomes of draw: Choose k main, then 1 bonus.
                            //    Total = C(n, k) * (n-k). OR just ordered draw? No, sets are fine.
                            //    Favorable:
                            //      - Ticket has m-1 from the k main winners: C(k, m-1)
                            //      - Ticket has 1 from the 1 bonus winner: 1
                            //      - Ticket has rest (k - m) from the losers (n - k - 1): C(n - k - 1, k - m)
                            //    Probability = [C(k, m-1) * 1 * C(n-k-1, k-m)] / C(n, k) * 1?
                            //    No, if Total = C(n, k) for main draw.
                            //    This is simpler:
                            //    Prob = [Ways to pick main matches] * [Ways to pick bonus match] / [Total]
                            //    Actually, standard formula for "5 + Bonus" in 6/49 is:
                            //    (C(6,5) * C(1,1) * C(42,0)) / C(49,6) * C(43,1)? No.

                            // Let's use the validated logic:
                            // Prob = (C(k, m-1) * C(n-k-1, k-m)) / C(n, k) * (something about bonus)?
                            // Previous logic: P = C(k, m-1) / C(n, k) * ...

                            // Let's go with the exact formula for "Match x Main + Match Bonus":
                            // Numerator: C(k, x) * C(1, 1) * C(n-k-1, k-x-1)
                            // Denominator: C(n, k) * (n-k) ? No.
                            // Let's stick to the prompt's implied simple "1 in X" odds.
                            // The standard formula for "Match x main + 1 bonus" in a (n, k) game with 1 bonus drawn from remaining:
                            // Odds = ( C(k, x) * C(k-x, 1) * C(n-k-1, k-x-1) ) ... this is getting complex.

                            // Re-evaluating based on "Probability that the single Bonus Ball drawn from the remaining pool matches your single remaining number is exactly 1/(n-k)."
                            // P(Main part) = Probability of matching exactly m-1 main numbers.
                            // P(Main part) = [C(k, m-1) * C(n-k, k-(m-1))] / C(n, k).
                            // P(Bonus part | Main part) = 1 / (n-k).
                            // Result = P(Main part) * P(Bonus part).
                            // Note: P(Main part) here is "Matching exactly m-1 main numbers".

                            const probMain = calculateLotteryOdds(k, mainMatches, n);
                            const probBonus = (k - mainMatches) / (n - k);
                            if (probBonus > 1) {
                                resultDiv.innerHTML = "Invalid combination: more unmatched ticket numbers than remaining pool.";
                                return;
                            }
                            probability = probMain * probBonus;

                        } else {
                            // Bonus from Separate Pool
                            const kb = parseInt(document.getElementById("bonus-drawn").value);
                            const mb = parseInt(document.getElementById("bonus-matches").value);
                            const nb = parseInt(document.getElementById("bonus-pool-size").value);

                            if (isNaN(kb) || isNaN(mb) || isNaN(nb)) {
                                resultDiv.innerHTML = "Please enter valid numbers for the bonus pool.";
                                return;
                            }

                            const probMain = calculateLotteryOdds(k, m, n); // Matches m main
                            const probBonus = calculateLotteryOdds(kb, mb, nb); // Matches mb bonus
                            probability = probMain * probBonus;
                        }

                        if (probability === 0) {
                            resultDiv.innerHTML = "Probability is 0 (Impossible combination).";
                            return;
                        }

                        // Output "1 in X"
                        const oneInX = 1 / probability;

                        // Format with commas
                        const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

                        resultDiv.innerHTML = `
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">Winning Odds:</div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--accent-color);">1 in ${formatter.format(oneInX)}</div>
                    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">Probability: ${(probability * 100).toFixed(8)}%</div>
                `;
                    });
                }
            },
        ],
        odds: [
            {
                id: "odds-calculator",
                name: "Odds Calculator",
                description: "Calculate winning/losing probabilities, convert odds, and estimate betting returns.",
                educationalHTML: `
            <div class="educational-section">
                <h3>What are the odds...?</h3>
                <p>Odds are usually presented as a ratio (e.g., 1 to 5). "Odds of winning" means (Success : Failure).</p>
                <p><strong>Formulas:</strong></p>
                <ul>
                    <li>Probability of Winning = Chances for Success / (Success + Failure)</li>
                    <li>Probability of Losing = Chances against Success / (Success + Failure)</li>
                </ul>
                <p>Example: Odds 5 to 12.</p>
                <p>Success = 5, Failure = 12. Total = 17.</p>
                <p>Win % = 5/17 = 29.41%.</p>
            </div>
        `,
                generateHTML: function () {
                    const inputs = `
                <h3>Basic Odds</h3>
                <div class="form-group">
                    <label for="odds-success">Chances for Success (S):</label>
                    <input type="number" id="odds-success" placeholder="e.g. 1" min="0" step="any">
                </div>
                <div class="form-group">
                    <label for="odds-failure">Chances against Success (F):</label>
                    <input type="number" id="odds-failure" placeholder="e.g. 5" min="0" step="any">
                </div>
                <button id="calculate-basic-odds" class="calculate-btn">Calculate Probability</button>

                <div class="divider" style="margin: 1.5rem 0; border-top: 1px solid var(--border-color);"></div>

                <h3>Consecutive Odds</h3>
                <div class="form-group">
                    <label for="consecutive-count">Number of events in a row (x):</label>
                    <input type="number" id="consecutive-count" placeholder="e.g. 2" min="1" step="1">
                </div>
                <button id="calculate-consecutive" class="calculate-btn">Calculate Consecutive</button>

                <div class="divider" style="margin: 1.5rem 0; border-top: 1px solid var(--border-color);"></div>

                <h3>Odds Conversion</h3>
                <div class="form-group">
                    <label for="fractional-odds">Fractional Odds (e.g. 5/1):</label>
                    <input type="text" id="fractional-odds" placeholder="e.g. 5/1">
                </div>
                <button id="convert-odds" class="calculate-btn">Convert to Decimal</button>

                <div class="divider" style="margin: 1.5rem 0; border-top: 1px solid var(--border-color);"></div>

                <h3>Betting</h3>
                <div class="form-group">
                    <label for="betting-stake">Stake (USD):</label>
                    <input type="number" id="betting-stake" placeholder="e.g. 100" min="0" step="0.01">
                </div>
                 <div class="form-group">
                    <label for="betting-currency">Display Currency:</label>
                    <select id="betting-currency">
                        <option value="USD" selected>USD - US Dollar</option>
                        <option value="IDR">IDR - Indonesia Rupiah</option>
                        <option value="AUD">AUD - Australia Dollar</option>
                        <option value="BRL">BRL - Brazil Real</option>
                        <option value="CAD">CAD - Canada Dollar</option>
                        <option value="CHF">CHF - Switzerland Franc</option>
                        <option value="CNY">CNY - China Yuan Renminbi</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - UK Pound</option>
                        <option value="HKD">HKD - Hong Kong Dollar</option>
                        <option value="INR">INR - India Rupee</option>
                        <option value="JPY">JPY - Japan Yen</option>
                        <option value="KRW">KRW - Korea (South) Won</option>
                        <option value="MXN">MXN - Mexico Peso</option>
                        <option value="NOK">NOK - Norway Krone</option>
                        <option value="NZD">NZD - New Zealand Dollar</option>
                        <option value="PLN">PLN - Polish Zloty</option>
                        <option value="SEK">SEK - Sweden Krona</option>
                        <option value="SGD">SGD - Singapore Dollar</option>
                        <option value="TWD">TWD - Taiwan N. Dollar</option>
                        <option value="ZAR">ZAR - South Africa Rand</option>
                    </select>
                </div>
                <button id="calculate-betting" class="calculate-btn">Calculate Returns</button>
            `;
                    return createCalculatorLayout(
                        this.name,
                        this.description,
                        inputs,
                        "odds-result",
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

                    const resultDiv = document.getElementById("odds-result");

                    const getDecimalOdds = () => {
                        let decimalOdds = 0;
                        const frac = document.getElementById("fractional-odds").value;
                        if (frac && frac.includes('/')) {
                            const parts = frac.split('/');
                            decimalOdds = (parseFloat(parts[0]) / parseFloat(parts[1])) + 1;
                        } else {
                            const s = parseFloat(document.getElementById("odds-success").value);
                            const f = parseFloat(document.getElementById("odds-failure").value);
                            if (!isNaN(s) && !isNaN(f) && s > 0) {
                                decimalOdds = 1 + (f / s);
                            }
                        }
                        return decimalOdds;
                    };

                    document.getElementById("calculate-basic-odds").addEventListener("click", () => {
                        const s = parseFloat(document.getElementById("odds-success").value);
                        const f = parseFloat(document.getElementById("odds-failure").value);

                        if (isNaN(s) || isNaN(f)) {
                            resultDiv.innerHTML = "Please enter valid numbers.";
                            return;
                        }

                        const total = s + f;
                        if (total === 0) {
                            resultDiv.innerHTML = "Total chances cannot be zero.";
                            return;
                        }

                        const pWin = s / total;
                        const pLoss = f / total;

                        const pWinPermile = pWin * 1000;
                        const pWinBasis = pWin * 10000;
                        const pLossPermile = pLoss * 1000;
                        const pLossBasis = pLoss * 10000;

                        resultDiv.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <h4 style="display:flex; align-items:center;">
                            Probability of Winning
                            <button id="info-win" class="what-is-this-btn" style="padding: 2px 8px; margin-left: 8px; font-size: 0.8rem;">i</button>
                        </h4>
                        <p>${(pWin * 100).toFixed(2)}% | ${pWinPermile.toFixed(2)}‰ | ${pWinBasis.toFixed(0)}‱</p>
                    </div>
                    <div>
                        <h4 style="display:flex; align-items:center;">
                            Probability of Losing
                            <button id="info-loss" class="what-is-this-btn" style="padding: 2px 8px; margin-left: 8px; font-size: 0.8rem;">i</button>
                        </h4>
                        <p>${(pLoss * 100).toFixed(2)}% | ${pLossPermile.toFixed(2)}‰ | ${pLossBasis.toFixed(0)}‱</p>
                    </div>
                `;

                        const showInfo = () => {
                            // In a real app, maybe a tooltip. Here, scrolling to consecutive section.
                            const consecutiveSection = document.getElementById("consecutive-count").closest(".calculator-form");
                            // Just adding a highlight or alert for now as requested: "display the information: Open the Consecutive odds section..."
                            alert("Open the Consecutive odds section to calculate the probability of multiple wins/losses in a row.");
                        };

                        document.getElementById("info-win").onclick = showInfo;
                        document.getElementById("info-loss").onclick = showInfo;
                    });

                    document.getElementById("calculate-consecutive").addEventListener("click", () => {
                        const x = parseInt(document.getElementById("consecutive-count").value);
                        const decimalOdds = getDecimalOdds();

                        if (isNaN(x) || x < 1) {
                            resultDiv.innerHTML = "Please enter a valid count for consecutive events.";
                            return;
                        }

                        if (!decimalOdds || decimalOdds <= 1) {
                            resultDiv.innerHTML = "Please enter valid Fractional Odds or Success/Failure values first.";
                            return;
                        }

                        const pWin = 1 / decimalOdds;
                        const pLoss = 1 - pWin;

                        const pWinX = Math.pow(pWin, x);
                        const pLossX = Math.pow(pLoss, x);

                        resultDiv.innerHTML = `
                    <h4>Consecutive Probability (${x} times)</h4>
                    <p>Winning ${x} times in a row: <strong>${(pWinX * 100).toFixed(4)}%</strong></p>
                    <p>Losing ${x} times in a row: <strong>${(pLossX * 100).toFixed(4)}%</strong></p>
                `;
                    });

                    document.getElementById("convert-odds").addEventListener("click", () => {
                        const frac = document.getElementById("fractional-odds").value;
                        const parts = frac.split('/');
                        if (parts.length !== 2) {
                            resultDiv.innerHTML = "Invalid fraction format. Use '5/1'.";
                            return;
                        }
                        const num = parseFloat(parts[0]);
                        const den = parseFloat(parts[1]);
                        if (isNaN(num) || isNaN(den) || den === 0) {
                            resultDiv.innerHTML = "Invalid numbers in fraction.";
                            return;
                        }

                        const decimal = (num / den) + 1;
                        resultDiv.innerHTML = `Decimal Odds: <strong>${decimal.toFixed(2)}</strong>`;
                    });

                    document.getElementById("calculate-betting").addEventListener("click", async () => {
                        const stake = parseFloat(document.getElementById("betting-stake").value);
                        const currency = document.getElementById("betting-currency").value;
                        const decimalOdds = getDecimalOdds();

                        if (isNaN(decimalOdds) || decimalOdds <= 1) {
                            resultDiv.innerHTML = "Please enter valid Fractional Odds (e.g. 5/1) or Success/Failure values first to determine odds.";
                            return;
                        }

                        if (isNaN(stake) || stake <= 0) {
                            resultDiv.innerHTML = "Please enter a valid stake.";
                            return;
                        }

                        resultDiv.innerHTML = "Fetching exchange rates...";

                        try {
                            const response = await fetch("https://v6.exchangerate-api.com/v6/416a6ff949403eab0e2bbb8d/latest/USD");
                            const data = await response.json();

                            if (data.result !== "success") {
                                throw new Error("API Error");
                            }

                            const rates = data.conversion_rates;
                            const rate = rates[currency];

                            if (!rate) {
                                throw new Error("Currency not found");
                            }

                            const totalReturnedUSD = stake * decimalOdds;
                            const netProfitUSD = totalReturnedUSD - stake;

                            const totalReturnedTarget = totalReturnedUSD * rate;
                            const netProfitTarget = netProfitUSD * rate;

                            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency });

                            resultDiv.innerHTML = `
                        <h4>Betting Results</h4>
                        <p><strong>Decimal Odds used:</strong> ${decimalOdds.toFixed(2)}</p>
                        <p><strong>Total Returned:</strong> ${formatter.format(totalReturnedTarget)}</p>
                        <p><strong>Net Profit:</strong> ${formatter.format(netProfitTarget)}</p>
                        <small style="opacity:0.6;">(Assuming Stake in USD, converted to ${currency})</small>
                    `;

                        } catch (e) {
                            console.error(e);
                            const totalReturned = stake * decimalOdds;
                            const netProfit = totalReturned - stake;
                            resultDiv.innerHTML = `
                        <h4>Betting Results (Offline)</h4>
                        <p><strong>Decimal Odds used:</strong> ${decimalOdds.toFixed(2)}</p>
                        <p><strong>Total Returned:</strong> ${totalReturned.toFixed(2)} (Base Currency)</p>
                        <p><strong>Net Profit:</strong> ${netProfit.toFixed(2)} (Base Currency)</p>
                        <small style="color: red;">Could not fetch exchange rates.</small>
                    `;
                        }
                    });
                }
            }
        ]

    }
};
