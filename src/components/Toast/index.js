import MouiToast from "./Toast.vue";
import PopupManager from "../lib/maskManager";

let LoadingConstructor;

const Toast = function(options) {
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options
    };
  }

  let instance = new LoadingConstructor({
    data: options
  });

  instance.$mount();
  instance.$el.style.zIndex = PopupManager.nextZIndex();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  return instance;
};

["success", "warning", "error", "loading"].forEach(type => {
  Toast[type] = options => {
    if (typeof options !== "object" || options === undefined) {
      options = {
        message: options === undefined ? "" : options + ""
      };
    }

    if (type === "loading" && options.duration === undefined) {
      options.duration = 0;
    }
    options.type = type;
    options.size = "max";
    return Toast(options);
  };
});

Toast["toast"] = options => {
  if (typeof options !== "object" || options === undefined) {
    options = {
      message: options === undefined ? "" : options + ""
    };
  }
  options.type = "toast";

  return Toast(options);
};

Toast["message"] = options => {
  if (typeof options !== "object" || options === undefined) {
    options = {
      message: options === undefined ? "" : options + "",
      type: "toast"
    };
  }

  return Toast(options);
};

Toast.install = function(Vue) {
  LoadingConstructor = Vue.extend(MouiToast);
};

export default Toast;
