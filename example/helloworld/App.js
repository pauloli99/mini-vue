import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;

export const App = {
  render() {
    window.self = this;

    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      [
        h("span", { class: "red" }, "hi, " + this.msg),
        h(Foo, {
          onAdd(a, b) {
            console.log("onAdd emit from child", a, b);
          },
          onAddFoo(a, b) {
            console.log("onAddFoo emit from child", a, b);
          },
        }),
      ]
    );
  },

  setup() {
    return {
      msg: "mini-vue12312",
    };
  },
};
