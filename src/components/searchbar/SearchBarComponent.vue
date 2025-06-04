<script lang="ts" setup>
import { useSearchStore } from "@/stores/search";
import IconSearch from "@/components/icons/IconSearch.vue";
import SearchBarResultComponent from "@/components/searchbar/SearchBarResultComponent.vue";

const searchStore = useSearchStore();
</script>

<template>
  <div class="searchbar">
    <div class="searchbar-input-container">
      <IconSearch class="searchbar-input-icon" :width="20" :height="20" />
      <input
        v-model="searchStore.query"
        class="searchbar-input-field"
        type="text"
        placeholder="Buscar un instrumento"
        @input="searchStore.setShowResults(!!searchStore.query)"
      />
    </div>
    <SearchBarResultComponent/>
  </div>
  <div
    v-if="searchStore.showResults"
    class="searchbar-overlay"
    @click="searchStore.setShowResults(false)"
  ></div>
</template>

<style lang="postcss" scoped>
.searchbar {
  @apply relative z-[100];
  @apply flex justify-center items-center;
}

.searchbar-input-container {
  @apply relative;
  @apply w-full;

  .searchbar-input-icon {
    @apply absolute left-2 top-1/2 transform -translate-y-1/2;
  }

  .searchbar-input-field {
    @apply bg-slate-50 dark:bg-slate-900;
    @apply border border-slate-300 dark:border-slate-800;
    @apply w-full;
    @apply p-2 ps-10;
    @apply rounded-md;
    @apply focus:outline-none focus:border-blue-500;
    @apply focus-visible:outline-none;
    @apply text-sm md:text-base
  }
}

.searchbar-overlay {
  @apply fixed top-0 left-0 w-full h-full;
  @apply bg-black bg-opacity-40 backdrop-blur-[4px];
  @apply z-20;
}
</style>
