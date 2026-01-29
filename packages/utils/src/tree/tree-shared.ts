import type { TreeConfig } from "./tree-types";

export const DEFAULT_TREE_CONFIG = {
  idPropName: "id",
  parentIdPropName: "parentId",
  childrenPropName: "children",
} satisfies TreeConfig<Record<string, unknown>>;
