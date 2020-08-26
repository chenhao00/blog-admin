import Vue from 'vue';
import Router from 'vue-router';
import blog from './modules/blog';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    blog
  ]
})
