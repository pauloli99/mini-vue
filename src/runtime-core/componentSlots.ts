import { ShapeFlags } from "../shared/ShapeFlags";

export const initSlots = (instance, children) => {
  const { vnode } = instance;

  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
};

const normalizeSlotValue = (value) => {
  return Array.isArray(value) ? value : [value];
};
function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key];

    slots[key] = normalizeSlotValue(value);
  }
}
