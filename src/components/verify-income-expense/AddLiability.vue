<template>
  <div
    class="tw-border-t tw-pt-4 tw-border-secondary-50 md:tw-border-none md:tw-pt-0"
  >
    <p>Do you have any other loans or credit cards?</p>
    <q-expansion-item
      v-model="expanded"
      expand-icon="none"
      icon="perm_identity"
      label="Account settings"
      caption="John Doe"
      class="tw-bg-white"
      header-class="qb-shadow-secondary  tw-py-4 tw-border-y tw-w-full tw-bg-white"
    >
      <template v-slot:header>
        <div class="tw-flex tw-items-center tw-w-max tw-cursor-pointer">
          <img src="/assets/plus.svg" class="tw-w-5 tw-mx-2" /> Add another
          liability
        </div>
      </template>
      <div class="tw-grid tw-p-6">
        <CustomSelect
          v-model.lazy="v$.liability.$model"
          :options="loanTypes"
          name="Type of Liability "
          placeholder="Select Liability"
          className="!tw-text-left !tw-h-11  !tw-py-0"
        />
        <CustomInput
          v-model.number="v$.lenderName.$model"
          name="Lenders Name"
          placeholder="Select your lender"
          :v="v$.lenderName"
          className="!tw-text-left !tw-h-11  !tw-py-0"
        />
        <CustomInput
          placeholder=""
          v-model.number="v$.loanBalance.$model"
          type="number"
          className="!tw-text-left !tw-h-11  !tw-py-0"
          icon="fa-dollar-sign"
          :v="v$.loanBalance"
          name="Current Loan Balance"
        />

        <CustomInput
          placeholder=""
          v-model.number="v$.creditLimit.$model"
          type="number"
          className="!tw-text-left !tw-h-11  !tw-py-0"
          icon="fa-dollar-sign"
          :v="v$.creditLimit"
          name="Credit Limit"
        />
        <CustomInput
          placeholder=""
          v-model.number="v$.interestRate.$model"
          type="number"
          className="!tw-text-left !tw-h-11  !tw-py-0"
          :v="v$.interestRate"
          name="Interest Rate"
        />

        <!-- <CustomInput
          v-model.number="v$.responsible.$model"
          :v="v$.responsible"
          name="Who is Responsible?"
          placeholder=""
          className="!tw-text-left !tw-h-11  !tw-py-0"
        /> -->

        <div class="tw-grid tw-grid-cols-2 tw-gap-3">
          <CustomButton
            title="Cancel"
            :isDisabled="false"
            className=" tw-bg-qb-black-secondary-2 tw-h-12.5 "
            class="tw-py-6"
            @click="toggelExpanded"
          />
          <CustomButton
            title="Add Liability"
            :isDisabled="false"
            className=" tw-h-12.5 "
            class="tw-py-6"
            @click="toggelExpanded"
          />
        </div>
      </div>
    </q-expansion-item>
  </div>

  <div></div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import CustomButton from "../CustomButton.vue";
import CustomInput from "../form/CustomInput.vue";
import CustomSelect from "../form/CustomSelect.vue";
const expanded = ref(false);

const formValue = reactive({
  liability: "",
  lenderName: "",
  loanBalance: "",
  creditLimit: "",
  interestRate: "",
  responsible: "",
});

const loanTypes = ["Credit Card", "Home Loan"];

const validations = {
  liability: {
    required: helpers.withMessage("Liability is required", required),
  },
  lenderName: {
    required: helpers.withMessage("Lender Name is required", required),
  },
  loanBalance: {
    required,
  },
  creditLimit: {
    required,
  },
  interestRate: {
    required,
  },
  responsible: {
    required,
  },
};
const toggelExpanded = () => {
  expanded.value = !expanded.value;
};

const v$ = useVuelidate(validations, formValue);
const text = ref();
</script>

<style scoped></style>
