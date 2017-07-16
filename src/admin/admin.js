// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from '../Admin'
import router from '../router/admin'
import http from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(http)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  template: '<Admin/>',
  components: { Admin }
})
