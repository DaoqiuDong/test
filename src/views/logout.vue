<template></template>
<script>
  export default {
    name: 'LogOutEntrance',
    created() {
      this.$store.dispatch('LogOut').then(() => {
        location.replace('/')
      })
    }
  }
</script>
