import { shallowReadonly } from "../reactivity/reative";
import { emit } from "./componentEmit";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initProps } from "./conponentProps";
export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export const setupComponent = (instance) => {
  // todo
  initProps(instance, instance.vnode.props);
  // initSlots

  setupStatefulComponent(instance);
};

function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;

  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance: any, setupResult: any) {
  // function and object
  // todo function

  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  //   if (Component.render) {
  instance.render = Component.render;
  //   }
}
