# Primer Peldaño - Week 14

Primer Peldaño Week 14 adds **La tarifa en vivo**, a local-only employer pricing calculator for a bounded five-review pilot. It compares like-for-like current effort with the proposed price, separates buyer value from provider economics, labels every input measured, quoted, or assumed, and can explicitly report that the 10:1 threshold is not demonstrated.

- Live URL: https://week-14-primer-peldano.vercel.app
- GitHub: https://github.com/davidbuzali/week-14-primer-peldano
- Vercel project: https://vercel.com/davidbuzali/week-14-primer-peldano
- Product charter: `docs/PRODUCT_CHARTER.md`
- Packet-before-code: `docs/PACKET.md`
- Implementation prompt: `docs/IMPLEMENTATION_PROMPT.md`
- Mechanical testing and two-deploy cycle: `docs/TESTING.md`
- Preliminary persona record: `docs/PERSONA.md`
- Demo narration: `docs/DEMO_SCRIPT.md`
- Full visible build conversation: `docs/BUILDCHAT.md`

## Status honesty

The public flow uses invented people, employer, vacancy, commitment, and evidence. It stores an anonymous allow-listed event log and bounded feedback only in the visitor's browser. Nothing is sent to an employer or analytics service, and the visitor can inspect, download, or reset the local session.

The Week 13 technical milestone is shipped: a visitor can enter the fictional demo, compare honest term-match states, confront a keyword-stuffed counterexample, answer five boundary checks, leave local feedback, and export the session. The first production release exposed a reset defect; the second release fixes it and passed the exact regression plus a 390 x 844 responsive check.

The venture milestone remains incomplete. Five real-user sessions, including at least three strangers, have not yet occurred; the fresh independent-chat persona pass, real employer commitment, worker consent, comparable 10:1 measurement, and human hiring review also remain unverified. This repository does not invent those results.

## Separate Week 13 resources

This repository, GitHub project, and Vercel project are separate from Week 12. The earlier `week-12-primer-peldano` repository and deployment remain intact.

## Stack

- Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- deterministic visible-text term matching
- typed local event log with allow-listed metadata
- five comprehension checks and bounded local feedback
- optional Supabase boundary with owner-scoped RLS, inactive in the public demo
- GitHub source and Vercel production hosting

## Local verification

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Verified on 7 November 2026: 20 tests passed; type checking, lint, and the production build passed; the live URL loaded anonymously; and mobile `scrollWidth` equaled `clientWidth` at 390 pixels.

## Submission artifacts

- `output/pdf/PACKET_David_Buzali.pdf`
- `output/pdf/PERSONA_David_Buzali.pdf`
- `output/pdf/BUILDCHAT_David_Buzali.pdf`

The persona PDF is deliberately labeled preliminary until the fresh independent-chat walkthrough is completed. The demo video and five real-user session evidence require manual human participation and are listed in `docs/SUBMISSION_CHECKLIST.md`.
