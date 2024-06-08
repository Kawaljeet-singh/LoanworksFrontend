<template>
  <div>
    <h3 class="tw-text-left tw-mb-5">
      Please let us know the details of your preferred bank account.
    </h3>
    <div class="tw-grid tw-gap-2">
      <CustomInput
        v-model.trim="formValue.fname"
        name="Account Name"
        class="tw-max-w-xs"
        className="!tw-text-left"
        placeholder="Enter the name of the account"
      />

      <div
        class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-items-center"
      >
        <CustomInput
          v-model.trim="formValue.lname"
          name="BSB "
          type="number"
          class=""
          className="!tw-text-left"
          placeholder="062-XXX"
        />
        <p class="">Commonwealth Bank of Australia</p>
      </div>

      <CustomInput
        v-model.trim="formValue.email"
        name="Account Number"
        class="tw-max-w-xs"
        type="number"
        className="!tw-text-left"
        placeholder="Enter your account number"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Complete Application"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
        :to="navigateTo"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        :is-disabled="false"
        button-label="Complete Application"
        @handle-next-click="handleNaxtClick()"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import router from "@/router";

import { computed, ref } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
const formValue = ref({
  fname: "",
  mname: "",
  lname: "",
  dob: "",
  mobileNumber: "",
  address: "",
  email: "",
});
const route = useRoute();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const navigateTo = ref();
const handleNaxtClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
