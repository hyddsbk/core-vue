import { track, trigger } from "./effect";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

export const enum ReactiveFlag {
  "IS_REACTIVE" = "__v_isReactive",
  "IS_READONLY" = "__v_isReadonly",
}

function createGetter(isReadOnly = false) {
  return function get(target, key) {
    if (key === "__v_isReactive") {
      return !isReadOnly;
    } else if (key === "__v_isReadonly") {
      return isReadOnly;
    }

    const res = Reflect.get(target, key);

    // 依赖收集
    if (!isReadOnly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发依赖
    trigger(target, key);
    return res;
  };
}

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`key ${key}: set失败，target readonly`, target);
    return true;
  },
};
