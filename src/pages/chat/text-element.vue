<template>
  <div class="text-message">
    <span v-for="(div, index2) in virtualDom" :key="message.ID + index2">
      <span v-if="div.name === 'span'">{{div.text}}</span>
      <image v-if="div.name === 'img'" :src="div.src" style="width:20px;height:20px;"/>
      <span v-if="div.name === 'clickable'" style="text-decoration: underline" @click="onClickSpan(div.text)">{{div.text}}</span>
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ALL_PROPS, ALL_SKILLS } from '../../../static/utils/card'

const regex = new RegExp(`(${ALL_PROPS.concat(ALL_SKILLS).join('|')})`, 'g')

export default {
  props: ['message'],
  data () {
    return {
      level: '' // 困难、极难、极限
    }
  },
  computed: {
    ...mapState({
      groupProfile: state => state.conversation.currentConversation.groupProfile
    }),
    virtualDom () {
      // 1. 群消息 & 是群主发的
      if (this.message.conversationType === this.TIM.TYPES.CONV_GROUP && this.message.from === this.groupProfile.ownerID) {
        // 提取技能难度等级
        const prefix = this.message.payload.text.match(/(困难|极难|极限)/)
        this.level = prefix ? prefix[0] : ''
        // 进一步细分 element 判断是否存在技能名称
        const newDoms = []
        this.message.virtualDom.forEach(dom => {
          if (dom.name === 'img') {
            newDoms.push(dom)
          } else { // span
            newDoms.push(...this.escape(dom.text).replace(regex, '|?$1|').split('|')
              .map(text => text.startsWith('?')
                ? { name: 'clickable', text: text.substr(1) }
                : { name: 'span', text: this.unescape(text) }))
          }
        })
        return newDoms
      }
      return this.message.virtualDom
    }
  },
  methods: {
    onClickSpan (text) {
      const message = wx.$app.createTextMessage({
        to: this.message.to,
        conversationType: this.message.conversationType,
        payload: { text: `.d% ${this.level}${text}` }
      })
      let index = this.$store.state.conversation.currentMessageList.length
      this.$store.commit('sendMessage', message)
      wx.$app.sendMessage(message).catch(() => {
        this.$store.commit('changeMessageStatus', index)
      })
    },
    escape (text) {
      return text.replace(/\|/g, '%7C').replace(/\?/g, '%3F')
    },
    unescape (text) {
      return text.replace(/%7C/g, '|').replace(/%3F/g, '?')
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
