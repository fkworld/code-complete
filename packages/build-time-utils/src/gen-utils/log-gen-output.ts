/* eslint-disable no-console */

import chalk from "chalk";

export function logGenOutput(filename: string, startTime: number) {
  const endTime = performance.now();
  return console.log(chalk.green(`Gen ${filename} success! ${(endTime - startTime).toFixed(1)}ms`));
}
