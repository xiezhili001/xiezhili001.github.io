<template>
  <div class="zl-MyAlbum">
    <el-dialog title="上传文件（base64）" :visible.sync="upload64" width="30%" center>
      <el-form
        :model="upload64Form"
        size="mini"
        class="demo-form-inline demo-ruleForm"
        ref="transTdForm"
      >
        <el-form-item label="分类：" label-width="108px">
          <el-select v-model="upload64Form.classify" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upload64 = false">取 消</el-button>
        <el-button type="primary" @click="upload64Submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传文件（form）" :visible.sync="uploadData" width="30%" center>
      <el-form
        :model="upload64Form"
        size="mini"
        class="demo-form-inline demo-ruleForm"
        ref="transTdForm"
      >
        <el-form-item label="分类：" label-width="108px">
          <el-select v-model="uploadDataForm.classify" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadData = false">取 消</el-button>
        <el-button type="primary" @click="uploadDataSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block" style="margin-bottom:8px">
      时间：
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        @change="imgFilter('reset')"
        value-format="yyyy/MM/dd"
      ></el-date-picker>&nbsp;&nbsp;分类：
      <el-select v-model="classify" placeholder="全部" size="mini" @change="imgFilter('reset')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="fr">
        <el-button type="primary" @click="upload64=true">上传文件（base64）</el-button>
        <el-button type="primary" @click="uploadData=true">上传文件（form）</el-button>
      </div>
    </div>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul class="list" v-infinite-scroll="imgFilter" infinite-scroll-disabled="disabled">
        <el-card class="box-card list-item" v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" alt />
        </el-card>
      </ul>
      <p v-if="loading" style="text-align: center">加载中...</p>
      <p v-if="noMore" style="text-align: center">{{noMoreData}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyAlbum",
  data() {
    return {
      upload64: false,
      upload64Form: {
        classify: ""
      },
      uploadData: false,
      uploadDataForm: {
        classify: ""
      },
      date: "",
      classify: "",
      options: [
        {
          value: 1,
          label: "深圳"
        },
        {
          value: 2,
          label: "大学"
        }
      ],
      imgList: [],
      loading: false,
      noMore: true,
      pageNum: 0,
      pageSize: 10,
      noMoreData: "没有数据"
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    upload64Submit() {

    },
    uploadDataSubmit() {

    },
    imgFilter(reset) {
      if (reset == "reset") {
        this.noMoreData = "没有数据";
        this.imgList = [];
        this.pageNum = 1;
      } else {
        this.pageNum += 1;
        this.noMore = false;
        this.loading = true;
      }
      var startTime;
      var endTime;
      if (this.date) {
        startTime = new Date(this.date[0]).getTime();
        endTime = new Date(this.date[1]).getTime();
        console.log(startTime, endTime);
      }
      this.$axios
        .get("/api/album/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            startTime: startTime,
            endTime: endTime,
            classify: this.classify
          }
        })
        .then(res => {
          this.imgList = this.imgList.concat(res.data.album);
          this.loading = false;
          var total = this.pageNum * this.pageSize;
          if (res.data.total == 0) {
            return;
          }
          if (res.data.total <= total) {
            this.noMore = true;
            this.noMoreData = "没有更多了";
            return;
          }
          this.noMore = false;
        });
    }
  },
  components: {},
  created() {
    this.imgFilter();
  }
};
</script>

<style lang="scss">
.zl-MyAlbum {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .infinite-list-wrapper {
    flex: 1;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .el-card__body {
      padding: 10px;
    }
    .list-item {
      width: 300px;
      height: 200px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .el-card__body {
      height: 100%;
    }
    img {
      width: 100%;
      max-height: 100%;
      height: auto;
    }
  }
}
</style>
