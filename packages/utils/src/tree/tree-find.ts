import type { TreeConfig } from "./tree-types";

import { treeForEach } from "./tree-for-each";

export function treeFind<T>(tree: Array<T>, callback: (v: T) => boolean, treeConfig: TreeConfig<T>): T | undefined {
  let result: T | undefined;

  treeForEach(
    tree,
    (node) => {
      if (!result && callback(node)) {
        result = node;
      }
    },
    treeConfig,
  );

  return result;
}
