<template>
  <div :class="['mo-scroll', css]" ref="scroll" :style="{ height: height }">
    <div class="mo-scroll-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";

export default {
  name: "mo-scroll",
  props: {
    height: {
      type: String,
      default: "100%"
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    scroll: Function,
    scrollEnd: Function,
    scrollStart: Function,
    beforeScrollStart: Function,
    refresh: Function,
    destroy: Function
  },
  computed: {
    css() {
      return this.scrollX ? "scrollX" : "";
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: this.scrollY,
        scrollX: this.scrollX,
        startX: this.startX,
        startY: this.startY,
        click: true,
        probeType: 3
      });
      this._registerHooks();
    },
    _registerHooks() {
      ["scroll", "scrollEnd", "scrollStart", "beforeScrollStart", "refresh", "destroy"].forEach(event => {
        if (this[event] && typeof this[event] === "function") {
          this.bs.on(event, this[event]);
        }
      });
    },
    fresh() {
      this.bs.refresh();
    },
    scrollTo(x, y = 0, t = 300) {
      this.bs.scrollTo(x, y, t);
    }
  }
};
</script>
