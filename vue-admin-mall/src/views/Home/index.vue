<template>
  <div class="home-container">
    <AsideMenu :key="key"></AsideMenu>
    <div :class="{ 'main-app': true, 'extend-app': $store.state.collapsed }">
      <NavBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AsideMenu from './AsideMenu/index.vue';
import NavBar from './NavBar/index.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  components: {
    AsideMenu,
    NavBar,
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  .main-app {
    margin-left: 200px;
    transition: all 0.3s;
    &.extend-app {
      margin-left: 80px;
    }
    .silder-nav {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      border-bottom: 1px solid #eee;
      .breadcrumb {
        display: inline-block;
        margin-left: 20px;
      }
      .user-info {
        float: right;
        cursor: pointer;
        text-align: center;
        li {
          padding: 0 20px;
        }
        li:not(:first-child) {
          display: none;
          &:hover {
            background-color: #eee;
            color: #999;
            font-weight: bold;
          }
        }
        &:hover {
          li {
            display: block;
          }
        }
      }
    }
  }
}
</style>
