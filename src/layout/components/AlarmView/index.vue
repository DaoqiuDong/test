<template>
  <div v-show="showView" id="view" class="alarm-view">
<!--
    <div class="alarm-view-title">
      预警提示
      <i class="el-icon-close" @click="close" />
    </div>
    <div class="list" @click="redirect">
    <div v-for="i in alarmdata" :key="i.id">
      <div v-if="'G' === i.alarmCategory" :class="levelClass(i.level)" >
        {{i.batchTime}}，&lt;!&ndash;<div>{{i.lineName}}</div>项目&ndash;&gt;<div>{{i.workspaceNum}}</div>工点，{{ i.category |categoryFilter}} <div>{{i.groupName}}</div>测组综合预警等级为<div>{{convertLevel(i.level)}}</div>级:
        <li v-for="p in i.details" class="points">
          <div class="line"></div>{{p.monitoringPointNum}}测点{{p.alarmName}}{{p.measureValue | formatMeasureValue(i.measureUnit)}}{{p.measureUnit}}，
          超过设定阈值({{p.lowerLimit}}{{p.measureUnit}} / {{p.upperLimit}}{{p.measureUnit}})
        </li>
      </div>
      <div v-else-if="'C' === i.alarmCategory" :class="levelClass(i.level)" >
        {{i.batchTime}}，&lt;!&ndash;<div>{{i.lineName}}</div>项目&ndash;&gt;<div>{{i.workspaceNum}}</div>工点，<div>{{ i.category |categoryFilter}}</div> 综合预警等级为<div>{{convertLevel(i.level)}}</div>级:
        <li v-for="p in i.details" class="points">
          <div class="line"></div>{{p.monitoringPointNum}}测点{{p.alarmName}}{{p.measureValue | formatMeasureValue(i.measureUnit)}}{{p.measureUnit}}，
          超过设定阈值({{p.lowerLimit}}{{p.measureUnit}} / {{p.upperLimit}}{{p.measureUnit}})
        </li>
      </div>
      <div v-else-if="'P' === i.alarmCategory" :class="levelClass(i.level)" >
        {{i.batchTime}}，&lt;!&ndash;<div>{{i.lineName}}</div>项目&ndash;&gt;<div>{{i.workspaceNum}}</div>工点，{{ i.category |categoryFilter}} <div>{{i.monitoringPointNum}}</div>测点预警等级为<div>{{convertLevel(i.level)}}</div>级:
        <div>{{i.alarmName}}{{i.measureValue | formatMeasureValue(i.measureUnit)}}{{i.measureUnit}}</div>，
        超过设定阈值({{i.lowerLimit}}{{i.measureUnit}} / {{i.upperLimit}}{{i.measureUnit}})
      </div>
    </div>
    </div>
-->
  </div>
</template>
<script>
  // import { list } from '@/api/alarmData';
  import { addClass, removeClass } from '@/utils';
  import { ALARM_TYPES } from '@/utils/alarms';
  import { CATEGORIES } from '@/utils/bohotec.com';

  export default {
    name: 'AlarmView',
    data() {
      return {
        // showView: false,
        handler: undefined,
        shared: this.$store.state,
        alarmdata: [],
      }
    },
    computed: {
      showView() {
        // console.log('computed showView', this.shared.alarms)
        return this.shared.alarms.showView
      }
    },
    watch: {
      showView(n, o) {
        if (n && !o) {
          addClass(document.getElementById('view'), 'open')
          setTimeout(() => {
            removeClass(document.getElementById('view'), 'open')
          }, 900)
        }
      }
    },
    /*
    mounted() {
      const _this = this;
      // this.$nextTick(() => _this.getAlarmData())
      // this.handler = setInterval(() => this.getAlarmData, 30000)
      this.handler = setInterval(() => {
        // console.log('get alarm data')
        if (this.shared.user.token) {
          const LATEST_KEY = 'alarm.notify.latest'
          let latest = localStorage.getItem(LATEST_KEY)
          latest = latest ? latest : '2020-06-06 06:06:06'
          console.log('get alarm data', latest)
          list({
            start: latest,
            due: latest,
          }).then(response => {
            if (response.data && response.data.length) {
              _this.transform(response.data)
              _this.$store.dispatch('alarms/setAlarms', { key: 'show', value: true })
              _this.$store.dispatch('alarms/setAlarms', { key: 'showView', value: true })
              if (_this.alarmdata && _this.alarmdata.length && _this.alarmdata[0].batchTime) {
                localStorage.setItem(LATEST_KEY, this.alarmdata[0].batchTime)
              }
            }
          })
        } else {
          console.log('has not token')
          clearInterval(this.handler)
        }
      }, 60000)
      // console.log('alarm view created')
      // setInterval(() => _this.getAlarmData, 30000)
      // this.getAlarmData()
      setTimeout(() => {
        console.log('setTimeout getAlarmData')
        _this.getAlarmData()
      }, 5000)
    },
    // beforeDestroy() {
    //   console.log('destroy timer')
    //   clearInterval(this.handler)
    // },
    */
    methods: {
    //   getAlarmData() {
    //     console.log('get alarm data')
    //     if (this.shared.user.token) {
    //       const LATEST_KEY = 'alarm.notify.latest'
    //       let latest = localStorage.getItem(LATEST_KEY)
    //       latest = latest ? latest : '2020-06-06 06:06:06'
    //       console.log('get alarm data', latest)
    //       list({
    //         start: latest,
    //         due: latest,
    //       }).then(response => {
    //         if (response.data && response.data.length) {
    //           this.transform(response.data)
    //           this.$store.dispatch('alarms/setAlarms', { key: 'show', value: true })
    //           this.$store.dispatch('alarms/setAlarms', { key: 'showView', value: true })
    //           if (this.alarmdata && this.alarmdata.length && this.alarmdata[0].batchTime) {
    //             localStorage.setItem(LATEST_KEY, this.alarmdata[0].batchTime)
    //           }
    //         }
    //       })
    //     } else {
    //       console.log('has not token')
    //     }
    //     // if (!this.handler) {
    //     //   console.log('create handler')
    //     //   const _this = this;
    //     //   this.handler = setInterval(() => _this.getAlarmData, 30000)
    //     // }
    //   },
    //   close() {
    //     // console.log('close')
    //     addClass(document.getElementById('view'), 'close')
    //     setTimeout(() => {
    //       // this.showView = false
    //       this.$store.dispatch('alarms/setAlarms', { key: 'showView', value: false })
    //       removeClass(document.getElementById('view'), 'close')
    //       // addClass(document.getElementById('view'), 'open')
    //     }, 900)
    //   },
    //   redirect() {
    //     this.$router.push('/alarmData/hist')
    //   },
    //   transform(data) {
    //     data.sort((a, b) => a.level - b.level)
    //     this.alarmdata = data
    //     if (this.alarmdata && this.alarmdata.length) {
    //       this.alarmdata.forEach(i => {
    //         console.log(i.alarmName, i.alarmType)
    //         if (i.alarmName && ('-' !== i.alarmName)) {
    //           console.log('replace ', i.alarmType, ' as ', i.alarmName)
    //           i.alarmType = i.alarmName
    //         }
    //       })
    //     }
    //   },
    //   levelClass(level) {
    //     return `level${level}`
    //   },
    //   convertLevel(level) {
    //     return ['', '报警', '预警', '关注'][level]
    //   }
    // },
    // filters: {
    //   categoryFilter(v) {
    //     return CATEGORIES[v]
    //   },
    //   alarmTypeFilter(v, c) {
    //     // console.log(v, c, ALARM_TYPES[c], ALARM_TYPES[c][v])
    //     return ALARM_TYPES[c] && ALARM_TYPES[c][v] && ALARM_TYPES[c][v].name ? ALARM_TYPES[c][v].name : v
    //   },
    //   formatMeasureValue(v, u) {
    //     if (u && !isNaN(v)) {
    //       return (0 <= u.indexOf('°') ? v.toFixed(2) : v.toFixed(1))
    //     }
    //     return v
    //   },
    }
  }
</script>
<style scoped>
  .alarm-view {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 30rem;
    height: 12rem;
    z-index: 99;
    right: .2rem;
    bottom: .2rem;
    color: #ffffff;
    font-size: .8rem;
    margin-left: 5rem;
  }
  .alarm-view .alarm-view-title {
    width: 100%;
    padding: .3rem .5rem;
    background-color: #409eff55;
    color: #ffffff;
    text-align: left;
  }
  .alarm-view .alarm-view-title i {
    position: absolute;
    right: .3rem;
    font-size: 1rem;
    color: #ffffff;
  }
  .alarm-view .list {
    height: calc(100% - 1.5rem);
    background-color: #2b2f3a;
    color: #cccccc;
    padding: .5rem;
    overflow-y: auto;
    cursor: pointer;
  }
  .alarm-view .list > div {
    margin-bottom: .5rem;
  }
  .alarm-view .list > div:last-of-type {
    margin-bottom: 0;
  }
  .close {
    animation: close_kf 1s;
    animation-fill-mode: forwards;
    -webkit-animation: close_kf 1s;
    -webkit-animation-fill-mode: forwards;
  }
  .open {
    animation: close_kf 1s;
    animation-fill-mode: forwards;
    -webkit-animation: close_kf 1s reverse;
    -webkit-animation-fill-mode: forwards;
  }
  @keyframes close_kf {
    from {
      opacity: 1;
      height: 12rem;
    }
    to {
      opacity: .5;
      height: 0;
    }
  }
  @-webkit-keyframes close_kf {
    from {
      opacity: 1;
      height: 12rem;
    }
    to {
      opacity: .5;
      height: 0;
    }
  }
  .level1 > div {
    color: #fc8675;
  }
  .level2 > div {
    color: #f3ce85;
  }
  .level3 > div {
    color: #6bafbd;
  }
  .level4 > div,.level9 > div {
    color: #65cea7;
  }
  .level1 > div,
  .level2 > div,
  .level3 > div,
  .level4 > div,
  .level9 > div {
    display: inline;
  }
  .level1 > .points,
  .level2 > .points,
  .level3 > .points {
    display: block;
    margin: .2rem 0 0 .5rem;
    font-size: .75rem;
  }
  .line {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 5px;
    margin: 0 .5rem;
    background-color: #cccccc77;
  }
</style>
