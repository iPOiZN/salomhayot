<template>
  <component class="label-wrapper" :is="tag || 'label'">
    <span class="label">{{ label }}</span>
    <slot />

    <p v-if="hint" class="text-12 text-400 mt-10">{{ hint }}</p>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  tag?: string
  hint?: string
}>()
</script>

<style lang="scss" scoped>
.label-wrapper {
  display: block;
  margin-bottom: 15px;
}

.label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 12px;
}
</style>
