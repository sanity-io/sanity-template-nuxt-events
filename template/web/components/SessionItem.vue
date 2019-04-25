<template>
  <li class="session">
    <div class="meta">
      {{ scheduleItem.session.sessionType }}
      <div class="time">
        <TimeCalc
          :from-time="scheduleItem.fromTime"
          :duration="scheduleItem.duration"
        />
      </div>
    </div>
    <div>
      <h3>
        <nuxt-link :to="{ path: `/sessions/${scheduleItem.session._id}` }">{{
          scheduleItem.session.title || 'Undefined title'
        }}</nuxt-link>
      </h3>
      <p>
        {{ scheduleItem.session.summary }}
      </p>
      <PersonsList :persons="scheduleItem.session.persons" />
    </div>
  </li>
</template>
<script>
import PersonsList from '~/components/PersonsList'
import TimeCalc from '~/components/TimeCalc'
export default {
  components: {
    PersonsList,
    TimeCalc
  },
  props: {
    scheduleItem: {
      type: Object,
      default() {},
      fromTime: {
        type: Date
      },
      session: {
        summary: {
          type: String,
          default: 'Missing summary'
        },
        persons: {
          type: Array,
          default: () => []
        }
      }
    }
  }
}
</script>

<style scoped>
li.session {
  display: block;
  margin-bottom: 5rem;
}

@media screen and (min-width: 768px) {
  li.session {
    display: flex;
    align-items: baseline;
  }
}

li.session .meta {
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  font-size: 0.8em;
}

@media screen and (min-width: 768px) {
  li.session .meta {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    flex-basis: 10rem;
    min-width: 7rem;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-right: 1rem;
    padding-right: 1rem;
    text-align: right;
    font-size: 1.2em;
    opacity: 0.5;
  }
}

@media screen and (min-width: 768px) {
  li.session .meta .time {
    font-size: 0.7em;
    margin-top: 1.27rem;
  }
}

li.session h3 {
  margin-top: 0;
}

li.session h3 a {
  color: inherit;
  text-decoration: inherit;
}

li.session h3 + p {
  margin: 0;
}
</style>
