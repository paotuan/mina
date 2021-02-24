<template>
  <div class="counter-warp">
    <div>
      <img src="../../../static/images/logo-small.png" class="icon">
    </div>
    <div class="input-wrapper">
      <input class="input" v-model="appid" placeholder="平台ID" />
      <input type="password" class="input" v-model="secret" placeholder="secret" />
      <input class="input" v-model="uin" placeholder="QQ" />
    </div>
    <button hover-class="clicked" :loading="loading" class="login-button" @click="handleLogin">登录</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { genTestUserSig } from '../../../static/utils/GenerateTestUserSig'
export default {
  data () {
    return {
      appid: '1400294749',
      secret: '29e433950484389c3050ede42055dce934c0a335a87494495008794d740b8e48',
      uin: '410155683',
      loading: false
    }
  },
  computed: {
    ...mapState({
      myInfo: state => state.user.myInfo
    })
  },
  onUnload () {
    this.loading = false
  },
  methods: {
    // 点击登录进行初始化
    handleLogin () {
      // const userID = this.userIDList[this.selectedIndex]
      // // case1: 要登录的用户是当前已登录的用户，则直接跳转即可
      // if (this.myInfo.userID && userID === this.myInfo.userID) {
      //   wx.switchTab({ url: '../index/main' })
      //   return
      // }

      this.loading = true
      // case2: 当前已经登录了用户，但是和即将登录的用户不一致，则先登出当前登录的用户，再登录
      // if (this.myInfo.userID) {
      //   this.$store.dispatch('resetStore')
      //   wx.$app.logout()
      //     .then(() => {
      //       this.login(userID)
      //     })
      //   return
      // }
      // case3: 正常登录流程
      this.login(this.uin)
    },
    login (userID) {
      let userSig = genTestUserSig(userID).userSig
      wx.$app.login({
        userID: userID,
        userSig: userSig
      }).then(() => {
        wx.switchTab({ url: '../index/main' })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.counter-warp
  height 100vh
  background rgb(48, 56, 65)
  text-align center
  .icon
    width 100vw
    height 37.3vw
.input-wrapper
  width 80vw
  margin 60px auto 60px
.input
  text-align left
  height 32px
  padding 0 12px
  background-color white
  border-radius 8px
  font-size 16px
  border-bottom 1px solid $border-base
  margin-bottom 16px
.login-button
  width 80vw
  background-color rgb(244, 244, 245)
  color rgb(144, 147, 153)
  font-size 16px
  &::before
    width 20px
    height 20px
    margin 0 6px 2px 0
.clicked
  background-color rgb(130, 132, 138)
  color white
</style>
