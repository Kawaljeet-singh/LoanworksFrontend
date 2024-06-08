<template>
  <div>
    <div
      class="tw-w-full md:tw-max-w-sm tw-p-6 tw-mb-[97px] tw-h tw-relative tw-z-10 tw-bg-primary-engage-light tw-mx-auto tw-rounded-3 tw-shadow-lg"
    >
      <div class="tw-w-full tw-justify-between tw-items-center tw-flex">
        <div>
          <img :src="config" alt="" width="69" srcset="" />

          <!-- <img src="/assets/envelop.svg" alt="" srcset="" /> -->
        </div>
        <h2>Change Product Details</h2>
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
        <p class="!tw-text-base">
          Please change the following information to recalculate your repayment
          amount and rate.
        </p>
        <div class="tw-mt-5">
          <div class="tw-grid tw-grid-cols-2 tw-items-center tw-gap-5">
            <div class="label">Loan amount</div>
            <div>
              <CustomInput
                :min="0"
                placeholder=""
                type="number"
                v-model.number="v$.amount.$model"
                className="!tw-text-left "
                icon="fa-dollar-sign"
                :v="v$.amount"
              />
            </div>
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-items-center tw-gap-5">
            <div class="label">Loan Term</div>
            <div
              class="tw-max-w-xs tw-flex tw-items-center md:tw-h-26 tw-gap-5 tw-justify-center"
            >
              <NumberInputCounter
                v-model="formValue.noOfYears"
                placeholder="5"
                className="!tw-text-left tw-my-0  "
                input-container-class-name=" tw-w-28 "
              />
              <span class="tw-text-primary-500"> Years</span>
            </div>
          </div>
          <label class="tw-mt-5 label">Repayment Frequency</label>
          <RadioButtons
            v-model="v$.frequency.$model"
            :options="options"
            className="tw-h-16 "
            containerClasses=" !tw-grid-cols-3 lg:tw-gap-1"
          />
        </div>
        <div class="tw-mt-9 tw-flex tw-item tw-justify-center tw-mb-16">
          <CustomButton
            title="Update Loan"
            @onClick="handleSaveDraft()"
            :is-disabled="v$.$invalid"
            class="tw-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModelStore from "@/stores/useModalStore";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import {
  minLength,
  required,
  email,
  helpers,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import { reactive, onMounted } from "vue";
import CustomButton from "../CustomButton.vue";
import CustomInput from "../form/CustomInput.vue";
import config from "/assets/config.png";
import RadioButtons from "../form/RadioButtons.vue";
import NumberInputCounter from "../form/NumberInputCounter.vue";
const formValue = reactive({
  amount: "",
  frequency: "",
  noOfYears: 5,
});
const options = ["Weekly", "Fortnightly", "Monthly"];

const validations = computed(() => ({
  frequency: { required },
  noOfYears: { required, minValue: minValue(1), maxValue: maxValue(100) },
  amount: {
    required,
    minValue: minValue(1),
  },
}));

const v$ = useVuelidate(validations, formValue);
const { toggelModel } = useModelStore();

const handleSaveDraft = () => {
  toggelModel();
};
</script>

<style scoped>
.label {
  @apply tw-text-primary-500 tw-text-lg;
}
</style>
