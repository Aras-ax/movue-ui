<template>
  <mo-page title="日期选择 mo-date-picker">
    <div class="demo-title">基础用法</div>
    <div class="demo-row">
      <mo-date-picker label="今天" v-model="today"></mo-date-picker>
      <mo-date-picker label="2020年6月1日" v-model="value"></mo-date-picker>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-date-picker
        label="start: 2020"
        :start="2020"
        v-model="today"
      ></mo-date-picker>
      <mo-date-picker
        label="end: 2022"
        :end="2022"
        v-model="today"
      ></mo-date-picker>
      <mo-date-picker
        split-key="/"
        label="splitKey: /"
        v-model="value1"
      ></mo-date-picker>
      <mo-date-picker
        label="format"
        :format="format"
        v-model="today"
      ></mo-date-picker>
      <mo-date-picker
        disabled
        label="disabled：true"
        v-model="today"
      ></mo-date-picker>
    </div>

    <div class="demo-title">Events</div>
    <div class="demo-row">
      <mo-date-picker
        label="@cancel"
        @cancel="cancel"
        v-model="today"
      ></mo-date-picker>
      <mo-date-picker
        label="@confirm"
        @confirm="confirm"
        v-model="today"
      ></mo-date-picker>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      today: "",
      value: "2020-6-1",
      value1: "2020/6/1"
    };
  },
  methods: {
    format(val) {
      return `${val[0]}年${val[1]}月${val[2]}日`;
    },
    cancel() {
      this.$toast("click cancel");
    },
    confirm() {
      this.$toast("click confirm");
    }
  }
};
</script>
