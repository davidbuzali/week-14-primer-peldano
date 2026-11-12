'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculatePricing, createDefaultScenario, formatMxn, validatePricingScenario } from '@/src/pricing/logic'
import { deleteScenario, duplicateScenario, exportScenarios, loadScenarios, resetScenarios, saveScenario } from '@/src/pricing/storage'
import type { EvidenceStatus, NumericInput, PricingScenario } from '@/src/pricing/types'

type NumericKey = {
  [K in keyof PricingScenario]: PricingScenario[K] extends NumericInput ? K : never
}[keyof PricingScenario]

const statusLabels: Record<EvidenceStatus, string> = {
  measured: 'Medido',
  quoted: 'Cotizado',
  assumed: 'Supuesto',
}

const groups: Array<{ title: string; description: string; fields: Array<{ key: NumericKey; label: string; suffix: string }> }> = [
  {
    title: 'Proceso actual',
    description: 'La misma unidad: cinco revisiones comparables.',
    fields: [
      { key: 'reviewCount', label: 'Revisiones comparables', suffix: 'casos' },
      { key: 'currentReviewHoursPerCase', label: 'Tiempo por revisión', suffix: 'horas' },
      { key: 'currentClarificationHours', label: 'Aclaraciones totales', suffix: 'horas' },
      { key: 'employerLoadedHourlyCost', label: 'Costo laboral con carga', suffix: 'MX$/hora' },
      { key: 'currentExternalCosts', label: 'Costos externos actuales', suffix: 'MX$' },
    ],
  },
  {
    title: 'Oferta del piloto',
    description: 'Lo que pagaría el empleador; no es una venta realizada.',
    fields: [{ key: 'pilotPrice', label: 'Precio del piloto', suffix: 'MX$' }],
  },
  {
    title: 'Costo de entrega',
    description: 'Economía del proveedor, separada del valor del comprador.',
    fields: [
      { key: 'deliveryHours', label: 'Horas de entrega', suffix: 'horas' },
      { key: 'deliveryHourlyCost', label: 'Costo de entrega por hora', suffix: 'MX$/hora' },
      { key: 'toolsAndAdminCost', label: 'Herramientas y administración', suffix: 'MX$' },
    ],
  },
  {
    title: 'Valor comparable',
    description: 'Incluye solo beneficios que el pagador pueda explicar y defender.',
    fields: [
      { key: 'validatedTimeSavedHours', label: 'Tiempo validado que se ahorra', suffix: 'horas' },
      { key: 'otherComparableEmployerValue', label: 'Otro valor comparable', suffix: 'MX$' },
    ],
  },
]

const verdictCopy = {
  'not-demonstrated': ['Umbral 10:1 no demostrado', 'El valor comparable no llega a diez veces el precio del piloto.'],
  'mathematical-only': ['10:1 alcanzado solo con supuestos', 'La aritmética supera 10:1, pero al menos un insumo de valor sigue siendo supuesto.'],
  'supported-by-statuses': ['10:1 respaldado por las fuentes marcadas', 'La relación supera 10:1 sin insumos de valor marcados como supuestos. Aún no es una promesa de resultado.'],
} as const

export default function PricingApp() {
  const [scenario, setScenario] = useState<PricingScenario>(() => createDefaultScenario())
  const [saved, setSaved] = useState<PricingScenario[]>([])
  const [storageMessage, setStorageMessage] = useState('')
  useEffect(() => {
    const timer = window.setTimeout(() => setSaved(loadScenarios(window.localStorage)), 0)
    return () => window.clearTimeout(timer)
  }, [])
  const errors = useMemo(() => validatePricingScenario(scenario), [scenario])
  const result = useMemo(() => errors.length ? null : calculatePricing(scenario), [errors.length, scenario])

  function updateNumeric(key: NumericKey, patch: Partial<NumericInput>) {
    setScenario((current) => ({
      ...current,
      updatedAt: new Date().toISOString(),
      [key]: { ...(current[key] as NumericInput), ...patch },
    }))
  }

  const verdict = result ? verdictCopy[result.verdict] : null

  function saveCurrent() {
    if (errors.length) return
    setSaved(saveScenario(window.localStorage, scenario))
    setStorageMessage('Escenario guardado solo en este dispositivo.')
  }

  function downloadScenarios() {
    const blob = new Blob([exportScenarios(saved)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'primer-peldano-escenarios.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="pricing-shell paper-grid">
      <header className="pricing-header">
        <a className="brand display" href="#top">Primer Peldaño</a>
        <nav aria-label="Secciones del prototipo">
          <a aria-current="page" href="#calculator">La tarifa en vivo</a>
          <a href="/evidence">Demo de evidencia</a>
        </nav>
      </header>

      <section className="pricing-hero" id="top">
        <div>
          <p className="eyebrow">Semana 14 · Conversación de precio</p>
          <h1 className="display">Un número que puede decir “no”.</h1>
          <p className="hero-copy">Compara el proceso actual con un piloto de cinco revisiones. Cada cifra declara si fue medida, cotizada o asumida.</p>
        </div>
        <aside className="boundary-note" aria-label="Límites de la calculadora">
          <strong>Ejemplo inventado · cálculo local</strong>
          <p>No ingreses nombres ni datos de candidatos. Esto no es una cotización, un ROI demostrado ni una decisión de contratación.</p>
        </aside>
      </section>

      <section className="calculator-layout" id="calculator">
        <form className="input-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="scenario-heading">
            <label htmlFor="scenario-label">Escenario</label>
            <input
              id="scenario-label"
              maxLength={80}
              value={scenario.label}
              onChange={(event) => setScenario((current) => ({ ...current, label: event.target.value }))}
            />
          </div>
          {groups.map((group) => (
            <fieldset key={group.title}>
              <legend>{group.title}</legend>
              <p>{group.description}</p>
              {group.fields.map((field) => {
                const input = scenario[field.key] as NumericInput
                return (
                  <div className="field-row" key={field.key}>
                    <label htmlFor={field.key}>{field.label}</label>
                    <div className="field-controls">
                      <div className="number-wrap">
                        <input
                          id={field.key}
                          type="number"
                          min={field.key === 'reviewCount' ? 1 : 0}
                          max={field.key === 'reviewCount' ? 100 : 1000000000}
                          step={field.key === 'reviewCount' ? 1 : 0.25}
                          value={Number.isFinite(input.value) ? input.value : ''}
                          onChange={(event) => updateNumeric(field.key, { value: event.target.value === '' ? Number.NaN : Number(event.target.value) })}
                        />
                        <span>{field.suffix}</span>
                      </div>
                      <select
                        aria-label={`Fuente de ${field.label}`}
                        value={input.status}
                        onChange={(event) => updateNumeric(field.key, { status: event.target.value as EvidenceStatus })}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </div>
                  </div>
                )
              })}
            </fieldset>
          ))}
          <label className="note-field" htmlFor="scenario-note">
            Nota de supuestos
            <textarea
              id="scenario-note"
              maxLength={240}
              rows={3}
              value={scenario.note}
              onChange={(event) => setScenario((current) => ({ ...current, note: event.target.value }))}
            />
            <span>{scenario.note.length}/240 · No incluyas datos personales.</span>
          </label>
        </form>

        <section className="results-panel" aria-live="polite" aria-label="Resultados del escenario">
          <div className="results-title">
            <div>
              <p className="eyebrow">Resultado actual</p>
              <h2>Proceso actual vs. piloto de {Number.isFinite(scenario.reviewCount.value) ? scenario.reviewCount.value : '—'} revisiones</h2>
            </div>
            <span className="local-pill">Solo en este dispositivo</span>
          </div>

          {errors.length > 0 ? (
            <div className="error-card" role="alert">
              <strong>Corrige el escenario para calcular.</strong>
              <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
            </div>
          ) : result && verdict ? (
            <>
              <div className="result-grid">
                <article>
                  <span>Proceso actual comparable</span>
                  <strong>{formatMxn(result.currentComparableCost)}</strong>
                  <p>({scenario.currentReviewHoursPerCase.value} h × {scenario.reviewCount.value} + {scenario.currentClarificationHours.value} h) × {formatMxn(scenario.employerLoadedHourlyCost.value)} + {formatMxn(scenario.currentExternalCosts.value)}</p>
                </article>
                <article>
                  <span>Precio del piloto</span>
                  <strong>{formatMxn(scenario.pilotPrice.value)}</strong>
                  <p>Para 10:1 necesita {formatMxn(result.requiredValueAtTenToOne)} de valor comparable.</p>
                </article>
                <article>
                  <span>Valor comparable</span>
                  <strong>{formatMxn(result.comparableEmployerValue)}</strong>
                  <p>{scenario.validatedTimeSavedHours.value} h × {formatMxn(scenario.employerLoadedHourlyCost.value)} + {formatMxn(scenario.otherComparableEmployerValue.value)}</p>
                </article>
              </div>

              <article className={`verdict-card verdict-${result.verdict}`}>
                <div>
                  <span>Relación valor : precio</span>
                  <strong>{result.valueToPriceRatio === null ? 'No calculable' : `${result.valueToPriceRatio.toFixed(1)} : 1`}</strong>
                </div>
                <div>
                  <h3>{verdict[0]}</h3>
                  <p>{verdict[1]}</p>
                </div>
              </article>

              <div className="economics-grid">
                <article>
                  <h3>Economía del proveedor</h3>
                  <dl>
                    <div><dt>Costo de entrega</dt><dd>{formatMxn(result.providerDeliveryCost)}</dd></div>
                    <div><dt>Contribución</dt><dd>{formatMxn(result.providerContribution)}</dd></div>
                    <div><dt>Margen de contribución</dt><dd>{result.providerContributionMargin === null ? 'No calculable' : `${(result.providerContributionMargin * 100).toFixed(0)}%`}</dd></div>
                  </dl>
                  <p>Antes de costos fijos, ventas, impuestos y desarrollo.</p>
                </article>
                <article>
                  <h3>Evidencia pendiente</h3>
                  {result.assumedValueInputs.length ? (
                    <p>Siguen como supuesto: {result.assumedValueInputs.join(', ')}. Una relación alta no se convierte en evidencia por cambiar de color.</p>
                  ) : <p>Los insumos de valor no están marcados como supuestos; aún falta comprobar causalidad y repetición.</p>}
                  <p>La siguiente prueba es una conversación real con el dueño del presupuesto, no otra simulación.</p>
                </article>
              </div>

              <div className="action-bar">
                <div><strong>{saved.length} escenario{saved.length === 1 ? '' : 's'} guardado{saved.length === 1 ? '' : 's'}</strong><span>{storageMessage || 'Solo en este dispositivo; nada se envía.'}</span></div>
                <div className="action-buttons">
                  <button type="button" onClick={saveCurrent}>Guardar escenario</button>
                  <button type="button" onClick={() => window.print()}>Imprimir memo</button>
                  <button type="button" disabled={!saved.length} onClick={downloadScenarios}>Exportar JSON</button>
                </div>
              </div>
              {saved.length > 0 && (
                <section className="saved-library" aria-label="Escenarios guardados">
                  <div className="saved-title"><h3>Escenarios guardados</h3><button type="button" onClick={() => { if (window.confirm('¿Borrar todos los escenarios locales?')) { resetScenarios(window.localStorage); setSaved([]); setStorageMessage('Se borraron los escenarios locales.') } }}>Borrar todos</button></div>
                  <div className="saved-grid">
                    {saved.map((item) => (
                      <article key={item.id}>
                        <strong>{item.label}</strong>
                        <span>{formatMxn(item.pilotPrice.value)} · {statusLabels[item.pilotPrice.status]}</span>
                        <div>
                          <button type="button" onClick={() => setScenario(item)}>Abrir</button>
                          <button type="button" onClick={() => { const copy = duplicateScenario(item); setSaved(saveScenario(window.localStorage, copy)); setScenario(copy) }}>Duplicar</button>
                          <button type="button" onClick={() => { if (window.confirm('¿Borrar este escenario?')) setSaved(deleteScenario(window.localStorage, item.id)) }}>Borrar</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : null}
        </section>
      </section>

      <footer>
        <p>Primer Peldaño · Prototipo académico · Datos inventados · Trabajadores pagan MX$0</p>
      </footer>
    </main>
  )
}
