import sanityClient from '~/sanityClient'
import { addMinutes } from 'date-fns'

const query = `{
  "eventInformation": *[_id == "eventInformation"][0],
  "program": *[_id == "program"][0] {
    ...,
    schedule[] {
      ...,
      session-> {
        ...,
        persons[] {
          person-> {
            ...,
            image {
              ...,
              asset->
            }
          }
        }
      }
    }
  }
}
`

function populateWithDates(program, from) {
  /**
   * Calculates session time slot by looping trough all sessions
   * adding their duration to their start time.
   */
  const schedule = program.schedule.reduce((allSessions, session, index) => {
    const prevSession = allSessions[index - 1]
    const fromTime = prevSession
      ? new Date(addMinutes(prevSession.fromTime, prevSession.duration))
      : from
    return allSessions.concat([{ ...session, fromTime }])
  }, [])
  return { ...program, schedule }
}

export default ({ store }) => {
  return sanityClient.fetch(query).then(({ eventInformation, program }) => {
    store.commit('setEventInformation', eventInformation)
    store.commit(
      'setProgram',
      populateWithDates(program, new Date(eventInformation.schedule.from))
    )
  })
}
