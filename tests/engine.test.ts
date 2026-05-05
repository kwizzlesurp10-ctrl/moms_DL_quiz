import { describe, expect, it } from "vitest";

import { gradePracticeQuiz, MINNESOTA_DRIVERS_QUIZ_QUESTIONS } from "../src/index.js";

describe("gradePracticeQuiz", (): void => {
  it("awards perfect marks when responses match keyed answers", (): void => {
    const selections = MINNESOTA_DRIVERS_QUIZ_QUESTIONS.map(
      (prompt): number => prompt.correct,
    );

    const graded = gradePracticeQuiz(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, selections);

    if (!graded.ok) {
      throw new Error(JSON.stringify(graded.error));
    }

    expect(graded.value.correctCount).toBe(40);

    expect(graded.value.percentageRounded).toBe(100);

    expect(graded.value.passed).toBe(true);

    expect(graded.value.answeredCount).toBe(40);
  });

  it("computes misses, unanswered slots, and custom pass thresholds", (): void => {
    const blanks = MINNESOTA_DRIVERS_QUIZ_QUESTIONS.map((): number | null => null);

    const graded = gradePracticeQuiz(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, blanks, {
      passingPercentageThreshold: 0,
    });

    if (!graded.ok) {
      throw new Error(JSON.stringify(graded.error));
    }

    expect(graded.value.correctCount).toBe(0);

    expect(graded.value.answeredCount).toBe(0);

    expect(graded.value.passed).toBe(true);

    const gradedStrict = gradePracticeQuiz(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, blanks, {
      passingPercentageThreshold: 81,
    });

    if (!gradedStrict.ok) {
      throw new Error(JSON.stringify(gradedStrict.error));
    }

    expect(gradedStrict.value.passed).toBe(false);
  });

  it("rejects malformed option selections", (): void => {
    const badSelections = MINNESOTA_DRIVERS_QUIZ_QUESTIONS.map((): number => 99);

    const graded = gradePracticeQuiz(MINNESOTA_DRIVERS_QUIZ_QUESTIONS, badSelections);

    expect(graded.ok).toBe(false);

    if (graded.ok) {
      throw new Error("Unexpected success");
    }

    expect(graded.error.kind).toBe("invalid_option_index");
  });
});
