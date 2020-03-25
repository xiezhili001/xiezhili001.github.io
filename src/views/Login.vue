<template>
  <div style="height: 100%" class="zl-login">
    <el-card shadow="never" class="login">
      <div class="header">用户登录</div>
      <div class="main">
        <el-input placeholder="请输入用户名" v-model="userName" clearable size="large"></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password size="large"></el-input>
      </div>
      <div class="footer">
        <el-button type="primary" :loading="load" @click="login">{{ state }}</el-button>
      </div>
    </el-card>
    <div class="snow" v-for="(item,index) in 200" :key="index"></div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      userName: "passenger",
      password: "123456",
      load: false,
      state: "登录"
    };
  },
  methods: {
    login() {
      this.load = true;
      this.state = "登录中";
      this.$axios
        .post("/api/login/user", {
          userName: this.userName,
          password: this.password
        })
        .then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: "homepage"
            });
            this.$user = res.data.user;
            localStorage.setItem('token',res.data.token)
          } else {
            this.$messageTips(res.msg, "warning", 2000);
            this.load = false;
            this.state = "登录";
          }
        });
    }
  }
};
</script>

<style lang="scss">
.zl-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);

  @function random_range($min, $max) {
    $rand: random();
    $random_range: $min + floor($rand * (($max - $min) + 1));
    @return $random_range;
  }

  .snow {
    $total: 201;
    top: 0;
    left: 0;
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;

    @for $i from 1 through $total {
      $random-x: random(1000000) * 0.0001vw;
      $random-offset: random_range(-100000, 100000) * 0.0001vw;
      $random-x-end: $random-x + $random-offset;
      $random-x-end-yoyo: $random-x + ($random-offset / 2);
      $random-yoyo-time: random_range(30000, 80000) / 100000;
      $random-yoyo-y: $random-yoyo-time * 100vh;
      $random-scale: random(10000) * 0.0001;
      $fall-duration: random_range(10, 30) * 1s;
      $fall-delay: random(30) * -1s;

      &:nth-child(#{$i}) {
        opacity: random(10000) * 0.0001;
        transform: translate($random-x, -10px) scale($random-scale);
        animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
      }

      @keyframes fall-#{$i} {
        #{percentage($random-yoyo-time)} {
          transform: translate($random-x-end, $random-yoyo-y)
            scale($random-scale);
        }

        to {
          transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
        }
      }
    }
  }
  .el-card {
    border: none;
    background: transparent;
  }
  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 450px;
    height: 350px;
    .el-input__inner {
      background-color: transparent;
      color: #fff;
    }
    .header {
      text-align: center;
      font-size: 25px;
      margin-bottom: 10px;
      color: #eee;
      font-weight: 700;
    }

    .main {
      .el-input {
        margin-top: 30px;
      }
    }

    .footer {
      margin-top: 30px;
      text-align: center;

      button {
        width: 100%;
        height: 40px;
        font-size: 15px;
      }
    }
  }
}
</style>
