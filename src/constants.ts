/** Mirrors the bundled practice set shipped with this package. */
export const BUNDLED_QUESTION_COUNT = 40;

/** Minnesota knowledge test convention used in-app copy: need 80% correct. */
export const PASS_PERCENTAGE_THRESHOLD = 80;

export const MIN_CORRECT_SCORE_FOR_PASS_AT_DEFAULT_COUNT = Math.ceil(
  (PASS_PERCENTAGE_THRESHOLD / 100) * BUNDLED_QUESTION_COUNT,
);

export const DRIVER_MANUAL_SOURCE_LABEL =
  "Minnesota Department of Public Safety • drive.mn.gov";
