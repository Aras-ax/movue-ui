<template>
  <div
    class="mo-input-wrapper"
    :class="[`border-${border}`, label ? '' : 'no-title']"
  >
    <div class="mo-form-row" :class="{ disabled: isDisabled }">
      <label class="mo-form-label" @click="$refs.input.focus()" v-if="label">
        {{ label }}
      </label>
      <div class="mo-form-value mo-input-content">
        <input
          class="mo-input"
          :type="activeType"
          :placeholder="placeholder"
          ref="input"
          :maxlength="maxlength"
          v-model="inputValue"
          @focus="focus"
          @blur="blur"
          :disabled="disabled"
        />
        <label></label>
        <label class="mo-input-icons" :style="styleObj">
          <i
            v-show="showClearButton"
            :class="['input-icon mo-icon-error-circle']"
            @click="clear(value)"
          ></i>
          <i
            v-if="type === 'password'"
            class="input-icon"
            :class="[`mo-icon-eye-${showPassword ? 'open' : 'close'}`]"
            @click="switchEye"
          ></i>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mo-input",
  props: {
    type: {
      type: String,
      validator(val) {
        return ["text", "password", "email", "tel", "num"].indexOf(val) !== -1;
      },
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String
    },
    border: {
      default: "bottom",
      type: String,
      validator(val) {
        return ["top", "bottom", "all", "none"].indexOf(val) !== -1;
      }
    },
    maxlength: {
      type: String
    },
    disabled: {
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "input"
  },

  data() {
    return {
      showPassword: false,
      focused: false,
      oldValue: ""
    };
  },

  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.setValue(value);
      }
    },
    showClearButton() {
      return this.focused && this.value !== "" && this.clearable;
    },
    styleObj() {
      let count = 0;
      if (this.clearable) {
        count++;
      }
      if (this.type === "password") {
        count++;
      }
      return {
        width: `${22 * count}px`
      };
    },
    activeType() {
      if (this.type !== "password") {
        return this.type;
      }

      if (this.showPassword) {
        return "text";
      }

      return "password";
    },
    isDisabled() {
      return this.disabled !== undefined && this.disabled !== false;
    }
  },

  methods: {
    clear() {
      this.setValue("");
      this.$refs.input.focus();
      this.$emit("clear");
    },

    switchEye() {
      this.showPassword = !this.showPassword;
      this.$refs.input.focus();
    },

    focus() {
      this.focused = true;
      this.$emit("focus");
      this.oldValue = this.value;
    },

    setValue(value) {
      this.$emit("input", value);
    },

    blur() {
      this.focused = false;
      this.$emit("blur", this.value);
      if (this.oldValue !== this.value) {
        this.$emit("change", this.value);
      }
    }
  }
};
</script>
