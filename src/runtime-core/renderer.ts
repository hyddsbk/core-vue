import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export const render = (vnode, container) => {
  patch(vnode, container);
};

function patch(vnode: any, container: any) {
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  console.log("container: ", container);
  console.log("vnode: ", vnode);
  const { children, props } = vnode;
  console.log("props: ", props);

  const el = document.createElement(vnode.type);

  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  for (const key in props) {
    el.setAttribute(key, props[key]);
  }
  container.append(el);
}

function mountChildren(vnode, el) {
  vnode.children.forEach((v) => patch(v, el));
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();
  patch(subTree, container);
}
