<template>
  <div class="mo-checkbox-wrapper" :class="[`border-${border}`]">
    <div
      class="mo-checkbox mo-form-row"
      :class="{ disabled: isDisabled }"
      @click="showSelect"
    >
      <label class="mo-form-label">{{ label }}</label>
      <div class="mo-form-value mo-with-icon">
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
            v-show="dataSelected[item.value]"
          ></i>
        </li>
      </ul>
    </mo-pop-page>
  </div>
</template>
<script>
import MoPopPage from "../MouiPopPage.vue";

const VALUT_TYPE = {
  STRING: 1,
  ARRAY: 2
};
export default {
  name: "mo-checkbox",
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
    disabled: {
      default: false
    },
    border: {
      default: "bottom",
      type: String,
      validator(val) {
        return ["top", "bottom", "all", "none"].indexOf(val) !== -1;
      }
    },
    splitKey: {
      type: String,
      default: ","
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

  computed: {
    valueType() {
      return typeof this.value === "object"
        ? VALUT_TYPE.ARRAY
        : VALUT_TYPE.STRING;
    },
    valueText() {
      if (this.formatedValue.length === 0) {
        return "请选择";
      }
      return this.formatedValue
        .map(val => this.value2Text[val])
        .join(this.splitKey);
    },
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
    },
    formatedValue() {
      if (this.valueType === VALUT_TYPE.STRING) {
        return (this.value + "").split(this.splitKey);
      } else {
        return this.value;
      }
    }
  },

  watch: {
    value(val) {
      for (let key in this.dataSelected) {
        if (this.dataSelected.hasOwnProperty(key)) {
          this.dataSelected[key] = val.indexOf(key) > -1;
        }
      }
    }
  },

  data() {
    this.value2Text = {};
    return {
      dataSelected: {}
    };
  },

  created() {
    this.formatedOptions.forEach(item => {
      this.$set(
        this.dataSelected,
        item.value,
        this.formatedValue.indexOf(item.value) > -1
      );
    });
  },

  methods: {
    showSelect() {
      if (this.isDisabled) {
        return;
      }
      this.popvm.show();
    },
    change(item) {
      if (item.disabled || this.isDisabled) {
        return;
      }
      this.dataSelected[item.value] = !this.dataSelected[item.value];
      this.setValue();
    },
    setValue() {
      let vals = [];
      for (let [key, selected] of Object.entries(this.dataSelected)) {
        if (selected) {
          vals.push(key);
        }
      }
      let val =
        this.valueType === VALUT_TYPE.STRING ? vals.join(this.splitKey) : vals;
      this.$emit("input", val);
      this.$emit("change", val);
    }
  },
  mounted() {
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
