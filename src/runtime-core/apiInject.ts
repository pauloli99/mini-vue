import { getCurrentInstance } from "./component";

// 存储 provide 的数据
export const provide = (key, value) => {
  const instance: any = getCurrentInstance();

  if (instance) {
    let { provides } = instance;
    const parentProvides = instance.parent ? instance.parent.provides : {};

    // init
    if (provides === parentProvides) {
      provides = instance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
};

// 获取 provide 的数据
export const inject = (key, defaultValue) => {
  const instance: any = getCurrentInstance();

  if (instance) {
    const { parent } = instance;

    const parentProvides = parent.provides;

    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === "function") {
        return defaultValue();
      }

      return defaultValue;
    }
  }
};
