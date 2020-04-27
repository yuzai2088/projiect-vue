import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import NotFind from "../views/404.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import InfoShow from "../views/InfoShow.vue"
import FundList from "../views/FundList.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: "/index",
    component: Index,
    children: [
      { path: "", component: Home },
      { path: "/home", name: "home", component: Home },
      { path: "/infoshow", name: "infoshow", component: InfoShow },
      { path: "/foundlist", name: "foundlist", component: FundList },

    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '*',
    name: '404',
    component: NotFind
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login")
  }
})


export default router
