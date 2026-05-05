import type { QuizQuestion } from "../types.js";

/**
 * Fisher-Yates shuffle. Supply `random()` for seeded runs in apps or tests.
 */
export function shuffleQuizQuestions<T>(
  questions: readonly T[],
  random: () => number = Math.random,
): readonly T[] {
  const copy = [...questions];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j] as T;
    copy[j] = temp as T;
  }

  return copy;
}

/** Returns a deterministic PRNG callable on [0,1) from a numeric seed (Mulberry32). */
export function createMulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return (): number => {
    t += 0x6d2b79f5;
    let q = Math.imul(t ^ (t >>> 15), 1 | t);
    q ^= q + Math.imul(q ^ (q >>> 7), 61 | q);
    return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
  };
}

/** Shuffle MN rows; optional seed yields stable order across runs. */
export function shuffleMinnesotaPracticeOrder(
  questions: readonly QuizQuestion[],
  seed?: number,
): readonly QuizQuestion[] {
  const rnd = typeof seed === "number" ? createMulberry32(seed) : Math.random;
  return shuffleQuizQuestions(questions, rnd);
}
