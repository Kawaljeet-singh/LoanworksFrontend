<template>
  <div>
    <form @submit.prevent="handleNextClick()">
      <div>
        <RadioButtons
          v-model="maritalStatus"
          :options="options"
          className="tw-h-24 md:tw-h-26"
          containerClasses="lg:tw-grid-cols-3"
        />
      </div>
      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :isDisabled="false"
          @onClick="handleNextClick()"
          :showArrow="true"
        />
      </div>
    </form>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
const maritalStatus = ref("");

const options = [
  "Personal",
  "Business",
  "Investment Non Residential",
  "Owner Occupied",
  "Investment Residential",
];

const router = useRouter();

const validations = computed(() => ({
  maritalStatus: {
    required,
  },
}));
const route = useRoute();

const v$ = useVuelidate(validations, { maritalStatus });
const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  router.push(nextRoute.value);
};
</script>

<style scoped></style>
