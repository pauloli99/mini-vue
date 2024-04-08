import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // patch => vnode => dom

  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  // TODO 判断vnode是组件还是元素
  //   如果是元素
  //   processElement(vnode, container);
  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render();

  patch(subTree, container);
}
