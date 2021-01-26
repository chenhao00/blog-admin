import Vue from 'vue';
import Router from 'vue-router';
import blog from './modules/blog';
import user from './modules/user';

const Home = () => import('../views/Home.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    blog,
    user
  ]
})
