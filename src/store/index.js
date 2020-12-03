import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  goods: {}
  },
  mutations: {
	  tempSave(state,goods){
		  //临时保存商品
		  state.goods = goods
	  }
  },
  actions: {
	  tempSave(store,goods){
		  store.commit('tempSave',goods)
	  }
  },
  modules: {
  },
  getters: {
	  
  }
})
