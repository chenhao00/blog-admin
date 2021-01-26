<script>
export default {
  data() {
    return {

    };
  },
  render(h) {
    const routes = this.$router.options.routes;
    const dom = this.recursion(routes, 0);
    return (
      <aside>
        <el-menu
          class="el-menu-list"
          default-active={this.$route.path}
          active-text-color="#67C23A"
          unique-opened
          router>
          {dom}
        </el-menu>
      </aside>
    );
  },
  methods: {
    recursion(routes, index) {
      const mainMenus = routes.map((route, _index) => {
        const icon = `iconfont el-icon-${route.meta.icon}`;
        let dom;
        if (!route.children || route.meta.showChildren === false) {
          dom = (
            <el-menu-item index={route.path}>
              { route.meta.icon ? <i class={icon}></i> : '' }
              <span slot="title">{ route.meta.title }</span>
            </el-menu-item>
          )
        } else {
          const level = `${index}-${_index}`;
          const submenus = this.recursion(route.children, level);
          if (submenus.length > 0) {
            dom = (
              <el-submenu index={level}>
                <template slot="title">
                  {route.meta.icon ? <i class={icon}></i> : ''}
                  <span slot="title">{route.meta.title}</span>
                </template>
                {submenus}
              </el-submenu>
            );
          }
        }
        return dom;
      });
      return mainMenus;
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-list {
  height: 100%;
  overflow-y: scroll;
}
.el-menu {
  width: 240px;
}
.iconfont {
  font-size: 18px;
  color: #666;
  margin-right: 10px;
}
</style>

<style lang="less">
.el-menu {
  .el-submenu {
    .el-menu-item {
      padding-left: 48px !important;
    }
  }
}
</style>
