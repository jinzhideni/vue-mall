<template>
  <div class="asideMenu-Container">
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="child in route.children">
            <a-menu-item v-if="!child.meta.hidden" :key="child.name">
              <router-link :to="{ name: child.name }">
                <a-icon :type="child.meta.icon" />
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      // console.log(this.$router);
    },
  },
  computed: {
    defaultSelectKey() {
      return this.$router.currentRoute.matched[1] ? this.$router.currentRoute.matched[1].name : '';
    },
    defaultOpenKey() {
      return this.$router.currentRoute.matched[0].name;
    },
  },
};
</script>

<style lang="less" scoped>
.asideMenu-Container {
  width: 200px;
  position: fixed;
  height: 100%;
  .ant-menu {
    height: 100%;
  }
}
</style>
