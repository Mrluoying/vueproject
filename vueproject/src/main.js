// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import myaxios from './assets/js/myaxios.js'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(myaxios)

Vue.filter('timeFormData',function(val){
  return moment(val).format('YYYY-MM-DD  HH:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
