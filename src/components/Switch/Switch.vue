<template>
  <div class="mo-switch-wrapper" :class="[`border-${border}`]">
    <div class="mo-form-row" :class="{ disabled: isDisabled }">
      <label class="mo-form-label">{{ label }}</label>
      <label
        :class="['mo-switch', { 'is-active': value === this.activeValue }]"
      >
        <input
          :name="name"
          type="checkbox"
          :disabled="isDisabled"
          :value="activeValue"
          @change="change"
        />
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "mo-switch",

  props: {
    label: {
      type: [String, Number],
      required: false
    },
    value: {
      type: [Boolean, String, Number],
      required: true
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    negativeValue: {
      type: [Boolean, String, Number],
      default: false
    },
    border: {
      default: "bottom",
      type: String,
      validator(val) {
        return ["top", "bottom", "all", "none"].indexOf(val) !== -1;
      }
    },
    disabled: {
      default: false
    },
    name: String
  },

  model: {
    prop: "value",
    event: "input"
  },

  computed: {
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    }
  },
  methods: {
    change() {
      let val =
        this.value === this.activeValue ? this.negativeValue : this.activeValue;
      this.$emit("input", val);
      this.$emit("change", val);
    }
  }
};
</script>
