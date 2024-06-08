<template>
  <form @submit.prevent="handleNextClick">
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <div>
      <RadioButtons
        v-model="maritalStatus"
        :options="maritalStatusOptions"
        className="tw-h-24 md:tw-h-26"
        containerClasses="lg:tw-grid-cols-3"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
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
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useApplicationStore from "@/stores/useApplicationStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useMutatePersonalDetails from "@/utils/composables/API/personal-details/useMutatePersonalDetails";
import useGetAppId from "@/utils/composables/useGetAppId";
import { maritalStatusOptions } from "@/utils/constants";
import routeNames from "@/utils/route-names/routeName";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
const maritalStatus = ref("");

const router = useRouter();

const validations = computed(() => ({
  maritalStatus: {
    required,
  },
}));

const v$ = useVuelidate(validations, { maritalStatus });
const navigateTo = ref({
  name: routeNames.personalDetails.yourPersonalDetails.numbersOfDependents,
});

const { applicationStore } = storeToRefs(useApplicationStore());
const { applicationId } = useGetAppId();

const postData = computed(() => {
  return {
    applicationId: applicationId,
    creditCardAppId: applicationStore.value.creditCardAppId,
    secondPersonMaritalStatus: maritalStatus.value,
  };
});

const { data } = useGetPersonalDetails(
  reactive({
    isFirstPerson: 0,
  })
);

const heading = computed(
  () =>
    `What is the marital status for ${
      data?.value[0]?.firstName || "2nd Person"
    } ?`
);

watch(
  [data],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData?.firstName) {
      maritalStatus.value = newData.maritalStatus;
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const { mutate } = useMutatePersonalDetails();

const handleNextClick = () => {
  console.log(postData.value);
  mutate(
    {
      maritalStatus: maritalStatus.value,
      isFirstPerson: 0,
    },
    {
      onSuccess() {
        router.push(navigateTo.value);
      },
    }
  );
};
</script>

<style scoped></style>
