import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  render() {
    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      // "hi," + this.msg
      // "hi, mini-vue "
      [
        h("span", { class: "red" }, "hi, "),
        h("span", { class: "green" }, "mini-vue"),
      ]
    );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
