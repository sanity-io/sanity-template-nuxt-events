export const state = () => ({
  eventInformation: {
    title: 'This is the test title'
  },
  program: {}
})

export const getters = {
  eventInformation(state) {
    return state.eventInformation
  },
  getProgram(state) {
    return state.program
  }
}

export const mutations = {
  setEventInformation(state, info) {
    state.eventInformation = info
  },
  setProgram(state, program) {
    state.program = program
  }
}
