<template>
  <div class="qb-shadow-secondary">
    <div class="tw-w-full tw-bg-white tw-mb-1.5 tw-p-5">
      <h1 class="tw-leading-normal">{{ cardName }}</h1>

      <div
        class="tw-grid tw-grid-cols-3 tw-gap-1 lg:tw-gap-2 tw-mt-6 md:tw-mt-3 tw-mb-3.5 md:tw-mb-4"
      >
        <div
          v-for="(value, key) in featuredOptions"
          :key="key"
          class="tw-bg-qb-purple-100 tw-p-0.5 tw-px-2.5 tw-py-2.5 tw-font-avenir-book"
        >
          <h3 class="!tw-font-black tw-text-font-primary-500 tw-text-center">
            {{ value }}
          </h3>
          <h4
            class="tw-font-normal tw-font-avenir-medium tw-text-center tw-text-primary=500"
          >
            {{ camleCaseToTitle(key.toString()) }}
          </h4>
        </div>
      </div>

      <div class="tw-grid tw-grid-cols-3 tw-gap-1 tw-my-1">
        <div>
          <img
            :src="imageUrl"
            class="tw-w-full tw-mb-4 md:tw-mb-4.5 lg:tw-mb-5"
          />
        </div>
        <div class="tw-col-span-2 tw-px-2">
          <p>
            {{ description }}
          </p>
        </div>
      </div>
      <hr />
      <div
        class="tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-5 md:tw-mt-4 lg:tw-mt-4.5"
      >
        <CustomButtonVue
          className=" tw-bg-secondary-engage"
          title="Learn More"
          :isDisabled="false"
          :to="''"
        />

        <CustomButtonVue
          className=""
          title="Apply Now"
          :isDisabled="false"
          :to="{ name: 'PreferredLimit', params: { cardId: cardId } }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import creditCardsData from "@/data/creditCards";
import type { CreditCard } from "@/types/mockData";
import camleCaseToTitle from "@/utils/helpers/camleCaseToTitle";
import { computed } from "@vue/reactivity";
import CustomButtonVue from "../CustomButton.vue";

interface Props {
  creditCard: CreditCard;
}
const props = defineProps<Props>();
const cardName = computed(() => {
  return props.creditCard.productName;
});

const cardId = computed(() => {
  return props.creditCard.productId;
});

const staticData = computed(() => {
  return creditCardsData[Number(cardId.value) % 4];
});

const imageUrl = computed(() => {
  return staticData.value.imageUrl;
});
const description = computed(() => {
  return staticData.value.description;
});

const featuredOptions = computed(() => {
  return {
    ...staticData.value.featuredOptions,
    purchaseRate: props.creditCard.rate + "%",
    annualFee:
      "$" +
      (props.creditCard.fees.find((f) => f.name === "Annual Fee")?.amount ||
        staticData.value.featuredOptions.annualFee),
    interestFreeDays:
      (props.creditCard.attributes.find((a) => a.code === "CREDITCINFOIFDAYS")
        ?.value || staticData.value.featuredOptions.interestFreeDays) + "%",
  };
});
</script>

<style scoped></style>
