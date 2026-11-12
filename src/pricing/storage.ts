import { validatePricingScenario } from './logic.ts'
import type { PricingScenario } from './types.ts'

export const PRICING_STORAGE_KEY = 'primer-peldano/pricing-scenarios/v1'
export const MAX_SCENARIOS = 20

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

const allowedKeys = new Set([
  'schemaVersion', 'id', 'label', 'createdAt', 'updatedAt', 'reviewCount',
  'currentReviewHoursPerCase', 'currentClarificationHours', 'employerLoadedHourlyCost',
  'currentExternalCosts', 'pilotPrice', 'deliveryHours', 'deliveryHourlyCost',
  'toolsAndAdminCost', 'validatedTimeSavedHours', 'otherComparableEmployerValue', 'note',
])

function isScenario(value: unknown): value is PricingScenario {
  try {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false
    if (Object.keys(value).some((key) => !allowedKeys.has(key))) return false
    return validatePricingScenario(value as PricingScenario).length === 0
  } catch {
    return false
  }
}

export function loadScenarios(storage: StorageLike): PricingScenario[] {
  try {
    const raw = storage.getItem(PRICING_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isScenario).slice(0, MAX_SCENARIOS)
  } catch {
    return []
  }
}

export function saveScenario(storage: StorageLike, scenario: PricingScenario): PricingScenario[] {
  if (!isScenario(scenario)) throw new Error('El escenario no es válido.')
  const current = loadScenarios(storage)
  const updated = [{ ...scenario, updatedAt: new Date().toISOString() }, ...current.filter((item) => item.id !== scenario.id)].slice(0, MAX_SCENARIOS)
  storage.setItem(PRICING_STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function deleteScenario(storage: StorageLike, id: string): PricingScenario[] {
  const updated = loadScenarios(storage).filter((scenario) => scenario.id !== id)
  storage.setItem(PRICING_STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function resetScenarios(storage: StorageLike): void {
  storage.removeItem(PRICING_STORAGE_KEY)
}

export function duplicateScenario(scenario: PricingScenario, now = new Date()): PricingScenario {
  const timestamp = now.toISOString()
  return { ...structuredClone(scenario), id: `scenario-${timestamp}`, label: `${scenario.label} - copia`.slice(0, 80), createdAt: timestamp, updatedAt: timestamp }
}

export function exportScenarios(scenarios: PricingScenario[]): string {
  return JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), localOnly: true, scenarios }, null, 2)
}

export function importScenarios(raw: string): PricingScenario[] {
  if (raw.length > 500_000) throw new Error('El archivo supera el límite permitido.')
  const parsed: unknown = JSON.parse(raw)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('El archivo no es válido.')
  const record = parsed as Record<string, unknown>
  if (Object.keys(record).some((key) => !['schemaVersion', 'exportedAt', 'localOnly', 'scenarios'].includes(key))) throw new Error('El archivo contiene campos no permitidos.')
  if (record.schemaVersion !== 1 || !Array.isArray(record.scenarios)) throw new Error('La versión del archivo no es compatible.')
  if (record.scenarios.length > MAX_SCENARIOS || record.scenarios.some((item) => !isScenario(item))) throw new Error('Uno o más escenarios no son válidos.')
  return record.scenarios
}
