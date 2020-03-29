<template>
  <div class="zl-userManage">
    <div class="block" style="margin-bottom:8px">
      <el-input v-model="keyword" placeholder="请输入内容" size="mini"  @keyup.enter.native="imgFilter('reset')"></el-input>
      <el-button type="primary" @click="imgFilter('reset')" style="margin-left:10px" size="mini">搜索</el-button>
    </div>
    <el-table :data="userList" border style="width: 100%" size="mini" height="auto">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="_id" label="_id"></el-table-column>
      <el-table-column prop="userName" label="昵称" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="admin" label="是否为管理员"></el-table-column>
    </el-table>
    <div class="block" style="margin-top:8px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "userManage",
  data() {
    return {
      userList: [],
      pageNum: 1,
      pageSize: 10,
      keyword: "",
      total: 0
    };
  },
  methods: {
    imgFilter(reset) {
      if (reset == "reset") {
        this.pageNum = 1;
      }
      this.$axios
        .get("/api/user/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyword: this.keyword
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.userList = res.data.user.map(function(item) {
              item.admin = item.admin ? "是" : "否";
              item.password = "暂无";
              return item;
            });
            this.total = res.data.total;
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.imgFilter();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.imgFilter();
    }
  },
  created() {
    this.imgFilter();
  }
};
</script>

<style lang="scss">
.zl-userManage {
  height: 100%;
  padding: 10px;
  background: #fff;
  flex-direction: column;
  .el-input--mini {
    width: 160px;
  }
  .el-table th > .cell {
    font-weight: 700;
  }
  .el-table th,
  .el-table td {
    text-align: center;
  }
  .el-pagination {
    text-align: right;
  }
  .el-pagination__sizes,
  .el-pagination__total {
    float: left;
  }
  .el-table__body-wrapper {
    height: auto !important;
  }
}
</style>
