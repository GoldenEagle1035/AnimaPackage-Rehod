import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    ocrData: [],
    stakingData: []
  },

  actions: {
    setCount: (context, payload ) => {
      return context.commit('SET_COUNT', payload);
    },
    setOcrData: (context, payload ) => {
      console.log(">>>>>>>>>>>>>>>>>>>SETOCRDATA:", payload)
      return context.commit('OCR_DATA', payload);
    },
    setstakingData: (context, payload ) => {
      return context.commit('STAKING_LIST', payload);
    }
  },

  mutations: {
    SET_COUNT: (state, value) => {
      console.log(">>>>>>>>>>>>>>SET_COUNT", value);
      state.count = value
    },
    OCR_DATA: (state, value) => {
      state.ocrData = value
    },
    STAKING_LIST: (state, value) => {
      console.log(">>>>>>>>>>>>>>SET_COUNT", value);
      state.stakingData = value
    },
  },

  getters: {
    count: state => state.count,
    ocrData: state => state.ocrData,
    stakingData: state => state.stakingData
  }
})