# @fkworld/router-utils

一个围绕「严格的路由管理」思想构建的工具包，配合 ts-morph 的代码生成链和 React Router 的导航能力，帮助项目在编译阶段就确认路由结构、在运行时保持类型安全。

## 核心价值

- **文件系统驱动**：通过 `getFileBasedRoutes` 生成的 `ROUTES` 常量强制使用一级/二级 layout 架构，入口路径与文件路径一一对应，避免手写路由表时的遗漏和错配。
- **Meta 参数定义可生成**：支持从路由对应的 meta 文件中读取 `RouteSearchParams` 定义，统一生成 `RouteSearchParamsAll`，把每个路径的 search 参数约束收敛到编译期。
- **类型友好的导航**：`createRouterUtils` 提供带有路径与 search 参数泛型的 `navigateTo`/`navigateBack`、`getRoutePath`、`getRouteSearchParams`，让各页面之间的跳转在 TypeScript 层面就能捕捉错误。
- **懒加载出口**：在生成的路由配置中自动把页面以 `React.lazy` 包裹，为现代 SPA 提供按需加载的能力。

## 典型工程流程

1. 编写一个脚本遍历 `src/pages`，调用 `getFileBasedRoutes` 生成与文件路径对齐的路由文件。
2. 把生成的 `ROUTES` 导入到路由入口文件，作为 `createBrowserRouter` 的配置。
3. 在业务模块中使用 `createRouterUtils` 提供的跳转/参数读写方法，保持泛型安全。

这样可以在构建阶段就锁定所有路径，运行时的跳转也有保障。
