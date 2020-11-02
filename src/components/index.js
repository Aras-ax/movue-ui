import "../scss/moui.scss";

import FastClick from "fastclick";
import MouiButton from "./Button/index.js";
import MouiLine from "./Line/index.js";
import MouiInput from "./Input/index.js";
import MouiRadio from "./Radio/index.js";
import MouiCheckbox from "./Checkbox/index.js";
import MouiSelect from "./Select/index.js";
import MouiSwitch from "./Switch/index.js";
import MouiRange from "./Range/index.js";
import MouiToast from "./Toast/index.js";
import MouiDialog from "./Dialog/index.js";
import MouiMessage from "./Dialog/Message.js";
import MouiCollapse from "./Collapse/index.js";
import MouiTransition from "./Transition/index.js";
import MouiTab from "./Tab/Tab.vue";
import MouiScroll from "./Scroll/index.js";
import MouiPicker from "./Picker/index.js";
import MouiDatePicker from "./Picker/DatePicker.js";
import MouiDropdown from "./Picker/Dropdown.js";
import MouiText from "./Text/index.js";

// eslint-disable-next-line prettier/prettier
const components = [MouiButton, MouiLine, MouiInput, MouiRadio, MouiCheckbox, MouiSelect, MouiSwitch, MouiRange, MouiDialog, MouiCollapse, MouiTransition, MouiTab, MouiScroll, MouiPicker, MouiDatePicker, MouiDropdown, MouiText];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(MouiToast);
  Vue.use(MouiMessage);

  Vue.prototype.$loading = MouiToast.loading;
  Vue.prototype.$toast = MouiToast.toast;
  Vue.prototype.$success = MouiToast.success;
  Vue.prototype.$warning = MouiToast.warning;
  Vue.prototype.$error = MouiToast.error;
  Vue.prototype.$message = MouiToast.message;

  Vue.prototype.$alert = MouiMessage.alert;
  Vue.prototype.$confirm = MouiMessage.confirm;

  FastClick.attach(document.body);
};

export default {
  install,
  MouiButton,
  MouiLine,
  MouiInput,
  MouiRadio,
  MouiCheckbox,
  MouiSelect,
  MouiSwitch,
  MouiRange,
  MouiDialog,
  MouiCollapse,
  MouiTransition,
  MouiTab,
  MouiScroll,
  MouiPicker,
  MouiDatePicker,
  MouiDropdown,
  MouiText
};
