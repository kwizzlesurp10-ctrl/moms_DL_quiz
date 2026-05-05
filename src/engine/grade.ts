import { PASS_PERCENTAGE_THRESHOLD } from "../constants.js";
import { err, ok, type Result } from "../result.js";
import type { QuestionGradeDetail, QuizGradeResult, QuizQuestion } from "../types.js";

export type GradePracticeQuizError =
  | Readonly<{
      kind: "answer_length_mismatch";
      expectedQuestions: number;
      actualAnswers: number;
    }>
  | Readonly<{
      kind: "invalid_option_index";
      questionIndex: number;
      questionId: number;
      selectedIndex: number;
      optionCount: number;
    }>;

/**
 * Computes score, percentage, pass/fail, and per-question explanations.
 */
export function gradePracticeQuiz(
  questions: readonly QuizQuestion[],
  answers: readonly (number | null | undefined)[],
  options?: Readonly<{ passingPercentageThreshold?: number }>,
): Result<QuizGradeResult, GradePracticeQuizError> {
  if (answers.length !== questions.length) {
    return err({
      kind: "answer_length_mismatch",
      expectedQuestions: questions.length,
      actualAnswers: answers.length,
    });
  }

  const passingPct =
    typeof options?.passingPercentageThreshold === "number" &&
    Number.isFinite(options.passingPercentageThreshold)
      ? Math.min(100, Math.max(0, Math.round(options.passingPercentageThreshold)))
      : PASS_PERCENTAGE_THRESHOLD;

  const minimumCorrectToPass = Math.ceil((passingPct / 100) * questions.length);

  let correctCount = 0;
  let answeredCount = 0;

  const perQuestion: QuestionGradeDetail[] = [];

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (question === undefined) {
      throw new Error(`Invariant failed: missing question at index ${String(i)}`);
    }

    const raw = answers[i];
    let selected: number | null = null;

    if (typeof raw === "number" && !Number.isNaN(raw)) {
      const isWhole = Number.isInteger(raw);
      const within = raw >= 0 && raw < question.options.length;

      if (!isWhole || !within) {
        return err({
          kind: "invalid_option_index",
          questionIndex: i,
          questionId: question.id,
          selectedIndex: raw,
          optionCount: question.options.length,
        });
      }

      answeredCount++;

      selected = raw;

      if (selected === question.correct) {
        correctCount++;
      }
    }

    const isCorrect = selected !== null && selected === question.correct;

    perQuestion.push({
      questionId: question.id,
      prompt: question.q,
      selectedOptionIndex: selected,
      correctOptionIndex: question.correct,
      isCorrect,
      options: question.options,
      explanation: question.explanation,
    });
  }

  const percentageRounded = Math.round((correctCount / questions.length) * 100);

  return ok({
    totalQuestions: questions.length,
    answeredCount,
    correctCount,
    percentageRounded,
    passingPercentageThreshold: passingPct,
    minimumCorrectToPass,
    passed: correctCount >= minimumCorrectToPass,
    perQuestion,
  });
}
