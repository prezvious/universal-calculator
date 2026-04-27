import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateActivityCoefficientFromActivity,
  calculateActivityFromCoefficient,
  calculateDebyeHuckelLimiting,
  calculateExtendedDebyeHuckel,
  calculateIonicStrength,
  calculateMeanIonicActivityCoefficient,
  calculateMolalityActivity,
  calculateMoleFractionActivity
} from './chemistryUtils.js';

test('calculateActivityFromCoefficient - direct activity', () => {
  assert.strictEqual(calculateActivityFromCoefficient(0.01, 0.89), 0.0089);
});

test('calculateActivityCoefficientFromActivity - coefficient from activity', () => {
  assert.strictEqual(calculateActivityCoefficientFromActivity(0.0089, 0.01), 0.89);
});

test('calculateMolalityActivity - standard molality basis', () => {
  assert.strictEqual(calculateMolalityActivity(0.1, 0.85, 1), 0.085);
});

test('calculateMoleFractionActivity - mole fraction basis', () => {
  assert.strictEqual(calculateMoleFractionActivity(0.2, 1.1), 0.22000000000000003);
});

test('calculateIonicStrength - NaCl example', () => {
  const result = calculateIonicStrength([
    { name: 'Na+', molality: 0.01, charge: 1 },
    { name: 'Cl-', molality: 0.01, charge: -1 }
  ]);

  assert.strictEqual(result.ionicStrength, 0.01);
  assert.strictEqual(result.chargeBalance, 0);
  assert.strictEqual(result.isElectricallyNeutral, true);
});

test('calculateDebyeHuckelLimiting - dilute monovalent ion', () => {
  const result = calculateDebyeHuckelLimiting(0.01, 1, 0.509);

  assert.ok(Math.abs(result.logGamma - -0.0509) < 1e-12);
  assert.ok(Math.abs(result.gamma - 0.8894058875558918) < 1e-12);
});

test('calculateExtendedDebyeHuckel - ion-size correction', () => {
  const result = calculateExtendedDebyeHuckel(0.01, 1, 0.509, 0.328, 3);

  assert.ok(Math.abs(result.negativeLogGamma - 0.0463401310997815) < 1e-12);
  assert.ok(Math.abs(result.gamma - 0.8987933880859028) < 1e-12);
});

test('calculateMeanIonicActivityCoefficient - 1:1 electrolyte', () => {
  const result = calculateMeanIonicActivityCoefficient(0.78, 0.76, 1, 1);

  assert.ok(Math.abs(result - 0.7699350621968063) < 1e-12);
});
