<template>
  <div class="container">
    <div v-for="(note, index) in notes" :key="note.id" class="card">
      <div v-if="note.type === 'TIMTextElem'">{{ note.payload }}</div>
      <image v-else-if="note.type === 'TIMImageElem'" :src="note.payload"
             mode='widthFix' class="image-msg" @click="previewImage(note.payload)"/>
    </div>
    <div v-if="notes.length === 0" class="empty-view">
      暂无笔记
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      groupID: ''
    }
  },
  computed: {
    ...mapState({
      notes: function (state) { return state.game.list[this.groupID].notes }
    })
  },
  onLoad ({ id }) {
    this.groupID = id.replace('GROUP', '')
  },
  methods: {
    previewImage (src) {
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src]
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  background-color $background
  min-height 100vh
  padding 5px 0
.card
  background-color $white
  border 1px solid $border
  border-radius 5px
  margin 10px
  padding 10px
.image-msg
  max-width 180px
.empty-view
  width 100%
  text-align center
  margin-top 20px
</style>
