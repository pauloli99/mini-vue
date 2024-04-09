function createVNode(type, props, children) {
    // createVNode => vnode
    const vnode = {
        type,
        props,
        children,
        el: null,
    };
    return vnode;
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        // key in publicPropertiesMap
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
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
    // ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
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

const isObject = (obj) => obj !== null && typeof obj === "object";

function render(vnode, container) {
    // patch => vnode => dom
    patch(vnode, container);
}
function patch(vnode, container) {
    console.log(vnode.type);
    // TODO 判断vnode是组件还是元素
    if (typeof vnode.type === "string") {
        // 如果是元素
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        //   如果是元素
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountElement(vnode, container) {
    const { type, props, children } = vnode;
    const el = (vnode.el = document.createElement(type));
    if (typeof children === "string") {
        // children === string
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
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
function mountComponent(initialVNode, container) {
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    initialVNode.el = subTree.el;
}
function mountChildren(vnode, container) {
    const { children } = vnode;
    children.forEach((vnode) => {
        patch(vnode, container);
    });
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // Component => VNode
            // 所有的逻辑都基于 VNode
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };