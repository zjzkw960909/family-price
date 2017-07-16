import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../admin/Admin.vue'

Vue.use(Router)

const Price = resolve => require(['../admin/Price'], resolve)
const PriceList = resolve => require(['../admin/PriceList'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin,
      children: [
        {
            path: 'price/:PAGE',
            component: Price
        },
        {
            path: 'price-list/:PAGE',
            component: PriceList
        }
      ]
    }
  ]
})
