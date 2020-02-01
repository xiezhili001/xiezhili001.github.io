<template>
  <div class="zl-MyAlbum">
    <div class="block" style="margin-bottom:8px">
      时间：
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        @change="imgFilter"
        value-format="yyyy/MM/dd"
      ></el-date-picker>&nbsp;&nbsp;分类：
      <el-select
        v-model="area"
        multiple
        placeholder="全部"
        size="mini"
        collapse-tags
        @change="imgFilter"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul class="list" v-infinite-scroll="imgFilter" infinite-scroll-disabled="disabled">
        <el-card class="box-card list-item" v-for="(item,index) in imgList" :key="index">
          <img :src="item" alt />
        </el-card>
      </ul>
      <p v-if="loading" style="text-align: center">加载中...</p>
      <p v-if="noMore" style="text-align: center">没有更多了</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyAlbum",
  data() {
    return {
      date: "",
      area: "",
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
      imgList: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ],
      loading: false,
      noMore: false
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    imgFilter() {
      this.loading = true;
      console.log(1);
      if (this.date) {
        let startTime = new Date(this.date[0]).getTime();
        let endTime = new Date(this.date[1]).getTime();
        console.log(startTime, endTime);
      }
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
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
