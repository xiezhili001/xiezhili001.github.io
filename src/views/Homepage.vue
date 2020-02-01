<template>
  <el-col class="zl-Homepage">
    <div class="clearfix" style="padding: 0 20px">
      <el-col :span="8" class="animated fadeInDown">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <div class="demo-image__preview">
              <el-image class="headImg" :src="url" :preview-src-list="srcList"></el-image>
              <div class="name">
                <p>Randall</p>
                <p>管理员</p>
              </div>
            </div>
          </div>
          <div v-for="item in skillMes" :key="item.name" class="text item">
            <div>{{item.name}}</div>
            <el-progress :percentage="item.percent" :color="item.color"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="animated fadeInDown flex">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>日历/代办</span>
            <el-date-picker
              v-model="today"
              type="date"
              placeholder="选择日期"
              size="mini"
              value-format="yyyy-MM-dd"
              :clearable="false"
            ></el-date-picker>
          </div>
          <div class="dataContent" ref="landIn">
            犬吠水声中，桃花带露浓。
            树深时见鹿，溪午不闻钟。
            野竹分青霭，飞泉挂碧峰。
            无人知所去，愁倚两三松。
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="animated fadeInDown flex map">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>我的位置</span>
          </div>
          <div style="color: #606266;" id="allmap"></div>
        </el-card>
      </el-col>
    </div>
  </el-col>
</template>
<script>
export default {
  name: "Homepage",
  data() {
    return {
      skillMes: [
        {
          name: "Vue",
          percent: 72,
          color: "#1989fa"
        },
        {
          name: "JavaScript",
          percent: 60,
          color: "#e6a23c"
        },
        {
          name: "Css",
          percent: 80,
          color: "#5cb87a"
        }
      ],
      url: require("../static/img/header.jpg"),
      srcList: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578735787672&di=df5754458009870b4b3f9c50a3c774b7&imgtype=0&src=http%3A%2F%2Fwww.faxingtupian.com%2Fp%2Fallimg%2F150110%2F1-150110110440.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=770484569,2221827162&fm=26&gp=0.jpg"
      ],
      today:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
    };
  },
  mounted() {
    let landInText = this.$refs.landIn;
    let letters = landInText.textContent.split("");
    landInText.textContent = "";
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${i * 0.05}s`;
      landInText.append(span);
    });

    var map = new BMap.Map("allmap");
    map.enableScrollWheelZoom(true);
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    function myFun(result) {
      console.log(result);
      var cityName = result.name;
      map.setCenter(cityName);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
  }
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
.zl-Homepage {
  height: 100%;
  padding: 25px;
  #allmap {
    height: 100%;
  }
  @keyframes landIn {
    from {
      opacity: 0;
      transform: translateY(-20%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .dataContent {
    display: flex;
    flex-wrap: wrap;
  }
  .dataContent span {
    color: #606266;
    font-family: Lora, serif;
    font-weight: 700;
    font-size: 14px;
    animation: landIn 0.8s ease-out both;
  }
  .map .el-card__body {
    padding: 0;
  }
  .flex .el-card {
    display: flex;
    flex-direction: column;
  }
  .el-col-8 {
    width: 30%;
    margin-right: 5%;
    animation-fill-mode: none;
    height: 345px;
    background: #fff;
    border-radius: 4px;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
  .el-col-8:last-child {
    margin-right: 0;
  }
  .headImg {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  .name {
    display: inline-block;
    height: 100px;
    width: 50%;
    margin-left: 20px;
    font-size: 18px;
    vertical-align: top;
    p {
      height: 50%;
      &:first-child {
        line-height: 70px;
      }
      &:last-child {
        line-height: 40px;
      }
    }
  }
  .el-card {
    height: 100%;
    .el-date-editor.el-input {
      float: right;
      width: 150px;
    }
  }
  .el-card__header {
    font-size: 16px;
    padding: 14px 20px;
  }
  .el-card__body {
    flex: 1;
  }
}
</style>
