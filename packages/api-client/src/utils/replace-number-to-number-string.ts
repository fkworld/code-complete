/* eslint-disable ts/no-explicit-any */

/**
 * 将对象中值为 number 类型的属性，替换为 number | string 类型，递归处理嵌套对象
 *
 * - 用于在接口请求中，抹平参数定义为 number 但是实际传递 string 的场景
 * - 这个场景的主要原因有 2 点：
 *    - 后端确实需要传递 number，但是前端的数据是从 url 中获取的，url 中的参数都是 string 类型
 *    - 后端虽然定义需要传递 number，但是前端数据在 js 中溢出的，只能传递 string 类型
 *
 * @example 参考单元测试文件
 */
export type ReplaceNumberToNumberStringDeep<T> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends number
          ? number | string
          : T[K] extends number | undefined
            ? number | string | undefined
            : T[K] extends Record<string, any>
              ? ReplaceNumberToNumberStringDeep<T[K]>
              : T[K];
      }
    : T;
