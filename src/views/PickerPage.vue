<template>
  <mo-page title="联动，多列选择 mo-picker">
    <div class="demo-title">多列选择</div>
    <div class="demo-row">
      <mo-picker
        label="多先选框(非Object)"
        v-model="value"
        :options="array"
      ></mo-picker>
      <mo-picker
        label="多先选框(Object)"
        v-model="value"
        :options="arrayObject"
      ></mo-picker>
    </div>

    <div class="demo-title">联动选择</div>
    <div class="demo-row">
      <mo-picker
        label="联动选框(二级)"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
      <mo-picker
        label="联动选框(三级)"
        v-model="link1"
        :options="linkArray1"
      ></mo-picker>
    </div>
    <div class="demo-title">属性配置</div>
    <div class="demo-row">
      <mo-picker
        label="splitKey：&&"
        split-key="&&"
        v-model="value"
        :options="arrayObject"
      ></mo-picker>
      <mo-picker
        label="title：工作日"
        title="工作日"
        v-model="value"
        :options="arrayObject"
      ></mo-picker>
      <mo-picker
        label="confirmText：OK"
        confirmText="OK"
        v-model="value"
        :options="arrayObject"
      ></mo-picker>
      <mo-picker
        label="cancelText：算了"
        cancelText="算了"
        v-model="value"
        :options="arrayObject"
      ></mo-picker>
      <mo-picker
        label="titleColor：#f00"
        titleColor="#f00"
        title="地址"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
      <mo-picker
        label="confirmColor：#f00"
        confirmColor="#f00"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
      <mo-picker
        label="cancelColor：#f00"
        cancelColor="#f00"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
      <mo-picker
        disabled
        label="disabled：true"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
    </div>
    <div class="demo-title">Events</div>
    <div class="demo-row">
      <mo-picker
        label="@cancel"
        @cancel="cancel"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
      <mo-picker
        label="@confirm"
        @confirm="confirm"
        v-model="link"
        :options="linkArray"
      ></mo-picker>
    </div>
  </mo-page>
</template>

<script>
export default {
  data() {
    return {
      value: [1, "早上"],
      array: [
        [1, 2, 3, 4, 5, 6, 7],
        ["早上", "中午", "晚上"]
      ],
      arrayObject: [
        [
          { title: "星期一", value: 1 },
          { title: "星期二", value: 2 },
          { title: "星期三", value: 3 },
          { title: "星期四", value: 4 },
          { title: "星期五", value: 5 },
          { title: "星期六", value: 6 },
          { title: "星期日", value: 7 }
        ],
        [
          { title: "早上", value: "早上" },
          { title: "中午", value: "中午" },
          { title: "晚上", value: "晚上" }
        ]
      ],
      link: ["110000", "110100"],
      linkArray: [
        {
          title: "北京市",
          value: "110000",
          children: [
            {
              title: "北京市",
              value: "110100"
            }
          ]
        },
        {
          title: "上海市",
          value: "310000",
          children: [
            {
              title: "上海市",
              value: "310100"
            }
          ]
        },
        {
          title: "广东省",
          value: "440000",
          children: [
            {
              title: "广州市",
              value: "440100"
            },
            {
              title: "深圳市",
              value: "440300"
            }
          ]
        },
        {
          title: "江苏省",
          value: "320000",
          children: [
            {
              title: "南京市",
              value: "320100"
            },
            {
              title: "苏州市",
              value: "320500"
            }
          ]
        }
      ],
      link1: ["110000", "110100", "110105"],
      linkArray1: [
        {
          title: "北京市",
          value: "110000",
          children: [
            {
              title: "北京市",
              value: "110100",
              children: [
                { value: "110101", title: "东城区" },
                { value: "110102", title: "西城区" },
                { value: "110105", title: "朝阳区" },
                { value: "110106", title: "丰台区" },
                { value: "110107", title: "石景山区" },
                { value: "110108", title: "海淀区" },
                { value: "110109", title: "门头沟区" },
                { value: "110111", title: "房山区" },
                { value: "110112", title: "通州区" },
                { value: "110113", title: "顺义区" },
                { value: "110114", title: "昌平区" },
                { value: "110115", title: "大兴区" },
                { value: "110116", title: "怀柔区" },
                { value: "110117", title: "平谷区" },
                { value: "110118", title: "密云区" },
                { value: "110119", title: "延庆区" }
              ]
            }
          ]
        },
        {
          title: "上海市",
          value: "310000",
          children: [
            {
              title: "上海市",
              value: "310100",
              children: [
                { value: "310101", title: "黄浦区" },
                { value: "310104", title: "徐汇区" },
                { value: "310105", title: "长宁区" },
                { value: "310106", title: "静安区" },
                { value: "310107", title: "普陀区" },
                { value: "310109", title: "虹口区" },
                { value: "310110", title: "杨浦区" },
                { value: "310112", title: "闵行区" },
                { value: "310113", title: "宝山区" },
                { value: "310114", title: "嘉定区" },
                { value: "310115", title: "浦东新区" },
                { value: "310116", title: "金山区" },
                { value: "310117", title: "松江区" },
                { value: "310118", title: "青浦区" },
                { value: "310120", title: "奉贤区" },
                { value: "310151", title: "崇明区" }
              ]
            }
          ]
        },
        {
          title: "广东省",
          value: "440000",
          children: [
            {
              title: "广州市",
              value: "440100",
              children: [
                { value: "440103", title: "荔湾区" },
                { value: "440104", title: "越秀区" },
                { value: "440105", title: "海珠区" },
                { value: "440106", title: "天河区" },
                { value: "440111", title: "白云区" },
                { value: "440112", title: "黄埔区" },
                { value: "440113", title: "番禺区" },
                { value: "440114", title: "花都区" },
                { value: "440115", title: "南沙区" },
                { value: "440117", title: "从化区" },
                { value: "440118", title: "增城区" }
              ]
            },
            {
              title: "深圳市",
              value: "440300",
              children: [
                { value: "440303", title: "罗湖区" },
                { value: "440304", title: "福田区" },
                { value: "440305", title: "南山区" },
                { value: "440306", title: "宝安区" },
                { value: "440307", title: "龙岗区" },
                { value: "440308", title: "盐田区" }
              ]
            }
          ]
        },
        {
          title: "江苏省",
          value: "320000",
          children: [
            {
              title: "南京市",
              value: "320100",
              children: [
                { value: "320102", title: "玄武区" },
                { value: "320104", title: "秦淮区" },
                { value: "320105", title: "建邺区" },
                { value: "320106", title: "鼓楼区" },
                { value: "320111", title: "浦口区" },
                { value: "320113", title: "栖霞区" },
                { value: "320114", title: "雨花台区" },
                { value: "320115", title: "江宁区" },
                { value: "320116", title: "六合区" },
                { value: "320117", title: "溧水区" },
                { value: "320118", title: "高淳区" }
              ]
            },
            {
              title: "苏州市",
              value: "320500",
              children: [
                { value: "320505", title: "虎丘区" },
                { value: "320506", title: "吴中区" },
                { value: "320507", title: "相城区" },
                { value: "320508", title: "姑苏区" },
                { value: "320509", title: "吴江区" },
                { value: "320581", title: "常熟市" },
                { value: "320582", title: "张家港市" },
                { value: "320583", title: "昆山市" },
                { value: "320585", title: "太仓市" }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.$toast("click cancel");
    },
    confirm() {
      this.$toast("click confirm");
    }
  }
};
</script>
