<template>
  <div id="app">
    <register></register>
  </div>
</template>

<script>
import register from './components/Register-form'
import './assets/css/style.css'

export default {
  name: 'app',
  components: {
    'register': register
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
