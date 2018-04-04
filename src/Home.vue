<template>
<div class="page Home">

  <div class="LOGO">
    <img v-if="!spinner" src="./assets/logo.svg">
    <img v-else src="./assets/spinner.svg">
  </div>

  <div class="Search">
    <input v-model="inpTXT" placeholder="... Поиск" @keydown.enter="getData">
    <button @click="getData">Go</button>
  </div>

  <center v-if="ERROR" class="ERROR">
    <b>{{inpTXT}}</b> Не найдено
  </center>

</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Home',
  data () {
    return {
      inpTXT: '',
      spinner: false,
      ERROR: false,
      twList: []
    }
  },
  methods: {
    getData() {

      if(!this.inpTXT) return

      this.spinner = true;

      axios.get('http://localhost:3000/search_json/'+this.inpTXT)
        .then(resp => {
          this.twList = resp.data.statuses;

          this.$store.commit("setTwList", this.twList);

          setTimeout(() => {
            this.spinner = false
          }, 1200)

          this.$router.push('search/'+this.inpTXT);
        })
        .catch(err => {
          console.log('axios', err);
          this.ERROR = true;
          setTimeout(() => {
            this.spinner = false;
            this.ERROR = false;
          }, 2000)
          
        });
    }
  },
}
</script>

<style lang="scss">



$blue: #1DA1F2;
$magenta: #f0f;

.Home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ERROR {
  margin: 1em 0 0;
  font-size: 1.4em;
  color: #FFF;
}


//img
.LOGO {
  height: 33vh;
  img {
    height: 100%;
  }
} 

.Search {
  position: relative;
  input, button {
    font: inherit;
    line-height: 1;
    border: 0;
    outline: 0;
    padding: .5em 1em;
  }
  input {
    //margin: auto;  
    font-size: 2em;
    box-shadow: 1rem 1rem cyan, 0 1rem 7rem -2rem #000 
  }
  button {
    position: absolute;
    bottom: -1em;
    right: -1em;

    cursor: pointer;
    user-select: none;
    font-weight: bold;
    //box-shadow: 0 0 1rem #000;
    box-shadow: inset 0 0 1em rgba($magenta,0.5), 0 0 1em rgba($magenta,.5);
    border: .12em solid $magenta;

    background-color: gold;
    border-radius: .2em;
    transition: background-color 0.5s, color 0.4s;
    &:hover {
      color: #FFF;
      background-color: $magenta;
      box-shadow: 0 0 1.5em rgba($magenta,.7);
    }
    &:active {
      transform: translateY(7%);
      box-shadow: 0 -.2em 1.5em rgba($magenta,.7)
    }
  }
}
::placeholder {
  color: #9c27b0;
  opacity: .7;
}


</style>
