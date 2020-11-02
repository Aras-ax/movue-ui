<template>
  <mo-page title="多选框 mo-checkbox">
    <div class="demo-title">基础用法</div>
    <div class="demo-row">
      <mo-checkbox label="星期" v-model="day" :options="options"></mo-checkbox>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-checkbox
        label="splitKey: -"
        split-key="-"
        v-model="day1"
        :options="options"
      ></mo-checkbox>
      <mo-checkbox
        label="单项disabled"
        v-model="day"
        :options="weekday"
      ></mo-checkbox>
      <mo-checkbox
        label="星期(禁用)"
        v-model="day"
        disabled
        :options="options"
      ></mo-checkbox>
    </div>
    <div class="demo-title">Events</div>
    <div class="demo-row">
      <mo-checkbox
        label="@change"
        @change="$toast"
        v-model="day"
        :options="options"
      ></mo-checkbox>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      day: 1,
      day1: "2-3",
      options: {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期日"
      },
      weekday: [
        { title: "星期一", value: 1 },
        { title: "星期二", value: 2, disabled: true },
        { title: "星期三", value: 3 },
        { title: "星期四", value: 4 },
        { title: "星期五", value: 5, disabled: true },
        { title: "星期六", value: 6 },
        { title: "星期日", value: 7 }
      ]
    };
  }
};
</script>
