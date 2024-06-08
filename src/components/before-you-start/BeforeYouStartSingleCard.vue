<template>
  <div class="tw-grid tw-justify-items-center tw-max-w-xs">
    <p
      v-if="id === 3"
      class="tw-text-center tw-text-5xl tw-p-14 sm:tw-p-14 sm:tw-text-5xl"
    >
      18+
    </p>
    <img v-else :src="imageUrl" alt="" class="tw-p-8" />
    <p class="tw-text-primary-500 tw-text-center">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
    },
    imageUrl: String,
    id: Number,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
