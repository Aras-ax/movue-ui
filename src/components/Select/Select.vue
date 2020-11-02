<template>
  <div class="mo-select-wrapper" :class="[`border-${border}`]">
    <div
      class="mo-form-row"
      :class="{ disabled: isDisabled }"
      @click.stop="rotateArrow"
    >
      <label class="mo-form-label">{{ label }}</label>
      <div class="mo-form-value">
        <span class="mo-form-item-value">{{ valueText }}</span>
        <i
          class="mo-form-arrow mo-icon-right icon-arrow"
          :class="{ 'is-active': rotate }"
        ></i>
      </div>
      <select
        ref="select"
        :disabled="isDisabled"
        class="mo-select"
        :value="value"
        @change="change"
      >
        <option
          v-for="item in formatedOptions"
          :key="item.value"
          :value="item.value"
          >{{ item.title }}</option
        >
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: "mo-select",
  props: {
    options: {
      type: [Array, Object],
      required: true
    },

    value: {
      type: [String, Number, Boolean],
      required: true
    },

    label: {
      type: [String, Number],
      default: ""
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
    name: {}
  },

  model: {
    prop: "value",
    event: "input"
  },

  computed: {
    valueText() {
      return this.value2Text[this.value] || "请选择";
    },

    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    },

    formatedOptions() {
      let res = [];
      if (Array.isArray(this.options)) {
        this.options.forEach(item => {
          if (typeof item !== "object") {
            res.push({
              title: item,
              value: item
            });
            this.value2Text[item] = item;
          } else {
            res.push(item);
            this.value2Text[item.value] = item.title;
          }
        });
      } else {
        for (let [key, value] of Object.entries(this.options)) {
          res.push({
            title: value,
            value: key
          });
          /* eslint-disable */
          this.value2Text[key] = value;
        }
      }
      return res;
    }
  },

  data() {
    this.value2Text = {};
    return {
      rotate: false
    };
  },

  methods: {
    rotateArrow() {
      if (this.isDisabled) {
        return;
      }
      // this.rotate = !this.rotate;
    },
    reset() {
      this.rotate = false;
    },
    change($event) {
      this.$emit("input", $event.target.value);
      this.$emit("change", $event.target.value);
      this.rotate = false;
    }
  },

  watch: {
    rotate(val) {
      if (val) {
        document.body.addEventListener("click", this.rotateArrow);
      } else {
        document.body.removeEventListener("click", this.rotateArrow);
      }
    }
  },
  destroy() {
    document.removeEventListener("click", this.rotateArrow);
  }
};
</script>
