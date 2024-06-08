<template>
  <div class="tw-text-center">
    <h2 class="tw-my-4">We are verifying your identity</h2>
    <p class="tw-mt-8">
      Please Keep this screen open. <br />
      We will take you to the next step when you have finished.
    </p>
    <p>
      Look out for a text message. <br />
      Don't refresh this page
    </p>

    <div class="tw-mt-9 tw-flex tw-justify-center">
      <img
        src="/assets/verifyingDetails.png"
        class="tw-max-w-xs md:tw-max-w-sm"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const route = useRoute();
const router = useRouter();
const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
    params: { fetch: 1 },
  };
});

onMounted(() => {
  setTimeout(() => router.push(nextNavigation.value), 2000);
});
</script>

<style scoped></style>
