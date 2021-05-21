import Vue from 'vue'
import App from './App'
import titleBar from '@/components/titleBar.vue'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'
Vue.component('titleBar', titleBar)

const app = new Vue({
    ...App
})
app.$mount()
