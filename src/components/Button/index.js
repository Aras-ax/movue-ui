import MouiButton from "./Button.vue";

/* istanbul ignore next */
MouiButton.install = function(Vue) {
  Vue.component(MouiButton.name, MouiButton);
};

export default MouiButton;
