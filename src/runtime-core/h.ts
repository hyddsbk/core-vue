import { createVNode } from "./vnode";

export const h = (type: any, props?: any, children?: any) => {
  return createVNode(type, props, children);
};
