<template>
  <div class="login-container flex items-center">
    <el-form
      ref="login_form"
      :model="formRequest"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login') }}</h3>
      </div>
      <el-form-item prop="username" class="mb-6 h-18">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          v-model="formRequest.username"
          prop="username"
          :placeholder="$t('username')"
          @keyup.enter.native="onSubmitForm('login_form')"
        />
      </el-form-item>

      <el-form-item prop="password" class="mb-6 h-18">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-input
          v-model="formRequest.password"
          prop="password"
          type="password"
          :placeholder="$t('password')"
          @keyup.enter.native="onSubmitForm('login_form')"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="mb-6 w-full h-18 text-md"
        @click.native.prevent="onSubmitForm('login_form')"
        @keyup.enter.native="onSubmitForm('login_form')"
      >{{ $t("login") }}
      </el-button>
      <el-button
        type="info"
        class="w-full h-18 text-md"
        style="margin: 0px;"
        @click.native.prevent="$router.push({ path: '/register' })"
      >{{ $t("register") }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import i18n from "@/lang/i18n";
import { validateText } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      formRequest: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            validator: (rule, _, callback) =>
              validateText(
                rule,
                this.formRequest.username,
                callback,
                i18n.t("username")
              ),
            trigger: "change",
          },
        ],
        password: [
          {
            validator: (rule, _, callback) =>
              validateText(
                rule,
                this.formRequest.password,
                callback,
                i18n.t("password")
              ),
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        console.log("validate", validate);
        if (validate) {
          this.handleLogin();
        }
      });
    },
    handleLogin() {
      this.$store
        .dispatch("user/login", this.formRequest)
        .then((res) => {
          if (res.statusCode === 200) {
            return window.location.reload();
          }
          throw new Error(res.message);
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        });
    },
  },
};
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #1b2038;
$dark_gray: #889aa4;
$light_gray: #eee;
.login {
  display: flex;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    top: -20px;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  .image-capcha {
    padding-top: 8px;
  }
  .icon {
    font-size: 24px;
    padding: 0px;
    color: #eee;
    background-color: transparent;
    border-color: transparent;
  }
}

.re-send-otp {
  margin: 0;
  text-align: center;
}
.re-send-otp.count-down {
  color: #ffffff;
  width: 100%;
  /*background:  linear-gradient(to top right, #26BBFE, #1BC88B);*/
  /*background-image: radial-gradient(circle at top right, #222, #f6a800);*/
  background-color: #222222;
  margin-top: 20px;
  border-radius: 20px;
  padding: 5px 0;
}
.msg_err {
  color: red;
  font-size: 12px;
  font-style: italic;
}
.righ_item {
  color: #fff;
  position: absolute;
  top: 3px;
  font-size: 18px;
  right: 0;
  cursor: pointer;
}
</style>
