export const extend = Object.assign;

export const isObject = (obj: any) => obj !== null && typeof obj === "object";

export const hasChanged = (value: any, oldValue: any) =>
  !Object.is(value, oldValue);

export const hasOwn = (o, key) => Object.prototype.hasOwnProperty.call(o, key);
