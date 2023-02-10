const isObject = (value) => {
    return value !== null && typeof value === "object";
};

const createComponentInstance = (vnode) => {
    const component = {
        vnode,
        type: vnode.type,
    };
    return component;
};
const setupComponent = (instance) => {
    // initProps
    // initSlots
    setupStatefulComponent(instance);
};
function setupStatefulComponent(instance) {
    console.log("instance: ", instance);
    const Component = instance.type;
    // 代理组件
    instance.proxy = new Proxy({}, {
        get(target, key) {
            const { setupState } = instance;
            console.log("setupState: ", setupState);
            if (key in setupState) {
                return setupState[key];
            }
        },
    });
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

const render = (vnode, container) => {
    patch(vnode, container);
};
function patch(vnode, container) {
    if (typeof vnode.type === "string") {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const { children, props } = vnode;
    const el = document.createElement(vnode.type);
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(vnode, el);
    }
    for (const key in props) {
        console.log("key: ", key);
        console.log("props: ", props);
        el.setAttribute(key, props[key]);
    }
    container.append(el);
}
function mountChildren(vnode, el) {
    vnode.children.forEach((v) => patch(v, el));
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    // 创建组件实例
    const instance = createComponentInstance(vnode);
    // 初始化组件
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const { proxy } = instance;
    console.log("proxy: ", proxy);
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
}

const createVNode = (type, props, children) => {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
};

const createApp = (rootComponent) => {
    return {
        $mount(rootContainer) {
            // component -> vnode
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
};

const h = (type, props, children) => {
    return createVNode(type, props, children);
};

export { createApp, h };
