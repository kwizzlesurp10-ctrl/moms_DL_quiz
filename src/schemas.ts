import { z } from "zod";

import type { QuizQuestion } from "./types.js";

/** Zod schema for a single `{ id, q, options, correct, explanation }` item. */
export const QuizQuestionSchema: z.ZodType<QuizQuestion> = z
  .object({
    id: z.number().int().positive(),
    q: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    correct: z.number().int().min(0),
    explanation: z.string().min(1),
  })
  .strict()
  .superRefine((row, ctx) => {
    if (row.correct >= row.options.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "`correct` must be an index within `options`.",
      });
    }
  });

/** Validates an exported JSON question bank array. */
export const QuizQuestionArraySchema = z.array(QuizQuestionSchema).min(1);

export type QuizQuestionParseFailure = Readonly<{
  errors: readonly z.ZodIssue[];
  flattened: Readonly<ReturnType<z.ZodError["flatten"]>>;
}>;
