<template>
  <mo-page title="边框 mo-line">
    <div class="demo-row" style="padding: 16px">
      <mo-line class="line" direction="top">上边框</mo-line>
      <mo-line class="line" direction="left">左边框</mo-line>
      <mo-line class="line" direction="right">右边框</mo-line>
      <mo-line class="line" direction="bottom">下边框</mo-line>
      <mo-line class="line" direction="bottom" type="error">红边框</mo-line>
      <mo-line class="line" direction="bottom" type="link"></mo-line>
    </div>
  </mo-page>
</template>

<style scope>
.line {
  padding: 12px;
  margin: 6px 0;
}
</style>
