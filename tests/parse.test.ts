import { describe, expect, it } from "vitest";

import {
  MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
  parseQuizQuestionArray,
} from "../src/index.js";

describe("parseQuizQuestionArray", (): void => {
  it("parses structured JSON safely", (): void => {
    const parsed = parseQuizQuestionArray([
      ...MINNESOTA_DRIVERS_QUIZ_QUESTIONS,
    ] as unknown[]);

    expect(parsed.ok).toBe(true);

    if (!parsed.ok) {
      throw new Error(JSON.stringify(parsed.error.flattened.fieldErrors));
    }

    expect(parsed.value.length).toBe(40);
  });

  it("rejects payloads with duplicate identifiers", (): void => {
    const duplicatePayload = [...MINNESOTA_DRIVERS_QUIZ_QUESTIONS];
    const pivot = duplicatePayload[39];

    if (!pivot) {
      throw new Error("Missing question clone target");
    }

    duplicatePayload[39] = { ...pivot, id: duplicatePayload[0]?.id ?? 1 };
    const parsed = parseQuizQuestionArray(duplicatePayload);
    expect(parsed.ok).toBe(false);
  });
});
