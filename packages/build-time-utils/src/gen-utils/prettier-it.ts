import childProcess from "node:child_process";

export function prettierIt(filename: string) {
  childProcess.execSync(`pnpm exec prettier ${filename} --write --ignore-path`, { stdio: "ignore" });
}
