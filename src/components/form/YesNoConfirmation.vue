<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="isYes"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
        @onClick="handleNextClick()"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import RadioButtons from "@/components/form/RadioButtons.vue";
import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { FUTURE_PLANS } from "@/utils/constants";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, ref, watch, type Ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import TheFooter from "../global/TheFooter.vue";
const isYes: Ref<(typeof options)[number]> = ref();

const options = ["No", "Yes"];

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  isYes: { required },
}));

const v$ = useVuelidate(validations, { isYes });

const navigateTo = ref({ name: "" as RouteRecordName });

const nextNavigation = computed(() => {
  const { yes, no } = route.meta.nextNavigation as { yes: string; no: string };
  return {
    yes,
    no,
  };
});

watch(isYes, (newVal: string) => {
  switch (newVal) {
    case options[1]:
      navigateTo.value = {
        name: nextNavigation.value.yes,
      };
      break;
    case options[0]:
      navigateTo.value = { name: nextNavigation.value.no };
      break;

    default:
      navigateTo.value.name = "";

      break;
  }
});

const { applicationStore } = storeToRefs(useApplicationStore());
const { applicationId } = useGetAppId();

const postData = computed(() => {
  const page = route.meta.page;
  switch (page) {
    case FUTURE_PLANS.EXPECTED_FUTURE_CHANGES:
      return {
        applicationId: applicationId,
        employmentDetailsId: 0,
        expectedFutureChanges: isYes.value == options[1] ? 1 : 0,
      };

    default:
      return {};
  }
});
const apiRoute = computed(() => route.meta.apiRoute as string);

const handleNextClick = () => {
  axiosInstance
    .post(apiRoute.value, postData)
    .then((res) => {
      console.log(res);
      router.push(navigateTo.value);
    })
    .catch((err) => {
      console.log(err);
      router.push(navigateTo.value);
    });
};
</script>

<style scoped></style>
