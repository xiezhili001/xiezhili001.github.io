<template>
  <div class="zl-home">
    <el-container>
      <el-header class="theme" style="padding: 0;height: 50px">
        <zl-header></zl-header>
      </el-header>

      <el-container>
        <el-aside width="auto">
          <el-menu
            :default-active="currentRouter"
            class="el-menu-vertical-demo"
            :collapse="menuSwitch"
            background-color="#545c64"
            text-color="#fff"
            unique-opened
            router
          >
            <template v-for="item in menuRouter">
              <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                  </template>
                  <template v-for="itemSub in item.subs">
                    <el-menu-item
                      :index="itemSub.index"
                      class="is-active"
                      :key="itemSub.subs"
                    >{{itemSub.title}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>

        <el-main>
          <header class="menuList">
            <el-tag
              v-for="(item,index) in tags"
              :key="item.name"
              :closable="index!=0"
              :type="currentRouter==item.router?'':'info'"
              size="medium"
              class="menuListActive"
              @click="changeRouter(item.router)"
              @close="closeRouter(item,index)"
            >{{item.name}}</el-tag>
          </header>
          <main class="mainContent">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import zlHeader from "../component/Header.vue";
export default {
  name: "Home",
  components: {
    zlHeader
  },
  data() {
    return {
      menuRouter: [
        {
          icon: "el-icon-s-home",
          index: "homepage",
          title: "首页"
        },
        {
          icon: "iconxieboke iconfont",
          index: "2",
          title: "blog",
          subs: [
            {
              index: "editBlog",
              title: "写博客"
            },
            {
              index: "myBlog",
              title: "我的博客"
            }
          ]
        },
        {
          icon: "iconmn_kongjian_fill iconfont",
          index: "3",
          title: "个人空间",
          subs: [
            {
              index: "myAlbum",
              title: "我的相册"
            }
          ]
        },
        {
          icon: "el-icon-s-cooperation",
          index: "4",
          title: "其他",
          subs: [
            {
              index: "chatRoom",
              title: "聊天室"
            }
          ]
        }
      ],
      tags: [{ name: "首页", router: "homepage" }]
    };
  },
  computed: {
    ...mapState({
      menuSwitch: "menuSwitch"
    }),
    currentRouter() {
      return this.$route.path.replace("/", "");
    }
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        var flag = this.tags.some(item => {
          return item.router === newValue.path.replace("/", "");
        });
        if (!flag) {
          this.tags.push({
            name: newValue.meta.word,
            router: newValue.path.replace("/", "")
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    //路由控制
    changeRouter(router) {
      this.$router.push({ name: router });
    },
    closeRouter(item, index) {
      this.tags.splice(this.tags.indexOf(item), 1);
      if (item.router == this.$route.path.replace("/", "")) {
        this.$router.push({ name: this.tags[index - 1].router });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
.zl-home {
  height: 100%;
  .el-main {
    background: #f0f0f0;
    padding: 0;
    display: flex;
    flex-direction: column;
    .mainContent {
      flex: 1;
      padding: 0;
      overflow: auto;
    }
    .el-tag {
      margin-right: 3px;
      cursor: context-menu;
    }
    .el-tag.el-tag--info .el-tag__close:hover {
      padding-top: 1px;
    }
    .el-tag .el-tag__close:hover {
      padding-top: 1px;
    }
  }
  .menuList {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 0px 10px 1px;
    padding: 8px;
  }
  .el-container {
    overflow: hidden;
  }
  .el-container.is-vertical {
    height: 100%;
  }
  .el-submenu__title .iconfont {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    display: inline-block;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-submenu .el-menu-item {
    min-width: 199px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
  }
  .el-menu--collapse {
    height: 100%;
  }
}
</style>
