<script setup lang="ts">
import { useRoute } from "vue-router";
import BottomDrawerVue from "./components/BottomDrawer.vue";
import TheHeader from "./components/global/TheHeader.vue";
import AppLayout from "./layouts/AppLayout.vue";

const route = useRoute();
</script>

<template>
  <TheHeader />
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :key="route.name" />
      </transition>
    </RouterView>
  </AppLayout>
  <BottomDrawerVue />

  <div id="the-footer" class="tw-sticky tw-bottom-0"></div>
  <!-- <TheFooter /> -->
</template>

<style>
body {
  background-color: white;
}

.slide-enter-active {
  transition: opacity 300ms, transform 300ms;
  transition-delay: 300ms;
  transition-timing-function: linear;
}

.slide-leave-active {
  transition: opacity 300ms, transform 300ms;
  transition-timing-function: linear;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(10%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
