<script setup>
import { ref } from 'vue'
import { useGlobalEvent } from '@/composables/useGlobalEvent'

const props = defineProps({
  source: { type: String, required: true }
})

useGlobalEvent('keydown', (e) => {
  e.preventDefault()
  if (e.code !== 'Space') {
    return
  }
  if (video.value.paused) {
    video.value.play()
    labelButton.value = 'Pause'
  } else {
    video.value.pause()
    labelButton.value = 'Play'
  }
})

const video = ref(null)
const labelButton = ref('Play')
const playPause = () => {
  if (labelButton.value === 'Play') {
    video.value.play()
    labelButton.value = 'Pause'
  } else {
    video.value.pause()
    labelButton.value = 'Play'
  }
}
</script>

<template>
  <div
    class="container mx-auto flex flex-col gap-y-4 justify-center items-center pt-10"
  >
    <video ref="video" controls :src="props.source" width="600"></video>
    <div class="flex gap-x-4">
      <button @click="playPause" class="p-4 bg-blue-500 text-white rounded-md">
        {{ labelButton }}
      </button>
    </div>
  </div>
</template>
