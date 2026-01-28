export const LIST = [
  { id: "1", parentId: "" },
  { id: "1-1", parentId: "1" },
  { id: "1-1-1", parentId: "1-1" },
  { id: "1-1-2", parentId: "1-1" },
  { id: "1-2", parentId: "1" },
  { id: "2", parentId: "" },
  { id: "2-1", parentId: "2" },
  { id: "2-2", parentId: "2" },
];

export const LIST_IDS = LIST.map((v) => v.id);

export const TREE = [
  {
    id: "1",
    parentId: "",
    children: [
      {
        id: "1-1",
        parentId: "1",
        children: [
          { id: "1-1-1", parentId: "1-1", children: [] },
          { id: "1-1-2", parentId: "1-1", children: [] },
        ],
      },
      { id: "1-2", parentId: "1", children: [] },
    ],
  },
  {
    id: "2",
    parentId: "",
    children: [
      { id: "2-1", parentId: "2", children: [] },
      { id: "2-2", parentId: "2", children: [] },
    ],
  },
];
