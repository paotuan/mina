const groupModules = {
  state: {
    groupList: [],
    currentGroupMemberList: [],
    count: 30,
    isLoading: false
  },
  getters: {
    hasGroupList: state => state.groupList.length > 0
  },
  mutations: {
    updateGroupList (state, groupList) {
      state.groupList = groupList
    },
    updateCurrentGroupMemberList (state, groupMemberList) {
      // 体验版群人数少，不做分页逻辑了，与网页版保持一致
      state.currentGroupMemberList = groupMemberList // [...state.currentGroupMemberList, ...groupMemberList]
    },
    resetGroup (state) {
      state.groupList = []
      state.currentGroupProfile = {}
      state.currentGroupMemberList = []
    },
    resetCurrentMemberList (state) {
      state.currentGroupMemberList = []
    }
  },
  actions: {
    getGroupMemberList (context) {
      const { memberCount, groupID } = context.rootState.conversation.currentConversation.groupProfile
      const { count, isLoading } = context.state
      const offset = context.state.currentGroupMemberList.length
      const notCompleted = (offset < memberCount)
      if (notCompleted) {
        if (!isLoading) {
          context.state.isLoading = true
          wx.$app.getGroupMemberList({ groupID, offset, count }).then((res) => {
            context.commit('updateCurrentGroupMemberList', res.data.memberList)
            context.state.isLoading = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.showToast({
            title: '你拉的太快了',
            icon: 'none',
            duration: 500
          })
        }
      } else {
        wx.showToast({
          title: '没有更多啦',
          icon: 'none',
          duration: 1500
        })
      }
    }
  }
}

export default groupModules
