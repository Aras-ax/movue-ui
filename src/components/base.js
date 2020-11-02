import FastClick from "fastclick";

const install = function(Vue) {
  Vue.prototype.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  FastClick.attach(document.body);
};

let Base = {};

Base.install = install;
export default Base;
