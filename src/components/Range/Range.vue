<template>
  <div class="mo-range-wrapper" :class="[`border-${border}`]">
    <div class="mo-form-row" :class="{ disabled: isDisabled }">
      <label class="mo-form-label" v-if="label">{{ label }}</label>
      <div class="mo-range mo-form-value">
        <label class="mo-range-min">
          <slot name="start">{{ min }} </slot>
        </label>
        <div class="mo-range-content" ref="content">
          <div
            class="mo-range-runway"
            :style="{ 'border-top-width': barHeight + 'px' }"
          ></div>
          <div
            class="mo-range-progress"
            :style="{ width: progress + '%', height: barHeight + 'px' }"
          ></div>
          <div
            class="mo-range-thumb"
            ref="thumb"
            :style="{ left: progress + '%' }"
          ></div>
        </div>
        <label class="mo-range-max">
          <slot name="end">{{ max }} </slot>
        </label>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import draggable from "./draggable";

export default {
  name: "mo-range",

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    barHeight: {
      type: Number,
      default: 1
    },
    value: {
      type: Number
    },
    border: {
      default: "bottom",
      type: String,
      validator(val) {
        return ["top", "bottom", "all", "none"].indexOf(val) !== -1;
      }
    },
    label: {
      type: [String, Number],
      required: false
    }
  },

  model: {
    prop: "value",
    event: "input"
  },

  computed: {
    progress() {
      const value = this.value;
      if (typeof value === "undefined" || value === null || value <= this.min)
        return 0;
      if (value >= this.max) return 100;

      return Math.floor(((value - this.min) / (this.max - this.min)) * 100);
    },
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    }
  },

  created() {
    if (this.value < this.min) {
      this.$emit("input", this.min);
    } else if (this.value > this.max) {
      this.$emit("input", this.max);
    }
  },

  mounted() {
    const thumb = this.$refs.thumb;
    const content = this.$refs.content;

    const getThumbPosition = () => {
      const contentBox = content.getBoundingClientRect();
      const thumbBox = thumb.getBoundingClientRect();
      return {
        left: thumbBox.left - contentBox.left,
        top: thumbBox.top - contentBox.top,
        thumbBoxLeft: thumbBox.left
      };
    };

    let dragState = {};
    draggable(thumb, {
      start: event => {
        if (this.disabled) return;
        const position = getThumbPosition();
        const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
        dragState = {
          thumbStartLeft: position.left,
          thumbStartTop: position.top,
          thumbClickDetalX: thumbClickDetalX
        };
      },
      drag: event => {
        if (this.disabled) return;
        const contentBox = content.getBoundingClientRect();
        const deltaX =
          event.pageX -
          contentBox.left -
          dragState.thumbStartLeft -
          dragState.thumbClickDetalX;
        const stepCount = Math.ceil((this.max - this.min) / this.step);
        const newPosition =
          dragState.thumbStartLeft +
          deltaX -
          ((dragState.thumbStartLeft + deltaX) %
            (contentBox.width / stepCount));

        let newProgress = newPosition / contentBox.width;

        if (newProgress < 0) {
          newProgress = 0;
        } else if (newProgress > 1) {
          newProgress = 1;
        }

        let val =
          this.min +
          Math.round(newProgress * ((this.max - this.min) / this.step)) *
            this.step;

        if (val > this.max) {
          val = this.max;
        }

        this.$emit("input", Math.round(val));
      },
      end: () => {
        if (this.disabled) return;
        this.$emit("change", this.value);
        dragState = {};
      }
    });
  }
};
</script>
