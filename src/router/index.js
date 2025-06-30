import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'          // 商品詳細ページの読み込み
import PurchaseView from '../views/PurchaseView.vue'; // 購入ページの読み込み
import InputView from '../views/InputView.vue';       // 購入者・決済情報入力ページの読み込み
import HistoryView from '../views/HistoryView.vue';   // 購入履歴ページの読み込み



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
  // 購入ページのルートを追加
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView
  },

  // 購入者・決済情報入力のルートを追加
  {
    path: '/input',
    name: 'input',
    component: InputView
  },

  // 購入履歴ページのルートを追加
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  }    

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router