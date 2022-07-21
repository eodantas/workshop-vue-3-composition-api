<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { ref } from "vue";
const show = ref(false);
</script>

<template>
  <div id="app">
    <div class="flex p-2 gap-x-4">
      <span @click="show = true" class="underline cursor-pointer"
        >Rick & Morty</span
      >
      <span @click="show = false" class="underline cursor-pointer">Vídeo</span>
    </div>
    <HelloWorld v-if="show" msg="Rick & Morty Characters" />
    <VideoPlayer v-else source="/puppiness.mp4" />
  </div>
</template>
