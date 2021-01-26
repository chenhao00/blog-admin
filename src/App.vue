<template>
  <div id="app">
    <TopBar />
    <div class="app_container">
      <SlideBar />
      <main class="content">
        <router-view />
      </main>
    </div>
    <Login v-if="isHaveLogin" />
  </div>
</template>

<script>
import Login from './views/account/Login';
import TopBar from './components/common/TopBar';
import SlideBar from './components/common/SlideBar';

export default {
  name: 'App',
  data() {
    return {
      isHaveLogin: true
    }
  },
  components: {
    Login,
    TopBar,
    SlideBar
  },
  created() {
    const loginInfo = localStorage.getItem('user');
    if (loginInfo) {
      this.isHaveLogin = false;
    }
  },
  mounted() {
    // 监听跳转登陆页面
    this.$bus.$on('showLogin', () => {
      this.isHaveLogin = true;
    });
  }
}
</script>

<style lang="less">
@import './assets/less/common.less';
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  .app_container {
    height: calc(100% - 60px);
    display: flex;
    .content {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
    }
  }
  .breadcrumb {
    span, i {
      color: #fff !important;
    }
  }
}
</style>
