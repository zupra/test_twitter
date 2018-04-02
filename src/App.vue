<template>
  <div id="app">
    <img src="./assets/logo.svg">

    <input type="text" placeholder="... Поиск">
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App MAZA'
    }
  }
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
  //background-image: linear-gradient(135deg,#1da1f2,#981ceb);
  background-color: $blue;
  font: calc(1vw + 1vh + 0.5vmin)/1.5 sans-serif;
  color: rgba(0,0,0,0.7);
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

img {
  width: 33vh;
}

input {
  //margin: auto;
  
  font: inherit;
  line-height: 1;
  font-size: 2em;
  padding: .5em 1em;

  border: 0;
  outline: 0;
  box-shadow: 1rem 1rem cyan, 0 1rem 7rem -2rem #000 
}

::placeholder {
  color: #9c27b0;
  opacity: .7;
}
</style>
