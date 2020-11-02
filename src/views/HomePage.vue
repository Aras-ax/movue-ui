<template>
  <mo-page :hasTitle="false">
    <h1>movue-ui</h1>
    <h2>移动端组件库</h2>
    <div id="nav">
      <section v-for="nav in navs" :key="nav.title">
        <h5 class="title-row">{{ nav.title }}</h5>
        <div class="item-group">
          <router-link
            class="btn-row"
            v-for="item in nav.list"
            :to="item.path"
            :key="item.title"
          >
            <label for="">{{ item.title }}</label>
            <label>
              {{ item.text }}
              <i class="mo-icon-right"></i>
            </label>
          </router-link>
        </div>
      </section>
    </div>
  </mo-page>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      navs: [
        {
          title: "基础组件",
          list: [
            { title: "Text", text: "文本", path: "/text" },
            { title: "Button", text: "按钮", path: "/button" },
            { title: "Line", text: "1px边框", path: "/line" },
            { title: "Input", text: "输入框", path: "/input" },
            { title: "Radio", text: "单选框", path: "/radio" },
            { title: "Checkbox", text: "多选框框", path: "/checkbox" },
            { title: "Select", text: "下拉框", path: "/select" },
            { title: "Switch", text: "开关", path: "/switch" },
            { title: "Range", text: "滑块", path: "/range" },
            { title: "Message", text: "消息提示", path: "/toast" },
            { title: "Dialog", text: "弹出框", path: "/dialog" }
          ]
        },
        {
          title: "布局组件",
          list: [
            { title: "Collapse", text: "折叠面板", path: "/collapse" },
            { title: "Scroll", text: "滚动容器", path: "/scroll" },
            // { title: "Header", text: "导航页头", path: "/button" },
            { title: "List", text: "列表", path: "/list" },
            { title: "Tabs", text: "选项卡", path: "/tab" },
            { title: "Dropdown", text: "底部弹出单选", path: "/dropdown" },
            { title: "DatePicker", text: "日期选择", path: "/datepicker" },
            { title: "Picker", text: "联动选择", path: "/picker" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.btn-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  height: 44px;
  text-decoration: none;
  color: #444;
  position: relative;
  &:not(:last-child):after {
    @include hairline(bottom, $color-border);
  }
}

.title-row {
  padding: 17px 16px 18px;
  background-color: #f5f5f5;
  color: #444;
}

.item-group {
  background-color: #fff;
  padding-left: 16px;
}

.mo-icon-right {
  vertical-align: middle;
  margin-left: 8px;
}

h1,
h2 {
  background-color: $color-theme;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
h1 {
  padding-top: 40px;
  font-size: 28px;
}
h2 {
  padding: 10px 0 40px;
  font-size: 18px;
}
</style>
