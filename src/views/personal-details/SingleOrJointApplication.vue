<template>
  <div class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="formValue.isYes"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="!formValue.isYes"
        @onClick="handleNextClick"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        :is-disabled="v$.$invalid"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import RadioButtons from "@/components/form/RadioButtons.vue";
import useMutateApplication from "@/utils/composables/API/useMutateApplication";
import routeNames from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import TheFooter from "@/components/global/TheFooter.vue";

const formValue = ref({
  isYes: "",
});

const options = ["Single", "Joint"];

const router = useRouter();

const navigateTo = ref({ name: "SingleOrJointApplication", params: {} });

const validations = computed(() => ({
  isYes: { required },
}));

const v$ = useVuelidate(validations, formValue);
const { mutate } = useMutateApplication();
const handleNextClick = () => {
  if (formValue.value.isYes == "Single") {
    navigateTo.value = {
      name: routeNames.personalDetails.customerConsent,
      params: { type: "single", person: 1 },
    };
  } else if (formValue.value.isYes == "Joint") {
    navigateTo.value = {
      // name: routeNames.personalDetails.jointApplication.firstPerson,
      name: routeNames.personalDetails.giveYourDetails,
      params: { type: "joint", person: 1 },
    };
  } else {
    navigateTo.value = { name: "", params: {} };
  }
  mutate(
    { isJointApplication: formValue.value.isYes === "Joint" ? 1 : 0 },
    {
      onSuccess() {
        router.push(navigateTo.value);
      },
    }
  );
};
</script>

<style scoped></style>
