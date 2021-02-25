import TIMC from './tim-wx-sdk'
import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min.js'

export const createTIM = TIMC // for bot

export default createTIM() // as original TIM, for user

export function genTestUserSig(userID, SDKAPPID, SECRETKEY) {
  const EXPIRETIME = 604800
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME)
  const userSig = generator.genTestUserSig(userID)
  return {
    SDKAppID: SDKAPPID,
    userSig: userSig
  }
}
