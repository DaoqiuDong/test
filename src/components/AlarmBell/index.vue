<template>
  <div v-show="showBell" @click="show">
    <i id="bell" class="bell el-icon-message-solid"></i>
  </div>
</template>
<script>
  // import { addClass, removeClass } from '@/utils'
  export default {
    name: 'AlarmBell',
    data() {
      return {
        shared: this.$store.state,
        // showBell: false
      }
    },
    methods: {
      show() {
        // removeClass(document.getElementById('bell'), 'bell')
        console.log('show alarm window')
        this.$store.dispatch('alarms/setAlarms', { key: 'showView', value: true })
      }
    },
    computed: {
      showBell() {
        console.log('computed showBell', this.shared.alarms)
        return this.shared.alarms.show
      }
    },
    // watch: {
    //   alarm(s) {
    //     console.log(s)
    //     this.showBell = s.show
    //   }
    // }
  }
</script>

<style scoped>
  .bell {
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-size: 1.75rem;
    padding-top: .75rem;
    /*color: #ff3f80;*/
    color: #F44336;
    animation: bkf .5s infinite;
    animation-direction: alternate;
    -webkit-animation: bkf .5s infinite;
    -webkit-animation-direction: alternate;
  }
  @keyframes bkf {
    from {opacity: .3;}
    to {opacity: 1;}
  }
  @-webkit-keyframes bkf {
    from {opacity: .3;}
    to {opacity: 1;}
  }
</style>
