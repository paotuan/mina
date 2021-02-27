<template>
  <div>
    <div v-for="(note, index) in notes" :key="note.id" class="card">
      <div v-if="note.type === 'TIMTextElem'">{{ note.payload }}</div>
      <image v-else-if="note.type === 'TIMImageElem'" :src="note.payload"
             mode='widthFix' class="image-msg" @click="previewImage(note.payload)"/>
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
.card
  border 1px solid $border
  border-radius 5px
  margin 10px
  padding 10px
.image-msg
  max-width 180px
</style>
