import { describe, expect, it } from "vitest";

import { treeFind } from "./tree-find";
import { TREE } from "./tree-shared-test";

describe(treeFind.name, () => {
  it("should return the first node that matches the callback", () => {
    const result = treeFind(TREE, (node) => node.id === "1-1-2", { childrenPropName: "children" });
    expect(result).toEqual({ id: "1-1-2", parentId: "1-1", children: [] });
  });

  it("should return undefined if no node matches the callback", () => {
    const result = treeFind(TREE, (node) => node.id === "1-1-3", { childrenPropName: "children" });
    expect(result).toBeUndefined();
  });
});
