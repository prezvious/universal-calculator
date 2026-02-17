import { mathCalculators } from './math.js';
import { physicsCalculators } from './physics.js';
import { convertersCalculators } from './converters.js';
import { chemistryCalculators } from './chemistry.js';
import { statisticsCalculators } from './statistics.js';
import { otherCalculators } from './other.js';
import { initializeUI } from './ui.js';

const calculators = {
    math: mathCalculators,
    physics: physicsCalculators,
    chemistry: chemistryCalculators,
    statistics: statisticsCalculators,
    converters: convertersCalculators,
    other: otherCalculators
};

document.addEventListener("DOMContentLoaded", () => {
    initializeUI(calculators);
});
