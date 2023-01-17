import { mutableHandlers, ReactiveFlag, readonlyHandlers } from "./baseHandler";

export const reactive = (raw) => {
  return createActiveObject(raw, mutableHandlers);
};

export const readonly = (raw) => {
  return createActiveObject(raw, readonlyHandlers);
};

export const isReactive = (value) => {
  return !!value[ReactiveFlag["IS_REACTIVE"]];
};

export const isReadonly = (value) => {
  return !!value[ReactiveFlag["IS_READONLY"]];
};

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
