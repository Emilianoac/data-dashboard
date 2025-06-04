<script lang="ts" setup>
import { watch } from "vue";
import { useAppStore } from "@/stores/app";
import { useSearchStore } from "@/stores/search";
import type { Constituent } from "@/types/constituent";

const appStore = useAppStore();
const searchStore = useSearchStore();

async function selectConstituent(constituent: Constituent) {
  searchStore.setShowResults(false);
  appStore.setCurrentConstituent(constituent.codeInstrument);
  await appStore.getConstituentHistory();
  await appStore.getConstituentResumen();
}

watch(() => searchStore.query, async (search) => {
  if (search.trim()) {
    searchStore.setShowResults(true);
    try {
      await searchStore.setResults();
    } catch (error) {
      console.error(error);
    }
  } else {
    searchStore.setShowResults(false);
  }
});
</script>

<template>
  <div v-if="searchStore.showResults" class="searchbar-results">
    <ul v-if="searchStore.results.length" class="searchbar-results-list">
      <li
        v-for="result in searchStore.results"
        @click="selectConstituent(result)"
        :key="result.codeInstrument"
        class="searchbar-results-item">
        {{ result.shortName }}
      </li>
    </ul>
    <p v-else-if="!searchStore.isLoading">No se encontraron resultados.</p>
  </div>
</template>


<style lang="postcss" scoped>
.searchbar-results {
  @apply w-full max-h-[300px] overflow-y-auto p-4 shadow-md;
  @apply absolute top-[110%] left-0 z-30;
  @apply bg-slate-100 dark:bg-slate-900;
  @apply border border-slate-200 dark:border-slate-600;
  @apply rounded-md;

  .searchbar-results-list {
    @apply list-none;
    @apply p-0;
    @apply m-0;

    .searchbar-results-item {
      @apply text-sm;
      @apply p-2;
      @apply cursor-pointer;
      @apply border-b border-slate-300 dark:border-slate-800 last:border-b-0;
      @apply hover:bg-slate-200 dark:hover:bg-slate-800;
    }
  }
}
</style>
