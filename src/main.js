import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import Bootstrap library & other modules
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import sass file
import './styles/custom.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
