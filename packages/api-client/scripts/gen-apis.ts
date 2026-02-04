import fs from "node:fs";
import path from "node:path";

import { getGenInfos, logGenOutput, prettierIt } from "@fkworld/build-time-utils";
import { camelCase, kebabCase, upperFirst } from "lodash-es";
import openapiTS from "openapi-typescript";

interface ApiConfig {
  name: string;
  url: string;
  description: string;
}

const ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPT_FILENAME = path.relative(ROOT, import.meta.filename);
const INPUTS: Array<ApiConfig> = [
  {
    name: "petStore",
    url: "https://petstore.swagger.io/v2/swagger.json",
    description: "https://petstore.swagger.io/",
  },
];

main();

async function main() {
  for (const apiConfig of INPUTS) {
    await genApiDefines(apiConfig);
  }
  await genApiDefinesExport(INPUTS);
}

async function genApiDefines(apiConfig: ApiConfig) {
  const startTime = performance.now();
  const ast = await openapiTS(apiConfig.url);
  const outputFile = path.resolve(ROOT, `./src/generated/apis/api-${kebabCase(apiConfig.name)}.ts`);
  const outputFileName = path.relative(ROOT, outputFile);

  fs.writeFileSync(outputFile, [getGenInfos(SCRIPT_FILENAME), ast].join("\n"));
  logGenOutput(outputFileName, startTime);
}

async function genApiDefinesExport(apiConfigs: Array<ApiConfig>) {
  const startTime = performance.now();
  const outputFile = path.resolve(ROOT, `./src/generated/apis/api-defines.ts`);
  const outputFileName = path.relative(ROOT, outputFile);
  fs.writeFileSync(
    outputFile,
    [
      getGenInfos(SCRIPT_FILENAME),
      ...apiConfigs.map((apiConfig) => {
        const exportName = upperFirst(camelCase(`Api ${apiConfig.name} Defines`));
        return `export type { paths as ${exportName} } from "./api-${kebabCase(apiConfig.name)}.ts"`;
      }),
    ].join("\n"),
  );
  prettierIt(outputFileName);
  logGenOutput(outputFileName, startTime);
}
