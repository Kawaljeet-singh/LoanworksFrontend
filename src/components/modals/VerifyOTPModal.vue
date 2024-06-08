<template>
  <div class="modal">
    <div class="header">
      <div class="tw-text-xl">
        We have sent a four digit code to the following number to confirm your
        log in.
      </div>
      <div @click="toggelModel">
        <svg
          fill="#163C84"
          width="35"
          height="35"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m74.621 66.312l-16.324-16.316 16.312-16.324c1.8828-1.875 1.8828-4.8906 0.007813-6.7734l-1.5156-1.5195c-0.89062-0.91406-2.1094-1.4102-3.3906-1.4102h-0.007813c-1.2812 0-2.4844 0.50391-3.3828 1.4062l-16.32 16.332-16.324-16.312c-1.8711-1.875-4.8828-1.8828-6.7656-0.007812l-1.5195 1.5039c-0.91406 0.89844-1.4141 2.1172-1.4141 3.3945 0 1.2852 0.50391 2.4922 1.4062 3.3945l16.332 16.32-16.316 16.324c-1.8828 1.875-1.8828 4.8906-0.007813 6.7773l1.5156 1.5156c0.89844 0.91406 2.1133 1.4102 3.3945 1.4102 1.2734 0 2.4922-0.50781 3.3906-1.4062l16.316-16.328 16.32 16.309c0.92578 0.93359 2.1562 1.4062 3.3906 1.4062 1.2227 0 2.4453-0.46484 3.3828-1.3984l1.5156-1.5117c0.91797-0.89062 1.4141-2.1094 1.4141-3.3906 0.007812-1.2812-0.49609-2.4922-1.3984-3.3945z"
          />
        </svg>
      </div>
    </div>
    <div class="tw-grid tw-justify-items-center tw-items-center">
      <div
        class="tw-max-w-sm tw-w-full tw-justify-items-center md:tw-grid md:tw-grid-cols-1 md:tw-gap-2"
      >
        <h2 class="tw-text-center tw-my-6 !tw-text-2xl">{{ mobileNumber }}</h2>
        <div class="tw-mb-8 tw-max-w-[225px] md:tw-max-w-[304px] tw-mx-auto">
          <VOtpInput
            class="tw-w-full tw-overflow-hidden tw-gap-2 md:tw-gap-4.5 !tw-grid tw-grid-cols-4"
            input-classes="otp-input tw-rounded-3 tw-drop-shadow-tertiary  focus:tw-border-none focus:tw-outline-none tw-w-12.5 md:tw-w-16 tw-text-black tw-h-17.5 md:tw-h-21.5 tw-text-center"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            separator=""
            @on-complete="handleOnComplete"
          />
        </div>
        <div class="tw-h-px tw-w-full tw-bg-secondary-50"></div>
        <p class="tw-text-center tw-my-4">Didn't receive a code?</p>
        <div class="tw-w-full md:tw-max-w-[212px]">
          <CustomButton
            :title="`Resend Code ${timer ? `( ${timer} )` : ''}`"
            :className="`${
              timer ? 'tw-bg-qb-black-secondary-2 tw-text-white' : ''
            }  md:tw-h-15`"
            :isDisabled="timer ? true : false"
            @onClick="resendCode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import router from "@/router";
import useModelStore from "@/stores/useModalStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { computed } from "@vue/reactivity";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
import VOtpInput from "vue3-otp-input";

const otp = reactive({
  d1: "",
  d2: "",
  d3: "",
  d4: "",
});
const timer = ref<number>();
const route = useRoute();

const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const { data, isFetched, isLoading } = useGetPersonalDetails({
  isFirstPerson: isFirst.value,
});
const mobileNumber = computed(() => {
  if (!data?.value.length) return "";
  const mobno: string = data.value[0].mobileNumber;
  return mobno;
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
  console.log(nextNavigation.value);

  router.push(nextNavigation.value);
};
watch(timer, () => {
  if (timer.value > 0) {
    setTimeout(() => timer.value--, 1000);
  }
});
onMounted(() => (timer.value = 10));
const resendCode = () => {
  timer.value = 10;
};

watch(otp, (newVal) => {
  const { d1, d2, d3, d4 } = newVal;
  console.log(d1, d2, d3, d4);
  if (d1 && d2 && d3 && d4) {
    router.push(nextNavigation.value);
  }
});

const { toggelModel } = useModelStore();
</script>

<style scoped>
.modal {
  @apply tw-w-full md:tw-max-w-sm tw-p-6 tw-h-fit tw-absolute tw-inset-0 tw-m-auto
   tw-z-10 tw-bg-primary-engage-light tw-mx-auto tw-rounded-3 tw-shadow-lg;
}
.header {
  @apply tw-w-full tw-justify-between  tw-flex;
}
</style>
