<template>
  <div class="zl-EditBlog">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        分类：
        <el-select v-model="classify" placeholder="全部" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBlog">确 定</el-button>
      </span>
    </el-dialog>
    <el-input v-model="blogTitle" placeholder="请输入标题" id="title"></el-input>
    <mavon-editor
      v-model="content"
      @change="change"
      style="height: 85%"
      toolbarsBackground="#F2F6FC"
    />
    <el-button type="primary" id="submit" @click="submit">完成</el-button>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "EditBlog",
  data() {
    return {
      content: "",
      html: "",
      blogTitle: "",
      dialogVisible: false,
      classify: "",
      options: [
        {
          value: 1,
          label: "vue"
        },
        {
          value: 2,
          label: "node"
        },
        {
          value: 3,
          label: "js"
        }
      ]
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    change(value, render) {
      this.html = render;
    },
    submitBlog() {
      if (!this.classify) {
        this.$messageTips("请输入分类！");
        return;
      }
      let params = {
        html: this.html,
        classify: this.classify,
        blogTitle: this.blogTitle
      };
      this.$axios.post("/api/blog/add", params).then(res => {
        if (res.code == 0) {
          this.$messageTips("提交成功！", "success");
          this.dialogVisible = false;
        }
      });
    },
    submit() {
      if (!this.blogTitle) {
        this.$messageTips("请输入标题！");
        return;
      }
      if (!this.content) {
        this.$messageTips("请输入内容！");
        return;
      }
      this.dialogVisible = true;
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
    font-size: 20px;
  }
  #submit {
    float: right;
    margin-top: 10px;
  }
}
</style>
