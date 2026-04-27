function assertFiniteNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a valid number`);
  }
}

function assertNonNegative(value, label) {
  assertFiniteNumber(value, label);
  if (value < 0) {
    throw new Error(`${label} must be non-negative`);
  }
}

function assertPositive(value, label) {
  assertFiniteNumber(value, label);
  if (value <= 0) {
    throw new Error(`${label} must be greater than zero`);
  }
}

export const DEFAULT_DEBYE_HUCKEL_CONSTANTS = {
  A: 0.509,
  B: 0.328
};

export function calculateActivityFromCoefficient(concentrationTerm, activityCoefficient) {
  assertNonNegative(concentrationTerm, "Concentration term");
  assertPositive(activityCoefficient, "Activity coefficient");

  return concentrationTerm * activityCoefficient;
}

export function calculateActivityCoefficientFromActivity(activity, concentrationTerm) {
  assertNonNegative(activity, "Activity");
  assertPositive(concentrationTerm, "Concentration term");

  return activity / concentrationTerm;
}

export function calculateMolalityActivity(molality, activityCoefficient, standardMolality = 1) {
  assertNonNegative(molality, "Molality");
  assertPositive(activityCoefficient, "Activity coefficient");
  assertPositive(standardMolality, "Standard molality");

  return (molality * activityCoefficient) / standardMolality;
}

export function calculateMoleFractionActivity(moleFraction, activityCoefficient) {
  assertFiniteNumber(moleFraction, "Mole fraction");
  if (moleFraction < 0 || moleFraction > 1) {
    throw new Error("Mole fraction must be between 0 and 1");
  }
  assertPositive(activityCoefficient, "Activity coefficient");

  return moleFraction * activityCoefficient;
}

export function calculateIonicStrength(ions, neutralityTolerance = 1e-9) {
  if (!Array.isArray(ions) || ions.length === 0) {
    throw new Error("At least one ion is required");
  }

  let sum = 0;
  let chargeBalance = 0;

  ions.forEach((ion, index) => {
    const label = ion.name ? `Ion ${ion.name}` : `Ion ${index + 1}`;
    assertNonNegative(ion.molality, `${label} molality`);
    assertFiniteNumber(ion.charge, `${label} charge`);

    sum += ion.molality * ion.charge ** 2;
    chargeBalance += ion.molality * ion.charge;
  });

  return {
    ionicStrength: 0.5 * sum,
    chargeBalance,
    isElectricallyNeutral: Math.abs(chargeBalance) <= neutralityTolerance
  };
}

export function calculateDebyeHuckelLimiting(ionicStrength, charge, constantA = DEFAULT_DEBYE_HUCKEL_CONSTANTS.A) {
  assertNonNegative(ionicStrength, "Ionic strength");
  assertFiniteNumber(charge, "Ion charge");
  assertPositive(constantA, "Debye-Huckel constant A");

  const logGamma = -constantA * charge ** 2 * Math.sqrt(ionicStrength);

  return {
    logGamma,
    gamma: 10 ** logGamma
  };
}

export function calculateExtendedDebyeHuckel(
  ionicStrength,
  charge,
  constantA = DEFAULT_DEBYE_HUCKEL_CONSTANTS.A,
  constantB = DEFAULT_DEBYE_HUCKEL_CONSTANTS.B,
  ionSizeParameter
) {
  assertNonNegative(ionicStrength, "Ionic strength");
  assertFiniteNumber(charge, "Ion charge");
  assertPositive(constantA, "Debye-Huckel constant A");
  assertPositive(constantB, "Debye-Huckel constant B");
  assertPositive(ionSizeParameter, "Effective ion-size parameter");

  const sqrtI = Math.sqrt(ionicStrength);
  const denominator = 1 + constantB * ionSizeParameter * sqrtI;
  if (denominator <= 0) {
    throw new Error("Extended Debye-Huckel denominator must be greater than zero");
  }

  const negativeLogGamma = (constantA * charge ** 2 * sqrtI) / denominator;
  const logGamma = -negativeLogGamma;

  return {
    negativeLogGamma,
    logGamma,
    gamma: 10 ** logGamma
  };
}

export function calculateMeanIonicActivityCoefficient(
  cationCoefficient,
  anionCoefficient,
  cationStoichiometricNumber,
  anionStoichiometricNumber
) {
  assertPositive(cationCoefficient, "Cation activity coefficient");
  assertPositive(anionCoefficient, "Anion activity coefficient");

  if (!Number.isInteger(cationStoichiometricNumber) || cationStoichiometricNumber <= 0) {
    throw new Error("Cation stoichiometric number must be a positive integer");
  }

  if (!Number.isInteger(anionStoichiometricNumber) || anionStoichiometricNumber <= 0) {
    throw new Error("Anion stoichiometric number must be a positive integer");
  }

  const totalStoichiometricNumber = cationStoichiometricNumber + anionStoichiometricNumber;
  return (
    cationCoefficient ** cationStoichiometricNumber *
    anionCoefficient ** anionStoichiometricNumber
  ) ** (1 / totalStoichiometricNumber);
}
