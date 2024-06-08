<template>
  <div class="root">
    <div class="container tw-py-4">
      <ul class="progressbar tw-flex">
        <li
          v-for="step in maxStep"
          :key="step"
          :class="`
            tw-mr-4
            tw-rounded-full
            tw-bg-step-bar
            tw-p-0.5
            tw-w-6
            tw-h-6
            tw-text-xs
            tw-flex
            tw-items-center
            tw-justify-center
            tw-font-semibold
            tw-cursor-pointer
            ${curStep == step ? '' : 'tw-opacity-50'}
          `"
          @click="handleClick(step)"
        >
          {{ step }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const maxStep = ref(0);
const route = useRoute();
const router = useRouter();
const curStep = computed(() => Number(route.meta.curStep));
onMounted(() => (maxStep.value = Number(curStep.value || 0)));
const handleClick = (step: number) => {
  if (curStep.value > step) {
    router.go(-(curStep.value - step));
  } else if (curStep.value < step) {
    router.go(step - curStep.value);
  }
};
watch(
  curStep,
  (newVal) =>
    (maxStep.value = Math.min(
      Math.max(maxStep.value, Number(newVal || 0)),
      Number(route.meta.stepLength)
    ))
);
</script>

<style scoped></style>
