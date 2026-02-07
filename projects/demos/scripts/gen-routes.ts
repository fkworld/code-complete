import fs from "node:fs";
import path from "node:path";

import { ROUTES } from "@/router/routes";

import { getGenInfos, logGenOutput, prettierIt } from "../../../packages/build-time-utils/src/main";

const ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPT_FILENAME = path.relative(ROOT, import.meta.filename);
const OUTPUT_FILE = path.resolve(ROOT, "./src/generated/routes.ts");
const OUTPUT_FILENAME = path.relative(ROOT, OUTPUT_FILE);

main();

async function main() {
  const startTime = performance.now();

  const allRoutes = Object.entries(ROUTES).map(([path, route]) => {
    return { path, ...route };
  });
  const allRoutesInfos = allRoutes.map((route) => {
    return {
      path: route.path,
    };
  });

  fs.writeFileSync(
    OUTPUT_FILENAME,
    [
      getGenInfos(SCRIPT_FILENAME),
      "",
      "/** 路由地址类型  */",
      'export type Routes = typeof ROUTES_INFOS[number]["path"]',
      "",
      "/** 路由参数类型 */",
      "export type RoutesParams = {",
      ...allRoutes
        .map((route) => {
          if (!route.meta?.pageParams) {
            return undefined;
          }
          return `"${route.path}": {
            ${Object.entries(route.meta.pageParams)
              .map(([key, value]) => {
                if (!value) {
                  return `"${key}"?: string;`;
                } else {
                  return `/** ${value} */\n"${key}"?: string;`;
                }
              })
              .join("\n")}
          }`;
        })
        .filter((v) => !!v),
      "}",
      "",
      "/** 完整路由表 */",
      `export const ROUTES_INFOS = ${JSON.stringify(allRoutesInfos, null, 2)} as const`,
    ].join("\n"),
  );
  prettierIt(OUTPUT_FILE);
  logGenOutput(OUTPUT_FILENAME, startTime);
}

export interface RoutesParams {}
