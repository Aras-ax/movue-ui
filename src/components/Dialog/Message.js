import Dialog from "./Dialog.vue";
let MessageConstructor;

export default function Message(option) {
  if (typeof option === "string") {
    option = {
      title: option
    };
  }

  option.visible = false;
  let instance = new MessageConstructor({
    propsData: option,
    data: {
      isCommand: true
    }
  });
  instance.$on("input", val => {
    instance.visible = val;
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  return instance;
}

Message.alert = function(title, btnText = "确定") {
  return new Promise(resolve => {
    let instance = Message({
      title,
      showClose: false,
      buttons: [
        {
          title: btnText,
          type: "primary",
          callback() {
            resolve(instance);
          }
        }
      ]
    });
  });
};

Message.confirm = function(title, message) {
  return new Promise((resolve, reject) => {
    let instance = Message({
      title,
      message,
      showClose: false,
      buttons: [
        {
          title: "取消",
          type: "",
          callback() {
            reject(instance);
          }
        },
        {
          title: "确定",
          type: "primary",
          callback() {
            resolve(instance);
          }
        }
      ]
    });
  });
};

Message.message = function(title) {
  return Message({
    title
  });
};

Message.install = function(Vue) {
  MessageConstructor = Vue.extend(Dialog);
};
