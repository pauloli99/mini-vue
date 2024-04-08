import { createVNode } from "./createVNode";
import { render } from "./renderer";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // Component => VNode
      // 所有的逻辑都基于 VNode
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
