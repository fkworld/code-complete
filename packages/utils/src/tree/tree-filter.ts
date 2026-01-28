import type { TreeConfig } from "./tree-types";

import { DEFAULT_TREE_CONFIG } from "./tree-shared";

export function treeFilter<T>(tree: Array<T>, callback: (v: T) => boolean, treeConfig: TreeConfig<T>): Array<T> {
  const { childrenPropName = DEFAULT_TREE_CONFIG.childrenPropName } = treeConfig;

  return tree.filter((node) => {
    const isPass = callback(node);
    const nodeChildren = node[childrenPropName as keyof T];

    if (isPass && Array.isArray(nodeChildren)) {
      // eslint-disable-next-line ts/no-explicit-any
      node[childrenPropName as keyof T] = treeFilter(nodeChildren, callback, treeConfig) as any;
    }

    return isPass;
  });
}
