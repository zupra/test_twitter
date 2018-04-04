<template>
  <div id="App">

    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

$blue: #1DA1F2; //#1b95e0;

body {
  background-color: $blue;
  font: calc(1vw + 1vh + 0.5vmin)/1.5 Helvetica, sans-serif;
  color: rgba(0,0,0,0.7);
  padding: 0 1em;
}
#App {
  min-height: 100vh;
  display: flex;
}
.page {
  margin: auto;
}
a {
  color: #FFF;
}


.page-enter-active,
.page-leave-active {
  transition: all 0.7s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: scale(0);
}

</style>
