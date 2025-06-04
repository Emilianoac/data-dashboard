import { defineStore } from "pinia";
import { ref } from "vue";
import type { Constituent } from "@/types/constituent"; 
import { searchConstituentAPI }  from "@/api/constituyentes/_index";

export const useSearchStore = defineStore("search", () => {
  
  // State
  const results = ref<Constituent[]| []>([]);
  const query = ref("");
  const showResults = ref(false);
  const isLoading = ref(false);


  // Actions
  async function setResults() {
    isLoading.value = true;
    try {
      const data = await searchConstituentAPI(query.value) as Constituent[];
      results.value = data;
    } catch (error) {
      console.error(error)
      results.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  function setQuery(newQuery: string) {
    query.value = newQuery;
  }

  function setIsLoading(status: boolean) {
    isLoading.value = status;
  }

  function setShowResults(status: boolean) {
    showResults.value = status;
  }

  return {
    // State
    results,
    query,
    isLoading,
    showResults,

    // Actions
    setResults,
    setQuery,
    setIsLoading,
    setShowResults
  }
})