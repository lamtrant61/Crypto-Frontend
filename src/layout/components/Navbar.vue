<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="show_rightbar">
        <screenfull
          id="screenfull"
          style="display: ruby"
          class="right-menu-item hover-effect"
        />

        <el-tooltip
          style="display: ruby; white-space: nowap"
          content="Global Size"
          effect="dark"
          placement="bottom"
        >
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        style="margin-right: 0px"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="admin.avt_url" class="user-avatar"> -->
          <el-image
            :src="admin.avt_url || logo"
            fit="contain"
            class="user-avatar"
            @error="$event.target.src = logo"
          />
          <i v-if="show_rightbar" class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <template>
            <el-dropdown-item>{{
              `${admin.user_name} - ${admin.department.name}`
            }}</el-dropdown-item>
          </template> -->
          <router-link to="/profile/index">
            <el-dropdown-item divided>{{ admin?.name || admin?.username }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t("logout") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
// import ErrorLog from '@/components/ErrorLog'
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
// import Search from '@/components/HeaderSearch'
import { getAcountInfo } from "@/utils/auth";
import { resetRouter } from "@/router";
import store from "@/store";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    // Search
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  created() {},
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    const admin_info = getAcountInfo();
    // console.log('.............. admin info ', admin_info)
    return {
      admin: admin_info,
      show_rightbar: false,
      logo: require("@/assets/default.png"),
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      resetRouter();
      store.dispatch("user/resetToken").then(() => {
        location.reload();
      });
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleResize() {
      if (window.innerWidth <= 768) {
        this.show_rightbar = false;
      } else {
        this.show_rightbar = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    //width: 400px;
    // background-color: red;
    display: flex;
    justify-content: flex-end;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
