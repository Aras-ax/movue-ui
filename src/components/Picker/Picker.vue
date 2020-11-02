<template>
  <div class="mo-picker-wrapper border-bottom">
    <div class="mo-form-row" :class="{ disabled: isDisabled }" @click="show">
      <label class="mo-form-label">{{ label }}</label>
      <div class="mo-form-value">
        <span class="mo-form-item-value">{{ valueText }}</span>
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
            :style="{ color: confirmColor }"
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
                  :key="item.value"
                  :class="{ 'mo-picker-wheel-disabled-item': item.disabled }"
                  class="mo-picker-wheel-item"
                >
                  {{ item.title }}
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
  name: "mo-picker",
  props: {
    label: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      default: false
    },

    /*
    单选
        [{title: 'x', value: 'xx'}] 或 ['XXX']
    多选
        [[{title: 'x', value: 'xx'}],[{title: 'x', value: 'xx'}],...]
    联动
        [{title: 'x', value: 'xx', children:[{title: 'x', value: 'xx', children:[]}]}]
    */
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: Array,
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
    confirmColor: {
      type: String,
      default: ""
    },
    cancelColor: {
      type: String,
      default: ""
    },
    splitKey: {
      type: String,
      default: ","
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    // 滚轮实例
    this.wheels = null;
    // 值和索引对应关系
    this.valueToIndex = null;
    // 是否是联动的，根据给定的数据类型进行确认
    this.isLinkage = false;
    // 下面两个为联动时使用
    // 值和children的对应关系
    this.valueToChildren = null;
    // 上一次选择的索引列表，用于标识是否需要重新加载
    this.prevSelectedIndex = null;
    return {
      visible: false,
      // 当前正在使用的下拉数据
      pickerData: [],
      // 选中的数据索引
      selectedIndex: []
    };
  },
  watch: {
    value() {
      let oldSelectedIndex = this.selectedIndex.slice(0);
      this._valueToSelected();
      this._loadPickerData(this.selectedIndex, oldSelectedIndex);
    }
  },
  computed: {
    // 值对应的文本，用逗号隔开
    valueText() {
      if (this.pickerData.length === 0) {
        return "";
      }
      let text = [];
      this.selectedIndex.forEach((i, j) => {
        text.push(this.pickerData[j][i].title);
      });
      return text.join(this.splitKey);
    },
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    },
    // 数据二次处理
    formatedData() {
      // 深度，代表可选择的列数
      let deep = 1;
      /* eslint-disable */
      this.valueToIndex = {};
      /* eslint-disable */
      this.isLinkage = false;
      // 确定深度deep和是否联动
      if (typeof this.options[0] === "object") {
        if (this.options[0].children) {
          /* eslint-disable */
          this.isLinkage = true;
          /* eslint-disable */
          this.valueToChildren = {};
          let node = this.options[0];
          while (node && node.children && node.children.length > 0) {
            deep++;
            node = node.children ? node.children[0] : null;
          }
        } else if (Array.isArray(this.options[0])) {
          deep = this.options.length;
        }
      }
      this.deep = deep;

      // 根据提供的selectArray进行格式重构
      return this.options.map((list, index) => {
        // seletArray格式为：[[{title: 'x', value: 'xx'}], [{title: 'x', value: 'xx'}],...]
        if (Array.isArray(list)) {
          return list.map((item, i) => {
            if (typeof item === "object") {
              // 通过两个值拼接，防止多列value值重复
              this.valueToIndex[index + "-" + item.value] = i;
              return {
                title: item.title,
                value: item.value
              };
            } else {
              this.valueToIndex[index + "-" + item] = i;
              return {
                title: item,
                value: item
              };
            }
          });
        }

        let data = {};
        if (typeof list === "object") {
          // seletArray格式为：[{title: 'x', value: 'xx', children:[{title: 'x', value: 'xx', children:[]}]}]
          data.title = list.title;
          data.value = list.value;
          if (list.children) {
            this._loopData(list, list.value);
          }
          this.valueToIndex[list.value] = index;
        } else {
          // seletArray格式为：['xxx', 'xxx', 'xxx']
          data.title = list;
          data.value = list;
          this.valueToIndex[list] = index;
        }
        return data;
      });
    }
  },
  created() {
    // 手动触发计算属性，让valueToIndex赋值
    let formatedData = this.formatedData;
    this._valueToSelected();
    this._loadPickerData(this.selectedIndex, undefined);
  },
  methods: {
    _loopData(node, pre) {
      // 记录联动后代
      let valueToChildren = this.valueToChildren;
      node.children &&
        node.children.forEach((item, index) => {
          if (valueToChildren[pre]) {
            valueToChildren[pre].push({
              title: item.title,
              value: item.value
            });
          } else {
            valueToChildren[pre] = [
              {
                title: item.title,
                value: item.value
              }
            ];
          }
          // 通过两个值拼接，防止多列value值重复
          let key = `${pre}-${item.value}`;
          this._loopData(item, key);
          this.valueToIndex[key] = index;
        });
    },
    _loadPickerData(newSelectedIndex, oldSelectedIndex) {
      let pickerData = this.pickerData;
      let formatedData = this.formatedData;
      if (!this.isLinkage && oldSelectedIndex) {
        return;
      }
      // 非联动初始化
      if (!oldSelectedIndex && !this.isLinkage) {
        this.pickerData = Array.isArray(formatedData[0])
          ? formatedData
          : [formatedData];
        return;
      }

      // 联动
      if (this.isLinkage) {
        if (!oldSelectedIndex) {
          oldSelectedIndex = [...new Array(this.deep)].map(() => Math.random());
        }

        if (this.pickerData.length === 0) {
          this.pickerData.push(formatedData);
          this.pickerData.length = this.deep;
        }

        let preKey = this.pickerData[0][newSelectedIndex[0]].value;
        let diff = false;

        // 根据选择项，确定那列需要重新加载数据
        for (let i = 0; i < this.deep - 1; i++) {
          if (i > 0) {
            preKey += "-" + this.pickerData[i][newSelectedIndex[i]].value;
          }

          if (diff === false && newSelectedIndex[i] !== oldSelectedIndex[i]) {
            diff = true;
          }

          if (diff) {
            this.pickerData.splice(i + 1, 1, this.valueToChildren[preKey]);
            this.$nextTick(() => {
              if (this.wheels) {
                this.wheels[i + 1].refresh();
                this.wheels[i + 1].wheelTo(newSelectedIndex[i + 1]);
              }
            });
          }
        }
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
        return data[currentSelectedIndex[index]].value;
      });
      this.$emit("input", currentSelectedValue);
      this.$emit("confirm", currentSelectedValue, currentSelectedIndex);
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
        this.wheels.forEach((wheel, index) => {
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
          let prevSelectedIndex = this.prevSelectedIndex || this.selectedIndex;
          let currentSelectedIndex = wheels.map(wheel =>
            wheel.getSelectedIndex()
          );
          if (this.isLinkage) {
            currentSelectedIndex = this._checkData(currentSelectedIndex);
          }
          this._loadPickerData(currentSelectedIndex, prevSelectedIndex);
          this.prevSelectedIndex = currentSelectedIndex;
          // this.$emit("scroll", i, this.wheels[i].getSelectedIndex());
        });
      } else {
        this.wheels[i].refresh();
      }

      return this.wheels[i];
    },
    // 数据校正，以免联动时超出索引
    _checkData(arr) {
      let val = [],
        l = arr.length,
        index = l,
        temp = this.options[arr[0]].children;

      for (let i = 1; i < arr.length; i++) {
        if (!temp || temp.length <= arr[i]) {
          index = i;
          break;
        }
        temp = temp[arr[i]].children;
      }
      return arr.map((a, i) => {
        return i < index ? a : 0;
      });
    },
    // value转索引
    _valueToSelected() {
      let res = [];
      if (this.value.length === 1) {
        res.push(this.valueToIndex[this.value[0]]);
      } else {
        if (this.isLinkage) {
          let pre = this.value[0];
          res.push(this.valueToIndex[pre]);
          for (let i = 1; i < this.value.length; i++) {
            pre += "-" + this.value[i];
            res.push(this.valueToIndex[pre]);
          }
        } else {
          this.value.forEach((val, i) => {
            res.push(this.valueToIndex[`${i}-${val}`]);
          });
        }
      }
      this.selectedIndex.splice(0, this.selectedIndex.length, ...res);
    }
  }
};
</script>
