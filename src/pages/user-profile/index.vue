<template>
  <div class="container">
    <div class="info-card">
      <i-avatar i-class="avatar" :src="userProfile.avatar" />
      <div class="basic">
        <div class="username">{{userProfile.nick || '未设置'}}</div>
        <div class="user-id">{{userProfile.userID}}</div>
      </div>
    </div>
    <i-cell-group i-class="cell-group">
      <i-cell title="加入黑名单">
        <switch slot="footer" color="#006fff" :checked="isInBlacklist" @change="handleSwitch"/>
      </i-cell>
    </i-cell-group>
    <div class="action-list"  :style="{'margin-bottom': isIphoneX ? '34px' : 0}">
      <button class="send-messsage" @click="sendMessage">发送消息</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import { getUserProfile } from '../../utils/index'
export default {
  data () {
    return {
      userProfile: {},
      isInBlacklist: false
    }
  },
  computed: {
    ...mapState({
      blacklist: state => state.user.blacklist,
      myInfo: state => state.user.myInfo
    }),
    ...mapGetters(['isIphoneX'])
  },
  onLoad ({ userID, groupID }) {
    if (userID) {
      if (this.blacklist.indexOf(userID) > -1) {
        this.isInBlacklist = true
      }
      wx.$app.getUserProfile({ userIDList: [userID] })
        .then((res) => {
          this.userProfile = res.data[0]
        })
    }
  },
  onUnload () {
    this.userProfile = {}
    this.isInBlacklist = false
  },
  methods: {
    sendMessage () {
      this.$store.dispatch('checkoutConversation', `C2C${this.userProfile.userID}`)
    },
    handleSwitch (event) {
      if (event.mp.detail.value) {
        this.addBlackList()
      } else {
        this.deleteBlackList()
      }
    },
    // 拉黑好友
    addBlackList () {
      wx.$app.addToBlacklist({ userIDList: [this.userProfile.userID] }).then((res) => {
        this.$store.commit('showToast', {
          title: '拉黑成功',
          icon: 'none',
          duration: 1500
        })
        this.isInBlacklist = true
        this.$store.commit('setBlacklist', res.data)
      }).catch(() => {
        this.$store.commit('showToast', {
          title: '拉黑失败',
          icon: 'none',
          duration: 1500
        })
      })
    },
    // 取消拉黑
    deleteBlackList () {
      wx.$app.removeFromBlacklist({ userIDList: [this.userProfile.userID] }).then((res) => {
        this.$store.commit('showToast', {
          title: '取消拉黑成功',
          icon: 'none',
          duration: 1500
        })
        this.$store.commit('setBlacklist', res.data)
        this.isInBlacklist = false
      }).catch(() => {
        this.$store.commit('showToast', {
          title: '取消拉黑失败',
          icon: 'none',
          duration: 1500
        })
      })
    }
  }
}
</script>

<style lang="stylus">
.cell-group
  margin-top 10px
.container
  height 100vh
  background-color $background
  .info-card
    display flex
    padding 16px
    background-color $white
    .avatar
      width 80px
      height 80px
      border-radius 8px
      margin-right 14px
    .basic
      .username
        font-size 24px
        line-height 36px
        font-weight 600
      .user-id
        font-size 12px
        color $secondary
  .action-list
    position fixed
    bottom 0
    left 0
    display flex
    width 100%
    padding 12px
    justify-content space-between
    box-sizing border-box
    button
      flex-basis 40%
      flex-grow 1
      height 40px
      line-height 40px
      font-size 18px
      margin 0
      &:after
        border none
    .send-messsage
      background-color $primary
      color $white
</style>
