import { describe, expect, it } from "vitest";

import { treeBuild } from "./tree-build";
import { LIST, TREE } from "./tree-shared-test";

describe(treeBuild.name, () => {
  it("should not change original list", () => {
    const originalListString = JSON.stringify(LIST);
    treeBuild(LIST, { rootParentId: "" });
    const newListString = JSON.stringify(LIST);
    expect(newListString).toBe(originalListString);
  });

  it("should return tree", () => {
    const result = treeBuild(LIST, { rootParentId: "" });
    expect(result).toEqual(TREE);
  });

  it("should return tree with custom config", () => {
    const result = treeBuild(LIST, { rootParentId: "", idPropName: "id", parentIdPropName: "parentId" });
    expect(result).toEqual(TREE);
  });

  it("should return tree with custom childrenPropName", () => {
    interface CustomNode {
      id: string;
      parentId: string;
      customChildren?: Array<CustomNode>;
    }
    const result = treeBuild<CustomNode>(LIST, { rootParentId: "", childrenPropName: "customChildren" });
    expect(result).toEqual([
      {
        id: "1",
        parentId: "",
        customChildren: [
          {
            id: "1-1",
            parentId: "1",
            customChildren: [
              { id: "1-1-1", parentId: "1-1", customChildren: [] },
              { id: "1-1-2", parentId: "1-1", customChildren: [] },
            ],
          },
          { id: "1-2", parentId: "1", customChildren: [] },
        ],
      },
      {
        id: "2",
        parentId: "",
        customChildren: [
          { id: "2-1", parentId: "2", customChildren: [] },
          { id: "2-2", parentId: "2", customChildren: [] },
        ],
      },
    ]);
  });
});
