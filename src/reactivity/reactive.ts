import { mutableHandlers, readonlyHandlers } from "./baseHandler";

export const reactive = (raw) => {
  return createActiveObject(raw, mutableHandlers);
};

export const readonly = (raw) => {
  return createActiveObject(raw, readonlyHandlers);
};

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
