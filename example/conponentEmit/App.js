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
        onClick: () => {
          console.log("click");
        },
        onMouseDown: () => {
          console.log("onMouseDown");
        },
      },
      // "hi," + this.msg
      // "hi, mini-vue "
      [
        h("span", { class: "red" }, "hi, " + this.msg),
        h(Foo, {
          count: 1,
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
