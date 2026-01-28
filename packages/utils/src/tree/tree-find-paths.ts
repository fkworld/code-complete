import type { TreeConfig } from "./tree-types";

import { isArray } from "lodash-es";

import { DEFAULT_TREE_CONFIG } from "./tree-shared";

export function treeFindPaths<T>(tree: Array<T>, callback: (v: T) => boolean, treeConfig: TreeConfig<T>): Array<T> {
  const { childrenPropName = DEFAULT_TREE_CONFIG.childrenPropName } = treeConfig;

  for (const node of tree) {
    if (callback(node)) {
      return [node];
    }
    const childrenNode = node[childrenPropName as keyof T];
    if (childrenNode && isArray(childrenNode)) {
      const paths = treeFindPaths(childrenNode, callback, treeConfig);
      if (paths.length) {
        return [node, ...paths];
      }
    }
  }
  return [];
}
