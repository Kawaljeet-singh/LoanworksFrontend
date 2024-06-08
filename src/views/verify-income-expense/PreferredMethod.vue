<template>
  <div>
    <div class="lg:tw-mb-36">
      <p v-if="subHeading">{{ subHeading }}</p>
      <RadioButtons
        v-model="formValue.isYes"
        :options="options"
        containerClasses="tw-gap-3  md:tw-gap-4.5 md:tw-mb-8.5 "
        className=" tw-h-19.5 md:tw-h-32 "
      />

      <p class="tw-text-10px">* Bank statements must be original PDF only.</p>
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full md:tw-max-w-xs"
        className="tw-h-12.5 md:tw-h-15"
        :is-disabled="v$.$invalid"
        @on-click="handleNextClick"
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
import router from "@/router";
import { person, type } from "@/types/routeParams";
import useGetIncomeDetails from "@/utils/composables/API/income-details/useGetIncomeDetails";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { routeVerifyIncomeExpense } from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import RadioButtons from "../../components/form/RadioButtons.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const formValue = reactive({
  isYes: "",
});

const options = ["Connect to Banks", "Upload Bank Statements"];

const validations = computed(() => ({
  isYes: { required },
}));

const v$ = useVuelidate(validations, formValue);
const route = useRoute();

const { data } = useGetPersonalDetails();

const subHeading = computed(() => {
  if (route.params.type === type.single) return "";

  if (route.params.person === person.first) {
    return `We will start with ${data?.value[0]?.firstName} then ${data?.value[1]?.firstName}.`;
  } else return `Now for ${data?.value[1]?.firstName}.`;
});

const isForSecond = computed(
  () => route.params.type === type.joint && route.params.person === person.first
);
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data: incomeData } = useGetIncomeDetails(
  reactive(reactive({ isFirstPerson: isFirst.value }))
);

const nextNavigation = computed(() => {
  if (
    route.params.type === type.joint &&
    route.params.person === person.first
  ) {
    return {
      name: routeVerifyIncomeExpense.getIncomeExpenseSecondPerson,
      params: {
        person: person.first,
      },
    };
  }
  return {
    name: routeVerifyIncomeExpense.review.income,
  };
});
const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
