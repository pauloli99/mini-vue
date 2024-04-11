import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup() {},

  render() {
    const foo = h("p", {}, "Foo");

    return h("div", {}, [
      renderSlots(this.$slots, "header"),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
