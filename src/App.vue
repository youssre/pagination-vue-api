<template>
  <div class="container">
    <show-data 
    :data="items"
    :total-pages="Math.ceil(items.length / 4)"
    :total="items.length"
    :per-page="4"
    :current-page="currentPage"
    @pagechanged="onPageChange">
    </show-data>
  </div>
</template>

<script>
import showData from "@/components/showData.vue"
import { mapState , mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    showData
  },
  data(){
    return {
			currentPage: 1,
    }
  },
  methods: {
		...mapActions(['getCharacters']),
    onPageChange(page) {
      this.currentPage = page;
		},
  },
  computed: mapState([  //access to state
        'items'
    ]),
  mounted(){
    this.getCharacters()
  },
}
</script>


<style lang="scss">
:root{
  --background-body: #24282f;
  --background-card: #3C3E44;
  --text-white: #fff;
  --text-gray: #c0c0c0;
  --text-orange: #ff9800;
}
body{
  background-color: var(--background-body);
  color: var(--text-white);
  font-family: 'Segeo UI',Verdana, Geneva, Tahoma, sans-serif;
}
h1{
  text-align: center;
  margin-bottom: 3rem;
}
.container{
  width: 980px;
  max-width: 90%;
  margin: 5rem auto;
}
img{
  width: 100%;
  max-height: 400px;
}
  
</style>

