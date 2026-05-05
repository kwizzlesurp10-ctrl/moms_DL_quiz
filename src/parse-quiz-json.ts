import { z } from "zod";

import { err, ok, type Result } from "./result.js";
import { QuizQuestionArraySchema, type QuizQuestionParseFailure } from "./schemas.js";
import type { QuizQuestion } from "./types.js";

/**
 * Validates untrusted quiz JSON from disk, APIs, clipboard, etc.
 */
export function parseQuizQuestionArray(
  input: unknown,
): Result<readonly QuizQuestion[], QuizQuestionParseFailure> {
  const parsed = QuizQuestionArraySchema.safeParse(input);

  if (!parsed.success) {
    return err(failureFromZodError(parsed.error));
  }

  return uniqueQuestionIds(parsed.data)
    ? ok(parsed.data)
    : err(customFailure("Duplicate `id` values are not allowed."));
}

export function parseQuizQuestionArrayOrThrow(input: unknown): readonly QuizQuestion[] {
  const r = parseQuizQuestionArray(input);
  if (r.ok) {
    return r.value;
  }
  throw new z.ZodError([...r.error.errors]);
}

export function assertBundledQuizArray(input: unknown): readonly QuizQuestion[] {
  const r = parseQuizQuestionArray(input);
  if (r.ok) {
    return r.value;
  }
  throw new Error(
    `Bundled MN quiz failed validation: ${JSON.stringify(r.error.flattened, null, 2)}`,
  );
}

function failureFromZodError(error: z.ZodError): QuizQuestionParseFailure {
  return { errors: error.issues, flattened: error.flatten() };
}

function customFailure(message: string): QuizQuestionParseFailure {
  const error = new z.ZodError([
    {
      code: z.ZodIssueCode.custom,
      message,
      path: [],
    },
  ]);
  return { errors: error.issues, flattened: error.flatten() };
}

function uniqueQuestionIds(rows: readonly QuizQuestion[]): boolean {
  const idSet = new Set(rows.map((q) => q.id));
  return idSet.size === rows.length;
}
