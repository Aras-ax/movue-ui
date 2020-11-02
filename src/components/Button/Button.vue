<template>
  <button
    type="button"
    :disabled="isDisabled"
    @click.prevent="click"
    :style="{ margin: margin }"
    :class="[
      'button',
      `button-${size || 'normal'}`,
      `button-${type}`,
      {
        'is-plain': isPlain,
        'is-block': isBlock,
        'is-round': isRound,
        'is-circle': isCircle,
        disabled: isDisabled,
        'no-border': noBorder
      }
    ]"
  >
    <i v-if="icon" :class="['button-icon', icon]"></i>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "mo-button",
  props: {
    plain: {
      default: undefined
    },
    round: {
      default: undefined
    },
    circle: {
      default: undefined
    },
    icon: {
      default: ""
    },
    type: {
      default: "default",
      validator(val) {
        return (
          ["default", "primary", "error", "warning", "success", "link"].indexOf(
            val
          ) > -1
        );
      }
    },
    size: {
      default: "normal", // max, min, normal
      validator(val) {
        return ["max", "normal", "min"].indexOf(val) > -1;
      }
    },
    block: {
      default: undefined
    },
    disabled: {
      default: undefined
    },
    margin: {
      default: ""
    },
    border: {
      default: true
    }
  },
  computed: {
    isPlain() {
      return this.plain !== undefined && this.plain !== false;
    },
    isRound() {
      return this.round !== undefined && this.round !== false;
    },
    isBlock() {
      return this.block !== undefined && this.block !== false;
    },
    isDisabled() {
      return this.disabled !== undefined && this.disabled !== false;
    },
    isCircle() {
      return this.circle !== undefined && this.circle !== false;
    },
    noBorder() {
      return this.border === false;
    }
  },
  methods: {
    click(param) {
      this.$emit("click", param);
    }
  }
};
</script>
