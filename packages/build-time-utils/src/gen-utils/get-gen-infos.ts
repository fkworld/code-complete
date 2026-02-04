import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getGenInfos(scriptFilename: string) {
  const genBy = scriptFilename;
  const genTime = `${dayjs().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")} 北京时间`;

  const genInfos = { genBy, genTime };
  const genInfosString = JSON.stringify(genInfos, null, 2)
    .split("\n")
    .map((v) => `// ${v}`)
    .join("\n");

  return genInfosString;
}
