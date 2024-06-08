<template>
  <form @submit.prevent="handleNextClick">
    <div class="md:tw-grid md:tw-grid-cols-2 md:tw-gap-2">
      <div>
        <CustomInputVue
          name="Monthly Mortgage Repayments"
          placeholder=""
          v-model="v$.monthlyMortgageRepayments.$model"
          icon="fa-dollar-sign"
          className="!tw-text-left"
          :v="v$.monthlyMortgageRepayments"
        />
      </div>
      <div>
        <CustomInputVue
          name="Monthly Personal Loan Repayments "
          placeholder=""
          v-model="v$.monthlyPersonalLoanRepayments.$model"
          icon="fa-dollar-sign"
          className="!tw-text-left"
          :v="v$.monthlyPersonalLoanRepayments"
        />
      </div>
      <div class="">
        <CustomInputVue
          name="Existing Credit Card Limit"
          placeholder=""
          v-model="v$.existingCreditCardLimit.$model"
          :v="v$.existingCreditCardLimit"
          icon="fa-dollar-sign"
          className="!tw-text-left"
        />
      </div>
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
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
import CustomButtonVue from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import useMutateCreditApplicationDetails from "@/utils/composables/API/useMutateCreditApplicationDetails";
import useVuelidate from "@vuelidate/core";
import { helpers, numeric } from "@vuelidate/validators";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";

const { data, isLoading } = useGetCreditApplicationDetails();
const { mutateCreditApplication, isSuccessMutateCreditApplication } =
  useMutateCreditApplicationDetails();

const monthlyMortgageRepayments = ref<number>(
  data.value?.monthlyMortgageRepayments || 0
);
const monthlyPersonalLoanRepayments = ref<number>(
  data.value?.monthlyPersonalLoanRepayments || 0
);
const existingCreditCardLimit = ref<number>(
  data.value?.existingCreditCardLimit || 0
);

const validations = {
  monthlyMortgageRepayments: {
    numeric,
  },
  monthlyPersonalLoanRepayments: { numeric },
  existingCreditCardLimit: { numeric },
};

const v$ = useVuelidate(validations, {
  monthlyMortgageRepayments,
  monthlyPersonalLoanRepayments,
  existingCreditCardLimit,
});

const route = useRoute();
const router = useRouter();
const nextRoute = { name: "MaritalStatus", params: route.params };

const handleNextClick = async () => {
  if (!(await v$.value.$validate())) return;

  if (
    monthlyMortgageRepayments.value ===
      data?.value?.monthlyMortgageRepayments &&
    monthlyPersonalLoanRepayments.value ===
      data?.value?.monthlyPersonalLoanRepayments &&
    existingCreditCardLimit.value === data?.value?.existingCreditCardLimit
  ) {
    router.push(nextRoute);
    return;
  }
  const postData: unknown = {
    monthlyMortgageRepayments: Number(monthlyMortgageRepayments.value),
    monthlyPersonalLoanRepayments: Number(monthlyPersonalLoanRepayments.value),
    existingCreditCardLimit: Number(existingCreditCardLimit.value),
  };

  mutateCreditApplication(postData);
  if (isSuccessMutateCreditApplication) {
    router.push(nextRoute);
  }
};

watch(
  isLoading,
  (newVal) => {
    if (!newVal) {
      monthlyMortgageRepayments.value = data?.value?.monthlyMortgageRepayments;

      monthlyPersonalLoanRepayments.value =
        data?.value?.monthlyPersonalLoanRepayments;

      existingCreditCardLimit.value = data?.value?.existingCreditCardLimit;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
