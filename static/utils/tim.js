import COSSDK from 'cos-wx-sdk-v5'
import TIM from './sdk'

let sdkappid = null
let sdksecret = null

export function initTimInstance(appid, secret) {
  if (wx.$app) return // 已经初始化过了

  sdkappid = appid // 保存一下appid
  sdksecret = secret

  // 初始化 SDK 实例
  wx.$app = TIM.create({ SDKAppID: appid })
  wx.$app.setLogLevel(4)
  // 注册 cos
  wx.$app.registerPlugin({ 'cos-js-sdk': COSSDK })
}
