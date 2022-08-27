<script setup lang="ts">
import groq from 'groq'

const { data } = await useSanityQuery(groq`
  *[_id == "codeOfConduct"][0].body {
      ...,
      children[] {
        ...,
        event->,
        person->,
        image->
      }
  }
`)

const pageTitle = useState('pageTitle')
pageTitle.value = 'Code of conduct'
</script>

<template>
  <Container>
    <main class="mx-auto max-w-2xl">
      <PageHeading>{{ pageTitle }}</PageHeading>
      <article class="mt-8 px-2">
        <PortableText v-if="data" :blocks="data" />
      </article>
    </main>
  </Container>
</template>
