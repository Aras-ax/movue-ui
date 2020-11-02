<template>
  <div class="mo-picker-wrapper border-bottom">
    <div class="mo-form-row" :class="{ disabled: isDisabled }" @click="show">
      <label class="mo-form-label">{{ label }}</label>
      <div class="mo-form-value">
        <span class="mo-form-item-value">{{ _formatText() }}</span>
        <i class="mo-form-arrow mo-icon-right"></i>
      </div>
    </div>
    <transition name="mo-fade">
      <div class="mo-pick-mask" v-show="visible" @click="hide"></div>
    </transition>
    <transition name="mo-slide">
      <div class="mo-picker" v-show="visible">
        <div class="mo-picker-head border-bottom">
          <label
            class="mo-picker-button mo-picker-cancel"
            @click="cancel"
            :style="{ color: cancelColor }"
          >
            {{ cancelText }}</label
          >
          <h4 class="mo-picker-title" :style="{ color: titleColor }">
            {{ title }}
          </h4>
          <label
            class="mo-picker-button mo-picker-submit"
            @click="confirm"
            :style="{ color: comfirmColor }"
            >{{ confirmText }}</label
          >
        </div>
        <div class="mo-picker-panel">
          <div class="mo-picker-top border-bottom"></div>
          <div class="mo-picker-bottom border-top"></div>
          <div class="mo-picker-wheel-wrapper" ref="wheelWrapper">
            <div
              class="mo-picker-wheel"
              v-for="(data, index) in pickerData"
              :key="index"
            >
              <ul class="mo-picker-wheel-scroll">
                <li
                  v-for="item in data"
                  :key="item"
                  class="mo-picker-wheel-item"
                >
                  {{ item + texts[index] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Wheel from "@better-scroll/wheel";

BScroll.use(Wheel);

export default {
  name: "mo-date-picker",
  props: {
    label: {
      type: String,
      default: ""
    },
    disabled: {
      default: false
    },
    value: String,
    title: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    titleColor: {
      type: String,
      default: ""
    },
    comfirmColor: {
      type: String,
      default: ""
    },
    cancelColor: {
      type: String,
      default: ""
    },
    splitKey: {
      type: String,
      default: "-"
    },
    start: {
      type: Number,
      default: 1950
    },
    end: {
      type: Number,
      default: 2050
    },
    format: Function
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    // 滚轮实例
    this.wheels = null;
    this.texts = ["年", "月", "日"];
    return {
      visible: false,
      valueArray: [],
      // 当前正在使用的下拉数据
      pickerData: [],
      // 选中的数据索引
      selectedIndex: []
    };
  },
  computed: {
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    }
  },
  watch: {
    value(val) {
      this._valueChange(val);
    }
  },
  created() {
    this._valueChange(this.value);
    this._loadPickerData(this.selectedIndex, undefined);
  },
  methods: {
    _valueChange(val) {
      let date;
      try {
        date = new Date(val);
        if (Number.isNaN(date.getDate())) {
          date = new Date();
        }
      } catch {
        date = new Date();
      }
      let res = [];
      res.push(date.getFullYear());
      res.push(date.getMonth() + 1);
      res.push(date.getDay());
      this.valueArray.splice(0, 3, ...res);
      this.selectedIndex.splice(
        0,
        3,
        res[0] - this.start,
        res[1] - 1,
        res[2] - 1
      );
    },
    _loadPickerData(newSelectedIndex, oldSelectedIndex) {
      let pickerData = this.pickerData;
      // 初始化年和月
      if (!oldSelectedIndex) {
        let years = [];
        for (let i = this.start; i <= this.end; i++) {
          years.push(i);
        }
        pickerData.push(years);
        pickerData.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        pickerData.push(0);
      }
      // 日列表计算
      if (
        !oldSelectedIndex ||
        newSelectedIndex[0] !== oldSelectedIndex[0] ||
        newSelectedIndex[1] !== oldSelectedIndex[1]
      ) {
        let days = new Date(
          pickerData[0][newSelectedIndex[0]],
          pickerData[1][newSelectedIndex[1]],
          0
        ).getDate();

        this.pickerData.splice(
          2,
          1,
          [...new Array(days)].map((a, i) => i + 1)
        );

        this.$nextTick(() => {
          if (this.wheels) {
            this.wheels[2].refresh();
            this.wheels[2].wheelTo(newSelectedIndex[2]);
          }
        });
      }
    },
    confirm() {
      if (this._isMoving()) {
        return;
      }
      this.hide();

      const currentSelectedIndex = this.wheels.map(wheel => {
        return wheel.getSelectedIndex();
      });

      const currentSelectedValue = this.pickerData.map((data, index) => {
        return data[currentSelectedIndex[index]];
      });
      this.$emit("input", currentSelectedValue.join(this.splitKey));
      this.$emit("confirm", currentSelectedValue.join(this.splitKey));
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    _isMoving() {
      return this.wheels.some(wheel => {
        return wheel.pending;
      });
    },
    show() {
      if (this.visible || this.isDisabled) {
        return;
      }

      this.visible = true;
      if (!this.wheels) {
        this.$nextTick(() => {
          this.wheels = [];
          let wheelWrapper = this.$refs.wheelWrapper;
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i);
          }
        });
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable();
          this.wheels[i].wheelTo(this.selectedIndex[i]);
        }
      }
    },
    hide() {
      this.visible = false;

      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable();
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.wheels.forEach(wheel => {
          wheel.refresh();
        });
      });
    },
    _createWheel(wheelWrapper, i) {
      const wheels = this.wheels;
      if (!wheels[i]) {
        wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: this.selectedIndex[i],
            wheelWrapperClass: "mo-picker-wheel-scroll",
            wheelItemClass: "mo-picker-wheel-item"
          },
          probeType: 3
        });
        // when any of wheels'scrolling ended , you should refresh data
        wheels[i].on("scrollEnd", () => {
          let prevSelectedIndex = this.selectedIndex;
          let currentSelectedIndex = wheels.map(wheel =>
            wheel.getSelectedIndex()
          );
          this._loadPickerData(currentSelectedIndex, prevSelectedIndex);
          this.selectedIndex = currentSelectedIndex;
        });
      } else {
        this.wheels[i].refresh();
      }

      return this.wheels[i];
    },

    _formatText() {
      if (this.format) {
        return this.format(this.valueArray);
      }
      return this.valueArray.join(this.splitKey);
    }
  }
};
</script>
