<template>
  <div>
    <h3 class="tw-text-left tw-mb-5">
      Would you like to increase the card limit to {{ maxLimit }}
    </h3>
    <form @submit.prevent="handleNextClick">
      <RadioButtons
        v-model="v$.isYes.$model"
        :options="options"
        containerClasses=" tw-py-6 "
        className="tw-h-20 "
      />
      <div
        :class="`tw-border-t  ${
          formValue.isYes === options[0]
            ? 'tw-opacity-100'
            : 'tw-opacity-0 tw-invisible'
        } tw-border-[#797979] tw-py-8 tw-transition-all tw-ease-in-out tw-duration-500`"
      >
        <CustomInputVue
          name="What Limit would you like?"
          placeholder="85,000"
          className="tw-text-start"
          v-model.number="v$.limit.$model"
          :v="v$.limit"
          :min="0"
          :max="maxLimit"
          type="number"
          icon="fa-dollar-sign"
        />
      </div>

      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :is-disabled="v$.$invalid"
          @onClick="handleNextClick()"
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
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import useMutateCreditApplicationDetails from "@/utils/composables/API/useMutateCreditApplicationDetails";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { maxValue, numeric, required, requiredIf } from "@vuelidate/validators";

import { reactive, ref, watch } from "vue";
import { useRouter, type RouteLocationNamedRaw } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";

const { mutateCreditApplication, isSuccessMutateCreditApplication } =
  useMutateCreditApplicationDetails();
const { data, isLoading } = useGetCreditApplicationDetails();

const formValue = reactive({
  isYes: "",
  limit: "",
});

const maxLimit = ref<number>(50000);

const options = ["No", "Yes"];

const validations = computed(() => ({
  isYes: { required },
  limit: {
    numeric,
    requiredIf: requiredIf(() => formValue.isYes === "No"),
    maxValue: maxValue(maxLimit),
  },
}));

const v$ = useVuelidate(validations, formValue);
const router = useRouter();

const navigateTo = ref({ name: "AdditionalCardHolder" });

watch(
  [data, isLoading],
  ([newVal]) => {
    if (newVal) {
      const { amount } = newVal;
      if (amount === maxLimit.value) {
        formValue.isYes === "Yes";
      } else {
        formValue.isYes = "No";
        formValue.limit = amount;
      }
    }
  },
  {
    immediate: true,
  }
);

const handleNextClick = () => {
  if (formValue.isYes)
    mutateCreditApplication(
      {
        amount:
          formValue.isYes === "Yes" ? maxLimit.value : Number(formValue.limit),
      },
      {
        onSuccess() {
          router.push(navigateTo.value as RouteLocationNamedRaw);
        },
      }
    );
};
</script>

<style scoped></style>
