import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  modules: ['@nuxtjs/sanity', '@nuxtjs/tailwindcss'],
  sanity: {
    projectId: '<#< sanity.projectId >#>',
    dataset: '<#< sanity.dataset >#>',
    apiVersion: '2022-03-29'
  },
  typescript: {
    strict: true
  }
})
