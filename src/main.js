import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Force redirect to welcome page on refresh
router.beforeEach((to, from, next) => {
  if (from.name === undefined && to.name !== 'WelcomePage') { // This indicates a page refresh
    next({ name: 'WelcomePage' });
  } else {
    next();
  }
});

const app = createApp(App)
app.use(router)
app.mount('#app')
