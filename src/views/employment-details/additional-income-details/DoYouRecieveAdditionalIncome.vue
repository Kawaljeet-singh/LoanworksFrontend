<template>
  <form @submit.prevent="handleNextClick">
    <RadioButtons
      v-model="formValue.isYes"
      :options="options"
      containerClasses=" tw-py-6 "
      className="tw-h-20 "
    />
    <div
      :class="`tw-border-t  ${
        formValue.isYes === options[1]
          ? 'tw-opacity-100'
          : 'tw-opacity-0 tw-invisible'
      } tw-border-[#797979] tw-py-8 tw-transition-all tw-ease-in-out tw-duration-500`"
    >
      <CustomInputVue
        :name="(inputLabel as string)"
        placeholder="85,000"
        inputContainerClassName="tw-mt-3.5 md:tw-mt-5"
        className="tw-text-start"
        v-model="v$.received.$model"
        :v="v$.received"
        icon="fa-dollar-sign"
      />
    </div>

    <div class="tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
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
  </form>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import useGetIncomeDetails from "@/utils/composables/API/income-details/useGetIncomeDetails";
import useUpdateIncomeDetails from "@/utils/composables/API/income-details/useUpdateIncomeDetails";
import { ADDITIONAL_INCOME } from "@/utils/constants";
import useVuelidate from "@vuelidate/core";
import {
  integer,
  minValue,
  required,
  requiredIf,
  numeric,
} from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";

const formValue = reactive({
  isYes: "",
  received: "",
});

const options = ["No", "Yes"];

const router = useRouter();
const route = useRoute();

const validations = computed(() => ({
  isYes: { required },
  received: {
    integer,
    requiredIf: requiredIf(() => formValue.isYes === "Yes"),
    maxValue: minValue(1),
  },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const inputLabel = computed(() => route.meta.inputLabel as string);
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const postData = computed(() => {
  const page = route.meta.page as string;
  switch (page) {
    case ADDITIONAL_INCOME.OVERTIME_PAY:
      return {
        receivedOvertimePay: formValue.isYes ? Number(formValue.received) : 0,
        overtimePay: formValue.isYes ? 1 : 0,
      };
    case ADDITIONAL_INCOME.COMMISSION:
      return {
        receivedBonus: formValue.isYes ? Number(formValue.received) : 0,
        bonus: formValue.isYes ? 1 : 0,
      };
    case ADDITIONAL_INCOME.GOVERNMENT_ALLOWANCES:
      return {
        receivedGovtAllowance: formValue.isYes ? Number(formValue.received) : 0,
        govtAllowance: formValue.isYes ? 1 : 0,
      };

    default:
      return {};
  }
});

const { data } = useGetIncomeDetails(
  reactive({ isFirstPerson: isFirst.value })
);
const key = computed(() => route.meta.key as string);

watch(
  [data],
  ([newVal]) => {
    if (newVal?.length) {
      const d = newVal[0];

      formValue.received = d[key.value];
      if (Number(formValue.received) > 0) {
        formValue.isYes = options[1];
      } else if (d[key.value] === 0) {
        formValue.isYes = options[0];
      }
    }
  },
  { immediate: true }
);

const { mutate } = useUpdateIncomeDetails();

const handleNextClick = () => {
  mutate(
    { ...postData.value, isFirstPerson: isFirst.value },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
