<template>
<div class="page Search">

  <center>
    <router-link class="toHome" to="/">На главную</router-link>
    <p>поиск по [{{inpTXT}}]</p>
    <img height="120" v-if="spinner" src="./assets/spinner.svg">
  </center>

  <div v-if="twList && !spinner" class="item_LIST">
    <div class="ITEM" v-for="(item,i) in twList">
      
      <img class="avatar" :src="item.user.profile_image_url">

      <time>{{ new Date(item.created_at).toLocaleString() }}</time>
      <b>{{item.user.name}}</b>
      <span>@{{item.user.screen_name}}</span>
      <i>{{item.user.location}}</i>

      <p class="ITEM_text">
        <span v-html="mark(item.text.includes('https://') ? item.text.split('https://').slice(0,1)[0] : item.text)"></span>
        <a :href="'https://twitter.com/'+item.user.screen_name+'/status/'+ item.id_str"> подробно»</a>
      </p>
    </div>
  </div>

  <center v-if="ERROR" class="ERROR">
    <b>{{inpTXT}}</b> Не найдено
  </center>

</div>
</template>


<script>

import axios from 'axios';

export default {
  name: 'Search',
  data () {
    return {
      spinner: false,
      ERROR: false,
      twList: this.$store.getters.getTwList
    }
  },
  computed: {
    inpTXT () {
      return this.$route.params.search
    },
  },
  methods: {
    mark(text) {
      let mark_keyword = this.inpTXT;
			const regex = new RegExp("(" + mark_keyword + ")", "gi");
			return text.replace(regex, '<mark>$1</mark>');
    },

    getData() {

      this.spinner = true;

      axios.get('http://localhost:3000/search_json/'+this.inpTXT)
        .then(resp => {
          this.twList = resp.data.statuses;
          setTimeout(() => {
            this.spinner = false
          }, 1200)
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
  mounted () {
    !this.$store.getters.getTwList && this.getData()
  }
}
</script>

<style lang="scss">

$blue: #1DA1F2;
$magenta: #f0f;


.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.item_LIST {
  margin: 1em auto 2em;
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
    color: #1c94e0;
    text-decoration: none;
    &:hover {
      //background-color: #ffff00;
      text-decoration: underline;
      text-decoration-color: aqua;
    }
  }
}
</style>
