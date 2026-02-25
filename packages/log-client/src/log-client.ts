/* eslint-disable no-console */

export const LogLevelValues = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const;

type LogLevel = (typeof LogLevelValues)[keyof typeof LogLevelValues];

const LogMethods = {
  [LogLevelValues.debug]: (...values: unknown[]) => console.debug(...values),
  [LogLevelValues.info]: (...values: unknown[]) => console.info(...values),
  [LogLevelValues.warn]: (...values: unknown[]) => console.warn(...values),
  [LogLevelValues.error]: (...values: unknown[]) => console.error(...values),
};

interface CreateLogClientOptions {
  defaultLogLevel: LogLevel;
}

type LogMethodWithModule<TLogModule extends string> = (logModule: TLogModule, ...values: unknown[]) => void;

interface LogClientReturns<TLogModule extends string> {
  debug: LogMethodWithModule<TLogModule>;
  info: LogMethodWithModule<TLogModule>;
  warn: LogMethodWithModule<TLogModule>;
  error: LogMethodWithModule<TLogModule>;
}

interface CreateLogClientReturns<TLogModule extends string> {
  logClient: LogClientReturns<TLogModule>;
}

export function createLogClient<TLogModule extends string>(
  options: CreateLogClientOptions,
): CreateLogClientReturns<TLogModule> {
  const { defaultLogLevel } = options;

  function log(logLevel: LogLevel, logModule: TLogModule, ...values: unknown[]): void {
    if (logLevel < defaultLogLevel) {
      return;
    }

    LogMethods[logLevel](`[${logModule}]`, ...values);
  }

  return {
    logClient: {
      debug: (logModule, ...values) => log(LogLevelValues.debug, logModule, ...values),
      info: (logModule, ...values) => log(LogLevelValues.info, logModule, ...values),
      warn: (logModule, ...values) => log(LogLevelValues.warn, logModule, ...values),
      error: (logModule, ...values) => log(LogLevelValues.error, logModule, ...values),
    },
  };
}
