import fs from "node:fs";
import path from "node:path";

import { getGenInfos, logGenOutput, prettierIt } from "@fkworld/build-time-utils";
import { getFileBasedRoutes } from "@fkworld/router-utils";
import { glob } from "tinyglobby";

const ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPT_FILENAME = path.relative(ROOT, import.meta.filename);
const ROUTES_DIR = path.resolve(ROOT, "./src/pages");
const OUTPUT_FILE = path.resolve(ROOT, "./src/generated/routes.ts");
const OUTPUT_FILENAME = path.relative(ROOT, OUTPUT_FILE);

main();

async function main() {
  const startTime = performance.now();

  // 使用 tinyglobby 查找所有二级目录下的 index.tsx 文件
  const fileList = await glob(["*/index.tsx", "*/*/index.tsx"], { cwd: ROUTES_DIR, onlyFiles: true });
  const fileMetaList = await glob(["*/index.meta.ts", "*/*/index.meta.ts"], { cwd: ROUTES_DIR, onlyFiles: true });

  fs.writeFileSync(
    OUTPUT_FILE,
    [
      getGenInfos(SCRIPT_FILENAME),
      "",
      await getFileBasedRoutes({
        routesDir: ROUTES_DIR,
        fileList,
        fileMetaList,
        onCalculateRoutePath: (filepath) => path.join("/", path.dirname(filepath)),
        onCalculateImportPath: (filepath) => path.join("..", "pages", path.dirname(filepath), "index"),
      }),
    ].join("\n"),
  );

  prettierIt(OUTPUT_FILE);
  logGenOutput(OUTPUT_FILENAME, startTime);
}
