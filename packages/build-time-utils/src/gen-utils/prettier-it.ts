import childProcess from "node:child_process";

export function prettierIt(filename: string) {
  childProcess.execFileSync("pnpm", ["exec", "prettier", filename, "--write", "--ignore-path", ".prettierignore"], {
    stdio: "ignore",
  });
}
