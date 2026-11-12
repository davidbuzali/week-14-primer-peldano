import assert from 'node:assert/strict'
import test from 'node:test'
import { createDefaultScenario } from '../src/pricing/logic.ts'
import { deleteScenario, duplicateScenario, exportScenarios, importScenarios, loadScenarios, MAX_SCENARIOS, PRICING_STORAGE_KEY, resetScenarios, saveScenario } from '../src/pricing/storage.ts'

class MemoryStorage {
  data = new Map<string, string>()
  getItem(key: string) { return this.data.get(key) ?? null }
  setItem(key: string, value: string) { this.data.set(key, value) }
  removeItem(key: string) { this.data.delete(key) }
}

test('local repository saves, updates, duplicates, deletes, and resets scenarios', () => {
  const storage = new MemoryStorage()
  const scenario = createDefaultScenario(new Date('2026-11-12T12:00:00Z'))
  assert.equal(saveScenario(storage, scenario).length, 1)
  scenario.label = 'Revisado'
  assert.equal(saveScenario(storage, scenario)[0].label, 'Revisado')
  const copy = duplicateScenario(scenario, new Date('2026-11-12T13:00:00Z'))
  saveScenario(storage, copy)
  assert.equal(loadScenarios(storage).length, 2)
  assert.equal(deleteScenario(storage, copy.id).length, 1)
  resetScenarios(storage)
  assert.deepEqual(loadScenarios(storage), [])
})

test('corrupt entries are ignored while valid scenarios survive', () => {
  const storage = new MemoryStorage()
  storage.setItem(PRICING_STORAGE_KEY, JSON.stringify([createDefaultScenario(), { schemaVersion: 1, id: 'bad' }]))
  assert.equal(loadScenarios(storage).length, 1)
})

test('repository keeps no more than twenty scenarios', () => {
  const storage = new MemoryStorage()
  for (let index = 0; index < MAX_SCENARIOS + 3; index += 1) {
    const scenario = createDefaultScenario(new Date(1_800_000_000_000 + index * 1000))
    saveScenario(storage, scenario)
  }
  assert.equal(loadScenarios(storage).length, MAX_SCENARIOS)
})

test('export round-trips and import rejects extra fields', () => {
  const scenarios = [createDefaultScenario()]
  assert.equal(importScenarios(exportScenarios(scenarios)).length, 1)
  assert.throws(() => importScenarios(JSON.stringify({ schemaVersion: 1, scenarios, candidateName: 'No permitido' })), /campos no permitidos/i)
})
