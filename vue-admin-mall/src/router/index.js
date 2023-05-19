import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/Home/index.vue';
import Login from '../views/Login/index.vue';

Vue.use(VueRouter);
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/pages/ProductList'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/pages/ProductAdd'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('@/views/pages/ProductAdd'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/pages/Category'),
  }],
}];

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/index',
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
      icon: 'number',
      hidden: false,
    },
    component: () => import('../views/pages/index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
    hidden: true,
  },
},
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
