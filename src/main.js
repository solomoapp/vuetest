import Vue from 'vue'
import util from './libs/util'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

console.log(util.Arabia2Chinese(123346));