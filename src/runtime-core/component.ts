export const createComponentInstance = (vnode) => {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
};

export const setupComponent = (instance) => {
  // initProps
  // initSlots
  setupStatefulComponent(instance);
};

function setupStatefulComponent(instance: any) {
  console.log("instance: ", instance);
  const Component = instance.type;
  // 代理组件
  instance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        const { setupState } = instance;
        console.log("setupState: ", setupState);
        if (key in setupState) {
          return setupState[key];
        }
      },
    }
  );

  const { setup } = Component;
  if (setup) {
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
