/**
 * Mirrors README "Quick start (ESM)". Run from repo: `npm run quickstart`.
 * Imports `./dist/` so publishing to npm first is optional.
 */

import {
  gradePracticeQuiz,
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  parseQuizQuestionArray,
  shuffleMinnesotaPracticeOrder,
  STUDY_GUIDE_SECTIONS,
} from "../dist/index.mjs";

const session = shuffleMinnesotaPracticeOrder(
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  42,
);

const answers = session.map((item) => item.correct);

const outcome = gradePracticeQuiz(session, answers);

if (!outcome.ok) {
  console.error(outcome.error);

  process.exitCode = 1;
} else {
  console.log(
    `${String(outcome.value.correctCount)}/${String(outcome.value.totalQuestions)} (${String(outcome.value.percentageRounded)}%)`,
  );
}

console.log(STUDY_GUIDE_SECTIONS[0]?.title ?? "");

/** Simulates validating JSON you fetched elsewhere (reuse bundled bank payload). */
const parsed = parseQuizQuestionArray([
  ...MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
]);

if (parsed.ok) {
  console.log(
    `parseQuizQuestionArray: validated ${String(parsed.value.length)} rows`,
  );
} else {
  console.error(parsed.error.flattened);
  process.exitCode = 1;
}
