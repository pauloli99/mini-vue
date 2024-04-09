import { h } from "../../lib/guide-mini-vue.esm.js";

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
      "hi," + this.msg
      // "hi, mini-vue "
      // [
      //   h("span", { class: "red" }, "hi, "),
      //   h("span", { class: "green" }, "mini-vue"),
      // ]
    );
  },

  setup() {
    return {
      msg: "mini-vue12312",
    };
  },
};
