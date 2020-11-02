import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/button",
    name: "Button",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "about" */ "../views/ButtonPage.vue")
  },
  {
    path: "/line",
    name: "Line",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Line" */ "../views/LinePage.vue")
  },
  {
    path: "/input",
    name: "Input",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Input" */ "../views/InputPage.vue")
  },
  {
    path: "/radio",
    name: "Radio",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Radio" */ "../views/RadioPage.vue")
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Checkbox" */ "../views/CheckboxPage.vue")
  },
  {
    path: "/select",
    name: "Select",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Select" */ "../views/SelectPage.vue")
  },
  {
    path: "/switch",
    name: "Switch",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Switch" */ "../views/SwitchPage.vue")
  },
  {
    path: "/toast",
    name: "Toast",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Toast" */ "../views/ToastPage.vue")
  },
  {
    path: "/range",
    name: "Range",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Range" */ "../views/RangePage.vue")
  },
  {
    path: "/dialog",
    name: "Dialog",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Dialog" */ "../views/DialogPage.vue")
  },
  {
    path: "/collapse",
    name: "Collapse",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Collapse" */ "../views/CollapsePage.vue")
  },
  {
    path: "/tab",
    name: "Tab",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Tab" */ "../views/TabPage.vue")
  },
  {
    path: "/scroll",
    name: "Scroll",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Scroll" */ "../views/ScrollPage.vue")
  },
  {
    path: "/picker",
    name: "Picker",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Picker" */ "../views/PickerPage.vue")
  },
  {
    path: "/dropdown",
    name: "Dropdown",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Dropdown" */ "../views/DropdownPage.vue")
  },
  {
    path: "/datepicker",
    name: "Datepicker",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Datepicker" */ "../views/DatepickerPage.vue")
  },
  {
    path: "/text",
    name: "Text",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "Text" */ "../views/TextPage.vue")
  },
  {
    path: "/list",
    name: "List",
    // eslint-disable-next-line prettier/prettier
    component: () => import(/* webpackChunkName: "List" */ "../views/ListPage.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
