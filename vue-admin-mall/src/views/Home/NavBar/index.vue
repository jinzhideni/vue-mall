<template>
  <div class="navBar-container">
    <a-button type="primary" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: currentRoute[1].name }">
            {{ currentRoute[1] ? currentRoute[1].meta.title : "" }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>欢迎{{ $store.state.user.username }} <a-icon type="down" /></li>
      <li class="loginOut" @click="loginOut">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('setCollapsed');
    },
    loginOut() {
      this.$store.dispatch('loginOut');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="less" scoped>
.navBar-container {
  padding: 20px;
  width: 100%;
  height: 60px;
  position: relative;
  border-bottom: 1px solid #ccc;
  .breadcrumb {
    display: inline-block;
  }
  .ant-breadcrumb {
    display: inline-block;
    margin-left: 8px;
  }
  .ant-divider-horizontal {
    height: 2px;
    margin: 15px 0;
  }
  .user-info {
    position: absolute;
    right: 15px;
    top: 10px;
    text-align: center;
    cursor: pointer;
    li {
      padding: 10px;
      &:last-child:hover {
        background: #ccc;
        font-weight: 400;
      }
    }
    .loginOut {
      display: none;
    }
    &:hover .loginOut {
      display: block;
    }
  }
}
</style>
