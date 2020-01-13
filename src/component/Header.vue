<template>
  <div class="zl-header">
    <transition name="el-fade-in-linear">
      <div class="menuSwitch transition-box" @click="menuControl" v-show="!menuSwitch">
        <i class="el-icon-s-grid"></i>
      </div>
    </transition>
    <transition name="el-fade-in">
      <div class="menuSwitch transition-box" @click="menuControl" v-show="menuSwitch">
        <i class="el-icon-menu"></i>
      </div>
    </transition>
    <div class="timeTip">{{timeMes}} !</div>
    <div class="rightMes">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
        <i class="el-icon-rank" @click="fullScreen"></i>
      </el-tooltip>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            Randall
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://blog.csdn.net/a_passing_traveller" target="_blank">
              <el-dropdown-item>我的博客</el-dropdown-item>
            </a>
            <a href="https://github.com/xiezhili001/xiezhili001.github.io" target="_blank">
              <el-dropdown-item>github</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      fullscreen: false,
      timeMes: ""
    };
  },
  computed: {
    ...mapState(["menuSwitch"])
  },
  methods: {
    ...mapMutations(["menuControl"]),
    //全屏
    fullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 时间语
    setTimeWord() {
      var hours = new Date().getHours();
      if (7 >= hours >= 5) {
        this.timeMes = "早上好";
      } else if (10 >= hours && hours >= 8) {
        this.timeMes = "上午好";
      } else if (12 >= hours && hours >= 11) {
        this.timeMes = "中午好";
      } else if (17 >= hours && hours >= 13) {
        this.timeMes = "下午好";
      } else if (22 >= hours && hours >= 18) {
        this.timeMes = "晚上好";
      } else if (hours > 22 || hours < 5) {
        this.timeMes = "夜深了";
      }
    }
  },
  created() {
    this.setTimeWord()
  }
};
</script>
<style lang="scss">
@import "../static/css/color.scss";
.zl-header {
  height: 100%;
  position: relative;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .timeTip {
    position: absolute;
    top: 0;
    left: 80px;
    height: 100%;
    line-height: 50px;
    font-size: 18px;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .menuSwitch {
    height: 100%;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rightMes {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #fff;
    padding: 0 20px;
    i {
      font-size: 20px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      margin-right: 20px;
    }
    i:hover {
      color: #fff;
      transition: all 0.5s;
    }
    i.el-icon-arrow-down {
      font-size: 15px;
      margin-left: 0;
    }
    .el-dropdown,
    .el-dropdown i {
      color: #fff;
      transition: all 0.5s;
      margin-right: 0;
    }
  }
}
</style>
