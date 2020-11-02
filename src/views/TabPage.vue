<template>
  <mo-page title="mo-tab" class="tab-page">
    <div class="demo-title">基础用法</div>
    <mo-tab :buttons="buttons" v-model="value2"></mo-tab>
    <div class="demo-row">{{ value2 }}</div>

    <div class="demo-title">两种风格</div>
    <div class="demo-inner">
      <div class="demo-title">type=button</div>
      <mo-tab type="button" :buttons="buttons" v-model="value1"></mo-tab>
      <div class="demo-row">{{ value1 }}</div>
      <div class="demo-title">type=link</div>
      <mo-tab :buttons="buttons" v-model="value1"></mo-tab>
      <div class="demo-row">{{ value1 }}</div>
    </div>

    <div class="demo-title">横向滚动，只支持type=link模式</div>
    <mo-tab :buttons="buttons1" v-model="value3"></mo-tab>
    <div class="demo-row">{{ value3 }}</div>

    <div class="demo-title">单项Disabled</div>
    <div class="demo-inner">
      <mo-tab
        :buttons="buttons1"
        :disabledKeys="['tab2', 'tab4']"
        v-model="value3"
      ></mo-tab>
      <div class="demo-row">{{ value3 }}</div>
      <mo-tab
        type="button"
        :buttons="buttons"
        :disabledKeys="['tab2']"
        v-model="value1"
      ></mo-tab>
      <div class="demo-row">{{ value1 }}</div>
    </div>

    <div class="demo-title">整体Disabled</div>

    <div class="demo-inner">
      <mo-tab :buttons="buttons1" disabled v-model="value3"></mo-tab>
      <div class="demo-row">{{ value3 }}</div>
      <mo-tab
        type="button"
        :buttons="buttons"
        disabled
        v-model="value1"
      ></mo-tab>
      <div class="demo-row">{{ value1 }}</div>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      value1: "tab1",
      value2: "tab1",
      value3: "tab1",
      buttons: ["tab1", "tab2", "tab3"],
      buttons1: [
        "tab1",
        "tab2",
        "tab3",
        "tab4",
        "tab5",
        "tab6",
        "tab7",
        "tab8",
        "tab9",
        "tab10",
        "tab11",
        "tab12",
        "tab13",
        "tab14"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.demo-row {
  padding: 16px 16px 48px;
}

.demo-inner {
  padding: 16px 16px 0;

  .demo-title {
    padding: 8px;
  }
}

.tab-page {
  background-color: #fff000;
}
</style>
