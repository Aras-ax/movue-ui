<template>
  <mo-page title="开关 mo-switch">
    <div class="demo-title">基础用法</div>
    <div class="demo-row">
      <mo-switch label="开关" v-model="val"></mo-switch>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-switch
        label="activeValue: 1, negativeValue: 0"
        :activeValue="1"
        :negativeValue="0"
        v-model="val1"
        @change="$toast"
      ></mo-switch>
      <mo-switch label="开关(禁用)" v-model="val" disabled></mo-switch>
    </div>
    <div class="demo-title">Events</div>
    <div class="demo-row">
      <mo-switch label="@change" v-model="val" @change="$toast"></mo-switch>
    </div>
  </mo-page>
</template>
<script>
export default {
  data() {
    return {
      val: false,
      val1: 1
    };
  }
};
</script>
