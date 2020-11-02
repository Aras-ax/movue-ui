<template>
  <div class="mo-radio-wrapper" :class="[`border-${border}`]">
    <div
      class="mo-radio mo-form-row"
      :class="{ disabled: isDisabled }"
      @click="showSelect"
    >
      <label class="mo-form-label">{{ label }}</label>
      <div class="mo-form-value">
        <span class="mo-form-item-value">{{ valueText }}</span>
        <i class="mo-form-arrow mo-icon-right"></i>
      </div>
    </div>
    <mo-pop-page ref="popPage" :title="label">
      <ul class="mo-list">
        <li
          class="mo-list-item border-bottom"
          v-for="item in formatedOptions"
          :key="item.value"
          @click="change(item)"
        >
          <label class="mo-form-label" :class="{ disabled: item.disabled }">{{
            item.title
          }}</label>
          <i
            class="mo-icon-check mo-list-icon is-active"
            v-show="item.value === value"
          ></i>
        </li>
      </ul>
    </mo-pop-page>
  </div>
</template>
<script>
import MoPopPage from "../MouiPopPage.vue";

export default {
  name: "mo-radio",
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
    name: String
  },

  model: {
    prop: "value",
    event: "input"
  },

  components: {
    MoPopPage
  },

  watch: {
    value() {
      this.getText();
    }
  },

  computed: {
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    },
    popvm() {
      return this.$refs.popPage;
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
    return { valueText: "" };
  },

  methods: {
    showSelect() {
      if (this.isDisabled) {
        return;
      }
      this.popvm.show();
    },
    change(item) {
      if (this.isDisabled || item.disabled) {
        return;
      }
      this.$emit("input", item.value);
      this.$emit("change", item.value);
    },
    getText() {
      this.valueText = this.value2Text[this.value] || "请选择";
    }
  },
  mounted() {
    this.getText();
    this.$root.$el.appendChild(this.$refs.popPage.$el);
  },
  beforeDestroy() {
    if (this.popvm) {
      this.popvm.$el.remove();
      this.popvm.$destroy();
    }
  }
};
</script>
