<template>
  <div class="zl-EditBlog">
    <el-input v-model="blogTitle" placeholder="请输入标题" id="title"></el-input>
    <mavon-editor v-model="content" @change="change" style="height: 85%" toolbarsBackground="#F2F6FC"/>
    <el-button type="primary" id="submit" @click="submit">提交</el-button>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "EditBlog",
  data() {
    return { content: "", html: "", blogTitle: "" };
  },
  components: {
    mavonEditor
  },
  methods: {
    change(value, render) {
      this.html = render;
    },
    submit() {
      console.log(this.content);
      console.log(this.html);
      this.$messageTips("提交成功！", "success");
    }
  }
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
.zl-EditBlog {
  height: 100%;
  padding: 25px;
  #title {
    margin-bottom: 10px;
    border: none;
    font-weight: 500;
    background: none;
    font-size: 20px
  }
  #submit {
    float: right;
    margin-top: 10px;
  }
}
</style>
