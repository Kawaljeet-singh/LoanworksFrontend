<template>
  <div class="default-layout">
    <div
      v-if="title"
      class="tw-container tw-flex tw-w-11/12 lg:tw-w-full tw-items-center tw-mx-auto tw-py-4 lg:tw-py-6"
    >
      <svg
        class="tw-fill-qb-black tw-rotate-180 tw-inline-block -tw-mr-2"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="9px"
        height="17px"
        xmlns="http://www.w3.org/2000/svg"
        @click="$router.back"
      >
        <g transform="matrix(1 0 0 1 -269 -263 )">
          <path
            d="M 8.305890000000002 8.43464  C 8.29178839 8.2743275  8.2272186 8.122185  8.121827500000002 8.001212  L 2.041827500000001 0.9712120000000002  C 1.9119454000000005 0.8108995000000001  1.7219435000000018 0.7107030000000001  1.517104500000002 0.6929000000000001  C 1.3115245000000018 0.6750875000000001  1.1081675000000022 0.7418838999999999  0.9522915000000021 0.8769625000000001  C 0.7971736000000016 1.0120411000000002  0.703657500000002 1.2050165000000002  0.6925235000000018 1.4105965  C 0.6821327800000017 1.6161765000000003  0.7548663000000015 1.8180514999999997  0.8958805000000014 1.9687215  L 6.542490500000003 8.499971500000001  L 0.8958805000000023 15.031221500000001  C 0.7548644000000024 15.1818858  0.6821305000000022 15.383025500000002  0.6925235000000027 15.5886055  C 0.7036561700000021 15.794926499999999  0.7971717000000025 15.987168500000003  0.9522915000000021 16.122239500000003  C 1.1081504000000022 16.2580591  1.3115055000000027 16.3241145  1.517104500000003 16.306302000000002  C 1.7219435000000027 16.2884895  1.9119435000000031 16.188294900000002  2.041827500000003 16.028731  L 8.121827500000002 8.998731000000003  C 8.2569061 8.842872100000003  8.322961500000002 8.639517000000001  8.305890000000002 8.434659000000002  Z "
            fill-rule="nonzero"
            stroke="none"
            transform="matrix(1 0 0 1 269 263 )"
          />
        </g>
      </svg>
      <h2
        class="page-title tw-text-center tw-w-full tw-flex-row tw-justify-center"
      >
        {{ title }}
      </h2>
    </div>
    <RouterView name="choose-product" v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
    <div
      v-show="!hideDefault"
      class="tw-bg-white tw-flex tw-mt-6.5 tw-flex-col tw-my-3 lg:tw-flex-row tw-container tw-mx-auto"
    >
      <div
        class="tw-container tw-w-11/12 tw-h-auto tw-pb-4 lg:tw-pb-28 tw-mx-auto lg:tw-w-2/3"
      >
        <StepProgressVue v-if="stepLength" :steps="stepLength" class="" />
        <div
          class="tw-container tw-drop-shadow-primary tw-min-h-[400px] tw-rounded-3 tw-bg-primary-100 tw-p-2.5 lg:tw-p-6 tw-w-full tw-mx-auto tw-relative"
        >
          <div
            v-if="!hideBgLogo"
            class="qb-shadow qb-bg-logo tw-w-72 tw-h-15 tw-opacity-20 tw-absolute tw-right-1"
          ></div>
          <h3 class="tw-text-left tw-mb-5" v-if="heading">
            {{ heading }}
          </h3>
          <!-- <slot /> -->
          <RouterView v-slot="{ Component }">
            <transition name="slide">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </RouterView>
        </div>
      </div>
      <GetStartedGeneralInformation
        v-if="showGetStartedGeneralInfo"
        class="lg:tw-ml-4.5"
      />
      <div
        ref="faqId"
        v-else
        class="tw-max-w-xs sm:tw-max-w-md tw-h tw-w-11/12 tw-mx-auto lg:tw-w-1/3 lg:tw-ml-4.5"
        :class="`${stepLength ? 'lg:tw-mt-14' : ''}`"
      >
        <transition name="slide">
          <FaqSection :key="route.path" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepProgressVue from "@/components/StepProgress.vue";
import useFooterStore from "@/stores/useFooterStore";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import GetStartedGeneralInformation from "../components/get-started/GetStartedGeneralInformation.vue";
import FaqSection from "../components/global/FaqSection.vue";
const route = useRoute();

const { faqId } = storeToRefs(useFooterStore());
// const { goto } = useFooterStore();

const title = computed(() => {
  return route.meta.title;
});

const heading = computed(() => {
  return route.meta.heading;
});
const stepLength = computed(() => {
  return (route.meta.stepLength || 0) as number;
});

const hideBgLogo = computed(() => route.meta.hideBgLogo);
const hideDefault = computed(() => route.meta.hideDefault);

const showGetStartedGeneralInfo = computed(
  () => route.meta.showGetStartedGeneralInfo
);
</script>

<style scoped>
.default-layout {
  min-height: calc(100vh - theme(spacing.24));
}
.page-title {
  @apply tw-text-primary-500  lg:!tw-text-22px;
}
</style>
