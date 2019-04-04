export const state = () => ({
  eventInformation: {
    title: 'This is the test title'
  }
})

export const mutations = {
  setEventInformation(state, info) {
    state.eventInformation = info
  }
}
