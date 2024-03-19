
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


import { createRouter, createWebHistory } from 'vue-router';
import TheWelcome from './pages/TheWelcome.vue'
import HelloWorld from './pages/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: "home",
    component: HelloWorld,
  },
  {
    path: '/welcome',
    name: "welcome",
    component: TheWelcome,
    props: true
  },
  // { path: '/:pathMatch(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
