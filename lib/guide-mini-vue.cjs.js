'use strict';

function createVNode(type, props, children) {
    // createVNode => vnode
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
    };
    return component;
}
const setupComponent = (instance) => {
    // todo
    // initProps
    // initSlots
    setupStatefulComponent(instance);
};
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function and object
    // todo function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    //   if (Component.render) {
    instance.render = Component.render;
    //   }
}

function render(vnode, container) {
    // patch => vnode => dom
    patch(vnode);
}
function patch(vnode, container) {
    // TODO 判断vnode是组件还是元素
    //   如果是元素
    //   processElement(vnode, container);
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    patch(subTree);
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // Component => VNode
            // 所有的逻辑都基于 VNode
            const vnode = createVNode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
