<template>
  <div class="tw-bg-primary-200 tw-w-full tw-p-4 qb-shadow">
    <div class="tw-grid tw-grid-cols-2 tw-gap-1">
      <h1 class="tw-leading-3 tw-mt-3.5">
        {{ acctualCard?.productName || creditCard?.productName }}
      </h1>

      <div class="tw-grid md:tw-grid-row-2 md:tw-row-span-2 tw-gap-4">
        <img
          class=""
          :src="creditCard?.imageUrl"
          :alt="creditCard?.productName"
        />
        <div class="tw-hidden md:tw-block tw-col-span-2">
          {{ creditCard?.description }}
        </div>
      </div>
      <div
        class="tw-grid tw-grid-cols-2 tw-col-span-2 md:tw-col-span-1 md:tw-grid-cols-2 tw-gap-2"
      >
        <div>
          <span>Annual Fee</span>
          <h5 class="tw-text-primary-500 tw-font-bold">$50,000</h5>
        </div>
        <div class="tw-col-span-1">
          <span>Interest Free Days</span>
          <h5 class="tw-text-primary-500 tw-font-bold">10 years</h5>
        </div>
        <div>
          <span>Purchase Rate </span>
          <h5 class="tw-text-primary-500 tw-font-bold">
            {{ creditCard?.interestRate }}% p.a
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGetProduct from "@/utils/composables/API/third-party/product/useGetProduct";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import { computed } from "vue";
import creditCards from "../../data/creditCards";
import type { CreditCard } from "@/types/mockData";

const { data: creditCardData } = useGetProduct({
  classification: "creditCard",
});
const { data: dataCreditCardApplication } = useGetCreditApplicationDetails();

const productId = computed(() => dataCreditCardApplication?.value?.productId);
const creditCard = computed(() => {
  return creditCards[productId.value % 4];
});

const acctualCard = computed(() => {
  return (
    creditCardData?.value?.length &&
    creditCardData?.value.find(
      (c: CreditCard) => c.productId === productId.value
    )
  );
});

const preferredLimit = computed(
  () => dataCreditCardApplication.value?.preferredLimit
);
</script>

<style scoped></style>
