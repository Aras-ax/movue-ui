import MouiDialog from "./Dialog.vue";

/* istanbul ignore next */
MouiDialog.install = function(Vue) {
  Vue.component(MouiDialog.name, MouiDialog);
};

export default MouiDialog;
