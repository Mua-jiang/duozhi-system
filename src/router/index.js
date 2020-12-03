import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import ('@/views/Main.vue'),
	redirect: '/home',
    children: [
      {
        path: '/classify',
        name: 'Classify',
        component: () => import ('@/views/Classify.vue')
      },
	  {
	    path: '/setting',
	    name: 'Setting',
	    component: () => import ('@/views/Setting.vue')
	  },
      {
        path: '/goods/add',
        name: 'AddGoods',
        component: () => import ('@/views/Goods/AddGoods.vue')
      },
	  
	  {
	    path: '/goods/update',
	    name: 'UpdateGoods',
	    component: () => import ('@/views/Goods/UpdateGoods.vue')
	  },
      {
        path: '/goods/list/:state',
        name: 'GoodsList',
        component: () => import ('@/views/Goods/GoodsList.vue')
      },
	  {
	    path: '/home',
	    name: 'Home',
	    component: () => import ('@/views/Home.vue')
	  }
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import ('@/views/Demo.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
