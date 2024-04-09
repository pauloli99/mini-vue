export function createVNode(type, props?, children?) {
  // createVNode => vnode
  const vnode = {
    type,
    props,
    children,
    el: null,
  };

  return vnode;
}
