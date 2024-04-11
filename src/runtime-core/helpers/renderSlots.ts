import { Fragment, createVNode } from "../createVNode";

export const renderSlots = (slots, name) => {
  const slot = slots[name];

  if (slot) {
    return createVNode(Fragment, {}, slot);
  }
};
