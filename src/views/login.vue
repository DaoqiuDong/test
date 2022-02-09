<template>
  <div class="login">
    <img class="customer_logo" src="@/assets/image/gsjkdb.png" />
    <div class="login-div">
    <el-form size="medium" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title" @click="count4redirect">电子保函管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
<!--
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
-->

      <el-checkbox class="remember" v-model="loginForm.rememberMe">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          class="login-btn"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <!--<span>Copyright © 2019-2020 深圳市博和科技有限公司 All Rights Reserved.</span>-->
        <div class="copyright">Copyrights © 2020 All Rights Reserved 版权所有 甘肃金融控股集团有限公司 陇ICP备17004168号
            <img class="ga" src="@/assets/image/ga_icon.png" />甘公网安备 62012102000195号
        </div>
    </div>
    <div class="revision"></div>
  </div>
</template>

<script>
// import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      clicks: 0,
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        // code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCode();
    this.getCookie();
  },
  methods: {
    // getCode() {
    //   getCodeImg().then(res => {
    //     this.codeUrl = "data:image/gif;base64," + res.img;
    //     this.loginForm.uuid = res.uuid;
    //   });
    // },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        // console.log('valid', valid)
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          // console.log("store dispatch")
          this.$store
            .dispatch("OauthLogin", this.loginForm)
            .then(() => {
              console.log("store dispatch then");
              // this.$router.push({ path: this.redirect || "/" });
              // http://gbim.uat.bohotec.com/#/projmap/index
              // let host = window.location.host
              // const idx = host.indexOf('.')
              // console.log('host', host, idx)
              // if (0 < idx) {
              //   host = host.substring(idx, host.length)
              //   host = `gbim{host}/#/projmap/index`
              //   console.log(host)
              // }
              if (5 <= this.clicks) {
                Cookies.set("redirect_to_kulun", "GOGOGO")
              } else {
                Cookies.remove("redirect_to_kulun")
              }
              this.$router.push({ path: "/" });
            })
            .catch((e) => {
              console.log("catch", e)
              this.$message({
                type: 'error',
                message: '登录失败，请输入正确的账号密码',
                duration: 5000,
              })
              this.loading = false;
              // this.getCode();
            });
        }
      });
    },
    count4redirect() {
      this.clicks++;
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  height: 100%;
  /*background-image: url("../assets/image/login-background.jpg");*/
  background-image: url("../assets/image/login-bg.png");
  /*background-size: cover;*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
/*
video {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -2;
    filter: grayscale(10%);
    opacity: .5;
}
*/
.login-div {
    /*
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  align-items: center;
    margin-top: -25vh;
    */
    left: 20vw;
    position: absolute;
}
.customer_logo {
    width: 20vw;
    min-width: 15rem;
    position: absolute;
    left: 40vw;
    top: 2rem;
}
.title {
  margin: 0 0 3rem 0;
  text-align: center;
  /*color: #707070;*/
    font-size: 1.5rem;
    background: linear-gradient(0deg, #379ADA 33.154296875%, #025B95 87.8173828125%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-form {
    /*border-radius: 6px;*/
    /*background: #888;*/
    width: 30vw;
    min-width: 200px;
    padding: 1rem;
  & .el-input {
    /*height: 38px;*/
    & input {
      height: 3rem;
        /*width: 513px;*/
        /*height: 72px;*/
        padding: 20px 30px;
        box-shadow: 0px 7px 10px 0px rgba(42, 161, 246, 0.18);
        border-radius: 3rem;
    }
    .el-input__prefix {
        left: 10px;
        top: 3px;
    }
  }
  .login-btn {
      width: 100%;
      border-radius: 3rem;
      height: 3rem;
      background: linear-gradient(90deg, #01A4FF, #1259EE);
      font-size: 1rem;
      color: #ffffff;
      margin-top: 3rem;
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
    .remember {
        right: 2rem;
        position: absolute;
    }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
/*
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
*/
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 12px;
    letter-spacing: 1px;
    & .copyright {
        width: 100%;
        color: #95CFF4;
        position: absolute;
        text-align: center;
    }
}
.revision {
  top: 0;
  left: 0;
  position: absolute;
  font-size: 1px;
}
</style>
