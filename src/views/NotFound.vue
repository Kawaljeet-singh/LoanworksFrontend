<template>
  <div>
    <h2>404 Page Not Found</h2>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center">
      <CustomButton
        title="Go Back"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
        @onClick="$router.back()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
</script>

<style lang="scss" scoped></style>
