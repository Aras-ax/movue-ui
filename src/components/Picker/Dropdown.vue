<template>
  <mo-picker
    v-model="val"
    :label="label"
    :disabled="disabled"
    :options="options"
    :title="title"
    :confirmText="confirmText"
    :cancelText="cancelText"
    :titleColor="titleColor"
    :confirmColor="confirmColor"
    :cancelColor="cancelColor"
    @confirm="confirm"
    @cancel="cancel"
  ></mo-picker>
</template>

<script>
import MoPicker from "./Picker.vue";

export default {
  name: "mo-dropdown",
  props: {
    label: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      default: false
    },
    /*
        [{title: 'x', value: 'xx'}] 或 ['XXX']
    */
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: [String, Number, Boolean],
    title: String,
    confirmText: String,
    cancelText: String,
    titleColor: String,
    confirmColor: String,
    cancelColor: String
  },
  model: {
    prop: "value",
    event: "input"
  },
  computed: {
    val: {
      get() {
        return [this.value];
      },
      set(val) {
        this.$emit("input", val[0]);
      }
    }
  },
  components: {
    MoPicker
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm(a, b) {
      this.$emit("confirm", a, b);
    }
  }
};
</script>
