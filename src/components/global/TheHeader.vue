<template>
  <div class="qb-the-header">
    <div
      class="tw-w-full tw-h-13 tw-pr-2.5 tw-px-3.5 tw-text-white tw-flex tw-justify-between tw-items-center lg:tw-px-12 lg:tw-py-2"
    >
      <div class="">
        <div class="tw-bg-black tw-h-0.5 tw-w-4.5 tw-rounded-10"></div>
        <div class="tw-bg-black tw-h-0.5 tw-w-3.5 tw-mt-1 tw-rounded-10"></div>
        <div class="tw-bg-black tw-h-0.5 tw-w-4.5 tw-mt-1 tw-rounded-10"></div>
      </div>
      <img :src="Logo" alt="" class="tw-h-8 lg:tw-w-auto lg:tw-h-full" />
      <img :src="ChatIcon" alt="" class="tw-w-8 lg:tw-w-auto lg:tw-h-full" />
    </div>

    <div class="tw-w-full tw-h-2">
      <div
        :class="`tw-h-full  tw-transition-all tw-ease-linear tw-delay-700 tw-duration-700 tw-bg-progress-bar  ${
          progress ? progress : 'tw-w-0'
        }`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "/logo.png";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import ChatIcon from "/assets/conversationIcon.svg";

const route = useRoute();
const progress = computed(() => {
  return route.meta.progress;
});
</script>

<style scoped>
.qb-the-header {
  @apply tw-bg-white tw-shadow-lg tw-sticky tw-top-0 tw-z-40 tw-w-full;
}
</style>
