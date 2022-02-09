<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
      <div class="copyright">Copyrights © 2020 All Rights Reserved 版权所有 甘肃金融控股集团有限公司 陇ICP备17004168号
          <img class="ga" src="@/assets/image/ga_icon.png" />甘公网安备 62012102000195号
      </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /*background-color: #363c3f;*/
  /*margin: .5rem 0 0 1rem;*/
    padding: 0 15px;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.copyright {
    width: calc(100vw - 200px);
    color: #9d9eb8;
    text-align: center;
    bottom: .5rem;
    position: absolute;
    font-size: .75rem;
    & .ga {
        width: .75rem;
        height: .75rem;
    }
}
</style>
