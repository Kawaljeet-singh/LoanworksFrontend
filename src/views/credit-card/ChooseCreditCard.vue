<template>
  <div>
    <div class="tw-grid md:tw-grid-cols-2 tw-gap-3">
      <template v-for="credit in data" :key="credit.id">
        <SingleCreditCard :creditCard="credit" />
      </template>
    </div>
    <teleport to="#the-footer">
      <TheFooter />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import useGetProduct from "@/utils/composables/API/third-party/product/useGetProduct";
import useMutateApplication from "@/utils/composables/API/useMutateApplication";
import LOAN_TYPE from "@/utils/LoanTypes";
import { onMounted } from "vue";
import SingleCreditCard from "../../components/credit-card/SingleCreditCard.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const { data } = useGetProduct({ classification: "creditCard" });

const { mutate } = useMutateApplication();

onMounted(async () => {
  mutate({ applicationType: LOAN_TYPE.CREDIT_CARD_LOAN });
});
</script>

<style lang="scss" scoped></style>
