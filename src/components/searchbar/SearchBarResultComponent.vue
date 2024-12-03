<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";
import { useAppStore } from "@/stores/app";
import type { Constituent } from "@/types/constituent";

const props = defineProps<{
  showResults: boolean;
  search: string;
}>();

const emits = defineEmits(["update:showResults"]);

const appStore = useAppStore();
const isLoading = ref(false);

async function selectConstituent(constituent: Constituent) {
  emits("update:showResults", false);
  appStore.setCurrentConstituent(constituent.codeInstrument);
  await appStore.getConstituentHistory();
  await appStore.getConstituentResumen();
}

watch(() => props.search, async (search) => {
  if (search.trim()) {
    emits("update:showResults", true);
    isLoading.value = true;

    try {
      await appStore.setSearchResults(search);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    emits("update:showResults", false);
  }
});
</script>

<template>
  <div v-if="showResults" class="searchbar-results">
    <ul v-if="appStore.searchResults.length" class="searchbar-results-list">
      <li
        v-for="result in appStore.searchResults"
        @click="selectConstituent(result)"
        :key="result.codeInstrument"
        class="searchbar-results-item">
        {{ result.shortName }}
      </li>
    </ul>
    <p v-else-if="!isLoading">No se encontraron resultados.</p>
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
      @apply border-b border-slate-300 dark:border-slate-800;
      @apply hover:bg-slate-200 dark:hover:bg-slate-800;
    }
  }
}
</style>
