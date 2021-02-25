<template>
  <div class="container">
    <div>
      <i-cell-group>
<!--        <i-cell title="发起会话" is-link url="/pages/search/main?type=user"></i-cell>-->
<!--        <i-cell title="加入群聊" is-link url="/pages/search/main?type=group"></i-cell>-->
        <i-cell title="新建群聊" is-link url="/pages/create/main"></i-cell>
        <i-cell title="我的黑名单" is-link url="/pages/blacklist/main"></i-cell>
        <i-cell title="我的群组" is-link url="/pages/groups/main"></i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {

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
</style>
