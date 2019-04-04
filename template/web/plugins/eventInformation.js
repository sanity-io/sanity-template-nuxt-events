import sanityClient from '~/sanityClient'

const query = `
  *[_id == "eventInformation"][0]
`

export default ({ store }) => {
  return sanityClient.fetch(query).then(info => {
    store.commit('setEventInformation', info)
  })
}
