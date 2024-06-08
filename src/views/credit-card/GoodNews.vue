<template>
  <div>
    <div>
      <h3 class="tw-text-left tw-mb-5">
        Good News {{ customerDetals?.firstName }}!
      </h3>
      <p class="tw-text-sm">
        Good news {{ customerDetals?.firstName }}! You are eligible for a
        {{ actualCreditCard?.productName }} credit card.
      </p>
      <!-- <p>
        We have also determined the maximum limit you can have based on the
        information you have provided is ${calculated_maximum_limit}.
      </p>
      <p>We have emailed you the details of our offer.</p> -->
    </div>
    <div class="tw-bg-primary-100 tw-w-full tw-p-4 qb-shadow">
      <div class="tw-grid tw-grid-cols-2 tw-items-center">
        <h1 class="tw-text-center">
          {{ actualCreditCard?.productName || creditCard.productName }}
        </h1>

        <div class="tw-grid md:tw-grid-cols-3 tw-gap-4">
          <img
            class=""
            :src="creditCard.imageUrl"
            :alt="creditCard.productName"
          />
          <div class="tw-hidden md:tw-block tw-col-span-2">
            {{ creditCard.description }}
          </div>
        </div>
      </div>
      <div class="tw-grid md:tw-grid-cols-2 tw-items-center tw-gap-2 tw-p-4">
        <div>
          <div class="tw-mb-4">
            <div class="tw-grid tw-grid-cols-2 tw-gap-2">
              <div>
                <span>Preferred Limit</span>
                <h5 class="tw-text-primary tw-font-bold">
                  ${{ preferredLimit || "10,000" }}
                </h5>
              </div>
              <div>
                <span>Interest Rate</span>
                <h5 class="tw-text-primary tw-font-bold">
                  {{ actualCreditCard.rate }}% p.a
                </h5>
              </div>
              <!-- <div class="tw-col-span-2">
                <span>Maximum Allowable Limit</span>
                <h5 class="tw-text-primary tw-font-bold">$50,000</h5>
              </div> -->
            </div>
          </div>

          <div class="tw-bg-white tw-p-4">
            <p>On Going Fees</p>
            <div class="">
              <div
                v-for="(value, name) in creditCard.onGoingFees"
                :key="name"
                class="tw-flex tw-justify-between tw-p-2"
              >
                <span>{{ camleCaseToTitle(name) }}</span>
                <span> ${{ value }} </span>
              </div>
            </div>
          </div>
        </div>

        <div class="tw-my-4">
          <p>Features</p>
          <div class="tw-grid tw-gap-1">
            <div
              v-for="(value, index) in actualCreditCard.features"
              :key="index"
              class="tw-bg-white tw-flex tw-items-center"
            >
              <font-awesome-icon
                icon="fa-regular fa-circle-check"
                class="tw-text-[#9496c7] tw-p-4"
                color=""
              />
              <span class="tw-p-2">{{ value["short-description"] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tw-text-center tw-cursor-pointer"
        @click="OpenModal('SendKeyFacts')"
      >
        <svg
          width="15"
          viewBox="0 0 37 30"
          fill="#9496c7"
          class="tw-fill-primary tw-inline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4.45936L18.069 14.0954L36.361 4.3406C35.9938 3.0906 35.2329 1.99372 34.1907 1.21092C33.1485 0.42968 31.8829 0.00468 30.5798 0H6.52656C5.1172 0.0031252 3.7422 0.42968 2.57812 1.225C1.41404 2.02032 0.51564 3.14688 0 4.45936Z"
            fill=""
          />
          <path
            d="M36.1934 8L18.867 17.5468C18.4467 17.7702 17.9405 17.7702 17.5202 17.5468L0.193446 8V22.114C-0.375109 23.9765 0.365526 25.764 1.68425 27.0812C3.00145 28.4 4.78893 29.1406 6.65145 29.1437H29.7358C31.5983 29.1406 33.3858 28.3999 34.703 27.0812C36.0218 25.764 36.7624 23.9765 36.1934 22.114V8Z"
            fill=""
          />
        </svg>
        <!-- <font-awesome-icon icon="fa-solid fa-envelope" /> -->
        <span class="tw-text-primary tw-p-4">Send Key Fact Sheet</span>
      </div>
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        @handle-next-click="handleNextClick"
        button-label="Apply Now"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { CustomerDetail } from "@/stores/useApplicationStore";
import useModelStore from "@/stores/useModalStore";
import type { CreditCard } from "@/types/mockData";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetProduct from "@/utils/composables/API/third-party/product/useGetProduct";
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import camleCaseToTitle from "@/utils/helpers/camleCaseToTitle";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import creditCards from "../../data/creditCards";

const { data } = useGetPersonalDetails({ isFirstPerson: 1 });
const { data: creditCardData } = useGetProduct({
  classification: "creditCard",
});
const { data: dataCreditCardApplication } = useGetCreditApplicationDetails();

const { OpenModal } = useModelStore();
const route = useRoute();
const router = useRouter();
const creditCard = computed(() => {
  return creditCards[Number(route.params.cardId) % 4];
});
const actualCreditCard = computed(() =>
  creditCardData.value?.find(
    (c: CreditCard) => Number(c.productId) === Number(route.params.cardId)
  )
);
const preferredLimit = computed(
  () => dataCreditCardApplication.value?.preferredLimit
);

const customerDetals = computed(() => data?.value[0] as CustomerDetail);

const handleNextClick = () => {
  router.push({ name: "BeforeYouStart" });
};
</script>

<style scoped></style>
