import type { NumericInput, PricingResult, PricingScenario } from './types'

const MAX_MONEY = 1_000_000_000
const MAX_HOURS = 100_000
const MAX_REVIEWS = 100

const numericLimits: Record<keyof Pick<
  PricingScenario,
  | 'reviewCount'
  | 'currentReviewHoursPerCase'
  | 'currentClarificationHours'
  | 'employerLoadedHourlyCost'
  | 'currentExternalCosts'
  | 'pilotPrice'
  | 'deliveryHours'
  | 'deliveryHourlyCost'
  | 'toolsAndAdminCost'
  | 'validatedTimeSavedHours'
  | 'otherComparableEmployerValue'
>, number> = {
  reviewCount: MAX_REVIEWS,
  currentReviewHoursPerCase: MAX_HOURS,
  currentClarificationHours: MAX_HOURS,
  employerLoadedHourlyCost: MAX_MONEY,
  currentExternalCosts: MAX_MONEY,
  pilotPrice: MAX_MONEY,
  deliveryHours: MAX_HOURS,
  deliveryHourlyCost: MAX_MONEY,
  toolsAndAdminCost: MAX_MONEY,
  validatedTimeSavedHours: MAX_HOURS,
  otherComparableEmployerValue: MAX_MONEY,
}

const valueInputLabels: Array<[keyof PricingScenario, string]> = [
  ['validatedTimeSavedHours', 'horas ahorradas'],
  ['employerLoadedHourlyCost', 'costo por hora del empleador'],
  ['otherComparableEmployerValue', 'otro valor comparable'],
]

export function validatePricingScenario(scenario: PricingScenario): string[] {
  const errors: string[] = []
  if (scenario.schemaVersion !== 1) errors.push('La versión del escenario no es compatible.')
  if (!scenario.id || scenario.id.length > 80) errors.push('El identificador del escenario no es válido.')
  if (!scenario.label.trim() || scenario.label.trim().length > 80) errors.push('El nombre debe tener entre 1 y 80 caracteres.')
  if (scenario.note.length > 240) errors.push('La nota no puede superar 240 caracteres.')
  if (/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b|(?:\+?52\s?)?(?:\d[\s-]?){10}/i.test(`${scenario.label} ${scenario.note}`)) {
    errors.push('No incluyas correos ni teléfonos; este escenario no admite datos personales.')
  }

  for (const [key, max] of Object.entries(numericLimits) as Array<[keyof typeof numericLimits, number]>) {
    const input = scenario[key] as NumericInput
    if (!input || !Number.isFinite(input.value) || input.value < 0 || input.value > max) {
      errors.push(`El campo ${key} debe ser un número entre 0 y ${max}.`)
    }
    if (!['measured', 'quoted', 'assumed'].includes(input?.status)) {
      errors.push(`El campo ${key} necesita una fuente válida.`)
    }
  }

  if (!Number.isInteger(scenario.reviewCount.value) || scenario.reviewCount.value < 1) {
    errors.push('La cantidad de revisiones debe ser un entero mayor que cero.')
  }
  return errors
}

export function calculatePricing(scenario: PricingScenario): PricingResult {
  const errors = validatePricingScenario(scenario)
  if (errors.length) throw new Error(errors.join(' '))

  const currentComparableCost =
    (scenario.currentReviewHoursPerCase.value * scenario.reviewCount.value
      + scenario.currentClarificationHours.value)
    * scenario.employerLoadedHourlyCost.value
    + scenario.currentExternalCosts.value

  const providerDeliveryCost =
    scenario.deliveryHours.value * scenario.deliveryHourlyCost.value
    + scenario.toolsAndAdminCost.value
  const providerContribution = scenario.pilotPrice.value - providerDeliveryCost
  const providerContributionMargin = scenario.pilotPrice.value === 0
    ? null
    : providerContribution / scenario.pilotPrice.value
  const comparableEmployerValue =
    scenario.validatedTimeSavedHours.value * scenario.employerLoadedHourlyCost.value
    + scenario.otherComparableEmployerValue.value
  const valueToPriceRatio = scenario.pilotPrice.value === 0
    ? null
    : comparableEmployerValue / scenario.pilotPrice.value
  const assumedValueInputs = valueInputLabels
    .filter(([key]) => (scenario[key] as NumericInput).status === 'assumed')
    .map(([, label]) => label)

  const verdict = valueToPriceRatio === null || valueToPriceRatio < 10
    ? 'not-demonstrated'
    : assumedValueInputs.length
      ? 'mathematical-only'
      : 'supported-by-statuses'

  return {
    currentComparableCost,
    requiredValueAtTenToOne: scenario.pilotPrice.value * 10,
    providerDeliveryCost,
    providerContribution,
    providerContributionMargin,
    comparableEmployerValue,
    valueToPriceRatio,
    verdict,
    assumedValueInputs,
  }
}

export function createDefaultScenario(now = new Date()): PricingScenario {
  const timestamp = now.toISOString()
  const assumed = (value: number): NumericInput => ({ value, status: 'assumed' })
  return {
    schemaVersion: 1,
    id: `scenario-${timestamp}`,
    label: 'Ejemplo inventado - Analista de operaciones',
    createdAt: timestamp,
    updatedAt: timestamp,
    reviewCount: assumed(5),
    currentReviewHoursPerCase: assumed(0.75),
    currentClarificationHours: assumed(2),
    employerLoadedHourlyCost: assumed(600),
    currentExternalCosts: assumed(0),
    pilotPrice: assumed(12_000),
    deliveryHours: assumed(8.5),
    deliveryHourlyCost: assumed(600),
    toolsAndAdminCost: assumed(900),
    validatedTimeSavedHours: assumed(0),
    otherComparableEmployerValue: assumed(100_000),
    note: 'Cifras inventadas para probar la conversación; no demuestran demanda ni retorno.',
  }
}

export function formatMxn(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}
