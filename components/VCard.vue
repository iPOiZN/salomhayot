<template>
  
  <div
    class="card"
    :class="{
      'card_full-width': fullWidth,
      'card_content-full-height': contentFullHeight,
      'card_bg-transparent': bgTransparent
    }"
  >
    <header v-if="header || $slots.header" class="card__header">
      <slot name="header">
        <div class="card__header-title">
          {{ header }}
        </div>
      </slot>
    </header>
    <div class="card__content" :style="contentStyle">
      <slot />
    </div>
    <div v-if="$slots.footer || controls" class="card__footer">
      <slot name="footer">
        <div v-if="controls" class="controls">
          <v-button
            class="controls__button"
            type="outline"
            :disabled="!previousPage"
            @click="$emit('back', previousPage)"
          >
            {{ $t('basics.back') }}
          </v-button>
          <v-button
            class="controls__button"
            :disabled="!nextPage"
            @click="$emit('continue', nextPage)"
          >
            {{ $t('basics.continue') }}
          </v-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  controls?: boolean
  previousPage?: string
  nextPage?: string
  fullWidth?: boolean
  contentFullHeight?: boolean
  bgTransparent?: boolean
  contentStyle?: string
  header?: string
  isLoading?: boolean
}>()
defineEmits<{
  (e: 'continue', path: string): void
  (e: 'back', path: string): void
}>()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  // position: relative;
  width: 450px;


  &_bg-transparent{
    background-color: transparent;
  }

  &_full-width {
    width: 100%;
  }

  &_content-full-height {
    .card__content {
      height: 100%;
    }
  }

  &__header {
    padding: 16px;
    border-bottom: 1px solid #eeeeee;

    &-title {
      font-size: 20px;
      font-weight: 700;
      padding-left: 15px;
    }
  }

  // &__content {
  //   padding: 32px;
  // }

  &__footer {
    border-top: 1px solid #eeeeee;
    padding: 32px;
  }
}
.controls {
  display: flex;
  gap: 24px;

  &__button {
    flex: 1 1 0;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s 0.5s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
