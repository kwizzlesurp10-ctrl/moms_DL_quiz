import { describe, expect, it } from "vitest";

import rawJson from "../src/data/minnesota-quiz-questions.json" with { type: "json" };
import {
  BUNDLED_QUESTION_COUNT,
  MIN_CORRECT_SCORE_FOR_PASS_AT_DEFAULT_COUNT,
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  PASS_PERCENTAGE_THRESHOLD,
  shuffleMinnesotaPracticeOrder,
} from "../src/index.js";

describe("bundled MN question bank", (): void => {
  it("contains the expected MN practice cardinality", (): void => {
    expect(MINNESOTA_DRIVERS_QUIZ_QUESTIONS.length).toBe(BUNDLED_QUESTION_COUNT);

    expect(MINNESOTA_DRIVERS_QUIZ_QUESTIONS.length).toBe(40);

    expect(MIN_CORRECT_SCORE_FOR_PASS_AT_DEFAULT_COUNT).toBe(32);
    expect(PASS_PERCENTAGE_THRESHOLD).toBe(80);
  });

  it("keeps deterministic shuffle order pinned for seed regression", (): void => {
    const seeded = shuffleMinnesotaPracticeOrder(
      MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
      4242,
    );

    const again = shuffleMinnesotaPracticeOrder(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, 4242);

    expect(seeded.map((q): number => q.id)).toEqual(again.map((q): number => q.id));

    expect(seeded.map((q): number => q.id)).not.toEqual(
      MINNESOTA_DRIVERS_QUIZ_QUESTIONS.map((q): number => q.id),
    );
  });

  it("exposes verbatim JSON mirrored on disk export", (): void => {
    expect(JSON.stringify(MINNESOTA_DRIVERS_QUIZ_QUESTIONS)).toBe(
      JSON.stringify(rawJson),
    );
  });
});
