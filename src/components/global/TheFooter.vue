<template>
  <div
    v-if="!hideFooter"
    class="tw-sticky tw-bottom-0 tw-w-full lg:tw-grid lg:tw-grid-cols-4"
  >
    <div
      v-if="navigateTo"
      class="tw-grid tw-grid-cols-2 tw-w-full tw-justify-items-stretch lg:tw-grid-cols-1"
    >
      <CustomButton
        title=""
        :isDisabled="false"
        className="tw-bg-secondary-engage tw-h-12 "
        @onClick="OpenModal('SaveDraft')"
      >
        <img
          src="/assets/saveDraft.svg"
          width="17"
          height="19"
          class="tw-inline tw-mr-0.5 md:mr-1"
          alt=""
        />
        {{ leftButtonLabel || " Save Draft" }}
      </CustomButton>
      <CustomButton
        :title="buttonLabel || 'Next'"
        :isDisabled="isDisabled"
        className="tw-h-full lg:tw-hidden"
        @onClick="handleNextClick()"
        :showArrow="true"
      />
    </div>
    <div
      @click="scrollToFAQ"
      class="tw-text-[10px] tw-cursor-pointer tw-bg-secondary-600 tw-w-full tw-shadow-lg tw-items-center tw-text-white tw-flex tw-item-center tw-justify-center tw-py-3.5"
      :class="navigateTo ? 'tw-col-span-2' : 'tw-col-span-full'"
    >
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 17C16.771 17 18.657 17 19.828 15.828C21 14.657 21 12.771 21 9C21 5.229 21 3.343 19.828 2.172C18.657 1 16.771 1 13 1H9C5.229 1 3.343 1 2.172 2.172C1 3.343 1 5.229 1 9C1 12.771 1 14.657 2.172 15.828C2.825 16.482 3.7 16.771 5 16.898"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 17C11.764 17 10.402 17.5 9.159 18.145C7.161 19.182 6.162 19.701 5.67 19.37C5.178 19.04 5.271 18.015 5.458 15.966L5.5 15.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M11.3777 5C10.5548 4.99845 9.05694 5.62181 9.00946 6.176C8.96197 6.7302 9.10538 6.76435 9.17208 6.79467H9.94455C10.1211 6.48098 10.336 6.2976 10.9 6.30134C11.4639 6.30508 12.0825 6.86031 11.8215 7.352C11.5605 7.84369 11.3194 8.01496 10.9982 8.54667C10.6771 9.07838 10.5698 9.88154 10.9914 10.5493L11.9435 10.5627C11.7078 9.60941 12.9551 8.76013 13.4511 8.17333C13.9471 7.58654 13.9943 7.36289 14 6.87734C13.9956 6.41658 13.7836 5.95613 13.3224 5.58134C12.8612 5.20654 12.2006 5.00156 11.3777 5ZM11.4251 11.184C10.7884 11.184 10.2732 11.5895 10.2732 12.0907C10.2732 12.5918 10.7884 13 11.4251 13C12.0618 13 12.577 12.5918 12.577 12.0907C12.577 11.5895 12.0618 11.184 11.4251 11.184Z"
          fill="white"
        />
      </svg>

      &nbsp; &nbsp;Frequently Asked Question. &nbsp;
      <span class="tw-underline tw-text-white"> Click Here</span>
    </div>
    <CustomButton
      v-if="navigateTo"
      :title="buttonLabel || 'Next'"
      :isDisabled="isDisabled"
      className="tw-h-full tw-hidden lg:tw-block"
      @onClick="handleNextClick()"
      :showArrow="true"
    />
  </div>
</template>

<script setup lang="ts">
import useFooterStore from "@/stores/useFooterStore";
import useModelStore from "@/stores/useModalStore";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import CustomButton from "../CustomButton.vue";

interface Props {
  navigateTo?: boolean; // if false then it removes buttons
  buttonLabel?: string;
  leftButtonLabel?: string;
  isDisabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), { buttonLabel: "Next" });
const emit = defineEmits<{
  (e: "handleNextClick"): void;
}>();

const { toggelModel, OpenModal } = useModelStore();

const { scrollToFAQ } = useFooterStore();
const handleNextClick = () => {
  emit("handleNextClick");
};
const route = useRoute();
const router = useRouter();

const saveDraft = () => {
  // postValue();
};

const hideFooter = computed(() => route.meta.hideFooter);
</script>

<style scoped></style>
