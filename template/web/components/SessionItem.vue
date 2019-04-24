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

      <ul v-if="scheduleItem.session.persons" class="persons">
        <li
          v-for="personRef in scheduleItem.session.persons"
          :key="personRef.person._id"
          class="person"
        >
          <nuxt-link
            :to="{ path: `/speakers/${personRef.person.slug.current}` }"
          >
            <SanityImage
              :image="personRef.person.image"
              :alt="personRef.person.image.alt"
              :width="128"
              :height="128"
              fit="crop"
              class="personImage"
            />
            {{ personRef.person.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
import SanityImage from '~/components/SanityImage'
import TimeCalc from '~/components/TimeCalc'
export default {
  components: {
    SanityImage,
    TimeCalc
  },
  props: {
    scheduleItem: {
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

.session .persons {
  color: #666;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 0.8em;
}

.session .persons .person {
  display: flex;
  margin: 0;
  padding: 0;
  margin-right: 2em;
  margin-top: 2em;
  align-items: center;
}

.session .persons .person a {
  display: contents;
  color: inherit;
  text-decoration: inherit;
}

.personImage {
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
}
</style>
