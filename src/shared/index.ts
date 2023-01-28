export const extend = Object.assign;

export const isObject = (value) => {
  return value !== null && typeof value === "object";
};

export const isChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};
