import { ref } from "vue";
import axios from "axios";

export const useFetchResources = () => {
  const data = ref([]);
  const loadingState = ref(null);

  const fetchResources = async (url) => {
    loadingState.value = "loading";
    const response = await axios.get(url);
    loadingState.value = "success";
    data.value = response.data.results;
  };

  return { data, loadingState, fetchResources };
};
