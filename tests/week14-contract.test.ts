import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const app = readFileSync(new URL('../src/components/PricingApp.tsx', import.meta.url), 'utf8')
const storage = readFileSync(new URL('../src/pricing/storage.ts', import.meta.url), 'utf8')

test('Week 14 interface keeps price and evidence boundaries visible', () => {
  for (const phrase of ['Umbral 10:1 no demostrado', '10:1 alcanzado solo con supuestos', 'Solo en este dispositivo', 'No ingreses nombres ni datos de candidatos', 'Trabajadores pagan MX$0']) assert.ok(app.includes(phrase))
  assert.doesNotMatch(app, /probabilidad de contrataci[oó]n|ranking de candidatos|puntaje global/i)
})

test('scenario persistence has no remote transport and enforces a cap', () => {
  assert.doesNotMatch(storage, /\bfetch\s*\(|sendBeacon|XMLHttpRequest|WebSocket/)
  assert.match(storage, /MAX_SCENARIOS = 20/)
  assert.match(storage, /campos no permitidos/)
})
