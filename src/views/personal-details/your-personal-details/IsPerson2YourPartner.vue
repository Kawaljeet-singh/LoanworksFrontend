<template>
  <div>
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
      <RadioButtons
        v-model="isPartner"
        :options="options"
        containerClasses="  md:tw-gap-4  "
        className=" tw-h-19.5 md:tw-h-32 "
      />

      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :isDisabled="!isPartner"
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
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useApplicationStore from "@/stores/useApplicationStore";
import { idNumber } from "@/types/routeParams";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useMutatePersonalDetails from "@/utils/composables/API/personal-details/useMutatePersonalDetails";
import useGetAppId from "@/utils/composables/useGetAppId";
import routeNames, {
  routePersonalDetails,
} from "@/utils/route-names/routeName";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
const isPartner = ref();

const options = ["Yes", "No"];

const router = useRouter();

const validations = computed(() => ({
  isPartner: { required },
}));

const { data } = useGetPersonalDetails(
  reactive({
    isFirstPerson: 0,
  })
);
const heading = computed(
  () => `Is ${data?.value[0]?.firstName || "2nd Person"} your partner?`
);

const {
  data: firstPerson,
  isFetched,
  isLoading,
} = useGetPersonalDetails(
  reactive({
    isFirstPerson: 1,
  })
);

watch(
  [firstPerson],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (typeof newData?.isSecondPersonPartner === "number") {
      console.log(newData.isSecondPersonPartner);
      isPartner.value = options[newData?.isSecondPersonPartner ? 0 : 1];
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const v$ = useVuelidate(validations, { isPartner });

const navigateTo = ref<{ name: string; params?: { idNumber: string } }>({
  name: "",
});
const handleNavigation = () => {
  switch (isPartner.value) {
    case "Yes":
      navigateTo.value = {
        name: routePersonalDetails.verifyYourIdentity.chooseIdType,
        params: { idNumber: idNumber.one },
      };
      break;
    case "No":
      navigateTo.value = {
        name: routeNames.personalDetails.yourPersonalDetails
          .person2MaritalStatus,
      };
      break;

    default:
      break;
  }

  router.push(navigateTo.value);
};

const { applicationStore } = storeToRefs(useApplicationStore());
const { applicationId } = useGetAppId();

const postData = computed(() => {
  return {
    applicationId: applicationId,
    creditCardAppId: applicationStore.value.creditCardAppId,
    isFirstPerson: 1,
    isSecondPersonPartner: isPartner.value === options[0] ? 1 : 0,
  };
});

const { mutate } = useMutatePersonalDetails();

const handleNextClick = () => {
  mutate(postData.value, {
    onSuccess() {
      handleNavigation();
    },
  });
};
</script>

<style scoped></style>
