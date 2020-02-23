<template>
  <div class="zl-chatRoom">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>84987878</span>
      </div>
      <div class="content">
        <div class="contentList flSpan">
          <div></div>
          <span>gerwgrsdfseg</span>
        </div>
        <div class="contentList frSpan">
          <div></div>
          <span>gerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreerwgreg</span>
        </div>
      </div>
      <div class="submitInput">
        <textarea placeholder="请输入文字"></textarea>
        <el-button class="set" size="mini">发送</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "chatRoom",
  data() {
    return {
      blogListShow: true,
      blogData: [],
      currentBlog: 0,
      active: ""
    };
  },
  components: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
.zl-chatRoom {
  height: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    font-size: 16px;
    width: 700px;
    background: #f0f0f0;
    height: 90%;
    display: flex;
    flex-direction: column;
  }
  .el-card__header {
    padding: 7px 20px;
    text-align: center;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    .content {
      flex: 1;
      font-size: 14px;
      padding: 3px 0;
      .contentList {
        padding: 0 10px;
        margin-top: 8px;
        overflow: hidden;
        position: relative;
        &.flSpan div {
          display: inline-block;
          position: absolute;
          border: 9px solid;
          border-color: transparent #fff transparent transparent;
          left: -4px;
          top: 4px;
        }
        &.frSpan div {
          display: inline-block;
          position: absolute;
          border: 9px solid;
          border-color: transparent transparent transparent #fff;
          right: -4px;
          top: 4px;
        }
        span {
          background: #fff;
          display: inline-block;
          border-radius: 5px;
          padding: 2px 6px;
          max-width: 80%;
          word-wrap: break-word;
          white-space: normal;
          word-break: break-all;
        }
        &.flSpan span {
          float: left;
        }
        &.frSpan span {
          float: right;
        }
      }
    }
    .submitInput {
      height: 80px;
      border-top: 1px solid #dcdfe6;
      position: relative;
      textarea {
        width: 100%;
        border: none;
        background: #f0f0f0;
        outline: none;
        padding: 5px;
        font-size: 14;
        height: 100%;
        resize: none;
      }
      .set {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }
  }
  .zl-chatRoom .el-card__body {
    padding: 5px;
  }
}
</style>
