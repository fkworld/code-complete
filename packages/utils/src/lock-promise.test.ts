import { memoize } from "lodash-es";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { lockPromise } from "./lock-promise";
import { tryGet, tryGetAsync } from "./try-get";

describe(lockPromise.name, () => {
  const fn = vi.fn((isResolve = true) => {
    return new Promise((resolve, reject) => setTimeout(isResolve ? resolve : reject, 100));
  });

  const lockPromiseFn = lockPromise(fn);
  const memoizeFn = memoize(fn);

  beforeEach(() => {
    fn.mockClear();
  });

  it("origin", async () => {
    tryGet(() => fn(false));
    expect(fn).toHaveBeenCalledTimes(1);

    await tryGetAsync(() => fn(false));
    expect(fn).toHaveBeenCalledTimes(2);

    await fn();
    expect(fn).toHaveBeenCalledTimes(3);

    await fn();
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it(lockPromise.name, async () => {
    tryGetAsync(() => lockPromiseFn(false));
    expect(fn).toHaveBeenCalledTimes(1);

    await tryGetAsync(() => lockPromiseFn(false));
    expect(fn).toHaveBeenCalledTimes(1);

    await lockPromiseFn();
    expect(fn).toHaveBeenCalledTimes(2);

    await lockPromiseFn();
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it(memoize.name, async () => {
    tryGetAsync(() => memoizeFn(false));
    expect(fn).toHaveBeenCalledTimes(1);

    await tryGetAsync(() => memoizeFn(false));
    expect(fn).toHaveBeenCalledTimes(1);

    await memoizeFn();
    expect(fn).toHaveBeenCalledTimes(2);

    await memoizeFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
