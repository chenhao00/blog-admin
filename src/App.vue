<template>
  <div id="app">
    <TopBar />
    <div class="app_container">
      <SlideBar />
      <main class="content">
        <BreadCrumb />
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
import BreadCrumb from './components/common/BreadCrumb';

export default {
  name: 'App',
  data() {
    return {
      isHaveLogin: false
    }
  },
  components: {
    Login,
    TopBar,
    SlideBar,
    BreadCrumb
  }
}
</script>

<style lang="less">
@import './assets/less/common.less';
</style>
