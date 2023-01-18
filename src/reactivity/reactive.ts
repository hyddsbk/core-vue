import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandler";

export const enum ReactiveFlag {
  "IS_REACTIVE" = "__v_isReactive",
  "IS_READONLY" = "__v_isReadonly",
}
export const reactive = (raw) => {
  return createActiveObject(raw, mutableHandlers);
};

export const readonly = (raw) => {
  return createActiveObject(raw, readonlyHandlers);
};

export const shallowReadonly = (raw) => {
  return createActiveObject(raw, shallowReadonlyHandlers);
};

// 触发target (value) get操作 拿到isReadonly
export const isReactive = (value) => {
  return !!value[ReactiveFlag["IS_REACTIVE"]];
};

export const isReadonly = (value) => {
  return !!value[ReactiveFlag["IS_READONLY"]];
};

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
