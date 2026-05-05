import rawQuiz from "./data/minnesota-quiz-questions.json" with { type: "json" };
import { assertBundledQuizArray } from "./parse-quiz-json.js";

/** Official practice bank extracted from `Minnesota_Drivers_License_Quiz_for_Mom.html`. */
export const MINNESOTA_DRIVERS_QUIZ_QUESTIONS = assertBundledQuizArray(rawQuiz);
