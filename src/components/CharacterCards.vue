<script setup>
import orderBy from 'lodash/orderby'
import { computed, onMounted, ref } from 'vue'
import { useFetchResources } from '@/composables/useFetchResources'
import { useGlobalEvent } from '@/composables/useGlobalEvent'

const {
  data: characters,
  loadingState: loadingCharacters,
  fetchResources: fetchAllCharacters
} = useFetchResources()

const {
  data: locations,
  loadingState: loadingLocations,
  fetchResources: fetchAllLocations
} = useFetchResources()

const orderKey = ref('id')
const setOrderKey = (key) => (orderKey.value = key)
const charactersOrdered = computed(() =>
  orderBy(characters.value, orderKey.value)
)

useGlobalEvent('keydown', () => {
  characters.value.shift()
})

onMounted(() => {
  fetchAllCharacters('https://rickandmortyapi.com/api/character')
  fetchAllLocations('https://rickandmortyapi.com/api/location')
})
</script>

<template>
  <div>
    <div class="border-b-2 pb-4 border-gray-300 text-center">
      Order by
      <button class="btn bg-blue-500 mr-4" @click="setOrderKey('name')">
        Name
      </button>
      <button class="btn bg-orange-500" @click="setOrderKey('id')">Id</button>
    </div>
    <div class="m-auto container flex flex-wrap mt-10">
      <div
        v-for="character in charactersOrdered"
        :key="character.id"
        class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 card"
      >
        <div class="card-inner">
          <div class="image">
            <img
              :src="character.image"
              class="bg-gray-200"
              height="300"
              width="300"
            />
          </div>
          <div class="content text-center mt-5">
            <span class="header text-xl">{{ character.name }}</span>
            <div class="text-center text-gray-500 text-sm">
              <div class="">Status: {{ character.status }}</div>
              <div>{{ character.species }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center text-[40px]">LOCATIONS</div>
    <div class="m-auto container flex flex-wrap gap-4 justify-between">
      <div
        v-for="location in locations"
        :key="location.id"
        class="p-2 shadow-md shadow-black"
      >
        <li class="ml-4">NAME: {{ location.name }}</li>
        <li class="ml-4">TYPE: {{ location.type }}</li>
        <li class="ml-4">DIMENSION: {{ location.dimension }}</li>
      </div>
    </div>

    <div
      v-if="loadingCharacters === 'loading' || loadingLocations === 'loading'"
      class="loading"
    >
      <span class="text-gray-500">Loading...</span>
      <img src="/spinner.svg" alt="loading" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.btn {
  @apply px-6 py-1 text-white rounded;
}
.card-inner {
  @apply p-4 shadow-md rounded m-2;
}
.card-inner img {
  @apply rounded;
  max-width: auto;
  display: block;
}
.loading {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center;
}
</style>
