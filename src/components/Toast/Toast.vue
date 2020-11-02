<template>
  <transition
    name="mo-fade"
    @before-enter="handleBeforeEnter"
    @after-leave="handleAfterLeave"
  >
    <div
      :class="['mo-loading', { 'mo-loading-max': size === 'max' }]"
      v-show="visible"
    >
      <div
        v-if="type === typeMap.loading"
        class="mo-max-wrapper spinner spinner-ios"
      >
        <svg viewBox="0 0 64 64">
          <g stroke-width="4" stroke-linecap="round">
            <line y1="17" y2="29" transform="translate(32,32) rotate(180)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(210)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(240)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(270)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(300)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(330)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(0)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(30)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(60)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(90)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(120)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85"
                repeatCount="indefinite"
              ></animate>
            </line>
            <line y1="17" y2="29" transform="translate(32,32) rotate(150)">
              <animate
                attributeName="stroke-opacity"
                dur="750ms"
                values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"
                repeatCount="indefinite"
              ></animate>
            </line>
          </g>
        </svg>
      </div>
      <div class="mo-max-wrapper" v-else-if="size === 'max'">
        <i :class="['mo-loading-icon', `mo-icon-${typeIcon[type]}`]"></i>
      </div>

      <div v-if="message" class="mo-loading-tips">
        <i :class="['mo-loading-icon', `mo-icon-${icon}`]" v-if="icon"></i>
        <!-- <span v-html="message"></span> -->
        {{ message }}
      </div>
    </div>
  </transition>
</template>
<script>
const typeMap = {
  loading: "loading",
  toast: "toast",
  success: "success",
  error: "error",
  warning: "warning"
};

const typeIcon = {
  [typeMap.error]: "error-circle",
  [typeMap.success]: "success",
  [typeMap.warning]: "notice"
};

const FAD_TIME = 500;

export default {
  data() {
    this.typeMap = typeMap;
    this.typeIcon = typeIcon;

    return {
      duration: 1000,
      type: typeMap.toast,
      onClose: null,
      icon: "",
      message: "",
      size: "min",
      timer: "",
      visible: false
    };
  },

  methods: {
    close() {
      this.visible = false;
      if (this.timer) {
        this.clearTimer();
      }
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (this.visible) {
            this.close();
          }
        }, this.duration + FAD_TIME);
      }
    },
    handleAfterLeave() {
      this.$el.remove();
      this.$destroy(true);
      if (this.type === this.typeMap.loading) {
        document.querySelector("[mo-mask]").remove();
      }
    },
    handleBeforeEnter() {
      if (this.type !== typeMap.toast) {
        this.size = "max";
      }

      if (this.type === this.typeMap.loading) {
        let el = document.createElement("div");
        el.setAttribute("mo-mask", "");
        el.className = "mo-loading-mask";
        el.style.zIndex = this.$el.style.zIndex;
        document.body.insertBefore(el, this.$el);
      }
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>
