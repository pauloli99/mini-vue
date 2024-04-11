import { createVNode } from "../createVNode";

export const renderSlots = (slots, name) => {
  const slot = slots[name];

  if (slot) {
    return createVNode("div", {}, slot);
  }
};
