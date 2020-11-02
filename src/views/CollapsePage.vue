<template>
  <mo-page title="手风琴">
    <div class="demo-title">基本用法</div>
    <mo-collapse label="无问" border="none">
      <div>
        你问风为什么托着候鸟飞翔 却又吹的让他慌张 你问雨为什么滋养万物生长
        却也湿透他的衣裳 你问他为什么亲吻他的伤疤 却又不能带他回家
        你问我为什么还是不敢放下 明知听不到回答
      </div>
    </mo-collapse>
    <div class="demo-title">默认active</div>
    <mo-collapse :active="true" border="none" label="农夫渔夫">
      <div>
        如果有一天我能够拥有一个大果园， 我愿放下所有追求做个农夫去种田，
        每一个早晨我耕耘在绿野田园， 每一个黄昏我守望在乡间的麦田。
        我会把忧虑都融化在夕阳里， 让孤独的心等待秋收的欢喜。
      </div>
    </mo-collapse>
    <div class="demo-title">Events</div>
    <mo-collapse :active="true" border="none" @change="change" label="@change">
      <div>
        如果有一天我能够拥有一个大果园， 我愿放下所有追求做个农夫去种田，
        每一个早晨我耕耘在绿野田园， 每一个黄昏我守望在乡间的麦田。
        我会把忧虑都融化在夕阳里， 让孤独的心等待秋收的欢喜。
      </div>
    </mo-collapse>
    <div class="demo-title">Disabled</div>
    <mo-collapse disabled :active="true" border="none" label="active disabled">
      <div>
        如果有一天我能够拥有一个大果园， 我愿放下所有追求做个农夫去种田，
        每一个早晨我耕耘在绿野田园， 每一个黄昏我守望在乡间的麦田。
        我会把忧虑都融化在夕阳里， 让孤独的心等待秋收的欢喜。
      </div>
    </mo-collapse>
    <mo-collapse disabled label="disabled" border="none">
      <div>
        你问风为什么托着候鸟飞翔 却又吹的让他慌张 你问雨为什么滋养万物生长
        却也湿透他的衣裳 你问他为什么亲吻他的伤疤 却又不能带他回家
        你问我为什么还是不敢放下 明知听不到回答
      </div>
    </mo-collapse>
  </mo-page>
</template>


<script>
export default {
  methods: {
    change(val) {
      this.$toast(val ? "展开" : "折叠");
    }
  }
};
</script>