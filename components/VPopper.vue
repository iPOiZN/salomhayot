<template>
  <!-- Hardcoded "hover", "openDelay" and "closeDelay" -->
  <Popper v-bind="$attrs" class="menu-wrapper" placement="bottom-start">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from "vue3-popper";
</script>
<style lang="scss" scoped>
.menu-wrapper {
  --popper-theme-background-color: #fff;
  --popper-theme-background-color-hover: #fff;
  --popper-theme-text-color: var(--text-color);
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 4px;
  --popper-theme-padding: 5px;
  --popper-theme-box-shadow: 0px 0px 37px rgba(8, 21, 66, 0.05);
}
</style>