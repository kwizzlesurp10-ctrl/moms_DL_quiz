# moms-dl-quiz

Portable Minnesota driver-knowledge toolkit born from [`Minnesota_Drivers_License_Quiz_for_Mom.html`](./Minnesota_Drivers_License_Quiz_for_Mom.html). It exposes the curated 40-question bank, SIPDE-aligned study notes, Ohio versus Minnesota comparisons, deterministic shuffling, and a `Result`-shaped grader with Zod validation for any external JSON you load at runtime.

## Features

- **MN practice bank** — 40 multiple-choice entries with explanations, synchronized with the standalone HTML course.
- **Dual module formats** — matching `import` (ESM) and `require` (CommonJS) plus published `.d.ts` typings.
- **Schema safety** — `zod` schemas for every untrusted payload path.
- **Functional scoring** — `gradePracticeQuiz` mirrors the original 80% pass convention by default.
- **Deterministic shuffles** — optional Mulberry32 seed for reproducible session ordering.
- **Structured study content** — study guide sections and comparison cards ready for React, Next.js, or CLI renderers.
- **Raw JSON export** — import `moms-dl-quiz/questions.json` for non-TypeScript consumers.

## Installation

From the npm registry (after this package has been published):

```bash
npm install moms-dl-quiz
```

From a local clone **before publishing** ([`examples/quickstart.mjs`](./examples/quickstart.mjs)):

```bash
npm install
npm run quickstart
```

## Quick start (ESM)

```typescript
import {
  gradePracticeQuiz,
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  parseQuizQuestionArray,
  shuffleMinnesotaPracticeOrder,
  STUDY_GUIDE_SECTIONS,
} from "moms-dl-quiz";

const session = shuffleMinnesotaPracticeOrder(
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  42,
);

const answers = session.map((item) => item.correct); // example: auto-fill key
const outcome = gradePracticeQuiz(session, answers);

if (!outcome.ok) {
  console.error(outcome.error);
} else {
  console.log(
    `${outcome.value.correctCount}/${outcome.value.totalQuestions} (${outcome.value.percentageRounded}%)`,
  );
}

console.log(STUDY_GUIDE_SECTIONS[0]?.title);

const parsed = parseQuizQuestionArray([
  ...MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
]);
```

## Quick start (CommonJS)

```javascript
const {
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  gradePracticeQuiz,
} = require("moms-dl-quiz");

const answers = MINNESOTA_DRIVERS_QUIZ_QUESTIONS.map((q) => q.correct);
const graded = gradePracticeQuiz(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, answers);

if (!graded.ok) {
  throw new Error(JSON.stringify(graded.error));
}

console.log(graded.value.passed);
```

## JSON subpath

Bundlers and Node 18+ can import the canonical bank without going through TypeScript:

```typescript
import bank from "moms-dl-quiz/questions.json" with { type: "json" };
```

## API surface

| Export | Role |
| --- | --- |
| `MINNESOTA_DRIVERS_QUIZ_QUESTIONS` | Readonly practice bank with runtime Zod validation |
| `parseQuizQuestionArray` / `parseQuizQuestionArrayOrThrow` | Safely ingest third-party JSON |
| `gradePracticeQuiz` | Score + pass/fail + per-question feedback |
| `shuffleQuizQuestions` / `shuffleMinnesotaPracticeOrder` | Random or seeded ordering |
| `createMulberry32` | Tiny deterministic RNG helper |
| `STUDY_GUIDE_SECTIONS` / `SIPDE_SUMMARY_TEXT` | Study guide payloads |
| `OHIO_VERSUS_MINNESOTA_CARDS` | Structured OH/MN deltas |
| `QuizQuestionSchema` / `QuizQuestionArraySchema` | Embed the same schemas in your API layer |
| `ok` / `err` / `Result` | Lightweight `Result` ADT for composition |

Supporting constants (`PASS_PERCENTAGE_THRESHOLD`, `BUNDLED_QUESTION_COUNT`, `MIN_CORRECT_SCORE_FOR_PASS_AT_DEFAULT_COUNT`, `DRIVER_MANUAL_SOURCE_LABEL`) keep UI copy aligned with the original landing page footers.

## Standalone HTML experience

Double-click [`Minnesota_Drivers_License_Quiz_for_Mom.html`](./Minnesota_Drivers_License_Quiz_for_Mom.html) for the zero-install Tailwind + Font Awesome experience—the npm package complements that UX for integrators who need programmable access.

## Deploy to Vercel

This repo is configured as a **static** site: [`vercel.json`](./vercel.json) maps `/` to [`Minnesota_Drivers_License_Quiz_for_Mom.html`](./Minnesota_Drivers_License_Quiz_for_Mom.html) and skips a real `npm install` / build on Vercel (the quiz loads Tailwind/fonts from CDNs).

1. Push to GitHub, then **Import Project** at [vercel.com/new](https://vercel.com/new) (framework: **Other**), or deploy from CLI after `npx vercel login`:

   ```bash
   npm run vercel:prod
   ```

2. Prefer Git-backed deploys so every `git push` updates production.

## Contributing

Issues and PRs welcome in [`moms_DL_quiz`](https://github.com/kwizzlesurp10-ctrl/moms_DL_quiz). Match the formatter (`npm run format`) plus strict lint/tests (`npm run prepublishOnly`) before sending changes.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run build` | `tsup` dual build + copies JSON artifact |
| `npm test` | `vitest run` regression suite |
| `npm run lint` | ESLint (type-checked) |
| `npm run pack:dry-run` | Inspect tarball contents |
| `npm run vercel:deploy` | Preview deploy (`npx vercel`) |
| `npm run vercel:prod` | Production deploy (`npx vercel --prod`) |

## License

MIT © KeefTeef10 — see [`LICENSE`](./LICENSE).

## Disclaimer

Driving laws, fines, and manual guidance change—always corroborate with [Minnesota DPS](https://dps.mn.gov/) before relying on archived practice material.
