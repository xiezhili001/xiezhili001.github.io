<template>
  <div class="zl-MyAlbum">
    <el-dialog title="上传文件" :visible.sync="uploadData" width="30%" center>
      <el-form
        :model="uploadDataForm"
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
        <el-form-item label="form上传：" label-width="108px">
          <el-upload
            class="upload-demo"
            action="/api/album/upload"
            :on-success="uploadSuccess"
            :before-upload="uploadBefore"
            accept="image/*"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片，且不超过5000kb</div>
          </el-upload>
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
      <!-- <el-button type="primary" @click="upload64=true">上传文件（base64）</el-button> -->
      <el-button type="primary" @click="uploadData=true" style="margin-left:10px" size="mini">上传文件</el-button>
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
      uploadData: false,
      uploadDataForm: {
        classify: "",
        url: ""
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
    uploadDataSubmit() {
      if (!this.uploadDataForm.classify) {
        this.$messageTips("请选择分类");
        return;
      }
      if (!this.uploadDataForm.url) {
        this.$messageTips("请选择文件");
        return;
      }
      this.$axios.post("/api/album/add", {
          classify: this.uploadDataForm.classify,
          url: this.uploadDataForm.url,
      }).then(res=>{
        this.uploadData = false
        this.imgFilter('reset');
      })
    },
    uploadSuccess(res) {
      console.log(res);
      this.uploadDataForm.url = res.data.path;
    },
    uploadBefore(file) {
      console.log(file);
      let limitMax = 5000 * 1024;
      if (file.size > limitMax) {
        this.$messageTips("大小超出限制");
        return false;
      }
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
