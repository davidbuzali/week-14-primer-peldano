# Decision log - Primer Peldaño

## Week 14 session close 2 - calculator, scenarios, and mechanical fix

- Implemented pure pricing formulas, the Spanish calculator, and the preserved `/evidence` route.
- Completed deployment 1 in the dedicated Week 14 Vercel project after tests, type checking, lint, and production build passed.
- Added local save, reopen, duplicate, delete, reset, print, and JSON export with no remote transport.
- Mechanical testing found that one malformed local object could hide valid scenarios; per-record recovery now preserves valid data.
- Expanded the suite to 31 tests and preserved the fresh persona pass and payer conversation as uncompleted gates.
- Next move: deploy release 2, verify the stable URL, then run the fresh persona walkthrough.

## Week 14 session close 1 - separate repository and packet before code

- Preserved the full Week 13 repository and cloned its final tracked state into a distinct local Week 14 repository with no remote attached.
- Bound the Week 14 slice to `La tarifa en vivo`: an employer-side calculator for one bounded five-review pilot with saved local scenarios.
- Kept the proposed MX$12,000 pilot price, MX$6,000 delivery cost, five-review capacity, MX$10,000 commercial floor, and MX$120,000 10:1 hurdle visibly provisional.
- Required like-for-like comparison, visible formulas, and `measured`, `quoted`, or `assumed` status on every business input.
- Separated employer value and purchase cost from provider delivery cost, contribution, and margin.
- Preserved the Blueprint shadow clause: workers pay MX$0; paying more never buys worker data, hidden ranking, behavioral analytics, or cross-opening reuse.
- Chose versioned local-only scenario storage, a 20-scenario cap, explicit delete/reset/export, and no database, authentication, analytics, or candidate data.
- Generated the packet mockup before code and corrected its first inconsistent 17:1 warning; the accepted mockup deliberately shows a truthful 6.8:1 failure.
- Verified that GitHub authentication has expired. No Week 14 remote repository or deployment will be claimed until David signs back in.
- Tomorrow's first move: restore GitHub access, create `davidbuzali/week-14-primer-peldano`, push the packet commit, then implement pure calculator logic and tests before UI work.

## Week 13 session close 1 - separate repository and packet before code

- Preserved the complete Week 12 repository and created a separate Week 13 working repository from its public-source state.
- Bound the Week 13 slice to an instrumented comprehension test, not a claim of hiring validation.
- Replaced proof-oriented language in the plan with term-overlap language and required a keyword-stuffed adversarial example.
- Chose a local-only anonymous event log and bounded feedback form so the test can be audited without collecting personal data.
- Preserved the Blueprint shadow clause: fictional records, no hiring consequence, no automatic transfer, and an equal existing path for any future real pilot.
- Defined the five-user protocol with at least three strangers and prohibited invented results.
- Tomorrow's first move: implement the honest term-match states and adversarial example before adding analytics.

## Week 13 session close 2 - honest instrumentation and first release

- Replaced user-facing proof language with `Coincidencia de términos`, `Posible información faltante`, and `Sin coincidencia de términos`.
- Added a keyword-stuffed invented example that can turn every criterion green while remaining explicitly insufficient.
- Added a typed local event log, five boundary checks, relationship classification, bounded feedback, user-initiated export, and local reset.
- Kept events categorical and allow-listed; evidence text and open feedback never enter the event stream.
- Twenty automated tests, type checking, lint, and the production build passed.
- Created and pushed `https://github.com/davidbuzali/week-13-primer-peldano` with five ordered commits.
- Created the separate Vercel project and completed production deployment 1 at the stable alias.
- Next move: execute the live task, find a consequential defect, fix it, and redeploy.

## Week 13 session close 3 - test, fix, and second release

- Live testing found that reset removed browser storage but left the feedback note visible in component memory.
- Fixed the privacy defect by remounting feedback on a new anonymous session ID and clarified the export disclosure.
- Re-ran all 20 tests, type checking, lint, and the production build successfully.
- Pushed the fix commit and completed production deployment 2.
- Reproduced the exact failure path on the final URL: the note cleared and the event count returned to one.
- Verified `scrollWidth = clientWidth = 390` at a 390 x 844 viewport with no horizontal overflow.
- Preserved the remaining evidence gaps instead of fabricating them: five real-user sessions, three strangers, fresh independent persona, employer commitment, worker consent, and comparable 10:1 measurement.
- Next move: recruit the first two-user batch and record all failures in `docs/FIVE_USER_SESSION_LOG.md`.

## Week 12 session close 1 - charter before rebuild

- Ratified the conditional Week 12 choice: Primer Peldaño, sourced from Week 9 and distinct from the teammates' named chapters.
- Bound the core build to one employer-commitment gate and one criterion-level evidence map.
- Kept the reported October 2026 worker story out of the public demo until consent is documented.
- Preserved the Blueprint shadow clause: no automatic verdict, global score, ranking, verification claim, or hidden repair of missing evidence.
- Chose a Next.js + React + Tailwind + Vercel + GitHub stack with an optional Supabase boundary; no public demo data will be stored.
- Re-verified Opportunity@Work and OECD as primary benchmark sources.
- Prohibited any 10:1 claim until the same task is measured on comparable time, cost, or review probability.
- Tomorrow's first move: migrate the existing Week 9 interface and put the commitment state before all evidence interaction.

## Prior Week 9 close

The Week 9 history remains available in Git. Its last verified state used invented data, deterministic matching, seven passing tests, and a public Vercel demo. Week 12 does not reuse its simulated employer commitment as real-world evidence.

## Week 12 session close 2 - core feature and first deployment

- Migrated the venture to Next.js 16, React 19, TypeScript, and Tailwind 4.
- Added a guarded Supabase client boundary and an owner-scoped RLS migration; the public demo does not store data.
- Built the employer stop-state, invented demo, bounded fields, deterministic criterion map, provenance details, correction signal, and local export.
- Seven logic tests, type checking, lint, and the production build pass.
- First ready deployment: `dpl_4exL42rt5wKZ6D2YvGXHSc4ARM8k`.
- Found and fixed the highest-severity mechanical defect: Vercel Authentication blocked anonymous visitors even though a HEAD request returned 200.
- Assigned `https://primer-peldano-mx.vercel.app` as the venture URL of record and confirmed anonymous browser access.
- Tomorrow's first move: correct the highest-risk usability ambiguity, rerun the full suite, and complete deployment 2.

## Week 12 session close 3 - usability correction

- Ran the live page at desktop and 390 x 844 mobile widths; no horizontal overflow occurred.
- Found a high-risk comprehension flaw: the app opened directly into the invented commitment, so a hurried worker might mistake demonstration readiness for employer readiness.
- Changed the default to the real stop-state and removed all evidence inputs until the visitor explicitly chooses `Abrir demo inventada`.
- Renamed the gate controls so the real and invented states describe themselves without internal product language.
- Recorded the walkthrough honestly as preliminary because it was not conducted in a fresh independent chat.
- Next move: rerun all checks, deploy the fixed release, verify anonymous access, and preserve the fresh-chat persona pass as a remaining manual requirement.

## Week 12 session close 4 - final technical release

- Ten tests, type checking, lint, and the Next.js production build pass.
- Deployed the fixed release as `dpl_GwyKHBVaJi6x4QQmPu5v3bZHoRWW`; Vercel reports `READY` with no deployment protection.
- Reassigned `https://primer-peldano-mx.vercel.app` to the fixed release and verified the stop-state and core mapping in an anonymous mobile browser.
- Generated and visually inspected the Packet, preliminary Persona, and BUILDCHAT PDFs; corrected an orphaned Packet page and transcript page-break waste before finalizing them.
- Preserved the remaining manual work as explicit gaps: fresh independent persona test, employer commitment, worker consent, comparable 10:1 measurement, actual human review, and demo-video recording.
- Next decisive move: ask one real employer to accept a declared proof standard for one verified opening before a worker invests time.

## Week 12 session close 5 - dedicated account resources

- Created the public GitHub repository `davidbuzali/week-12-primer-peldano` and made it the primary `origin` for the Week 12 source.
- Created the Vercel project `davidbuzali/week-12-primer-peldano` and connected it to the dedicated GitHub repository.
- Retained the Week 9 repository and project as historical resources rather than overwriting or deleting them.
- Kept `https://primer-peldano-mx.vercel.app` as the public venture URL of record while making the Week 12 project independently visible in both account dashboards.
