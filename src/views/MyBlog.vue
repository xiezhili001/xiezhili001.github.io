<template>
  <div class="zl-MyBlog">
    <el-tabs tab-position="left" style="height: 200px;" v-model="active" @tab-click="tabClick">
      <el-tab-pane label="全部" name="0">
        <div class="blogList" v-show="blogListShow">
          <div
            class="blogListItem"
            @click="showDetail(index)"
            v-for="(item,index) in blogData"
            :key="index"
            v-show="item.classify==active||active==0"
          >
            <header>{{item.blogTitle}}</header>
            <content v-html="item.html"></content>
          </div>
        </div>
        <div
          class="blogdetail markdown-body"
          v-show="!blogListShow"
          v-html="blogData[currentBlog]&&blogData[currentBlog].html"
        ></div>
        <div>
          <el-link
            target="_blank"
            :underline="false"
            href="https://blog.csdn.net/a_passing_traveller"
            class="fr"
            style="color: #66b1ff;text-decoration: none;margin-top:10px"
            v-show="blogListShow"
          >更多博客</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="vue" name="1"></el-tab-pane>
      <el-tab-pane label="node" name="2"></el-tab-pane>
      <el-tab-pane label="js" name="3"></el-tab-pane>
    </el-tabs>
    <div v-show="false">
      <mavonEditor></mavonEditor>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mavonEditor } from "mavon-editor";
import zlHeader from "../component/Header.vue";
import "mavon-editor/dist/css/index.css";
export default {
  name: "MyBlog",
  data() {
    return {
      blogListShow: true,
      blogData: [],
      currentBlog: 0,
      active: ""
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    showDetail(index) {
      this.blogListShow = false;
      this.currentBlog = index;
    },
    tabClick() {
      this.blogListShow = true;
    }
  },
  created() {
    this.$axios.get("/api/blog/list").then(res => {
      console.log(res.data.blog);
      this.blogData = res.data.blog;
    });
  }
};
</script>

<style lang="scss">
.zl-MyBlog {
  height: 100%;
  .el-tabs--left {
    height: 100% !important;
  }
  a:hover {
    text-decoration: none;
  }
  .blogdetail {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border-radius: 4px;
    height: 100%;
    overflow: auto;
  }
  .blogListItem {
    background: #fff;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    border-bottom: 1px solid #ededed;
    height: 80px;
    font-size: 14px;
    padding: 6px 10px;
    cursor: pointer;
    &:hover {
      background: #f5f6f7;
    }
    header {
      color: #3d3d3d;
      font-size: 18px;
      font-weight: 700;
    }
    content {
      font-size: 14px;
      color: #6b6b6b;
    }
  }
  .blogList {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .el-tab-pane {
    padding-top: 10px;
    padding-right: 10px;
    display: block !important;
  }
  .el-tabs__nav-scroll {
    width: 120px;
  }
  .el-tabs__content {
    overflow: auto;
    height: 100%;
  }
}
</style>
