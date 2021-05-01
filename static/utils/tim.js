import COSSDK from 'cos-wx-sdk-v5'
import TIM from './sdk'

// let sdkappid = null
// let sdksecret = null

export function initTimInstance (appid, secret) {
  // if (wx.$app) return // 已经初始化过了

  // sdkappid = appid // 保存一下appid
  // sdksecret = secret

  // 初始化 SDK 实例
  wx.$app = TIM.create({ SDKAppID: appid })
  wx.$app.setLogLevel(4)
  // 注册 cos
  wx.$app.registerPlugin({ 'cos-wx-sdk': COSSDK })
}

export function registerListeners (tim, listenerMap, scope) {
  for (let event in listenerMap) {
    // 可能会出现由于页面刷新、重新登录等导致多次注册监听器的情况
    // 这里最简单粗暴的办法是每次注册之前反注册一次原来的监听器
    tim.off(event, listenerMap[event], scope)
    tim.on(event, listenerMap[event], scope)
  }
}
