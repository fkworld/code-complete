import type { TreeConfig } from "./tree-types";

import { cloneDeep } from "lodash-es";

import { DEFAULT_TREE_CONFIG } from "./tree-shared";

/** 扁平结构转为树结构 */
export function treeBuild<T>(list: Array<T>, treeConfig: TreeConfig<T> & { rootParentId?: string }): Array<T> {
  const {
    idPropName = DEFAULT_TREE_CONFIG.idPropName,
    parentIdPropName = DEFAULT_TREE_CONFIG.parentIdPropName,
    childrenPropName = DEFAULT_TREE_CONFIG.childrenPropName,
    rootParentId = "",
  } = treeConfig;

  const clonedList = cloneDeep(list);
  const result: Array<T> = [];
  const nodeMap = new Map<string, T>();

  // 第一次遍历，清理所有节点的 children，将所有节点放入 map 中，将根节点放入 result 中
  clonedList.forEach((node) => {
    // eslint-disable-next-line ts/no-explicit-any
    node[childrenPropName as keyof T] = [] as any;

    const nodeId = node[idPropName as keyof T] as string;
    nodeMap.set(nodeId, node);

    const nodeParentId = node[parentIdPropName as keyof T] as string;
    if (nodeParentId === rootParentId) {
      result.push(node);
    }
  });

  // 第二次遍历，根据 parentId 将节点放入对应的父节点的 children 中
  clonedList.forEach((node) => {
    const nodeParentId = node[parentIdPropName as keyof T] as string;
    const parentNode = nodeMap.get(nodeParentId);

    if (!parentNode) {
      return;
    }

    (parentNode[childrenPropName as keyof T] as Array<T>)?.push(node);
  });

  return result;
}
