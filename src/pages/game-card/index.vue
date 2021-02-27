<template>
  <div>
    dsfsf
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
      notes: function (state) { return state.game.list[this.groupID].notes }
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
<style lang="stylus" scoped>

</style>
