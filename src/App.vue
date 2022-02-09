<template>
  <div id="app">
    <router-view/>
    <alarm-view />
  </div>
</template>

<script>
  import AlarmView from "./layout/components/AlarmView/index";

  export default {
    name: 'App',
    components: {AlarmView}
  }
</script>
