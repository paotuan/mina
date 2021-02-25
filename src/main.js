import Vue from 'mpvue'
import TIMApp from './App'
import TIM from '../static/utils/sdk'
import store from './store/index'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { queryString } from './utils'
import TYPES from './utils/types'

wx.store = store
wx.TIM = TIM
wx.dayjs = dayjs
dayjs.locale('zh-cn')

let $bus = new Vue()
Vue.prototype.TIM = TIM
Vue.prototype.$type = TYPES
Vue.prototype.$store = store
Vue.prototype.$bus = $bus

// 小程序目前对该方法没有对外暴露
wx.onAppRoute((res) => {
  const { path, query } = res
  if (path !== 'pages/selected-members/main') {
    const qr = queryString(query)
    const page = qr ? `/${path}?${qr}` : `/${path}`
    store.commit('setCurrentPage', page)
  }
})
// 注册监听事件
export function registerEvents (tim) {
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

  tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
  tim.on(TIM.EVENT.ERROR, onError, this)

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived, this)
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, convListUpdate, this)
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, groupListUpdate, this)
  tim.on(TIM.EVENT.BLACKLIST_UPDATED, blackListUpdate, this)
  tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange, this)
  tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer, this)
}
function onReadyStateUpdate ({ name }) {
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  if (isSDKReady) {
    wx.$app.getMyProfile().then(res => {
      store.commit('updateMyInfo', res.data)
    })
    wx.$app.getBlacklist().then(res => {
      store.commit('setBlacklist', res.data)
    })
    wx.$app.getGroupList().then(res => {
      store.commit('updateGroupList', res.data.groupList)
    })
  }
  store.commit('setSdkReady', isSDKReady)
}

function kickOut (event) {
  store.dispatch('resetStore')
  wx.showToast({
    title: '你已被踢下线',
    icon: 'none',
    duration: 1500
  })
  setTimeout(() => {
    wx.reLaunch({
      url: '../login/main'
    })
  }, 500)
}

function onError (event) {
  // 网络错误不弹toast && sdk未初始化完全报错
  if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
    store.commit('showToast', {
      title: event.data.message,
      duration: 2000
    })
  }
}

function checkoutNetState (state) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return { title: '已接入网络', duration: 2000 }
    case TIM.TYPES.NET_STATE_CONNECTING:
      return { title: '当前网络不稳定', duration: 2000 }
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      return { title: '当前网络不可用', duration: 2000 }
    default:
      return ''
  }
}

function netStateChange (event) {
  console.log(event.data.state)
  store.commit('showToast', checkoutNetState(event.data.state))
}

function onMessageReadByPeer (event) {
  console.log(event)
}

function messageReceived (event) {
  for (let i = 0; i < event.data.length; i++) {
    let item = event.data[i]
    if (item.type === TYPES.MSG_GRP_TIP) {
      if (item.payload.operationType) {
        $bus.$emit('groupNameUpdate', item.payload)
      }
    }
  }
  store.dispatch('onMessageEvent', event)
}

function convListUpdate (event) {
  store.commit('updateAllConversation', event.data)
}

function groupListUpdate (event) {
  store.commit('updateGroupList', event.data)
}

function blackListUpdate (event) {
  store.commit('updateBlacklist', event.data)
}

// 获取系统信息
let sysInfo = wx.getSystemInfoSync()
store.commit('setSystemInfo', sysInfo)

// 初始化通话信息
// store.commit('setCalling', false)
// store.commit('setCallData', { action: '', data: {} })

new Vue({
  TIMApp
}).$mount()
