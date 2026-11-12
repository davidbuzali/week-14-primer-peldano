# Week 14 testing log - Primer Peldaño

**Test date:** 12 November 2026, America/Mexico_City

## Week 14 mechanical pass

- 31 Node tests cover inherited evidence boundaries, pricing formulas, evidence-status verdicts, local scenario storage, corrupt-data recovery, export/import validation, and Week 14 source contracts.
- TypeScript strict checking, ESLint with zero warnings, and the Next.js production build pass.
- Deployment 1 shipped the working calculator before the scenario library.
- The final production URL returned HTTP 200 and exposed the critical `Umbral 10:1 no demostrado`, `Solo en este dispositivo`, and headline text.
- A live 390 x 844 browser check returned `innerWidth = 390`, `documentElement.scrollWidth = 390`, and `body.scrollWidth = 390`; no horizontal overflow was present.

### Defect found and fixed

The first corrupt-storage test found that one malformed local object could hide every valid saved scenario because validation threw while filtering the array. Per-record exception handling now rejects only the malformed object and preserves valid scenarios. The regression test passes, the 20-scenario cap remains enforced, and invalid top-level data still fails safely.

### Evidence not yet claimed

The fresh persona walkthrough and real budget-owner conversation remain pending. No accepted price, measured 10:1 result, profitability result, or hiring outcome is claimed.

---

## Inherited Week 13 record

**Test date:** 7 November 2026, America/Mexico_City

**URL of record:** https://week-13-primer-peldano.vercel.app

**GitHub:** https://github.com/davidbuzali/week-13-primer-peldano

**Deployment 1:** `week-13-primer-peldano-2gzeg2rdn-davidbuzali.vercel.app`

**Deployment 2:** `week-13-primer-peldano-7k9dfujcs-davidbuzali.vercel.app`

## Automated mechanical pass

- 20 Node tests passed, zero failed.
- TypeScript completed with no errors.
- ESLint completed with zero warnings.
- The Next.js production build completed and statically prerendered `/`.
- A tracked-source scan found no API key, service-role key, private key, or populated secret variable.

The suite covers input limits, sensitive-looking text, deterministic mapping, the adversarial keyword case, absence of aggregate scoring, local event allow-lists, forbidden metadata, local feedback validation, the five boundary checks, reset behavior contracts, Supabase RLS, and Vercel configuration.

## Deployment 1

Vercel created the separate `davidbuzali/week-13-primer-peldano` project, connected it to the separate GitHub repository, produced a ready production deployment, and assigned the stable URL of record. An anonymous browser loaded the real-use stop-state without login.

The live task then opened the invented demo, selected the keyword-stuffed case, produced four `Coincidencia de términos` states, displayed the explicit insufficiency warning, and revealed the five boundary checks plus local feedback form.

## Required defect found

**Defect:** `Borrar y reiniciar sesión` cleared `localStorage` but did not clear the feedback component's in-memory draft. A note such as `Dudé aquí.` remained visibly present after reset.

**Why it mattered:** the control promised to erase and restart the local session. Leaving a free-text note on screen violated that expectation and could expose the prior participant's words to the next participant on a shared device.

**Fix:** bind the feedback component's identity to the anonymous session ID. Resetting creates a new session ID, remounts the feedback form, and clears all in-memory answers and note text. The local-log disclosure now also distinguishes event metadata from the optional feedback note: events exclude the note, while a user-initiated export includes saved feedback so the participant can choose whether to share it.

**Regression:** on deployment 2, the browser entered `Dudé aquí.`, selected `Borrar y reiniciar sesión`, and read the note field as an empty string. The visible event count returned to one.

## Responsive production pass

The fixed production alias was tested at a 390 x 844 viewport. `documentElement.scrollWidth`, `documentElement.clientWidth`, and `body.scrollWidth` were all exactly 390 pixels. The comprehension cards, radio controls, and text remained readable without horizontal overflow.

## Security floor

| Check | Result |
|---|---|
| No secrets in code or repository | Pass. Public Supabase variables are blank; no service-role key exists. |
| Authentication for personal data | Not applicable to the public fictional demo; it accepts no real identity and sends no records. |
| Supabase RLS | Pass for the inactive future table: RLS is enabled and policies require `auth.uid() = owner_id`. |
| Input validation | Pass: required text, length limits, sensitive-looking evidence, optional-note length, and sensitive-looking feedback are checked. |
| No real personal data | Pass: all displayed people, employers, vacancies, commitments, and records are invented and labeled. |
| Analytics minimization | Pass: allow-listed categorical events only; no evidence text, note, IP, browser, device, name, email, or phone in the event stream. |

## Real-human and persona passes

Not yet completed. The course requires five relevant outsiders, at least three strangers, under the predeclared ten-minute protocol, plus a fresh independent-chat synthetic persona walkthrough. These outcomes require human participation and must not be backfilled from developer QA. The session sheet in `docs/FIVE_USER_SESSION_LOG.md` is ready for honest completion.
