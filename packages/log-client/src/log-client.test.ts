/* eslint-disable no-console */

import { afterEach, describe, expect, it, vi } from "vitest";

import { createLogClient, LogLevelValues } from "./log-client";

const originalConsoleDebug = console.debug;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

afterEach(() => {
  console.debug = originalConsoleDebug;
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
  vi.resetModules();
  vi.restoreAllMocks();
});

describe("createLogClient", () => {
  it("should respect defaultLogLevel", () => {
    const debugMock = vi.fn();
    const infoMock = vi.fn();
    const warnMock = vi.fn();
    const errorMock = vi.fn();

    console.debug = debugMock;
    console.info = infoMock;
    console.warn = warnMock;
    console.error = errorMock;

    const { logClient } = createLogClient<"auth">({
      defaultLogLevel: LogLevelValues.warn,
    });

    logClient.debug("auth", "debug message");
    logClient.info("auth", "info message");
    logClient.warn("auth", "warn message");
    logClient.error("auth", "error message");

    expect(debugMock).not.toHaveBeenCalled();
    expect(infoMock).not.toHaveBeenCalled();
    expect(warnMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(warnMock).toHaveBeenCalledWith("[auth]", "warn message");
    expect(errorMock).toHaveBeenCalledWith("[auth]", "error message");
  });
});
