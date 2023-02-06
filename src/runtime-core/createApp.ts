import { render } from "./renderer";
import { createVNode } from "./vnode";

export const createApp = (rootComponent) => {
  return {
    $mount(rootContainer) {
      // component -> vnode
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
};
