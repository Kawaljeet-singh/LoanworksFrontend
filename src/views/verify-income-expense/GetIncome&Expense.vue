<template>
  <div>
    <div>
      <p>
        We will securely connect to your financial institutions to get your
        income, expenses and liabilities or to allow you to upload your bank
        statements.
      </p>
      <p>
        Please provide the following information to assist us in identifying
        your salary.
      </p>
    </div>
    <div class="tw-flex tw-flex-col">
      <div
        class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-mb-2.5"
      >
        <img
          src="/assets/verify-income-expense/docsReport.svg"
          class="tw-w-16 md:tw-w-8 tw-mr-2.5 tw-my-5 md:tw-my-0 tw-place-self-center md:tw-place-self-start"
          alt=""
        />
        <p class="tw-mb-0">
          Bank statement description used for your salary payments.
        </p>
      </div>
      <div class="">
        <CustomInput
          name=""
          className="tw-text-start tw-h-12.5 "
          input-container-class-name="tw-mb-8 md:tw-mb-9 lg:tw-mb-7"
          placeholder="Enter description..."
          v-model="v$.description.$model"
          :v="v$.description"
        />
      </div>
    </div>
    <div>
      <p>How frequently do you get paid?</p>
      <div>
        <RadioButtons
          v-model="v$.frequency.$model"
          :options="options"
          className="tw-h-12.5 md:tw-h-31"
          containerClasses="tw-grid-cols-1 tw-gap-5  md:tw-grid-cols-3"
        />
      </div>
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full md:tw-max-w-xs"
        className="tw-h-12.5 md:tw-h-15"
        :is-disabled="v$.$invalid"
        @click="handleNextClick"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButtonVue from "@/components/CustomButton.vue";
import useGetIncomeDetails from "@/utils/composables/API/income-details/useGetIncomeDetails";
import useUpdateIncomeDetails from "@/utils/composables/API/income-details/useUpdateIncomeDetails";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomInput from "../../components/form/CustomInput.vue";
import RadioButtons from "../../components/form/RadioButtons.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const formValue = reactive({
  frequency: "",
  description: "",
});

const options = ["Monthly", "Fornightly", "Weekly"];

const validations = computed(() => ({
  frequency: { required },
  description: { required, minLength: minLength(10) },
}));
const v$ = useVuelidate(validations, formValue);
const route = useRoute();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const router = useRouter();
const { mutate } = useUpdateIncomeDetails();

const { data } = useGetIncomeDetails(reactive({ isFirstPerson: 1 }));

watch(
  [data],
  ([newVal]) => {
    if (newVal?.length) {
      const d = newVal[0];

      formValue.description = d.bankSalaryDescription;
      formValue.frequency = d.paidFrequency;
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  mutate(
    {
      bankSalaryDescription: formValue.description,
      paidFrequency: formValue.frequency,
      isFirstPerson: 1,
    },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
