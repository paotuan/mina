<template>
  <div class="text-message">
    <span v-for="(div, index2) in virtualDom" :key="message.ID + index2">
      <span v-if="div.name === 'span'" @click="onClickSpan(div.text)">{{div.text}}</span>
      <image v-if="div.name === 'img'" :src="div.src" style="width:20px;height:20px;"/>
    </span>
  </div>
</template>
<script>
export default {
  props: ['message'],
  data () {
    return {
      level: '' // 困难、极难、极限
    }
  },
  computed: {
    virtualDom () {
      // 1. 群消息
      if (this.message.conversationType === this.TIM.TYPES.CONV_GROUP) {
        // 2. 是群主发的
        const sender = this.$store.state.group.currentGroupMemberList.filter(member => member.userID === this.message.from)
        if (sender.length > 0 && sender[0].role === this.TIM.TYPES.GRP_MBR_ROLE_OWNER) {
          console.log('是群主发的消息 ' + this.message.payload.text)
        }
      }
      return this.message.virtualDom
    }
  },
  methods: {
    onClickSpan (text) {
      console.log(text)
    }
  }
}
</script>
<style lang="stylus" scoped>
.text-message
  display flex
  flex-direction row
  flex-wrap wrap
  white-space pre-wrap
</style>
