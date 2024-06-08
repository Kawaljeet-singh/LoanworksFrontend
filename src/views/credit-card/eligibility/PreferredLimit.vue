<template>
  <form @submit.prevent="handleNextClick">
    <div class="tw-grid lg:tw-grid-cols-2 lg:tw-gap-8">
      <div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-1">
        <div>
          <CustomInput
            :min="minMaxLimit.min"
            :max="minMaxLimit.max"
            placeholder=""
            type="number"
            name="Preferred Limit"
            v-model.number="v$.preferredLimit.$model"
            className="!tw-text-left"
            icon="fa-dollar-sign"
            :v="v$.preferredLimit"
          />
        </div>
      </div>
      <div
        class="tw-flex tw-py-9 md:tw-py-10 tw-w-full lg:tw-flex-col lg:tw-py-7 lg:tw-items-center"
      >
        <div
          class="tw-w-1/2 tw-font-avenir-medium tw-grid lg:tw-grid-cols-2 lg:tw-w-64"
        >
          Minimum Limit
          <h5 class="tw-text-base">${{ minMaxLimit.min }}</h5>
        </div>
        <div
          class="tw-w-1/2 tw-font-avenir-medium tw-grid lg:tw-grid-cols-2 lg:tw-w-64 lg:tw-mt-5"
        >
          Maximum Limit
          <h5 class="tw-text-base">${{ minMaxLimit.max }}</h5>
        </div>
      </div>
    </div>
    <div
      class="tw-font-avenir-medium md:tw-text-center lg:tw-text-left lg:tw-mt-24"
    >
      Let's check your preferred limit is OK before you apply for a credit card.
    </div>
    <div class="tw-mt-5 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="v$.$invalid"
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
import router from "@/router";
import type { CreditCard } from "@/types/mockData";
import useGetProduct from "@/utils/composables/API/third-party/product/useGetProduct";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import useMutateCreditApplicationDetails from "@/utils/composables/API/useMutateCreditApplicationDetails";
import { computed } from "@vue/reactivity";
import { useVuelidate } from "@vuelidate/core";
import { maxValue, minValue, required } from "@vuelidate/validators";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import CustomButton from "../../../components/CustomButton.vue";
import CustomInput from "../../../components/form/CustomInput.vue";
import TheFooter from "../../../components/global/TheFooter.vue";

const route = useRoute();
const { data: dataCreditCardsTypes } = useGetProduct({
  classification: "creditCard",
});

const { data, isLoading } = useGetCreditApplicationDetails();

const { mutateCreditApplication } = useMutateCreditApplicationDetails();

const preferredLimit = ref<number>(data.value?.preferredLimit);

const minMaxLimit = computed(() => {
  const currentCard: CreditCard = dataCreditCardsTypes.value?.find(
    (c: CreditCard) => c.productId === Number(route.params.cardId)
  );

  return {
    min: currentCard?.minLoan || 10000,
    max: currentCard?.maxLoan || 75000,
  };
});

const validations = computed(() => ({
  preferredLimit: {
    required,
    maxValue: maxValue(minMaxLimit.value.max),
    minValue: minValue(minMaxLimit.value.min),
  },
}));

const v$ = useVuelidate(validations, { preferredLimit });

watch(
  [isLoading, data],
  ([newVal]) => {
    if (data?.value) preferredLimit.value = data.value?.preferredLimit;
  },
  { immediate: true }
);

const nextRoute = { name: "AnnualGrossIncome", params: route.params };

const handleNextClick = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  if (preferredLimit.value === data?.value?.preferredLimit) {
    router.push(nextRoute);
    return;
  }
  const postData: unknown = {
    preferredLimit: preferredLimit.value,
    productId: route.params.cardId,
  };

  mutateCreditApplication(postData, {
    onSuccess() {
      router.push(nextRoute);
    },
  });
};
</script>

<style scoped></style>
