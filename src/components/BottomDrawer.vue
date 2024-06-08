<template>
  <transition name="slide-up">
    <div
      v-if="isOpen"
      className="tw-backdrop-blur-sm tw-transition-all tw-duration-300  tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-z-40 tw-flex tw-items-end tw-justify-center tw-w-full tw-h-full tw-overflow-y-auto tw-overflow-x-auto tw-m-auto  tw-bg-opacity-60"
    >
      <component :is="components[curComponent]" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import useModelStore from "@/stores/useModalStore";
import { storeToRefs } from "pinia";

const { isOpen, curComponent } = storeToRefs(useModelStore());
const { components } = useModelStore();
</script>

<style scoped>
.slide-up-enter-active {
  transition: opacity 300ms, transform 300ms;
  transition-delay: 300ms;
  transition-timing-function: linear;
}

.slide-up-leave-active {
  transition: opacity 300ms, transform 300ms;
  transition-timing-function: linear;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10%);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>
