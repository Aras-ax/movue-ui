<template>
  <mo-page title="原生select mo-select">
    <div class="demo-row">
      <mo-select label="星期" v-model="day" :options="options"></mo-select>
      <mo-select
        label="星期(禁用)"
        v-model="day"
        disabled
        :options="options"
      ></mo-select>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      day: 1,
      options: {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期日"
      }
    };
  }
};
</script>
