<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import emitter from "../emitter";

export default {
  componentName: "mo-form-item",
  mixins: [emitter],

  inject: ["elForm"],
  provide() {
    return {
      elFormItem: this
    };
  },
  mounted() {
    if (this.prop) {
      this.dispatch("ElForm", "el.form.addField", [this]);
      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, "initialValue", {
        value: initialValue
      });
      this.addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch("ElForm", "el.form.removeField", [this]);
  }
};
</script>
