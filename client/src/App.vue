<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

<style>
#app {
  position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-family:arial,'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size:12px;
    font-weight:400;
}
</style>
