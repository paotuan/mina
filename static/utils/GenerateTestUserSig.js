/*eslint-disable*/
import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min.js'

const _SDKAPPID = 1400294749;
const _SECRETKEY = '29e433950484389c3050ede42055dce934c0a335a87494495008794d740b8e48';

function genTestUserSig(userID) {
  var SDKAPPID = _SDKAPPID;

  var EXPIRETIME = 604800;

  var SECRETKEY = _SECRETKEY;

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
