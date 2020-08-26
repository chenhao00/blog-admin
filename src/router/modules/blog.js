// 登陆页面
const Login = () => import('../../views/account/Login.vue');

const Container = {
  template: `
    <div>
      <router-view></router-view>
    </div>
  `
};

const router = {
  path: '/account',
  name: 'Account',
  component: Container,
  children: [{
    path: '/account/login',
    name: 'Login',
    component: Login
  }]
};

export default router;
