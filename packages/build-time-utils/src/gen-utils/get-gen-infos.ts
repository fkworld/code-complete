import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss ZZ";

export function getGenInfos(scriptFilename: string) {
  const genBy = scriptFilename;
  const genTime = dayjs().utcOffset(8).format(TIME_FORMAT) || "";

  const genInfos = { genBy, genTime };
  const genInfosString = JSON.stringify(genInfos, null, 2)
    .split("\n")
    .map((v) => `// ${v}`)
    .join("\n");

  return genInfosString;
}
