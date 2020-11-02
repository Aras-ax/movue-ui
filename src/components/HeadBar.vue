<template>
  <div class="head-bar border-bottom">
    <div class="head-btn left" v-if="showBack">
      <button class="button button-icon" @click="onBackClick()">
        <span v-html="backText"> </span>
      </button>
    </div>

    <h1 class="title" v-if="title">
      <span v-text="title"></span>
    </h1>
    <slot v-else></slot>

    <div class="head-btn right" v-if="showMenu">
      <button class="button button-icon" @click="onMenuClick()">
        <span v-html="menuText"> </span>
      </button>
    </div>
  </div>
</template>
<script>
const DEFAULT_BACK_TEXT = '<i class="icon mo-icon-left"></i>';
const DEFAULT_MENU_TEXT = '<i class="icon mo-icon-menu"></i>';

export default {
  name: "mo-head",
  props: {
    // 标题
    title: String,
    // 显示返回
    showBack: {
      type: Boolean,
      default: true
    },
    // 返回文本
    backText: {
      type: String,
      default: DEFAULT_BACK_TEXT
    },
    // 返回回调
    onBack: Function,
    // 显示右侧menu
    showMenu: {
      type: Boolean,
      default: false
    },
    // 右侧menu文本
    menuText: {
      type: String,
      default: DEFAULT_MENU_TEXT
    },
    // 点击menu回调
    onMenu: Function
  },

  data() {
    return {};
  },

  methods: {
    onBackClick() {
      if (this.onBack) {
        this.onBack();
        return;
      }

      this.$router && (this.$router.isBack = true);
      this.$router.go(-1);
    },

    onMenuClick() {
      if (this.onMenu) {
        this.onMenu();
      }
    }
  }
};
</script>
