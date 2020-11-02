<template>
  <div :class="['mo-tab-wrapper', { 'border-bottom': type === 'link', disabled: isDisabled }]" ref="wrapper">
    <nav v-if="type === 'button'" class="mo-tab mo-tab-buttons">
      <a
        :class="[
          'mo-tab-item',
          {
            'is-active': active === btn.value,
            disabled: disabledKeys.indexOf(btn.value) > -1
          }
        ]"
        v-for="btn in formatedButtons"
        :key="btn.value"
        @click="clickHandle(btn.value)"
      >
        {{ btn.title }}
      </a>
    </nav>
    <template v-else>
      <mo-scroll ref="scroll" v-if="scroll" :scrollY="false" :scrollX="true">
        <nav class="mo-tab mo-tab-links" ref="nav">
          <a
            :mo-value="btn.value"
            :class="[
              'mo-tab-item',
              {
                'is-active': active === btn.value,
                disabled: disabledKeys.indexOf(btn.value) > -1
              }
            ]"
            v-for="btn in formatedButtons"
            :key="btn.value"
            @click="clickHandle(btn.value)"
          >
            {{ btn.title }}
          </a>
        </nav>
      </mo-scroll>
      <nav v-else class="mo-tab mo-tab-links" ref="nav">
        <a
          :mo-value="btn.value"
          :class="[
            'mo-tab-item',
            {
              'is-active': active === btn.value,
              disabled: disabledKeys.indexOf(btn.value) > -1
            }
          ]"
          v-for="btn in formatedButtons"
          :key="btn.value"
          @click="clickHandle(btn.value)"
        >
          {{ btn.title }}
        </a>
      </nav>
    </template>
  </div>
</template>

<script>
export default {
  name: "mo-tab",
  props: {
    type: {
      type: String,
      default: "link",
      validator(val) {
        return ["link", "button"].indexOf(val) > -1;
      }
    },
    buttons: {
      type: [Array, Object],
      required: true
    },
    disabled: {
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      required: false
    },
    disabledKeys: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    this.value2Text = {};
    return {
      active: this.value,
      scroll: false
    };
  },
  watch: {
    value(val) {
      if (this.value2Text[val] === undefined) {
        return;
      }
      this.active = val;
    },
    active(val) {
      if (this.scroll) {
        if (this.locate[val] > 0) {
          this.$refs["scroll"].scrollTo(0);
        } else {
          this.$refs["scroll"].scrollTo(this.locate[val]);
        }
      }
    }
  },
  computed: {
    isDisabled() {
      return this.disabled !== false && this.disabled !== undefined;
    },
    formatedButtons() {
      let res = [];
      if (Array.isArray(this.buttons)) {
        this.buttons.forEach(item => {
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
        for (let [key, value] of Object.entries(this.buttons)) {
          res.push({
            title: value,
            value: key
          });
          /* eslint-disable */
          this.value2Text[key] = value;
        }
      }
      if (this.active === undefined || this.value2Text[this.active] === undefined) {
        /* eslint-disable */
        this.active = res[0]["value"];
      }
      return res;
    }
  },
  methods: {
    clickHandle(val) {
      if (this.isDisabled) {
        return;
      }
      if (this.disabledKeys.indexOf(val) > -1) {
        return;
      }
      this.active = val;
      this.$emit("change", val);
      this.$emit("input", val);
    },
    resize() {
      if (this.type === "button") {
        return;
      }
      let outerWidth = this.$refs["wrapper"].clientWidth;
      let innerWidth = 0;
      let locate = (this.locate = {});

      this.$refs["nav"].children.forEach(node => {
        if (node.tagName === "A") {
          innerWidth += node.clientWidth;
          locate[node.getAttribute("mo-value")] = Math.floor(node.offsetLeft + node.clientWidth / 2);
        }
      });

      if (innerWidth > outerWidth) {
        this.$refs["nav"].style.width = innerWidth + "px";
        this.half = Math.floor(outerWidth / 2);
        this.total = innerWidth;

        let cha = outerWidth - innerWidth;

        for (let key in locate) {
          let t = this.half - locate[key];
          locate[key] = t > cha ? t : cha;
        }
        this.scroll = true;
        // this.$nextTick(() => {
        //   this.$refs["scroll"].fresh();
        // }, 300);
      }
    }
  },
  mounted() {
    this.resize();
  }
};
</script>
