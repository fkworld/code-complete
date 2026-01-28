export interface TreeConfig<T> {
  idPropName?: keyof T;
  parentIdPropName?: keyof T;
  childrenPropName?: keyof T;
}

export type TreeNode<T> = T & {
  children?: Array<TreeNode<T>>;
};
