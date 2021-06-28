/*
 * @Description:
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2021-06-28 17:54:51
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-06-28 18:07:35
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/design",
    name: "design",
    component: () => import("@/views/design"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
