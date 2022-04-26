import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
      items: []
  },
  getters: {
  },
  mutations: {
    setCharacters(state, payload) {
      state.items = payload;
    },
  },
  actions: {
    //load data from json file
    getCharacters ({ commit }) {
      axios.get("https://rickandmortyapi.com/api/character")
          .then(response => commit('setCharacters', response.data.results))
          .catch(error => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
          });
    },
    
  },
})
