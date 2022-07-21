import { onMounted, onUnmounted } from "vue";

export const useGlobalEvent = (event, listener) => {
  onMounted(() => document.body.addEventListener(event, listener));
  onUnmounted(() => document.body.removeEventListener(event, listener));
};
