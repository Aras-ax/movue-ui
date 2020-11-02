# movue-ui

移动端 UI 组件库。[在线示例](https://moshang-xc.github.io/movue-ui/)


## 使用

### 安装
```
npm i movue-ui -S
```

### 完全引用
```
import MoUi from 'movue-ui';

Vue.use(MoUi);
```

### 按需引用

1. 安装 [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component) 插件
2. `.babelrc`配置
```js
plugins: [
  [
    "component",
    {
      libraryName: "movue-ui", //插件名称
      styleLibraryName: "css", //插件样式目录
      libDir: "dist/lib" //插件库路径
    }
  ]
]
```
3. `import`需要使用的组件
```js
import { Base, Datepicker, Input } from "movue-ui";

Vue.use(Base);
Vue.use(Datepicker);
Vue.use(Input);
```
> 其中`Base`为组件基础支撑项，必须引入项，否则组件会不生效。



# 组件列表

- [mo-text 文本](#mo-text)
- [mo-button 按钮](#mo-button)
- [mo-line 1px 边框](#mo-line)
- [mo-input 文本框](#mo-input)
- [mo-radio 单选框](#mo-radio)
- [mo-checkbox 复选框](#mo-checkbox)
- [mo-select 原生 select](#mo-select)
- [mo-switch 开关按钮](#mo-switch)
- [mo-range 范围选择滑块](#mo-range)
- [mo-collapse 手风琴折叠](#mo-collapse)
- [mo-dropdown 底部弹出单选器](#mo-dropdown)
- [mo-date-picker 日期选择器](#mo-date-picker)
- [mo-picker 多列，联动选择器](#mo-picker)
- [mo-scroll 回弹滚动容器](#mo-scroll)
- [mo-tab 导航按钮组](#mo-tab)
- [toast 消息提示](#toast消息提示)
- [Dialog 弹出框](#Dialog)


# API

## mo-text

文本显示组件，用于显示单行文本，表单文本，或者 list 内容。

###  基础用法

```vue
<mo-text label="使用value属性" value="无问"></mo-text>

<mo-text label="使用slot">
    <div>无问</div>
</mo-text>
```

### Attributes

| 参数        | 说明           | 类型    | 可选值                 | 默认值 |
| ----------- | -------------- | ------- | ---------------------- | ------ |
| value       | 绑定值         | string  | -                      | -      |
| label       | 标题           | string  | -                      | -      |
| border      | 显示的边框类型 | string  | top, bottom, all, none | bottom |
| placeholder | 占位文本       | string  | -                      | -      |
| disabled    | 禁用           | boolean | -                      | false  |

### Slots

| name    | 说明                          |
| ------- | ----------------------------- |
| default | 显示内容，替换显示`value`的值 |

> 优先级：`slot` > `value` > `placeholder`

### 按需引入
```js
import { Text } from "movue-ui";
Vue.use(Text);
```



## mo-button

常用的操作按钮，提供多种样式主题。

###  基础用法

**默认按钮：**

```vue
<mo-button>默认</mo-button>
```

**独占一行：block**

```vue
<mo-button block>block</mo-button>
```

**各种主题：type**

```vue
<mo-button type="primary">primary</mo-button>
<mo-button type="error">error</mo-button>
<mo-button type="warning">warning</mo-button>
<mo-button type="link">link</mo-button>
<mo-button type="success">success</mo-button>
```

**无填充按钮：plain**

```vue
<mo-button type="primary" plain>plain</mo-button>
```

**不同大小按钮：size**

```vue
<mo-button type="primary" size="min">size=min</mo-button>
<mo-button type="primary">size=normal</mo-button>
<mo-button type="primary" size="max">size=max</mo-button>
```

**圆角按钮：round**

```vue
<mo-button type="primary" round>round</mo-button>
```

**圆形按钮：circle**

```vue
<mo-button type="primary" circle>1</mo-button>
```

**带图标按钮：icon**

```vue
<mo-button type="error" icon="mo-icon-delete">delete</mo-button>
```

### Attributes

| 参数     | 说明                       | 类型    | 可选值                                          | 默认值  |
| -------- | -------------------------- | ------- | ----------------------------------------------- | ------- |
| plain    | 是否不填充背景色           | boolean | -                                               | false   |
| round    | 是否圆角按钮               | boolean | -                                               | false   |
| circle   | 是否圆形按钮               | boolean | -                                               | false   |
| icon     | 图标类名                   | string  | -                                               | -       |
| type     | 类型，不同类型对应不同主题 | string  | default, primary, error, warning, success, link | default |
| size     | 尺寸                       | string  | max, normal, min                                | -       |
| block    | 是否独占一行               | boolean | -                                               | false   |
| disabled | 禁用                       | boolean | -                                               | false   |
| margin   | style 属性 margin 的值     | string  | -                                               | -       |
| border   | 是否显示边框               | boolean | -                                               | true    |

### Slots

| name    | 说明           |
| ------- | -------------- |
| default | 按钮显示的内容 |

### Events

| 事件名称 | 说明     | 参数                                                 |
| -------- | -------- | ---------------------------------------------------- |
| click    | 点击事件 | 未提供参数，默认传(event: Event)，否则传递提供的参数 |

### 按需引入
```js
import { Button } from "movue-ui";
Vue.use(Button);
```



## mo-line

对边框进行统一规范，移动端 1px 粗细线条。

### 基础用法

```vue
<mo-line direction="top">上边框</mo-line>
<mo-line direction="left">左边框</mo-line>
<mo-line direction="right">右边框</mo-line>
<mo-line direction="bottom">下边框</mo-line>
```

### Attributes

| 参数      | 说明                                      | 类型   | 可选值                                         | 默认值  |
| --------- | ----------------------------------------- | ------ | ---------------------------------------------- | ------- |
| direction | 哪个方向的线条                            | string | top, bottom, right, left                       | top     |
| type      | 线条颜色主题，同[mo-button](#mo-button) | string | default,primary, error, warning, success, link | default |

### Slots

| name    | 说明         |
| ------- | ------------ |
| default | 线条内的内容 |

### 按需引入

```js
import { Line } from "movue-ui";
Vue.use(Line);
```



## mo-input

`input`文本输入框，通过鼠标或键盘输入字符。

### 基础用法

```vue
<mo-input placeholder="文本框" v-model="value"></mo-input>
<mo-input label="密码框" placeholder="密码框" type="password" v-model="password"></mo-input>
```

### Attributes

| 参数            | 说明                            | 类型            | 可选值                      | 默认值 |
| --------------- | ------------------------------- | --------------- | --------------------------- | ------ |
| type            | 类型                            | string          | 原生可输入 input 的 type 值 | text   |
| value / v-model | 绑定值                          | string / number | -                           | -      |
| maxlength       | 原生属性，最大输入长度          | number          | -                           | -      |
| placeholder     | 原生属性，输入框占位文本        | string          | -                           | -      |
| clearable       | 是否可清空                      | boolean         | -                           | true   |
| disabled        | 禁用                            | boolean         | -                           | false  |
| name            | 原生属性                        | string          | -                           | -      |
| label           | 标题                            | string          | -                           | -      |
| border          | 显示的边框类型                  | string          | top, bottom, all, none      | bottom |
| switchable      | password 时是否显示切换密码图标 | boolean         | - [待开发]                  | true   |

### Events [todo 确认参数]

| 事件名称 | 说明                   | 参数  |
| -------- | ---------------------- | ----- |
| focus    | 获取焦点时触发         | value |
| blur     | 失去焦点时触发         | value |
| clear    | 点击清空时触发         | value |
| change   | 失去焦点且值改变时触发 | value |

### 按需引入

```js
import { Input } from "movue-ui";
Vue.use(Input);
```



## mo-radio

单选框，在一组备选项中进行单选。

### 基础用法

```vue
<template>
  <mo-radio label="性别" v-model="sex" :options="options"></mo-radio>
	<mo-radio label="性别" v-model="sex" :options="options1"></mo-radio>
</template>

<script>
export default {
    data(){
      sex: "0",
      options: {
        0: "男",
        1: "女"
      }, 
      options1: [
          {title: "男", value: '0'},
          {title: "女", value: '1'}
		]
    }
}
</script>
```

### Attributes

| 参数            | 说明         | 类型           | 可选值                 | 默认值 |
| --------------- | ------------ | -------------- | ---------------------- | ------ |
| options         | 选项列表     | array, object  | -                      | -      |
| value / v-model | 绑定值       | string, number | -                      | -      |
| label           | 标题         | string         | -                      | -      |
| border          | 显示边框方向 | string         | top, bottom, all, none | bottom |
| disabled        | 禁用         | boolean        | -                      | false  |
| name            | 原生属性     | string         | -                      | -      |

**options为Array且数组中的每一项为Object时，项的配置：**

| 参数  | 说明     | 类型                    | 可选值 | 默认值 |
| ----- | -------- | ----------------------- | ------ | ------ |
| title | 显示文本 | string, number, boolean | -      | -      |
| value | 值       | string, number, boolean | -      | -      |

### Events

| 事件名称 | 说明         | 参数    |
| -------- | ------------ | ------- |
| change   | 值改变时触发 | `value` |

### 按需引入

```js
import { Radio } from "movue-ui";
Vue.use(Radio);
```



## mo-checkbox

多选框，在一组备选项中进行多选。

### 基础用法

```vue
<template>
	<mo-checkbox label="星期" v-model="day" :options="options"></mo-checkbox>
	<mo-checkbox label="星期" v-model="day" :options="weekday"></mo-checkbox>
</template>

<script>
	export default {
        data(){
            day: '1',
      		options: ['1','2','3','4','5','6','7'],
            weekday: [
        		{ title: "星期一", value: 1 },
            	{ title: "星期二", value: 2, disabled: true },
        		{ title: "星期三", value: 3 },
        		{ title: "星期四", value: 4 },
        		{ title: "星期五", value: 5, disabled: true },
        		{ title: "星期六", value: 6 },
        		{ title: "星期日", value: 7 }
      		]
        }
    }
</script>
```



### Attributes

| 参数            | 说明           | 类型          | 可选值                 | 默认值 |
| --------------- | -------------- | ------------- | ---------------------- | ------ |
| options         | 选项列表       | array, object | -                      | -      |
| value / v-model | 绑定值         | string        | -                      | -      |
| label           | 标题           | string        | -                      | -      |
| border          | 显示边框方向   | string        | top, bottom, all, none | bottom |
| disabled        | 禁用           | boolean       | -                      | false  |
| splitKey        | 多个值的连接符 | string        | -                      | `,`    |
| name            | 原生属性       | string        | -                      | -      |

**options为Array且数组中的每一项为Object时，项的配置：**

| 参数  | 说明     | 类型                    | 可选值 | 默认值 |
| ----- | -------- | ----------------------- | ------ | ------ |
| title | 显示文本 | string, number, boolean | -      | -      |
| value | 值       | string, number, boolean | -      | -      |

### 

### Events

| 事件名称 | 说明         | 参数    |
| -------- | ------------ | ------- |
| change   | 值改变时触发 | `value` |

### 按需引入

```js
import { Checkbox } from "movue-ui";
Vue.use(Checkbox);
```



## mo-select

选择器，当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

```vue
<template>
	<mo-select label="星期" v-model="day" :options="options"></mo-select>
	<mo-select label="星期" v-model="day" :options="weekday">
    </mo-select>
</template>

<script>
	export default {
        data(){
            day: '1',
      		options: ['1','2','3','4','5','6','7'],
            weekday: [
        		{ title: "星期一", value: 1 },
            	{ title: "星期二", value: 2, disabled: true },
        		{ title: "星期三", value: 3 },
        		{ title: "星期四", value: 4 },
        		{ title: "星期五", value: 5, disabled: true },
        		{ title: "星期六", value: 6 },
        		{ title: "星期日", value: 7 }
      		]
        }
    }
</script>
```

### Attributes

| 参数            | 说明         | 类型           | 可选值                 | 默认值 |
| --------------- | ------------ | -------------- | ---------------------- | ------ |
| options         | 选项列表     | array, object  | -                      | -      |
| value / v-model | 绑定值       | string, number | -                      | -      |
| label           | 标题         | string         | -                      | -      |
| border          | 显示边框方向 | string         | top, bottom, all, none | bottom |
| disabled        | 禁用         | boolean        | -                      | false  |
| name            | 原生属性     | string         | -                      | -      |

**options为Array且数组中的每一项为Object时，项的配置：**

| 参数  | 说明     | 类型                    | 可选值 | 默认值 |
| ----- | -------- | ----------------------- | ------ | ------ |
| title | 显示文本 | string, number, boolean | -      | -      |
| value | 值       | string, number, boolean | -      | -      |

### Events

| 事件名称 | 说明         | 参数    |
| -------- | ------------ | ------- |
| change   | 值改变时触发 | `value` |

### 按需引入

```js
import { Select } from "movue-ui";
Vue.use(Select);
```



## mo-switch

开关，表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法

```vue
<mo-switch label="开关" v-model="val"></mo-switch>
<mo-switch :activeValue="1" :negativeValue="0" v-model="val1" ></mo-switch>
```

### Attributes

| 参数            | 说明           | 类型                    | 可选值                 | 默认值 |
| --------------- | -------------- | ----------------------- | ---------------------- | ------ |
| value / v-model | 绑定值         | string, number, boolean | -                      | -      |
| activeValue     | 开启时对应的值 | string, number, boolean | -                      | true   |
| negativeValue   | 关闭时对应的值 | string, number, boolean | -                      | false  |
| label           | 标题           | string                  | -                      | -      |
| border          | 显示边框方向   | string                  | top, bottom, all, none | bottom |
| disabled        | 禁用           | boolean                 | -                      | false  |
| name            | 原生属性       | string                  | -                      | -      |

### Events

| 事件名称 | 说明         | 参数    |
| -------- | ------------ | ------- |
| change   | 值改变时触发 | `value` |

### 按需引入

```js
import { Switch } from "movue-ui";
Vue.use(Switch);
```



## mo-range

滑块，通过拖动滑块在一个固定区间内进行选择。

### 基础用法

```vue
<mo-range v-model="value"></mo-range>
<mo-range v-model="value" :step="10"></mo-range>
<mo-range v-model="value" :min="10" :max="80"></mo-range>
```

### Attributes

| 参数            | 说明                            | 类型    | 可选值                 | 默认值 |
| --------------- | ------------------------------- | ------- | ---------------------- | ------ |
| value / v-model | 绑定值                          | number  | -                      | -      |
| min             | 最小值                          | number  | -                      | 0      |
| max             | 最大值                          | number  | -                      | 100    |
| step            | 步长，`max-min`是`step`的整数倍 | number  | -                      | 1      |
| barHeight       | 拖动栏高，单位 px               | number  |                        | 1      |
| label           | 标题                            | string  | -                      | -      |
| border          | 显示边框方向                    | string  | top, bottom, all, none | bottom |
| disabled        | 禁用                            | boolean | -                      | false  |
| name [待开发]   | 原生属性                        | string  | -                      | -      |

### Events

| 事件名称 | 说明         | 参数    |
| -------- | ------------ | ------- |
| change   | 值改变时触发 | `value` |

### 按需引入

```js
import { Range } from "movue-ui";
Vue.use(Range);
```



## mo-collapse

折叠面板，通过折叠面板收纳内容区域。

### 基础用法

```vue
<mo-collapse label="无问" border="none">
	<div>
        你问风为什么托着候鸟飞翔 
        却又吹的让他慌张 
        你问雨为什么滋养万物生长
        却也湿透他的衣裳 
        你问他为什么亲吻他的伤疤 
        却又不能带他回家
        你问我为什么还是不敢放下 
        明知听不到回答
	</div>
</mo-collapse>
```

### Attributes

| 参数     | 说明         | 类型    | 可选值                 | 默认值 |
| -------- | ------------ | ------- | ---------------------- | ------ |
| active   | 选项列表     | boolean | -                      | false  |
| label    | 标题         | string  | -                      | -      |
| border   | 显示边框方向 | string  | top, bottom, all, none | top    |
| disabled | 禁用         | boolean | -                      | false  |

### Slots

| name    | 说明     |
| ------- | -------- |
| default | 面板内容 |

### Events

| 事件名称 | 说明             | 参数    |
| -------- | ---------------- | ------- |
| change   | 展开或收起时触发 | `value` |

### 按需引入

`mo-collapse`默认依赖`mo-collapse-transition`组件，需要同时引入`mo-collapse-transition`组件。

```js
import {Transition, Collapse } from "movue-ui";
Vue.use(Transition);
Vue.use(Collapse);
```



## mo-dropdown

从底部往上弹出单列单选列表。

### 基础用法

```vue
<template>
  <div>
    <mo-dropdown label="选框一(非Object)" v-model="value" :options="array"></mo-dropdown>
    <mo-dropdown label="选框二(Object)" v-model="value" :options="arrayObject"></mo-dropdown>
  </div>
</template>

<script>
export default {
    data(){
      value: 1,
      array: [1, 2, 3, 4, 5, 6, 7],
      arrayObject: [
        { title: "星期一", value: 1 },
        { title: "星期二", value: 2 },
        { title: "星期三", value: 3 },
        { title: "星期四", value: 4 },
        { title: "星期五", value: 5 },
        { title: "星期六", value: 6 },
        { title: "星期日", value: 7 }
      ]
    }
}
</script>
```

### Attributes

| 参数            | 说明           | 类型                    | 可选值                 | 默认值    |
| --------------- | -------------- | ----------------------- | ---------------------- | --------- |
| options         | 选项列表       | array                   | -                      | -         |
| value / v-model | 绑定值         | string, number, boolean | -                      | -         |
| label           | 标题           | string                  | -                      | -         |
| title           | 弹出框标题     | string                  | top, bottom, all, none | -         |
| disabled        | 禁用           | boolean                 | -                      | false     |
| confirmText     | 确认按钮文本   | string                  | -                      | 确定      |
| cancelText      | 取消按钮文本   | string                  | -                      | 取消      |
| titleColor      | 弹出框标题颜色 | string                  | -                      | `#333`    |
| confirmColor    | 确认按钮颜色   | string                  | -                      | `#ff642b` |
| cancelColor     | 取消按钮颜色   | string                  | -                      | `#8c8c8c` |

**options为Array且数组中的每一项为Object时，项的配置：**

| 参数  | 说明     | 类型                    | 可选值 | 默认值 |
| ----- | -------- | ----------------------- | ------ | ------ |
| title | 显示文本 | string, number, boolean | -      | -      |
| value | 值       | string, number, boolean | -      | -      |

### Events

| 事件名称 | 说明           | 参数     |
| -------- | -------------- | -------- |
| cancel   | 点击取消时触发 | [待确认] |
| confirm  | 点击确认时触发 | [待确认] |

### 按需引入

`mo-dropdown`组件继承自`mo-picker`，需要同时引入`mo-picker`组件。

```js
import { Picker, Dropdown } from "movue-ui";
Vue.use(Picker);
Vue.use(Dropdown);
```



## mo-date-picker

日期选择器，选择年月日时间。

### 基础用法

```vue
<template>
  <mo-date-picker label="今天" v-model="today"></mo-date-picker>
  <mo-date-picker label="2020年6月1日" v-model="value"></mo-date-picker>
</template>

<script>
export default {
    data(){
        today: '',
        value: '2020-6-1'
    }
}
</script>
```

### Attributes

| 参数            | 说明                   | 类型     | 可选值                 | 默认值    |
| --------------- | ---------------------- | -------- | ---------------------- | --------- |
| value / v-model | 绑定值，为空默认为今天 | string   | -                      | -         |
| start           | 开始年份               | number   | -                      | 1950      |
| end             | 结束年份               | number   | -                      | 2050      |
| splitKey        | 年月日连接符           | string   | -                      | `-`       |
| format          | 数据格显示规则         | function | -                      | -         |
| label           | 标题                   | string   | -                      | -         |
| title           | 弹出框标题             | string   | top, bottom, all, none | -         |
| disabled        | 禁用                   | boolean  | -                      | false     |
| confirmText     | 确认按钮文本           | string   | -                      | 确定      |
| cancelText      | 取消按钮文本           | string   | -                      | 取消      |
| titleColor      | 弹出框标题颜色         | string   | -                      | `#333`    |
| confirmColor    | 确认按钮颜色           | string   | -                      | `#ff642b` |
| cancelColor     | 取消按钮颜色           | string   | -                      | `#8c8c8c` |

### Events

| 事件名称 | 说明           | 参数     |
| -------- | -------------- | -------- |
| cancel   | 点击取消时触发 | [待确认] |
| confirm  | 点击确认时触发 | [待确认] |

### 按需引入

```js
import { Datepicker } from "movue-ui";
Vue.use(Datepicker);
```



## mo-picker

多列选择器，联动选择器，可以配置地区选择等。

### 基础用法

**非联动选择器：**

```vue
<template>
  <mo-picker label="多列选框" v-model="value" :options="array"></mo-picker>
</template>

<script>
export default {
    data() {
      	value: [1, "早上"],
      	array: [
        	[1, 2, 3, 4, 5, 6, 7],
        	["早上", "中午", "晚上"]
      	],
    }
}
</script>
```

**联动选择器：**

```vue
<template>
  <mo-picker label="地址选择器" v-model="value" :options="array"></mo-picker>
</template>

<script>
export default {
    data() {
      value: ["110000", "110100"],
      array: [
        {
          title: "北京市",
          value: "110000",
          children: [
            { title: "北京市", value: "110100" }
          ]
        },
        {
          title: "上海市",
          value: "310000",
          children: [
            { title: "上海市", value: "310100" }
          ]
        },
        {
          title: "广东省",
          value: "440000",
          children: [
            { title: "广州市", value: "440100" },
            { title: "深圳市", value: "440300" }
          ]
        },
        {
          title: "江苏省",
          value: "320000",
          children: [
            { title: "南京市", value: "320100" },
            { title: "苏州市", value: "320500" }
          ]
        }
      ]
    }
}
</script>
```

| 参数            | 说明           | 类型           | 可选值                 | 默认值    |
| --------------- | -------------- | -------------- | ---------------------- | --------- |
| options         | 选项列表       | array          | -                      | -         |
| value / v-model | 绑定值         | string, number | -                      | -         |
| splitKey        | 显示文本连接符 | string         | -                      | `,`       |
| label           | 标题           | string         | -                      | -         |
| title           | 弹出框标题     | string         | top, bottom, all, none | -         |
| disabled        | 禁用           | boolean        | -                      | false     |
| confirmText     | 确认按钮文本   | string         | -                      | 确定      |
| cancelText      | 取消按钮文本   | string         | -                      | 取消      |
| titleColor      | 弹出框标题颜色 | string         | -                      | `#333`    |
| confirmColor    | 确认按钮颜色   | string         | -                      | `#ff642b` |
| cancelColor     | 取消按钮颜色   | string         | -                      | `#8c8c8c` |

**options为Array且数组中的每一项为Object时，项的配置：**

| 参数     | 说明     | 类型                    | 可选值 | 默认值 |
| -------- | -------- | ----------------------- | ------ | ------ |
| title    | 显示文本 | string, number, boolean | -      | -      |
| value    | 值       | string, number, boolean | -      | -      |
| children | 后代选项 |                         |        |        |

> 当为联动列表时`children`必填，且后代的格式与父类一致。

### Events

| 事件名称 | 说明           | 参数     |
| -------- | -------------- | -------- |
| cancel   | 点击取消时触发 | [待确认] |
| confirm  | 点击确认时触发 | [待确认] |

### 按需引入

```js
import { Picker } from "movue-ui";
Vue.use(Picker);
```



## mo-scroll

ios回弹效果滚动容器，对`Better-Scroll`封装了一层，减少配置。

### 基础使用

```vue
<mo-scroll>
	<div>
    假装有很多内容！
    内容高度必须超过容器高度才能滚动喔！
  </div>
</mo-scroll>
```

### Attributes

| 参数              | 说明                   | 类型           | 可选值                 | 默认值 |
| ----------------- | ---------------------- | -------------- | ---------------------- | ------ |
| height            | 选项列表               | array, object  | -                      | -      |
| scrollY           | 绑定值                 | string, number | -                      | -      |
| scrollX           | 标题                   | string         | -                      | -      |
| startX            | 显示边框方向           | string         | top, bottom, all, none | bottom |
| startY            | 禁用                   | boolean        | -                      | false  |
| scroll            | 滚动过程中触发         | string         | -                      | -      |
| scrollEnd         | 滚动结束触发           | function       | -                      | -      |
| scrollStart       | 滚动开始时触发         | function       | -                      | -      |
| beforeScrollStart | 滚动开始之前触发       | function       | -                      | -      |
| refresh           | refresh 方法调用完成后 | function       | -                      | -      |
| destroy           | destroy 方法调用完成后 | function       | -                      | -      |

> 方法具体参数参考[**better-scroll文档**]([https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E5%B1%9E%E6%80%A7](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#属性))

### Slots

| name    | 说明     |
| ------- | -------- |
| default | 容器内容 |

### 按需引入

```js
import { Scroll } from "movue-ui";
Vue.use(Scroll);
```



## mo-tab

导航按钮组，多个按钮可进行滚动和自动定位。

### 基础用法

```vue
<mo-tab :buttons="buttons" v-model="value2"></mo-tab>
```

### Attributes

| 参数         | 说明             | 类型                    | 可选值       | 默认值 |
| ------------ | ---------------- | ----------------------- | ------------ | ------ |
| type         | 风格类型         | string                  | link, button | link   |
| buttons      | 按钮组           | array                   | -            | -      |
| value        | 激活状态按钮的值 | string, number, boolean | -            | -      |
| disabledKeys | 禁用的按钮       | array                   | -            | -      |
| disabled     | 禁用             | boolean                 | -            | false  |

**buttons数组项为Object时，项配置**

| 参数  | 说明     | 类型                    | 可选值                      | 默认值 |
| ----- | -------- | ----------------------- | --------------------------- | ------ |
| title | 显示文本 | string, number, boolean | -                           | -      |
| value | 值       | string, number, boolean | 同[mo-button](#mo-button) | -      |

### Events

| 事件名称 | 说明                 | 参数    |
| -------- | -------------------- | ------- |
| change   | 激活按钮项改变时触发 | `value` |

### 按需引入

```js
import { Tab } from "movue-ui";
Vue.use(Tab);
```



## Toast消息提示

###  基础用法

**默认消息提醒**：

```js
this.$message('唱一首简单的歌！');
```

**2秒后消失：**

```js
this.$message({
    message: '你问风，为什么托着候鸟飞翔。',
    duration: 2000
});
```

**错误提醒**：

```js
this.$message({
    message: '输入有误，请重新输入！',
    type: 'error'
});
```

**加载中**：

```js
this.$message({
    type: 'loading',
    duration: 10000
});
```

### Attributes

| 参数     | 说明                                                 | 类型     | 可选值                                  | 默认值 |
| -------- | ---------------------------------------------------- | -------- | --------------------------------------- | ------ |
| duration | toast显示时长，`0`表示一直显示，不关闭，单位毫秒(ms) | number   | -                                       | 1000   |
| type     | toast类型                                            | string   | toast, loading, success, error, warning | toast  |
| icon     | 消息图标类                                           | string   | -                                       | -      |
| message  | 消息内容                                             | string   | -                                       | -      |
| onClose  | 消息关闭后的回调                                     | function | -                                       | -      |

### Methods

| 名称  | 说明               | 参数 |
| ----- | ------------------ | ---- |
| close | 立即关闭消息提示框 | -    |

**以下是封装的几种类型快速调用的接口：**

### $toast(message | options)

普通消息提醒，默认`1s`后自动关闭。

```js
this.$toast('你问雨为什么滋养万物生长！');
```

#### 参数

**message:** *string*

消息提示框的消息体。

**options:** *object*

`Message `消息体的配置信息，配置项见上表`Attributes`。其中配置的`type`字段会被忽略。



### $error(message | options)

错误消息提醒，自带错误大图标显示。

```js
this.$error('输入有误，请重新输入！');
```

#### 参数

**message:** *string*

错误消息提示框的消息体。

**options:** *object*

`Message `消息体的配置信息，配置项见上表`Attributes`。其中配置的`type`字段会被忽略。



### $success(message | options)

成功消息提醒，自带成功大图标显示。

```js
this.$success('保存成功！');
```

#### 参数

**message:** *string*

成功消息提示框的消息体。

**options:** *object*

`Message `消息体的配置信息，配置项见上表`Attributes`。其中配置的`type`字段会被忽略。



### $warning(message | options)

警告消息提醒，自带警告大图标显示。

```js
this.$warning('修改配置，将会重启，请知悉。');
```


### $loading(message | options)

加载中消息提醒，自带加载中菊花图标显示。

**自动消失：**

```js
this.$loading({
    message: '加载中',
    duration: 5000
});
```


**手动消失：**

```js
let loading = this.$loading('加载中');
setTimeout(() => {
   loading.close();
}, 5000);
```


#### 参数

**message:** *string*

警告消息提示框的消息体。

**options:** *object*

`Message `消息体的配置信息，配置项见上表`Attributes`。其中配置的`type`字段会被忽略。

### 按需引入

```js
import { Toast } from "movue-ui";
Vue.use(Toast);
Vue.prototype.$loading = Toast.loading;
Vue.prototype.$toast = Toast.toast;
Vue.prototype.$success = Toast.success;
Vue.prototype.$warning = Toast.warning;
Vue.prototype.$error = Toast.error;
Vue.prototype.$message = Toast.message;
```



## Dialog

对话框组件，用于弹窗交互。

###  基础用法

**组件使用：**

```vue
<template>
	<mo-button type="primary" @click="visible = true">内容弹框</mo-button>
	<mo-dialog v-model="visible" :title="title" :buttons="buttons">
      <div>文本内容</div>
    </mo-dialog>
</template>

<script>
	export default {
        data(){
            visible: false
        	title: 'Dialog 弹窗',
        	buttons: [
           	 	{ title: "取消" }, 
            	{ title: "知道了", type: "primary" }
        	]
        }
    }
</script>
```

**命令使用：**

```js
// confirm 弹窗
this.$confirm("确定要删除嘛？")
    .then(() => {
         this.$toast("click ok");
    })
    .catch(() => {
         this.$toast("click cancel");
    });

// alert 弹窗
 this.$alert("alert 弹窗")
     .then(() => {
        this.$toast("click ok");
      });
```



### Attributes

| 参数              | 说明                              | 类型             | 可选值 | 默认值                               |
| :---------------- | --------------------------------- | ---------------- | ------ | ------------------------------------ |
| visible / v-model | 绑定值                            | boolean          | -      | false                                |
| title             | 标题                              | string, number   | -      | -                                    |
| message           | 内容                              | string           | -      | -                                    |
| buttons           | 底部按钮，对象数组                | array ([object]) | -      | [{ title: "确定", type: "primary" }] |
| css               | 自定义样式类                      | string           | -      | -                                    |
| closeOnClickModal | 点击蒙版关闭弹窗                  | boolean          | -      | false                                |
| modalAppendToBody | 将弹窗内容添加到`document.body`中 | boolean          | -      | true                                 |
| showClose         | 显示关闭按钮                      | boolean          | -      | true                                 |
| openDelay         | 打开延时，单位毫秒                | number           | -      | 0                                    |
| closeDelay        | 关闭延时，单位毫秒                | number           | -      | 0                                    |

**buttons数组项配置**

| 参数  | 说明     | 类型   | 可选值                      | 默认值 |
| ----- | -------- | ------ | --------------------------- | ------ |
| title | 按钮文本 | string | -                           | -      |
| type  | 按钮主题 | string | 同[mo-button](#mo-button) | -      |

### Mehtods

| 方法名称 | 说明     | 参数 |
| -------- | -------- | ---- |
| close    | 关闭弹窗 | -    |
| open     | 打开弹窗 | -    |

### Slots

| 事件名称 | 说明                                            |
| -------- | ----------------------------------------------- |
| default  | 内容区域，不提供可以通过设置`message`也是一样的 |

### 按需引入

`mo-dialog`中的按钮使用的是`mo-button`组件，故需同时引入。

```js
import { Button, Dialog } from "movue-ui";
Vue.use(Button);
Vue.use(Dialog);
```



以下是封装的几种快速调用的接口：**

### $alert(title, [buttonText])

类似原生`alert`对话框，只有一个按钮。

```js
 this.$alert("alert 弹窗")
     .then(() => {
        this.$toast("click ok");
      });
```

#### 参数

**title:**  *string*

alert对话框显示的内容。必填。

**buttonText:**  *string*

alert对话框按钮的文本信息，默认为`确定`。非必填。

#### 返回值

返回一个`Promise`实例，通过实例的`then`方法可以进行后续操作。



### $confirm(title,  [message])

类似原生`alert`对话框，只有一个按钮。

```js
 this.$alert("alert 弹窗")
     .then(() => {
        this.$toast("click ok");
      });
```

#### 参数

**title:** *string*

confirm对话框标题。必填。

**message:**  *string*

confirm对话内容，可以是html代码段。非必填。

#### 返回值

返回一个`Promise`实例，点击确定切换到`resolve`，点击取消切换到`reject`。

### 按需引入

`message`中的按钮使用的是`mo-button`组件，故需同时引入。

```js
import { Button, Message } from "movue-ui";
Vue.use(Button);
Vue.use(Message);
Vue.prototype.$alert = Message.alert;
Vue.prototype.$confirm = Message.confirm;
```

