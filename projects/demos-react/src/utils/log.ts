import { createLogClient, LogLevelValues } from "@fkworld/log-client";

export const { logClient } = createLogClient<"SETUP" | "PAGE">({
  defaultLogLevel: LogLevelValues.info,
});
