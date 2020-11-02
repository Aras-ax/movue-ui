<template>
  <mo-page title="List用mo-text">
    <div class="demo-title">Array List Data</div>
    <div class="demo-row">
      <mo-text v-for="item in list" :key="item.value" :label="item.label">{{
        item.value
      }}</mo-text>
    </div>
    <div class="demo-title">Object Data</div>
    <div class="demo-row">
      <mo-text v-for="(value, key) in obj" :key="key" :label="key">{{
        value
      }}</mo-text>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { label: "mo-input", value: "文本框" },
        { label: "mo-radio", value: "单选按钮" },
        { label: "mo-checkbox", value: "多选框" },
        { label: "mo-switch", value: "开关按钮" },
        { label: "mo-range", value: "范围滑块" }
      ],
      obj: {
        keyA: "valueA",
        keyB: "valueB",
        keyC: "valueC",
        keyD: "valueD",
        keyE: "valueE",
        keyF: "valueF"
      }
    };
  }
};
</script>
