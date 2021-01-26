// 用户管理
const LoginInfo = () => import('../../views/user/LoginInfo.vue'); // 登陆信息

const Container = {
  template: `
    <div>
      <router-view></router-view>
    </div>
  `
};

const router = {
  path: '/user',
  name: 'User',
  component: Container,
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: '/user/loginInfo',
      name: 'LoginInfo',
      component: LoginInfo,
      meta: {
        title: '登录信息'
      }
    }
  ]
};

export default router;
