const globalModules = {
  state: {
    systemInfo: null,
    isSdkReady: false,
    // isCalling: false,
    // initTRTCCalling: true,
    // rtcConfig: {},
    // callData: {
    //   action: '',
    //   data: {}
    // },
    currentPage: ''
  },
  getters: {
    isSdkReady: state => state.isSdkReady,
    // isCalling: state => state.isCalling,
    // rtcConfig: state => state.rtcConfig,
    currentPage: state => state.currentPage,
    // callData: state => state.callData,
    // iPhoneX 或 iPhone 11 及以上，是全面屏
    isIphoneX: state => state.systemInfo ? (state.systemInfo.model.startsWith('iPhone X') || state.systemInfo.model.startsWith('iPhone 1')) : false
  },
  mutations: {
    showToast (state, payload) {
      wx.showToast({
        title: payload.title,
        icon: payload.icon || 'none',
        duration: payload.duration || 800
      })
    },
    setSdkReady (state, payload) {
      state.isSdkReady = payload
    },
    // setCalling (state, payload) {
    //   state.isCalling = payload
    // },
    // setInitTRTCCalling (state, payload) {
    //   state.initTRTCCalling = payload
    // },
    // setRtcConfig (state, payload) {
    //   state.rtcConfig = payload
    // },
    // setCallData (state, payload) {
    //   state.callData = {
    //     ...state.callData,
    //     ...payload
    //   }
    // },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    },
    setSystemInfo (state, payload) {
      state.systemInfo = payload
    }
  },
  actions: {
    resetStore (context) {
      context.commit('resetGroup')
      context.commit('resetUser')
      context.commit('resetCurrentConversation')
      context.commit('resetAllConversation')
      context.commit('reset') // now for game module
    }
  }
}

export default globalModules
