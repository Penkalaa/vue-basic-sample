import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from './stores/store'
import {i18n} from "./i18n-setup";


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    var isAuthenticated = false;
    if(localStorage.getItem('auth_user')){
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    
    if (isAuthenticated) {
      next()
      return
    }
    next('/login')
  }
  next()
})

App.i18n= i18n
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
