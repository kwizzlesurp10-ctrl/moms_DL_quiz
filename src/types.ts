/** One multiple-choice practice question aligned with the Minnesota driver's manual quiz style. */
export interface QuizQuestion {
  readonly id: number;
  readonly q: string;
  readonly options: readonly string[];
  readonly correct: number;
  readonly explanation: string;
}

/** Per-question grading detail after submission. */
export interface QuestionGradeDetail {
  readonly questionId: number;
  readonly prompt: string;
  readonly selectedOptionIndex: number | null;
  readonly correctOptionIndex: number;
  readonly isCorrect: boolean;
  readonly options: readonly string[];
  readonly explanation: string;
}

/** Full quiz result computed from prompts and learner answers (null = unanswered). */
export interface QuizGradeResult {
  readonly totalQuestions: number;
  readonly answeredCount: number;
  readonly correctCount: number;
  readonly percentageRounded: number;
  readonly passingPercentageThreshold: number;
  readonly minimumCorrectToPass: number;
  readonly passed: boolean;
  readonly perQuestion: readonly QuestionGradeDetail[];
}

export interface StudyGuideSection {
  readonly id: string;
  readonly title: string;
  readonly bullets: readonly string[];
}

/** Ohio-vs-Minnesota study cards (relocating drivers). */
export interface ComparisonCard {
  readonly id: string;
  readonly title: string;
  readonly paragraphsHtml: readonly string[];
}
