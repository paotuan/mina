<template>
  <div class="container">
    <div class="simple-info">
      <div>{{ card.basic.name }}</div>
      <div>{{ card.basic.gender }}</div>
      <div>{{ card.basic.age }}岁</div>
      <div>{{ card.basic.job }}</div>
    </div>
    <div class="table">
      <div class="row header">
        <div>体力</div><div>理智</div><div>幸运</div><div>魔法</div>
      </div>
      <div class="row">
        <div>{{ card.basic.hp }}</div><div>{{ card.basic.san }}</div>
        <div>{{ card.basic.luck }}</div><div>{{ card.basic.mp }}</div>
      </div>
    </div>
    <div class="section-header">
      <div class="title">基础属性</div>
    </div>
    <div class="table">
      <div class="row header">
        <div class="col1">属性</div><div>%</div><div>半值</div><div>1/5值</div>
      </div>
      <div v-for="(prop, index) in props" :key="prop.name" class="row" :class="{ bg: index % 2 === 1 }">
        <div class="col1">{{ prop.name }}</div><div>{{ prop.value }}</div>
        <div>{{ prop.half }}</div><div>{{ prop.extreme }}</div>
      </div>
    </div>
    <div class="section-header">
      <div class="title">技能表</div>
    </div>
    <div class="table">
      <div class="row header">
        <div class="col1">技能</div><div>%</div><div>半值</div><div>1/5值</div>
      </div>
      <div v-for="(prop, index2) in skills" :key="prop.name" class="row" :class="{ bg: index2 % 2 === 1 }">
        <div class="col1">{{ prop.name }}</div><div>{{ prop.value }}</div>
        <div>{{ prop.half }}</div><div>{{ prop.extreme }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      groupID: '',
      userID: ''
    }
  },
  computed: {
    ...mapState({
      card: function (state) { return state.game.list[this.groupID].cards['o' + this.userID] },
      props: function () {
        return Object.keys(this.card.props).map(name =>
          ({ name,
            value: this.card.props[name],
            half: Math.floor(this.card.props[name] / 2),
            extreme: Math.floor(this.card.props[name] / 5) }))
      },
      skills: function () {
        return Object.keys(this.card.skills).map(name =>
          ({ name,
            value: this.card.skills[name],
            half: Math.floor(this.card.skills[name] / 2),
            extreme: Math.floor(this.card.skills[name] / 5) }))
      }
    })
  },
  onLoad ({ id, user }) {
    this.groupID = id.replace('GROUP', '')
    this.userID = user
  },
  methods: {

  }
}
</script>
<style lang="stylus">
.container
  padding 20px
.simple-info
  display flex
  & > div
    margin-right 20px
.row
  width 100%
  display flex
  justify-content space-between
  line-height 2
  & > div
    width 20vw
  .col1
    width 30vw
.header div
  font-weight bold
.table
  margin-top 20px
.bg
  background-color $background
.section-header
  margin-top 20px
  .title
    font-size 20px
    font-weight bold
</style>
