import Vue from 'vue';
import Router from 'vue-router';
import blog from './modules/blog';

const Home = () => import('../views/Home.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'admin',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        icon: 'monitor'
      }
    },
    blog
  ]
})
