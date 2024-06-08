<template>
  <div
    class="tw-bg-[#827be5] tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-items-center"
  >
    <div class="">
      <div class="tw-text-white tw-text-center">
        Thanks {{ customerName || "PersonX Firstname" }}! <br />
        {{ p1 ? p1 : "Not much longer, we are getting the best rate for you." }}
      </div>
      <div>
        <img :src="searchLogo" alt="" class="tw-w-80" srcset="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { eligibilityResult } from "@/types/thirdParty";
import LOAN_TYPE from "@/utils/LoanTypes";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useCheckEligibility from "@/utils/composables/API/third-party/useCheckEligibility";
import { computed, onMounted } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import { useToast } from "vue-toastification";
import searchLogo from "/assets/personal-loan/searchingProduct.gif";

const router = useRouter();
const route = useRoute();
const navigateTo = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const { data } = useGetPersonalDetails({ isFirstPerson: 1 });
const customerName = computed(() => {
  return data?.value[0].firstName;
});
const p1 = computed(() => route.meta.p1);

const loanType = computed(() => route.meta.LOAN_TYPE);

const { mutate } = useCheckEligibility();
const toast = useToast();
onMounted(() => {
  switch (loanType.value) {
    case LOAN_TYPE.CREDIT_CARD_LOAN:
      mutate(0, {
        onSuccess(data) {
          console.log(data);

          switch (data.data.result) {
            case eligibilityResult.failed:
              break;
            // case null:
            //   router.push({ name: routeNames.creditCard.badNews });
            //   break;
            case eligibilityResult.success:
              router.push(navigateTo.value);
              break;

            default:
              router.push(navigateTo.value);

              break;
          }
        },
      });
      break;

    default:
      setTimeout(() => router.push(navigateTo.value), 2000);
      break;
  }
});
</script>

<style scoped></style>
