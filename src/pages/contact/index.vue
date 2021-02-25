<template>
  <div class="container">
    <div>
      <i-cell-group>
<!--        <i-cell title="发起会话" is-link url="/pages/search/main?type=user"></i-cell>-->
<!--        <i-cell title="加入群聊" is-link url="/pages/search/main?type=group"></i-cell>-->
        <i-cell title="新建群聊" is-link url="/pages/create/main"></i-cell>
        <i-cell title="我的黑名单" is-link url="/pages/blacklist/main"></i-cell>
      </i-cell-group>
    </div>
    <div>
      <div class="group-header">我的群组</div>
      <div class="group" v-for="item in groupList" :key="item.groupID" @click="startConversation(item)">
        <div class="avatar">
          <i-avatar i-class="img" :src="item.avatar"/>
        </div>
        <div class="name">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      groupList: state => {
        return state.group.groupList
      }
    })
  },
  methods: {
    startConversation (item) {
      this.$store.dispatch('checkoutConversation', `GROUP${item.groupID}`)
    }
  },
  onShow () {
    wx.showTabBar()
  },
  mounted () {}
}
</script>

<style lang='stylus'>
page
  height 100%
.container
  background $background
  width 100%
  height 100%
  .group
    height 50px
    background-color white
    box-sizing border-box
    border-bottom 1px solid $border-base
    display flex
    padding 10px 20px
    .avatar
      width 60px
      .img
        width 30px
        height 30px
.name
  line-height 30px
  width 100%
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.group-header
  padding 15px 0 5px 15px
  font-size 18px
</style>
