/*eslint-disable*/
import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min.js'

const _SDKAPPID = 1400294749;

function genTestUserSig(userID, SDKAPPID, SECRETKEY) {
  var EXPIRETIME = 604800;
  var generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  var userSig = generator.genTestUserSig(userID);
  return {
    sdkappid: SDKAPPID,
    userSig: userSig
  };
}

export {
  _SDKAPPID as SDKAPPID,
  genTestUserSig
}
