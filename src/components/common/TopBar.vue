<template>
  <Header>
    <div class="container">
      <div class="logo">
        后台管理系统
      </div>
      <div class="nav">
        <Breadcrumb />
      </div>
    </div>
  </Header>
</template>

<script>
import Breadcrumb from './BreadCrumb';

export default {
  name: 'TopBar',
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
Header {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 99;
  color: #fff;
  .container {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    background-color: #67C23A;
    .logo {
      width: 220px;
      border-right: solid 1px #e6e6e6;
    }
    .nav {
      padding-left: 20px;
    }
  }
}
</style>
