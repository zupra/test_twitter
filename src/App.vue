<template>
  <div id="app">
    <img class="twLogo" src="./assets/logo.svg">

    <div class="Search">
      <input v-model="inpTXT" placeholder="... Поиск" @keydown.enter="getData">
      <button @click="getData">Go</button>
    </div>

    <div class="item_LIST">
      <div class="ITEM" v-for="(item,i) in tweets.statuses">
        
        <img class="avatar" :src="item.user.profile_image_url">

        <time>{{ new Date(item.created_at).toLocaleString() }}</time>
        <b>{{item.user.name}}</b>
        <span>@{{item.user.screen_name}}</span>
        <i>{{item.user.location}}</i>

        <p class="ITEM_text">
          <span v-html="mark(item.text.includes('https://') ? item.text.split('https://').slice(0,1)[0] : item.text)"></span>
          <!-- {{ item.text.includes('https://') ? item.text.split('https://').slice(0,1)[0] : item.text }} -->
          <a :href="'https://twitter.com/'+item.user.screen_name+'/status/'+ item.id_str"> подробно»</a>
        </p>
        <!-- <pre>{{item}}</pre> -->
      </div>
    </div>

    <!-- <pre>{{tweets}}</pre> -->
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      inpTXT: '',
      spinner: false,
      tweets: {}
    }
  },
  methods: {
    getData() {
      let getHost = window.location.href,
          urlTXT = this.inpTXT || getHost.split('search/').slice(-1)[0];
      this.spinner = true;
      axios.get('http://localhost:3000/search/'+urlTXT)
        .then(resp => {
          this.tweets = resp.data;
          setTimeout(() => {
            this.spinner = false
          }, 700)
        })
        .catch(error => console.log('axios', error));
    },
    mark(text) {
      let mark_keyword = this.inpTXT;
			const regex = new RegExp("(" + mark_keyword + ")", "gi");
			return text.replace(regex, '<mark>$1</mark>');
		}
  },
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

$blue: #1DA1F2; //#1b95e0;
$magenta: #f0f;

body {
  //background-image: linear-gradient(135deg,#1da1f2,#981ceb);
  background-color: $blue;
  font: calc(1vw + 1vh + 0.5vmin)/1.5 Helvetica, sans-serif;
  color: rgba(0,0,0,0.7);
  padding: 0 1em;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

a {
  color: #1c94e0;
}


//img
.twLogo {
  width: 33vh;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
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
    //color: #FFF;
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

pre {
  font-size: 10px;
}


.item_LIST {
  margin: 2em auto;
  max-width: 960px;
}

.ITEM {
  background: #FFF;
  padding: 1em;
  border-bottom: 1px solid rgba($blue, .3);
  color: rgba(0,0,0,0.5);
}

.ITEM_text {
  color: rgba(0,0,0,0.8);
  a {
    text-decoration: none;
    &:hover {
      //background-color: #ffff00;
      text-decoration: underline;
      text-decoration-color: aqua;
    }
  }
}
</style>
