<template>
  <div>
    <!-- <p class="value mb-24" @click="isClickedToggle">{{ timeRange }}</p> -->
    
    <div class="bar">
      <Slider
        v-model="timeRange"
        :step="10000"
        range
        :min="minValue"
        :max="maxValue"
        @change="timeRangeOnChange"
      />
    </div>
   
  </div>
</template>

<script setup lang="ts">
import Slider from 'primevue/slider'
const props = defineProps<{
  modelValue?: number[] | string | string[] | Date | undefined[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown[]): void
}>()

const steps = Array(7)
  .fill(null)
  .map((_, idx) => idx + 10000 + idx)
const timeRange = ref([10000, 30000000])
const minValue = ref(10000)
const maxValue = ref(30000000)

const isClicked = ref(false)

const isClickedToggle = () => {
  isClicked.value = !isClicked.value
}
watch(
  () => timeRange.value,
  (val) => {
    emit('update:modelValue', val)
  }
)

function timeRangeOnChange(val) {
  const [start, end] = val
  // console.log(555, start, end);
  
  const rangeSize = end - start
  if (start > end) {
    timeRange.value = [end, start]
  } else if (start == end) {
    if (end == 30000000) {
      timeRange.value = [start - 1000000, end]
    } else if (start == 10000) {
      timeRange.value = [start, end + 1000000]
    } else {
      timeRange.value = [start, end + 1000000]
    }
  }
  if (rangeSize < 10000 && maxValue.value < 30000000) {
    // Adjust the range to enforce a minimal range of 1
    maxValue.value = start + 1000000
  } else {
    maxValue.value = 30000000 // Reset the maximum value if the range is 1 or greater
  }
  
}

onMounted(() => {
  if (props.modelValue) {
    timeRange.value = props.modelValue
  }
})
</script>

<style lang="scss" scoped>
.value {
  font-size: 26px;
  font-weight: 700;

  &-input {
    &__wrapper {
      width: 100%;
      display: flex;
      gap: 5px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.bar {
  height: 4px;
  background: #eeeff0;
  position: relative;
  margin-left: 11px;
  margin-right: 11px;

  &:before,
  &:after,
  &__handle,
  &__selected {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  // &:before,
  // &:after {
  //   content: '';
  //   display: block;
  //   width: 10px;
  //   height: 10px;
  //   background: #eeeff0;
  //   border-radius: 50%;
  // }

  &:before {
    left: -5px;
  }

  &:after {
    right: -5px;
  }

  &__handle {
    width: 22px;
    height: 22px;
    border: 5px solid var(--primary);
    border-radius: 50%;
    background-color: #fff;
    z-index: 2;
    cursor: grab;
  }

  &__selected {
    background-color: var(--primary);
    height: 100%;
    z-index: 1;
  }
}

.steps {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}


</style>
