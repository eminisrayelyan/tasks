import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Products from '@/components/Products.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: Products },
  ],
})