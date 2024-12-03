<script lang="ts" setup>
import { useToggle, useDark } from "@vueuse/core";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun  from "@/components/icons/IconSun.vue";

const isDark = useDark({
  initialValue: "dark",
});

const toggleDark = useToggle(isDark)

</script>

<template>
  <button class="theme-toggle" @click="toggleDark()">
    <IconMoon v-if="isDark" :width="20" :height="20" />
    <IconSun v-else :width="20" :height="20" />
  </button>
</template>

<style lang="postcss" scoped>
 .theme-toggle {
    @apply flex items-center justify-center;
    @apply p-2 w-[40px] h-[40px];
    @apply bg-slate-300 dark:bg-slate-800 ;
    @apply mx-auto rounded-full;
    @apply text-slate-600 dark:text-white;
    @apply hover:bg-slate-200 dark:hover:bg-slate-700;

 }
</style>
