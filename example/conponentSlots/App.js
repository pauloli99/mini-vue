import { createTextVNode, h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;

export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(
      Foo,
      {},
      {
        header: h("p", {}, "header"),
        footer: [h("p", {}, "footer"), createTextVNode("hello string node")],
      }
      // [h("p", {}, "header"),h("p", {}, "header")]
    );

    return h("div", {}, [app, foo]);
  },

  setup() {
    return {};
  },
};
