import type { TreeConfig } from "./tree-types";

import { DEFAULT_TREE_CONFIG } from "./tree-shared";

export function treeFlat<T>(tree: Array<T>, treeConfig: TreeConfig<T>): Array<T> {
  const { childrenPropName = DEFAULT_TREE_CONFIG.childrenPropName } = treeConfig;

  const result = [...tree];

  for (let i = 0; i < result.length; i++) {
    const node = result[i];
    const nodeChildren = node[childrenPropName as keyof T];
    if (Array.isArray(nodeChildren)) {
      result.push(...nodeChildren);
    }
  }

  return result;
}
