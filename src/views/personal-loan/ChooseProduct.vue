<template>
  <div
    class="tw-container tw-w-11/12 lg:tw-w-full tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-8 lg:tw-gap-16"
  >
    <div
      class="left tw-container tw-drop-shadow-primary tw-min-h-[400px] tw-rounded-3 tw-bg-primary-100 tw-p-2.5 lg:tw-p-6 tw-w-full tw-mx-auto tw-relative"
    >
      <div
        class="qb-shadow qb-bg-logo tw-w-72 tw-h-15 tw-opacity-20 tw-absolute tw-right-1"
      ></div>
      <h3 class="tw-text-left tw-mb-5">
        Great News {{ customerName || "first name" }}! We can offer you the
        following rates.
      </h3>

      <div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-1 tw-gap-6">
        <div>
          <q-carousel
            v-model="slide"
            transition-next="slide-left"
            transition-prev="slide-right"
            animated
            navigation
            infinite
            height="500px"
            control-color="tw-bg-primary-100"
            class="rounded-borders tw-min-h-max tw-bg-primary-100"
          >
            <template v-for="el in [0, 1]" :key="el">
              <q-carousel-slide
                :name="el"
                class="tw-min-h-full tw-bg-primary-100 no-wrap flex-center"
              >
                <q-scroll-area class="fit">
                  <div
                    class="left tw-w-full tw-bg-qb-purple-100 tw-px-4 tw-pt-4.5 tw-drop-shadow-primary"
                  >
                    <div
                      class="tw-flex tw-justify-between md:tw-flex-col md:tw-items-center md:tw-gap-2 lg:tw-flex-row tw-grid-cols-2"
                    >
                      <p
                        class="tw-text-xl tw-text-qb-black-600 md:tw-order-2 lg:tw-order-first"
                      >
                        Product Name
                      </p>

                      <img
                        :src="carLogo"
                        alt=""
                        class="tw-inline tw-h-16 tw-w-16"
                      />
                    </div>
                    <div
                      class="tw-grid tw-grid-cols-2 tw-gap-6 tw-mt-5 lg:tw-grid-cols-2 md:tw-grid-cols-1 md:tw-gap-7"
                    >
                      <div v-for="(el, index) in leftBoxRates" :key="index">
                        <div
                          class="tw-text-qb-black-600 tw-font-medium tw-text-xs md:tw-text-center lg:tw-text-start"
                        >
                          {{ el.label_one }}
                        </div>
                        <div
                          class="tw-font-extrabold tw-text-primary-500 tw-text-22px tw-font-avenir-medium md:tw-text-center lg:tw-text-start md:tw-text-4xl md:tw-pt-5 lg:tw-pt-2"
                        >
                          {{ el.heading }}
                        </div>
                        <div
                          class="tw-text-qb-black-600 tw-text-10px tw-font-medium md:tw-text-center lg:tw-text-start"
                        >
                          {{ el.label_two }}
                        </div>
                      </div>

                      <div
                        class="tw-font-medium tw-font-avenir-medium md:tw-text-center lg:tw-text-start"
                      >
                        <div class="tw-text-10px">Comparison Rate</div>
                        <div class="tw-text-lg">3.9% p.a.</div>
                      </div>
                      <div
                        class="tw-font-medium tw-font-avenir-medium md:tw-text-center lg:tw-text-start"
                      >
                        <div class="tw-text-10px">Loan Amount</div>
                        <div class="tw-text-lg">$50,000</div>
                      </div>
                    </div>

                    <div
                      class="key-fact-sheet tw-mt-3 tw-text-center tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
                      @click="OpenModal('SendKeyFacts')"
                    >
                      <svg
                        width="15"
                        viewBox="0 0 37 30"
                        fill="#008ba8"
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
                      <span class="tw-text-primary tw-p-4"
                        >Send Key Fact Sheet</span
                      >
                    </div>
                  </div>
                </q-scroll-area>
              </q-carousel-slide>
            </template>

            <template v-slot:navigation-icon="{ active }">
              <div
                class="tw-h-1.5 tw-transition-all tw-duration-150 tw-ease-linear tw-rounded-5 tw-bg-primary-500 tw-mr-1"
                :class="[
                  active ? 'tw-w-6' : 'tw-w-3  tw-bg-qb-black-300 tw-mr-1',
                ]"
              ></div>
            </template>
          </q-carousel>

          <div
            class="tw-flex tw-w-full tw-justify-between tw-max-w-sm tw-mx-auto tw-mt-10"
          >
            <div class="tw-w-12.5 tw-h-12.5 tw-mr-4">
              <CustomButton
                title=""
                class="tw-max-w-xs"
                :isDisabled="false"
                icon-class-name="tw-ml-0"
                class-name="tw-py-0 tw-h-12.5"
                @onClick="handleChangeSettings"
              >
                <img :src="SettingIcon" class="tw-h-10 tw-mx-auto" alt="" />
              </CustomButton>
            </div>
            <div class-name="tw-w-full">
              <CustomButton
                title="Choose Product"
                class="tw-w-40 lg:tw-w-56 tw-max-w-xs"
                class-name="tw-bg-secondary-engage tw-h-12.5"
                :isDisabled="false"
                @onClick="handleNextClick"
              />
            </div>

            <div class="tw-w-12.5 tw-h-12.5 tw-ml-4">
              <CustomButton
                title=""
                class="tw-max-w-xs"
                :isDisabled="false"
                class-name="tw-h-12.5"
                icon-class-name="tw-ml-0"
                @onClick="handleNextSlide"
                show-arrow
              />
            </div>
          </div>
        </div>

        <div
          class="right lg:tw-hidden tw-bg-[#f5f4fd] tw-container tw-drop-shadow-primary tw-min-h-[400px] tw-rounded-3 tw-p-2.5 lg:tw-p-6 tw-w-full tw-mx-auto tw-relative"
        >
          <h3 class="tw-text-left tw-mb-5">Loan Details</h3>
          <div class="tw-grid lg:tw-grid-cols-2 md:tw-gap-4.5">
            <div class="tw-bg-white">
              <div
                v-for="(value, key) in rates"
                :key="key"
                class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
              >
                <span>{{ key }}</span>
                <span>{{ value }}</span>
              </div>
            </div>
            <div class="tw-bg-white">
              <div
                class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
              >
                <span>Fee</span>
              </div>
              <div
                v-for="(value, key) in fees"
                :key="key"
                class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
              >
                <span class="tw-pl-4">{{ key }}</span>
                <span>{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="right tw-hidden lg:tw-block tw-bg-[#f5f4fd] tw-container tw-drop-shadow-primary tw-min-h-[400px] tw-rounded-3 tw-p-2.5 lg:tw-p-6 tw-w-full tw-mx-auto tw-relative"
    >
      <h3 class="tw-text-left tw-mb-5">Loan Details</h3>
      <div class="tw-grid lg:tw-grid-cols-2 md:tw-gap-4.5">
        <div class="tw-bg-white">
          <div
            v-for="(value, key) in rates"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span>{{ key }}</span>
            <span>{{ value }}</span>
          </div>
        </div>
        <div class="tw-bg-white">
          <div
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span>Fee</span>
          </div>
          <div
            v-for="(value, key) in fees"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span class="tw-pl-4">{{ key }}</span>
            <span>{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="true"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import SettingIcon from "/assets/settingEqualizer.png";

import CustomButton from "@/components/CustomButton.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useModelStore from "@/stores/useModalStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import carLogo from "/assets/verify-income-expense/carLoan.svg";

const { data } = useGetPersonalDetails({ isFirstPerson: 1 });

const route = useRoute();
const router = useRouter();

const { OpenModal } = useModelStore();

const customerName = computed(() => {
  return data?.value[0]?.firstName;
});

const leftBoxRates = [
  {
    label_one: "Borrower Rate",
    heading: "3.75% p.a",
    label_two: "Variable",
  },
  {
    label_one: "Repayment Amount",
    heading: "$257.00",
    label_two: "Fortnightly",
  },
];
const rates = {
  // "Borrower Rate": "3.90% p.a.",
  // "Comparison Rate": "3.90% p.a.",
  // "Loan Amount": "$50,000",
  "Loan Term": "5 Years",
  // "Repayment Frequency": "Fornight",
  // "Repayment Amount": "$257.00",
  "Total Amount to Repay": "$257.00",
  "Interest Type": "Fixed",
};

const fees = {
  "Establishment Fee": "$100",
  "Monthly Fee": "$100",
  "Early Pay Out Fee": "$100",
};
const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const slide = ref(1);
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const handleNextClick = () => router.push(nextNavigation.value);
const handleNextSlide = () => {
  slide.value++;
  slide.value = slide.value % 2;
};

const handleChangeSettings = () => {
  OpenModal("ProductFilter");
};
</script>

<style lang="css" scoped>
.main-heading {
  @apply tw-font-normal tw-text-center !tw-text-xl tw-mt-6 tw-leading-normal lg:tw-mt-0;
}
</style>
