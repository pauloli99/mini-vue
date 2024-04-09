import { createComponentInstance, setupComponent } from "./component";
import { isObject } from "../shared";

export function render(vnode, container) {
  // patch => vnode => dom

  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  console.log(vnode.type);

  // TODO 判断vnode是组件还是元素
  if (typeof vnode.type === "string") {
    // 如果是元素
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
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

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render();

  patch(subTree, container);
}
function mountElement(vnode: any, container: any) {
  const { type, props, children } = vnode;

  const el = document.createElement(type) as HTMLElement;

  if (typeof children === "string") {
    // children === string
    el.textContent = children;
  } else if (Array.isArray(children)) {
    // children === array
    mountChildren(vnode, el);
  }

  // 处理props
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  container.append(el);
}

function mountChildren(vnode: any, container: any) {
  const { children } = vnode;
  children.forEach((vnode) => {
    patch(vnode, container);
  });
}
