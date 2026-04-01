import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdListView from '../views/Ads/AdListView.vue'
import AdView from '../views/Ads/AdView.vue'
import NewAdView from '../views/Ads/NewAdView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegistrationView from '../views/Auth/RegistrationView.vue'
import OrdersView from '../views/User/OrdersView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ad/:id',
    name: 'ad',
    component: AdView,
    props: true
  },
  {
    path: '/list',
    name: 'list',
    component: AdListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/new',
    name: 'newAd',
    component: NewAdView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'reg',
    component: RegistrationView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isUserLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router