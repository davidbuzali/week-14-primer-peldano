# Week 14 persona-test packet - Primer Peldaño

**Date prepared:** 12 November 2026

**Status:** Ready to run; not yet completed in a fresh independent chat.

## Integrity note

This document prepares the required Layer 1 synthetic persona test. It does not attribute reactions, confusion, completion, or approval to a persona who has not actually been run in a fresh chat. The live product and screen order have been verified, but the persona result and usability fix remain incomplete until the independent transcript exists.

## Synthetic persona

**Laura Medina (invented), 43, Ecatepec, Estado de México.** Laura owns a 35-person metal-parts workshop. She handles operations and hiring with spreadsheets, WhatsApp, and help from her accountant. She can read financial statements but distrusts HR software and sales calculators. She reviews products on her phone, reads slowly, and abandons a tool when it mixes cash cost with speculative value or hides how a result was calculated. She will not enter applicant names into an unfamiliar website.

Laura is not a real payer and contains no real person's information.

## Required fresh-chat prompt

> You are Laura Medina, an invented 43-year-old owner of a 35-person metal-parts workshop in Ecatepec. You manage hiring with spreadsheets and WhatsApp, understand ordinary business costs, distrust HR software and ROI calculators, and review this product on a phone. You stop when assumptions are hidden, when cash cost is mixed with speculative value, or when a tool appears to request applicant data. I will show you Primer Peldaño one screen at a time. Attempt to decide whether a five-review pilot is worth discussing. Narrate what you think every number means, which fields you can answer, which words confuse you, what you fear, and the exact point where you would leave. Do not be polite and do not invent capabilities that are not visible.

## Screen sequence

1. Open `https://week-14-primer-peldano.vercel.app` at a phone-sized viewport. Show the headline and boundary card before scrolling.
2. Show `Proceso actual` and ask Laura which five-review baseline fields she can answer without help.
3. Show `Oferta del piloto` and `Costo de entrega`; ask who each cost belongs to.
4. Show `Valor comparable`; ask Laura to explain what she would include and exclude.
5. Show the result cards, 8.3:1 ratio, and `Umbral 10:1 no demostrado`; ask whether the verdict feels honest.
6. Change one value and its evidence status; ask Laura to predict what should change before observing the result.
7. Save, reopen, duplicate, and delete an invented scenario; ask what she believes left the device.
8. Show print and JSON export; ask which artifact she would take to a budget meeting.

## Pass boundaries

- Laura understands that every default number is invented and not an accepted price or measured return.
- She distinguishes employer purchase cost, employer value, provider delivery cost, and provider contribution.
- She understands that 10:1 can be mathematically reached while remaining assumption-dependent.
- She enters no applicant or worker information.
- She understands that saved scenarios remain on the current device unless she deliberately exports them.
- She can identify the next evidence needed before a purchase discussion.

## Pre-test risk register

| Priority | Risk to test | Consequence | Existing safeguard |
|---|---|---|---|
| 1 | `Otro valor comparable` is too abstract | User invents a large number to make the ratio pass | Evidence status, formula disclosure, failed default, note field |
| 2 | Provider delivery cost is mistaken for employer price | Budget conversation uses the wrong denominator | Separate cards and headings |
| 3 | Green or a ratio over 10 feels like proof | Speculative benefit becomes a sales claim | `Solo con supuestos` verdict |
| 4 | Save appears to send data to Primer Peldaño | Employer avoids the tool or discloses data unknowingly | `Solo en este dispositivo` beside results and save controls |
| 5 | Mobile input density causes abandonment | User never reaches the verdict | One-column responsive layout and bounded fields |

## Observation log to complete in the fresh chat

| Screen | Persona interpretation | Hesitation or unknown word | Would continue? | Consequence |
|---|---|---|---|---|
| Boundary card | Pending | Pending | Pending | Pending |
| Current process | Pending | Pending | Pending | Pending |
| Pilot and delivery cost | Pending | Pending | Pending | Pending |
| Comparable value | Pending | Pending | Pending | Pending |
| Verdict | Pending | Pending | Pending | Pending |
| Saved scenarios | Pending | Pending | Pending | Pending |

## Completion requirement

Run the prompt in a fresh independent chat, show the screens in order, preserve every hesitation, select the highest-consequence confusion, change the product, rerun the affected step, and replace the pending rows with actual synthetic observations. Until then, `PERSONA_David_Buzali.pdf` must remain visibly labeled **ready to run - incomplete**.
