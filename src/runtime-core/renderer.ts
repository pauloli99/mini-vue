import { createComponentInstance, setupComponent } from "./component";
import { isObject } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";

export function render(vnode, container) {
  // patch => vnode => dom

  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  const { shapeFlag } = vnode;

  // TODO 判断vnode是组件还是元素
  if (shapeFlag & ShapeFlags.ELEMENT) {
    // 如果是元素
    processElement(vnode, container);
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    //   如果是元素
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const { type, props, children, shapeFlag } = vnode;

  const el = (vnode.el = document.createElement(type) as HTMLElement);

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // children === string
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // children === array
    mountChildren(vnode, el);
  }

  // 处理props
  for (const key in props) {
    console.log(key);

    const val = props[key];

    const isOn = (key: string) => /^on[A-Z]/.test(key);

    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();

      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.append(el);
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode);

  setupComponent(instance);

  setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance: any, initialVNode: any, container: any) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  patch(subTree, container);

  initialVNode.el = subTree.el;
}

function mountChildren(vnode: any, container: any) {
  const { children } = vnode;
  children.forEach((vnode) => {
    patch(vnode, container);
  });
}
