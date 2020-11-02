<template>
  <mo-page title="文本框 mo-input">
    <div class="demo-title">基础用法</div>
    <div class="demo-row">
      <mo-input placeholder="文本框" v-model="value"></mo-input>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-input
        placeholder="密码框"
        type="password"
        v-model="password"
      ></mo-input>
      <mo-input
        label="label: 标题"
        placeholder="通过label配置标题"
        v-model="label"
      ></mo-input>
      <mo-input
        label="placeholder"
        placeholder="显示placeholder"
        v-model="placeholder"
      ></mo-input>
      <mo-input
        label="name: age"
        placeholder="表单name属性配置"
        v-model="name"
      ></mo-input>
      <mo-input
        label="maxlength: 8"
        placeholder="最长可输入8位"
        v-model="maxlength"
        maxlength="8"
      ></mo-input>
      <mo-input
        label="clearable: false"
        placeholder="不显示清除按钮"
        v-model="clearable"
        :clearable="false"
      ></mo-input>
      <mo-input label="disabled: true" disabled :value="value"></mo-input>
    </div>
    <div class="demo-title">Events</div>
    <div class="demo-row">
      <mo-input
        label="@focus"
        placeholder="获得焦点时触发"
        v-model="focus"
        @focus="$toast('focus')"
      ></mo-input>
      <mo-input
        label="@blur"
        placeholder="失去焦点时触发"
        v-model="blur"
        @blur="$toast('blur')"
      ></mo-input>
      <mo-input
        label="@clear"
        placeholder="点击清空时触发"
        v-model="clear"
        @clear="$toast('clear')"
      ></mo-input>
      <mo-input
        label="@change"
        placeholder="失去焦点且值改变时触发"
        v-model="change"
        @change="$toast('change')"
      ></mo-input>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      password: "",
      label: "",
      placeholder: "",
      name: "",
      maxlength: "",
      clearable: "",
      change: "",
      blur: "",
      focus: "",
      clear: ""
    };
  }
};
</script>
