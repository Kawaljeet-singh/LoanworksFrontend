<template>
  <form @submit.prevent="handleNextClick()">
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <CustomInput
        className="tw-h-12 md:tw-h-28"
        name=""
        :min="0"
        placeholder="Years"
        type="number"
        :v="v$.years"
        v-model.number="v$.years.$model"
      />
      <CustomInput
        className="tw-h-12 md:tw-h-28"
        name=""
        type="number"
        :min="0"
        :max="11"
        placeholder="Months"
        v-model.number="v$.months.$model"
        :v="v$.months"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
        @onClick="handleNextClick()"
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
import CustomInput from "@/components/form/CustomInput.vue";
import { period } from "@/types/routeParams";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import { routeEmploymentDetails } from "@/utils/route-names/routeName";
import useVuelidate from "@vuelidate/core";
import { maxValue, minValue, required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
const formValue = reactive({
  years: "",
  months: "",
});
const route = useRoute();
const router = useRouter();

const validations = computed(() => ({
  years: { required, minValue: minValue(0), maxValue: maxValue(100) },
  months: { required, minValue: minValue(0), maxValue: maxValue(11) },
}));

const v$ = useVuelidate(validations, formValue);
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,

      currentEmpYears: parseInt(formValue.years),
      currentEmpMonths: parseInt(formValue.months),
    };
  } else {
    return {
      isFirstPerson: isFirst.value,

      previousEmpYears: parseInt(formValue.years),
      previousEmpMonths: parseInt(formValue.months),
    };
  }
});

const { data, isFetched, isLoading } = useGetEmploymentDetails(
  reactive({
    isFirstPerson: isFirst.value,
  })
);

watch(
  [data, isFetched, isLoading, isFirst],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData) {
      if (route.params.period === period.current) {
        formValue.months = newData.currentEmpMonths;
        formValue.years = newData.currentEmpYears;
      } else {
        formValue.months = newData.previousEmpMonths;
        formValue.years = newData.previousEmpYears;
      }
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const { mutate } = useUpdateEmploymentDetails();
const nextNavigation = ref<{
  name: string;
  params?: { period?: period };
}>({
  name: routeEmploymentDetails.additionalIncomeDetails
    .doYouRecievePermanentOvertimePay,
});
const handleNextClick = () => {
  if (route.params.period === period.current && parseInt(formValue.years) < 3) {
    nextNavigation.value = {
      name: routeEmploymentDetails.currentEmployment.currentEmployer,
      params: {
        period: period.previous,
      },
    };
  }
  mutate(postData.value, {
    onSuccess() {
      router.push(nextNavigation.value);
    },
  });
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
