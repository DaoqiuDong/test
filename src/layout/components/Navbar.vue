<template>
  <div class="navbar">
    <!--<hamburger v-if="showHamburger" id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    <!--<breadcrumb v-if="showHamburger" id="breadcrumb-container" class="breadcrumb-container" />-->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <div v-if="name && !showHamburger" class="right-menu-item hover-effect nickName" @click="redirect">系统管理</div>
        <alarm-bell class="right-menu-item hover-effect" />
<!--
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
-->
      </template>
      <div v-if="name" class="right-menu-item hover-effect nickName">{{ name }}</div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
<!--
          <el-dropdown-item>
            <span @click="setting = true">布局设置</span>
          </el-dropdown-item>
-->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import Screenfull from '@/components/Screenfull'
import AlarmBell from "@/components/AlarmBell/index"
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    AlarmBell,
    Breadcrumb,
    Hamburger,
    // Screenfull,
    // SizeSelect,
    // Search,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'showHamburger',
      'name'
    ]),
    // setting: {
    //   get() {
    //     return this.$store.state.settings.showSettings
    //   },
    //   set(val) {
    //     this.$store.dispatch('settings/changeSetting', {
    //       key: 'showSettings',
    //       value: val
    //     })
    //   }
    // }
  },
  data() {
    return {
      nickName: undefined,
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    },
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background: linear-gradient(90deg, #53A5B3, #0369AC);
  box-shadow: 0px 3px 26px 3px rgba(88, 108, 177, 0.09);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

    /*.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {*/
      /*background-color: #fff9;*/
    /*}*/

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
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
    .nickName {
      font-size: .8rem;
      color: #ffffff;
    }
  }
}
</style>
