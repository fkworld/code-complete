import type { TreeConfig } from "./tree-types";

import { isArray } from "lodash-es";

import { DEFAULT_TREE_CONFIG } from "./tree-shared";

export function treeForEach<T>(tree: Array<T>, callback: (v: T) => void, treeConfig: TreeConfig<T>): void {
  const { childrenPropName = DEFAULT_TREE_CONFIG.childrenPropName } = treeConfig;

  function traverse(nodes: Array<T>) {
    nodes.forEach((node) => {
      callback(node);

      const nodeChildren = node[childrenPropName as keyof T];
      if (nodeChildren && isArray(nodeChildren)) {
        traverse(nodeChildren);
      }
    });
  }

  traverse(tree);
}
