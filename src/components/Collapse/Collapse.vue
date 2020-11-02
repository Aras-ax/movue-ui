<template>
  <section
    class="mo-collapse"
    :class="[
      `border-${border}`,
      { 'is-active': isActive, disabled: isDisabled }
    ]"
  >
    <div class="mo-collapse-head border-bottom" @click="change">
      <div class="mo-coolapse-title ellipsis">
        <slot name="title">
          <label>
            {{ label }}
          </label>
        </slot>
      </div>
      <i class="mo-icon-up"></i>
    </div>
    <mo-collapse-transition>
      <div v-show="isActive">
        <div class="mo-collapse-content border-bottom">
          <slot></slot>
        </div>
      </div>
    </mo-collapse-transition>
  </section>
</template>

<script>
export default {
  name: "mo-collapse",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    border: {
      default: "top",
      type: String,
      validator(val) {
        return ["top", "none"].indexOf(val) !== -1;
      }
    },
    disabled: {
      default: false
    },
    label: String
  },
  data() {
    return {
      isActive: this.active
    };
  },
  computed: {
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    }
  },
  methods: {
    change() {
      if (this.isDisabled) {
        return;
      }
      this.isActive = !this.isActive;
      this.$emit("change", this.isActive);
    }
  }
};
</script>
