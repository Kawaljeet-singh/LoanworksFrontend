<template>
  <component :is="layout">
    <slot name="default" />
  </component>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./DefaultAppLayout.vue";

const layout = shallowRef(AppLayoutDefault);
const route = useRoute();
watch(
  () => route.meta,

  async (meta) => {
    try {
      if (meta.layout) {
        layout.value = defineAsyncComponent(
          () => import(/* @vite-ignore */ `@/layouts/${meta.layout}.vue`)
        );
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (e) {
      console.log(e);
      layout.value = AppLayoutDefault;
    }
  }
);
</script>
