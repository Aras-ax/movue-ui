<template>
  <transition name="pop-page">
    <div mo-pop class="mo-page-wrapper" v-show="display" style="z-index:11">
      <div class="mo-page">
        <div class="head-bar">
          <div class="head-btn left">
            <button class="button button-icon" @click="back">
              <i class="icon mo-icon-left"></i>
            </button>
          </div>

          <h1 class="title" v-if="title">
            <span v-text="title"></span>
          </h1>
        </div>
        <div class="mo-page-content">
          <slot> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number]
    }
  },
  data() {
    return {
      display: false,
      timeout: null
    };
  },
  methods: {
    back() {
      this.display = false;
      // this.$emit("change", false);
      this.addClass("slide-in");
    },
    show() {
      // this.$emit("change", true);
      this.display = true;
      this.addClass("slide-out");
    },
    addClass(css) {
      let el = document.querySelector("[mo-page].mo-main-page");
      if (el) {
        el.classList.add(css);
        this.timeout = setTimeout(() => {
          el.classList.remove(css);
        }, 500);
      }
    }
  },
  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
};
</script>
