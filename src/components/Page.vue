<template>
  <div mo-page class="mo-page-wrapper mo-main-page">
    <div class="mo-page mo-page-body" :style="style">
      <mo-head
        v-if="hasTitle"
        :title="title"
        :showBack="showBack"
        :backText="backText"
        :onBack="onBack"
        :showMenu="showMenu"
        :menuText="menuText"
        :onMenu="onMenu"
      ></mo-head>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { session } from "./lib/utils.js";
const nextDirection = (el, direction) => {
  el.setAttribute("transition-direction", direction);
};

export default {
  name: "mo-page",
  props: {
    hasTitle: {
      default: true
    },
    // 标题
    title: String,
    // 显示返回
    showBack: {
      type: Boolean,
      default: true
    },
    // 返回文本
    backText: String,
    // 返回回调
    onBack: Function,
    // 显示右侧menu
    showMenu: {
      type: Boolean,
      default: false
    },
    // 右侧menu文本
    menuText: String,
    // 点击menu回调
    onMenu: Function
  },
  computed: {
    style() {
      if (!this.hasTitle) {
        return {
          paddingTop: 0
        };
      }
      return {};
    }
  },
  mounted() {
    let router = this.$router,
      $root = this.$root.$el;

    /* eslint-disable */
    if (router && !router.binded) {
      nextDirection($root, "forward");
      router.isBack = false;
      router.binded = true;
      router.beforeEach((to, from, next) => {
        nextDirection($root, router.isBack ? "back" : "forward");
        session.set(from.path, this.scrollTop());

        next();
        router.isBack = false;
      });

      router.afterEach((to, from) => {
        let top = session.get(to.path);
        if (top) {
          this.$nextTick(() => {
            this.scrollTop(+top);
          });
        }
      });
    }
    /* eslint-disable */
  },
  methods: {
    scrollTop(top) {
      let $el = document.querySelectorAll("[mo-page] .mo-page.mo-page-body");
      if (!$el && $el.length === 0) {
        return 0;
      }
      if (typeof top == "number") {
        $el = $el[$el.length - 1];
        $el.scrollTop = top;
      } else {
        $el = $el[0];
        return $el.scrollTop;
      }
    }
  }
};
</script>
