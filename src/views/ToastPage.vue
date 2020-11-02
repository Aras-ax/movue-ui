<template>
  <mo-page title="Message 消息提醒">
    <div class="demo-title">基础用法</div>
    <div class="button-row">
      <mo-button type="primary" @click="loading">loading</mo-button>
      <mo-button type="primary" @click="toast">toast</mo-button>
      <mo-button type="primary" @click="success">success</mo-button>
      <mo-button type="primary" @click="warning">warning</mo-button>
      <mo-button type="primary" @click="error">error</mo-button>
      <mo-button type="primary" @click="toast1">很长的toast</mo-button>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-dropdown
        label="消息提醒类型"
        v-model="type"
        :options="typeOptions"
      ></mo-dropdown>
      <mo-input
        v-model="message"
        label="提示内容"
        placeholder="请输入提示内容"
      ></mo-input>
      <mo-range
        label="显示时间(ms)"
        :min="1000"
        :max="15000"
        :step="500"
        v-model="duration"
      ></mo-range>
    </div>
    <div class="button-row">
      <mo-button block type="primary" @click="showPop">点击显示提醒</mo-button>
    </div>
  </mo-page>
</template>


<script>
export default {
  methods: {
    loading() {
      let load = this.$loading();
      setTimeout(() => {
        load.close();
      }, 3000);
    },
    warning() {
      this.$warning("warning");
    },
    success() {
      this.$success({ message: "success", duration: 6000 });
    },
    toast() {
      this.$toast("你问风，为什么托着候鸟飞翔!");
    },
    toast1() {
      this.$toast("这条信息这么长，有没有看到，是不是很长，哈哈哈！");
    },
    error() {
      this.$error("输入有误，请重新输入！");
    },
    showPop() {
      if (this.message === "") {
        this.$error("请输入提示内容！");
        return;
      }

      this.$message({
        type: this.type,
        message: this.message,
        duration: this.duration
      });
    }
  },
  data() {
    return {
      type: "toast",
      typeOptions: [
        { value: "toast", title: "消息提示" },
        { value: "error", title: "错误提示" },
        { value: "loading", title: "加载中" },
        { value: "warning", title: "警告提示" },
        { value: "success", title: "成功提示" }
      ],
      duration: 1000,
      message: ""
    };
  }
};
</script>