<template>
  <form @submit.prevent="handleNextClick">
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <CustomInput
        className="tw-h-12 md:tw-h-28"
        name=""
        :min="0"
        :max="100"
        :v="v$.years"
        placeholder="Years"
        type="number"
        v-model.number="v$.years.$model"
      />
      <CustomInput
        className="tw-h-12 md:tw-h-28"
        name=""
        :min="0"
        :max="11"
        type="number"
        placeholder="Months"
        v-model.number="v$.months.$model"
        :v="v$.months"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
        @onClick="handleNextClick()"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        :is-disabled="v$.$invalid"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import { idNumber, period, type } from "@/types/routeParams";
import useGetCitizenship from "@/utils/composables/API/citizenship-details/useGetCitizenship";
import useUpdateCitizenship from "@/utils/composables/API/citizenship-details/useUpdateCitizenship";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";
import useVuelidate from "@vuelidate/core";
import { maxValue, minValue, required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../../components/CustomButton.vue";
import CustomInput from "../../../components/form/CustomInput.vue";
import TheFooter from "../../../components/global/TheFooter.vue";
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

const nextNavigation = computed(
  () => route.meta.nextNavigation as RouteRecordName
);

const previousAddress = computed(
  () => route.meta.previousAddress as RouteRecordName
);

const navigateTo = ref<{
  name: RouteRecordName;
  params: {
    idNumber?: idNumber;
    period?: period;
  };
}>({
  name: nextNavigation.value,
  params: { idNumber: idNumber.one },
});
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,
      yearsCurrentAddress: parseInt(formValue.years),
      monthsCurrentAddress: parseInt(formValue.months),
    };
  } else {
    return {
      isFirstPerson: isFirst.value,
      yearsPreviousAddress: parseInt(formValue.years),
      monthsPreviousAddress: parseInt(formValue.months),
    };
  }
});

const { mutate } = useUpdateCitizenship();
const { data: dataPerson } = useGetPersonalDetails(
  reactive({
    isFirstPerson: isFirst.value,
  })
);

const { data, isFetched, isLoading } = useGetCitizenship(
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
        formValue.months = newData.monthsCurrentAddress;
        formValue.years = newData.yearsCurrentAddress;
      } else {
        formValue.months = newData.monthsPreviousAddress;
        formValue.years = newData.yearsPreviousAddress;
      }
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  if (route.params.period === period.current && parseInt(formValue.years) < 3) {
    navigateTo.value.name = previousAddress.value;
    navigateTo.value = {
      name: personalDetails.yourPersonalDetails.currentAddress,
      params: { period: period.previous },
    };
  } else {
    if (
      route.params.type === type.joint &&
      isFirst.value &&
      ["Married", "De Facto"].includes(dataPerson?.value[0]?.maritalStatus)
    ) {
      navigateTo.value.name =
        personalDetails.yourPersonalDetails.person1Partner;
    }
  }
  mutate(postData.value, {
    onSuccess() {
      router.push(navigateTo.value);
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
