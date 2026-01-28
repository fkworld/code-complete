/* eslint-disable ts/no-explicit-any */

/**
 * 锁定 Promise，防止多次调用
 * - 会返回一个新的 Promise，在 Promise 未结束前，此 Promise 只有一个实例
 * - 与 lodash.memoize 的区别是，memoize 会自始自终缓存，lockPromise 只会在 promise 执行期间缓存
 *
 * ! 如果 Promise reject 了，会被忽略
 */
export function lockPromise<T extends (...args: Array<any>) => Promise<any>>(fn: T): T {
  let lockedPromise: Promise<ReturnType<T>> | undefined;

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (!lockedPromise) {
      lockedPromise = fn(...args).finally(() => {
        lockedPromise = undefined;
      });
    }
    return lockedPromise;
  }) as T;
}
