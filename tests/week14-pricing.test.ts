import assert from 'node:assert/strict'
import test from 'node:test'
import { calculatePricing, createDefaultScenario, validatePricingScenario } from '../src/pricing/logic.ts'

test('default invented scenario exposes honest seller economics and fails 10:1', () => {
  const scenario = createDefaultScenario(new Date('2026-11-12T12:00:00.000Z'))
  const result = calculatePricing(scenario)
  assert.equal(result.currentComparableCost, 3_450)
  assert.equal(result.providerDeliveryCost, 6_000)
  assert.equal(result.providerContribution, 6_000)
  assert.equal(result.providerContributionMargin, 0.5)
  assert.equal(result.requiredValueAtTenToOne, 120_000)
  assert.equal(result.comparableEmployerValue, 100_000)
  assert.equal(result.valueToPriceRatio, 100_000 / 12_000)
  assert.equal(result.verdict, 'not-demonstrated')
})

test('ratio over 10 remains mathematical only while value inputs are assumed', () => {
  const scenario = createDefaultScenario()
  scenario.otherComparableEmployerValue.value = 150_000
  assert.equal(calculatePricing(scenario).verdict, 'mathematical-only')
})

test('ratio can be supported only when all value inputs have non-assumed sources', () => {
  const scenario = createDefaultScenario()
  scenario.otherComparableEmployerValue.value = 150_000
  scenario.otherComparableEmployerValue.status = 'quoted'
  scenario.validatedTimeSavedHours.status = 'measured'
  scenario.employerLoadedHourlyCost.status = 'measured'
  assert.equal(calculatePricing(scenario).verdict, 'supported-by-statuses')
})

test('zero pilot price never divides by zero or claims a threshold', () => {
  const scenario = createDefaultScenario()
  scenario.pilotPrice.value = 0
  const result = calculatePricing(scenario)
  assert.equal(result.providerContributionMargin, null)
  assert.equal(result.valueToPriceRatio, null)
  assert.equal(result.verdict, 'not-demonstrated')
})

test('validation rejects personal contacts, invalid numbers, and fractional review counts', () => {
  const scenario = createDefaultScenario()
  scenario.note = 'Escribe a persona@empresa.mx'
  scenario.deliveryHours.value = Number.NaN
  scenario.reviewCount.value = 4.5
  const errors = validatePricingScenario(scenario).join(' ')
  assert.match(errors, /datos personales/i)
  assert.match(errors, /deliveryHours/)
  assert.match(errors, /entero/i)
})
