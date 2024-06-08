<template>
  <div>
    <div>
      <p>
        The {{ actualCreditCard?.productName }} allows a maximum of
        {maximumadditionalcards} additional card holders.
      </p>
    </div>

    <div class="tw-w-full qb-shadow-secondary">
      <div class="tw-border-b tw-border-white">
        <div v-for="(holder, index) in data" :key="index">
          <SavedAdditionalCardHolder
            :holder-details="holder"
            :position-of-holder="index + 1"
          />
        </div>
        <div v-for="(holder, index) in formValue" :key="index">
          <SavedAdditionalCardHolder
            :holder-details="holder"
            :position-of-holder="index + 1 + data?.length"
            @remove="removeHolders(index)"
          />
        </div>
      </div>

      <div class="qb-shadow-secondary tw-py-4 tw-my-4 tw-border-y tw-bg-white">
        <div class="tw-flex tw-w-max tw-cursor-pointer" @click="pushHolder">
          <img src="/assets/plus.svg" class="tw-w-5 tw-mx-2" /> Add another card
          holder
        </div>
      </div>
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        @handle-next-click="handleNextClick"
        :is-disabled="!data.length"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import SavedAdditionalCardHolder from "@/components/credit-card/additional-card-holders/SavedAdditionalCardHolder.vue";
import router from "@/router";
import useGetAdditionalCardHolder from "@/utils/composables/API/additional-card-holders/useGetAdditionalCardHolder";
import routeNames from "@/utils/route-names/routeName";
import { computed, reactive } from "@vue/reactivity";
import TheFooter from "../../components/global/TheFooter.vue";
import useGetProduct from "@/utils/composables/API/third-party/product/useGetProduct";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import type { CreditCard } from "@/types/mockData";

const { data } = useGetAdditionalCardHolder();
const { data: creditCardData } = useGetProduct({
  classification: "creditCard",
});
const { data: dataCreditCardApplication } = useGetCreditApplicationDetails();

const actualCreditCard = computed(() => {
  if (dataCreditCardApplication?.value?.productId)
    return creditCardData.value?.find(
      (c: CreditCard) =>
        Number(c.productId) ===
        Number(dataCreditCardApplication?.value?.productId)
    );
  return undefined;
});

const formField = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  mobileNumber: "",
  address: "",
  email: "",
  additionalCardHoldersId: 0,
};

const formValue = reactive(data.value?.length ? [] : [{ ...formField }]);
function pushHolder() {
  formValue.push({ ...formField });
}
function removeHolders(index: number) {
  formValue.splice(index, 1);
}

const nextNavigation = computed(() => {
  return { name: routeNames.personalDetails.SingleOrJointApplication };
});

const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
