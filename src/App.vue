<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import SearchBarComponent from "@/components/searchbar/SearchBarComponent.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import TabComponent from "@/components/TabComponent.vue";
import InstrumentListComponent from "@/components/instrument-list/InstrumentListComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import SkeletonComponent from "@/components/SkeletonComponent.vue";
import ThemeToggleComponent from "@/components/ThemeToggleComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import SummaryComponent from "@/components/summary/SummaryComponent.vue";

const appStore = useAppStore();

const tabs = [
  { name: "IPSA", id: "tab1" },
  { name: "IGPA", id: "tab2" },
  { name: "NASQUAD", id: "tab3" },
  { name: "DOWN JONES", id: "tab4" },
  { name: "SP/BVL", id: "tab5" },
];
</script>

<template>

  <!-- Loading and Error Alert -->
  <LoadingComponent v-if="appStore.isLoading" />
  <ErrorAlertComponent v-if="appStore.error?.status" :message="appStore.error.message" />

  <div class="w-full xl:container mx-auto p-6">

    <!-- Search Bar and Theme Toggle -->
    <div class="grid grid-cols-[_1fr,max-content] gap-3 items-center mb-4">
      <SearchBarComponent/>
      <ThemeToggleComponent />
    </div>


    <!-- Header and Chart -->
    <div class="block lg:grid grid-cols-[_1fr_300px]">
      <div>
        <!-- Header -->
        <Suspense class="mb-10">
          <HeaderComponent class="mb-4"/>
          <template #fallback>
            <SkeletonComponent width="100%" height="50px" />
          </template>
        </Suspense>
        <!-- Chart -->
        <ChartComponent />
      </div>
      <div>
        <!-- Summary -->
        <Suspense>
          <SummaryComponent />
          <template #fallback>
            <SkeletonComponent width="100%" height="200px" />
          </template>
        </Suspense>
      </div>
    </div>

    <!-- Tab Component -->
    <TabComponent id="instruments-tab" :items="tabs" class="mt-4">
      <template v-for="(tab, i) in tabs" :key="i" v-slot:[tab.id]>
        <Suspense>
          <InstrumentListComponent />
          <template #fallback>
            <div class="flex items-center gap-3">
              <SkeletonComponent width="100%" height="400px" />
              <SkeletonComponent width="100%" height="400px" />
            </div>
          </template>
        </Suspense>
      </template>
    </TabComponent>
  </div>
</template>

<style lang="postcss">

</style>
