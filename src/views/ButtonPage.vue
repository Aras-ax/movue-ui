<template>
  <mo-page title="按钮 mo-button">
    <div class="demo-title">基础用法</div>
    <div class="button-row">
      <mo-button>默认</mo-button>
    </div>

    <div class="demo-title">独占一行: block</div>
    <div class="button-row">
      <mo-button block>block</mo-button>
    </div>

    <div class="demo-title">各种主题: type</div>
    <div class="button-row">
      <mo-button type="primary" block>type = primary</mo-button>
      <mo-button type="error" block>type = error</mo-button>
      <mo-button type="warning" block>type = warning</mo-button>
      <mo-button type="link" block>type = link</mo-button>
      <mo-button type="success" block>type = success</mo-button>
    </div>

    <div class="demo-title">无填充按钮：plain</div>
    <div class="button-row">
      <mo-button type="primary" block plain>type = primary</mo-button>
      <mo-button type="error" block plain>type = error</mo-button>
      <mo-button type="warning" block plain>type = warning</mo-button>
      <mo-button type="link" block plain>type = link</mo-button>
      <mo-button type="success" block plain>type = success</mo-button>
    </div>

    <div class="demo-title">按钮大小：size</div>
    <div class="button-row">
      <mo-button type="primary" size="max">max</mo-button>
      <mo-button type="link">normal</mo-button>
      <mo-button type="success" size="min">min</mo-button>
    </div>

    <div class="demo-title">圆角按钮：round</div>
    <div class="button-row">
      <mo-button type="primary" size="max" round>round</mo-button>
      <mo-button type="link" round>round</mo-button>
      <mo-button type="success" size="min" round>round</mo-button>
      <mo-button type="error" size="max" round>3</mo-button>
    </div>

    <div class="demo-title">圆行按钮：circle</div>
    <div class="button-row">
      <mo-button type="success" size="min" round>1</mo-button>
      <mo-button type="link" round>2</mo-button>
      <mo-button type="error" size="max" round>3</mo-button>
      <mo-button
        type="success"
        size="max"
        circle
        icon="mo-icon-delete"
      ></mo-button>
      <mo-button type="success" circle icon="mo-icon-delete"></mo-button>
      <mo-button
        type="success"
        size="min"
        circle
        icon="mo-icon-delete"
      ></mo-button>
    </div>

    <div class="demo-title">带图标按钮：icon</div>
    <div class="button-row">
      <mo-button type="link" round icon="mo-icon-delete"
        >icon="mo-icon-delete"</mo-button
      >
      <mo-button type="error" size="min" icon="mo-icon-delete"
        >delete</mo-button
      >
    </div>

    <div class="demo-title">disabled</div>
    <div class="button-row">
      <mo-button type="error" block disabled>disabled</mo-button>
    </div>

    <div class="demo-title">click事件</div>
    <div class="button-row">
      <mo-button type="primary" @click="btnclick" block>
        click handle
      </mo-button>
      <mo-button type="error" @click="click('error')" block
        >一个参数
      </mo-button>
      <mo-button type="link" @click="click1('error', '111')" block
        >两个参数
      </mo-button>
    </div>
  </mo-page>
</template>

<script>
export default {
  methods: {
    btnclick() {
      alert("click");
    },
    click(type) {
      alert(`click ${type}`);
    },
    click1(type, t) {
      alert(`传递两个参数 [${type}, ${t}]`);
    }
  }
};
</script>