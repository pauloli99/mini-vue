export const extend = Object.assign;

export const isObject = (obj: any) => obj !== null && typeof obj === "object";

export const hasChanged = (value: any, oldValue: any) =>
  !Object.is(value, oldValue);

export const hasOwn = (o, key) => Object.prototype.hasOwnProperty.call(o, key);

//   add-foo => addFoo
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
};

const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toHandleKey = (eventName: string) => {
  return eventName ? "on" + capitalized(eventName) : "";
};
