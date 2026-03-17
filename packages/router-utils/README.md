# @fkworld/router-utils

一个围绕「严格的路由管理」思想构建的运行时工具包，专注于 React Router 的导航能力与类型安全。

## 核心价值

- **类型友好的导航**：`createRouterUtils` 提供带有路径与 search 参数泛型的 `navigateTo`/`navigateBack`、`getRoutePath`、`getRouteSearchParams`，让各页面之间的跳转在 TypeScript 层面就能捕捉错误。
- **与生成链解耦**：路由文件扫描与代码生成已经迁到 `@fkworld/build-time-utils`，这里不再携带 `ts-morph` 之类的构建期依赖。

## 典型工程流程

1. 在构建脚本中使用 `@fkworld/build-time-utils` 生成与文件路径对齐的路由文件。
2. 把生成的 `ROUTES` 导入到路由入口文件，作为 `createBrowserRouter` 的配置。
3. 在业务模块中使用 `createRouterUtils` 提供的跳转/参数读写方法，保持泛型安全。

```ts
import { createRouterUtils } from "@fkworld/router-utils";
```

路由生成逻辑已经迁到 `@fkworld/build-time-utils`，`router-utils` 本身只保留运行时能力。

这样可以在构建阶段就锁定所有路径，运行时的跳转也有保障。
