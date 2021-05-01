<template>
  <div class="counter-warp">
    <div>
      <img src="../../../static/images/logo-small.png" class="icon">
    </div>
    <div class="input-wrapper">
      <input class="input" v-model="appid" placeholder="平台ID" />
      <input type="password" class="input" v-model="secret" placeholder="secret" />
      <input class="input" v-model="uin" placeholder="UID" />
    </div>
    <div class="login-btn-wrapper">
      <button class="login-button" @click="scanCode">扫描二维码</button>
      <button hover-class="clicked" :loading="loading" class="login-button" @click="clickLogin">{{ loginText }}</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { atob, btoa } from '../../utils'
import { genTestUserSig } from '../../../static/utils/sdk'
import { initTimInstance } from '../../../static/utils/tim'
import { registerEvents } from '../../main'
export default {
  data () {
    return {
      appid: '',
      secret: '',
      uin: '',
      loading: true,
      loginText: '登录',
      invitedGroup: '',
      from: ''
    }
  },
  computed: {
    ...mapState({
      myInfo: state => state.user.myInfo
    })
  },
  onLoad ({ from }) {
    this.from = from
    console.log('from' + from)
  },
  onUnload () {
    this.loading = false
    this.invitedGroup = ''
    this.loginText = '登录'
  },
  methods: {
    clickLogin () {
      this.loading = true
      this.loginText = '登录中'
      this.login()
    },
    login () {
      const numsdkappid = Number(this.appid)
      const uinValid = /^[0-9]{5,15}$/.test(this.uin)
      if (this.secret && uinValid && numsdkappid > 0) {
        // 1. 根据提供的 appid 初始化 tim 实例
        initTimInstance(numsdkappid, this.secret)
        // 2. 初始化实例以后，设置监听器
        registerEvents(wx.$app, this.invitedGroup)
        // 3. 正式发起登录
        let userSig = genTestUserSig(this.uin, numsdkappid, this.secret).userSig
        wx.$app.login({
          userID: this.uin,
          userSig: userSig
        }).then(() => {
          wx.setStorage({ key: 's', data: btoa(this.appid + '/' + this.secret.split('').reverse().join('')) })
          wx.setStorage({ key: 'uin', data: this.uin })
          wx.switchTab({ url: '../index/main' })
        }).catch((e) => {
          this.loading = false
          this.loginText = '登录'
          this.$store.commit('showToast', { title: '登录失败：' + e.message })
        })
      } else {
        this.loading = false
        this.loginText = '登录'
        this.$store.commit('showToast', { title: '登录失败：参数不合法' })
      }
    },
    scanCode () {
      wx.scanCode({
        success: ({ result }) => {
          try {
            const [sig, group] = result.split('/')
            this.invitedGroup = group
            ;[this.appid, this.secret] = atob(sig).split('/').map((value, index) => {
              return index === 0 ? value : value.split('').reverse().join('')
            })
          } catch (e) {
            // 非法的参数，ignore
            console.log(e)
          }
        }
      })
    }
  },
  mounted () {
    // 判断自动登录逻辑
    try {
      const sig = wx.getStorageSync('s')
      this.uin = wx.getStorageSync('uin')
      ;[this.appid, this.secret] = atob(sig).split('/').map((value, index) => {
        return index === 0 ? value : value.split('').reverse().join('')
      })
      if (this.uin && sig && !this.from) { // 如果是被踢或是主动退出登录，就不要自动登录了
        this.loginText = '自动登录中'
        this.login()
      } else {
        this.loading = false
      }
    } catch (e) {
      // ignore
      this.loading = false
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
.login-btn-wrapper
  width 80vw
  display flex
  justify-content space-between
  margin 0 auto
.login-button
  width 38vw
  background-color rgb(244, 244, 245)
  color rgb(144, 147, 153)
  font-size 16px
  margin 0
.clicked
  background-color rgb(130, 132, 138)
  color white
</style>
