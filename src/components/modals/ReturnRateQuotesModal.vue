<template>
  <div>
    <div class="modal">
      <div class="header">
        <div class="tw-text-xl">
          Please enter your email address or mobile phone number to retrieve
          your saved rate quote
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

      <div class="tw-mt-15">
        <div class="tw-mt-5">
          <CustomInput
            v-model="v$.email.$model"
            :v="v$.email"
            name="Email Address"
            class="tw-mb-1 tw-mt-5"
            className="!tw-text-left"
            placeholder="john.doe@email.com"
          />
          <div class="tw-my-4 flex tw-items-center">
            <div class="tw-bg-primary-500 tw-h-px tw-flex-grow" />
            <label class="tw-mx-1"> OR</label>
            <div class="tw-bg-primary-500 tw-h-px tw-flex-grow" />
          </div>

          <CustomInput
            v-model="v$.mobile.$model"
            :v="v$.mobile"
            name="Mobile Phone"
            class="tw-mb-1"
            className="!tw-text-left"
            placeholder="Enter Mobile Phone"
          />
        </div>
        <div class="tw-mt-9 tw-flex tw-item tw-justify-center tw-mb-16">
          <CustomButton
            title="Next"
            @onClick="handleNextClick()"
            :is-disabled="v$.$invalid"
            class="tw-w-full"
            show-arrow
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModelStore from "@/stores/useModalStore";
import useVuelidate from "@vuelidate/core";
import { email, minLength, requiredIf } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import CustomButton from "../CustomButton.vue";
import CustomInput from "../form/CustomInput.vue";
const { OpenModal } = useModelStore();

const formValue = reactive({
  mobile: "",
  email: "",
});
const validations = computed(() => ({
  mobile: {
    requiredIf: requiredIf(() => !formValue.email),
    minLength: minLength(10),
  },
  email: { requiredIf: requiredIf(() => !formValue.mobile), email },
}));

const v$ = useVuelidate(validations, formValue);
const { toggelModel } = useModelStore();
const handleNextClick = () => {
  toggelModel();
  OpenModal("VerifyOTPModal");
};
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
