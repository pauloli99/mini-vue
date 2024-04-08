export function createVNode(type, props?, children?) {
  // createVNode => vnode
  const vnode = {
    type,
    props,
    children,
  };

  return vnode;
}
