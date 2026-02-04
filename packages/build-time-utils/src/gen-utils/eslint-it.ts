import childProcess from "node:child_process";

export function eslintIt(filename: string) {
  childProcess.execSync(`pnpm exec eslint ${filename} --fix`, { stdio: "ignore" });
}
