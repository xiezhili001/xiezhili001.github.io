import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [{
          path: '/homepage',
          name: 'homepage',
          component: () => import('./views/Homepage.vue'),
          meta: {
            word: '首页'
          }
        },
        {
          path: '/myBlog',
          name: 'myBlog',
          component: () => import('./views/MyBlog.vue'),
          meta: {
            word: '我的博客',
            keepAlive: true
          }
        },
        {
          path: '/editBlog',
          name: 'editBlog',
          component: () => import('./views/EditBlog.vue'),
          meta: {
            word: '写博客',
            keepAlive: true
          }
        },
        {
          path: '/myAlbum',
          name: 'myAlbum',
          component: () => import('./views/MyAlbum.vue'),
          meta: {
            word: '我的相册',
            keepAlive: true
          }
        },
        {
          path: '/chatRoom',
          name: 'chatRoom',
          component: () => import('./views/chatRoom.vue'),
          meta: {
            word: '聊天室',
            keepAlive: false
          }
        },
        {
          path: '/generalSettings',
          name: 'generalSettings',
          component: () => import('./views/generalSettings.vue'),
          meta: {
            word: '通用设置',
            keepAlive: false
          }
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: () => import('./views/userManage.vue'),
          meta: {
            word: '用户管理',
            keepAlive: false
          }
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('./views/echarts.vue'),
          meta: {
            word: 'echarts',
            keepAlive: false
          }
        },
        {
          path: '*',
          redirect: '/homepage'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});
