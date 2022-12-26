<template>
  <div>{{ d.num.toFixed(2) }}</div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})
const d = reactive({
  num: 0
})

const AnimateToValue = () => {
  gsap.to(d, {
    duration: 0.6,
    num: props.value
  })
}
AnimateToValue()
watch(
  () => props.value,
  () => AnimateToValue()
)
</script>

<style lang="scss" scoped></style>
