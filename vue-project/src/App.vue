<template>
  <div id="app">
    <MainNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MainNavigation from '@/components/MainNavigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainNavigation
  }
})
</script>
export default { 
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

