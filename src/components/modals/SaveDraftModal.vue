<template>
  <div>
    <div
      class="tw-w-full md:tw-max-w-sm tw-p-6 tw-mb-[97px] tw-h tw-relative tw-z-10 tw-bg-primary-engage-light tw-mx-auto tw-rounded-3 tw-shadow-lg"
    >
      <div class="tw-w-full tw-justify-between tw-items-center tw-flex">
        <div>
          <svg
            width="37"
            height="30"
            viewBox="0 0 37 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4.45936L18.069 14.0954L36.361 4.3406C35.9938 3.0906 35.2329 1.99372 34.1907 1.21092C33.1485 0.42968 31.8829 0.00468 30.5798 0H6.52656C5.1172 0.0031252 3.7422 0.42968 2.57812 1.225C1.41404 2.02032 0.51564 3.14688 0 4.45936Z"
              fill="white"
            />
            <path
              d="M36.1934 8L18.867 17.5468C18.4467 17.7702 17.9405 17.7702 17.5202 17.5468L0.193446 8V22.114C-0.375109 23.9765 0.365526 25.764 1.68425 27.0812C3.00145 28.4 4.78893 29.1406 6.65145 29.1437H29.7358C31.5983 29.1406 33.3858 28.3999 34.703 27.0812C36.0218 25.764 36.7624 23.9765 36.1934 22.114V8Z"
              fill="white"
            />
          </svg>

          <!-- <img src="/assets/envelop.svg" alt="" srcset="" /> -->
        </div>
        <h2>Save Draft</h2>
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

      <form @submit.prevent="handleSaveDraft" class="tw-mt-15">
        <p class="!tw-text-base">
          Please confirm your Email and contact number and we'll be in touch
          shortly.
        </p>
        <div class="tw-mt-5">
          <CustomInput
            v-model="v$.email.$model"
            :v="v$.email"
            name="Email"
            class="tw-mb-1"
            className="!tw-text-left"
            placeholder="email"
          />
          <CustomInput
            v-model="v$.mobileNumber.$model"
            :v="v$.mobileNumber"
            name="Contact Number"
            class="tw-mb-1 tw-mt-5"
            className="!tw-text-left"
            placeholder="mobile number"
          />
        </div>
        <div class="tw-mt-9 tw-flex tw-item tw-justify-center tw-mb-16">
          <CustomButton
            title="Save Draft"
            :is-disabled="v$.$invalid"
            class="tw-w-full"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModelStore from "@/stores/useModalStore";
import saveDraftStore from "@/stores/useSaveDraftStore";
import useSaveDraft from "@/utils/composables/API/save-draft/useSaveDraft";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import CustomButton from "../CustomButton.vue";
import CustomInput from "../form/CustomInput.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
const formValue = reactive({
  email: "",
  mobileNumber: "",
});
const validations = computed(() => ({
  mobileNumber: { required, minLength: minLength(10) },
  email: { required, email },
}));

const { data, isFetched, isLoading } = useGetPersonalDetails(
  reactive({
    isFirstPerson: 1,
  })
);
watch(
  [data, isFetched, isLoading],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData?.firstName) {
      formValue.mobileNumber = newData.mobileNumber;
      formValue.email = newData.email;
    }
  },
  { immediate: true }
);

const v$ = useVuelidate(validations, formValue);
const { toggelModel } = useModelStore();
const { mutate } = useSaveDraft();

const toast = useToast();
const route = useRoute();
const handleSaveDraft = () => {
  mutate({
    email: formValue.email,
    phoneNumber: formValue.mobileNumber,
    draftStepUrl: route.path,
  });
  toggelModel();
};
</script>

<style scoped></style>
