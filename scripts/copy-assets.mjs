import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

mkdirSync(join(root, "dist"), { recursive: true });

copyFileSync(
  join(root, "src", "data", "minnesota-quiz-questions.json"),
  join(root, "dist", "minnesota-quiz-questions.json"),
);
