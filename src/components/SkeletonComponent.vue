<script lang="ts" setup>
  defineProps<{
    width: string
    height: string
  }>();
</script>

<template>
  <div
    :style="{ width: width, height: height }"
    class="skeleton">
  </div>
</template>

<style lang="postcss" scoped>
.skeleton {
  @apply w-full h-4;
  @apply animate-pulse bg-gray-200 dark:bg-gray-900 rounded-md p-4;
}
</style>
