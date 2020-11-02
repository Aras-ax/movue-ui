import { addClass, removeClass } from "../lib/utils";

let transitionOn = {
  beforeEnter(el) {
    addClass(el, "mo-collapse-transition");
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = "0";
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + "px";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = "hidden";
  },

  afterEnter(el) {
    // for safari: remove class then reset height is necessary
    removeClass(el, "mo-collapse-transition");
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow;
  },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + "px";
    el.style.overflow = "hidden";
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, "mo-collapse-transition");
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  afterLeave(el) {
    removeClass(el, "mo-collapse-transition");
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
};

export default {
  name: "mo-collapse-transition",
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: "collapse"
      },
      on: transitionOn
    };

    return createElement("transition", data, context.children);
  }
};