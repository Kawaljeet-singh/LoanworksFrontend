<template>
  <div class="tw-grid tw-justify-items-center tw-items-center">
    <h2 class="tw-text-center !tw-text-lg">
      We have sent a four digit code to the following number to confirm your log
      in.
    </h2>
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
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import router from "@/router";
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
</script>

<style scoped></style>
