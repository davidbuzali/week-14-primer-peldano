# Week 14 implementation prompt - Primer Peldaño

## Role

You are the coding agent for Primer Peldaño Week 14. Work only in the dedicated Week 14 repository cloned from the final Week 13 state. Preserve the prior employer-commitment stop state, fictional evidence demo, local-only behavior, worker control, and human hiring authority. Do not modify, force-push, redeploy, or repoint the Week 13 repository or project.

Read `docs/PACKET.md` before changing code. If a product decision conflicts with the packet, update the packet and `DECISIONS.md` first.

## Objective

Build **La tarifa en vivo**, a Spanish employer-side price-truth calculator for one bounded five-review Primer Peldaño pilot. It must compare like-for-like current effort with the proposed MX$12,000 offer, separate buyer value from provider economics, preserve the evidence status of every input, save multiple scenarios locally, and clearly report when the 10:1 threshold is not demonstrated.

The calculator is a decision aid, not an ROI claim, quote, contract, hiring tool, worker valuation, or sales lead collector.

## Feature 1 - typed scenario and honest formulas

- Add a versioned `PricingScenario` model with only the fields allowed by the packet.
- Use exactly five comparable reviews as the default unit; make the quantity visible and editable only within a small bounded range if required for comparison.
- Model current review hours per case, current clarification hours, loaded employer hourly cost, current external cost, pilot price, delivery hours, delivery hourly cost, tools/admin cost, validated employer time saved, and other validated employer value.
- Attach `measured`, `quoted`, or `assumed` to every business input.
- Implement pure deterministic calculation and validation functions outside React.
- Calculate current comparable cost, required value at 10:1, provider delivery cost, contribution, contribution margin, comparable employer value, and value-to-price ratio.
- Guard zero price, invalid numbers, negative values, overflow, missing evidence status, and division by zero.
- Round displayed MXN to whole pesos and ratios to one decimal while preserving unrounded calculation values.

### Acceptance

- The invented default uses a MX$12,000 pilot price and does not meet 10:1.
- Required 10:1 value is always exactly ten times the entered pilot price.
- Employer value and provider contribution never share a subtotal.
- A ratio cannot be presented as demonstrated if required fields are incomplete or assumed.
- Every output exposes its formula, included fields, exclusions, and evidence caveat.

## Feature 2 - responsive calculator interface

- Add a clearly labeled route or mode called `La tarifa en vivo` without removing the inherited worker-side demonstration.
- Begin with a short boundary notice: process economics only, no candidate data, invented defaults, local calculation.
- Organize inputs into `Proceso actual`, `Oferta del piloto`, `Costo de entrega`, and `Valor comparable`.
- Put the evidence-status control beside each input, not in a hidden settings panel.
- Show four distinct output areas: employer current cost, employer purchase/value ratio, provider contribution/margin, and missing evidence.
- Use plain Spanish verdicts: `Umbral 10:1 no demostrado`, `Umbral matemático alcanzado solo con supuestos`, or `Umbral respaldado por los datos marcados`, as applicable.
- Never show green success merely because an arithmetic ratio exceeds 10 when one of the contributing values is assumed.
- Make all controls keyboard operable, labelled for assistive technology, usable at 200% zoom, and free of horizontal overflow at 390 px.

### Acceptance

- The initial screen cannot be mistaken for an accepted price or real employer result.
- Status is communicated by words and icons, not color alone.
- No candidate score, match percentage, rank, recommendation, salary estimate, or automated price recommendation appears.

## Feature 3 - saved scenarios and comparison

- Implement a versioned local repository backed by `localStorage` with a maximum of 20 scenarios.
- Support save, reopen, rename, duplicate, compare up to three, delete one, and reset all.
- Use generated IDs and timestamps; do not create an analytics identifier.
- Recover valid scenarios when one stored item is corrupted. Reject unknown schema versions safely and explain what happened.
- Provide user-initiated JSON export and import with schema validation.
- Add a print layout that produces a concise one-page assumption memo: vacancy label, inputs with evidence statuses, formulas, outputs, exclusions, and next evidence needed.
- State `Solo en este dispositivo` beside save controls.

### Acceptance

- Reloading restores saved scenarios but does not send network requests.
- Delete/reset requires confirmation and actually removes local records.
- Import rejects extra personal-data-like fields and overlong notes.
- Comparison never silently normalizes unlike units.

## Feature 4 - security and privacy floor

- No secrets, real personal data, employer confidential data, tracking, remote analytics, server persistence, API routes, or AI calls.
- Validate text length, numbers, evidence statuses, schema version, import file size, and object keys.
- Block common personal contact patterns in the vacancy label and note; explain that the tool is not for candidate information.
- Keep optional Supabase integration inactive. Do not add authentication because the feature stores no server-side or personal data.
- Keep all invented defaults visibly labeled.

## Feature 5 - tests and release evidence

- Add unit tests for formulas, rounding, evidence verdicts, invalid values, and boundary amounts.
- Add persistence tests for save, update, duplicate, delete, cap, corrupted item recovery, reset, export, and import rejection.
- Add source-contract tests for the shadow clause, local-only statement, invented defaults, no 10:1 default success, and forbidden candidate concepts.
- Run tests, type checking, lint, build, and a tracked-secret scan.
- Deploy release 1 to a dedicated Week 14 Vercel project.
- Test the live flow on desktop and 390 x 844 mobile, record at least one actual defect, fix it, rerun checks, and deploy release 2.
- Conduct the fresh synthetic persona pass defined in the packet, document all confusion, and fix the highest-consequence item. Do not invent a payer conversation or persona result.

## Documentation

- Update `README.md` for Week 14 and include the dedicated GitHub and live URLs only after they exist.
- Update `DECISIONS.md` at every session close with decisions, evidence gaps, and tomorrow's first move.
- Create or update `docs/TESTING.md`, `docs/PERSONA.md`, `docs/BUILDCHAT.md`, `docs/DEMO_SCRIPT.md`, and `docs/SUBMISSION_CHECKLIST.md` without claiming tests that did not occur.
- Preserve the complete visible development exchange needed for `BUILDCHAT_David_Buzali.pdf`.

## Commit and deployment plan

1. `docs: define Week 14 pricing packet`
2. `feat: add honest pricing scenario calculations`
3. `feat: build the live rate calculator` - deploy release 1
4. `feat: save and compare pricing scenarios`
5. `test: verify pricing and local-data boundaries`
6. `fix: resolve highest-risk calculator confusion` - deploy release 2
7. `docs: finalize Week 14 submission evidence`

Use at least five Week 14 commits. Push every commit to the dedicated `davidbuzali/week-14-primer-peldano` repository once GitHub authentication is restored. Create a separate Vercel project; never overwrite the Week 13 project. Keep the final tested Week 14 URL as the submission URL of record.
