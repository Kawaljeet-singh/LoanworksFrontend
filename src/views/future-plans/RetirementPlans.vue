<template>
  <div class="tw-min-h-[403px]">
    <h3 class="tw-text-left tw-mb-5">
      {{ heading }}
    </h3>
    <p class="tw-text-sm">How will you pay for this loan?</p>
    <div
      class="tw-grid md:tw-grid-cols-2 md:tw-gap-4.5 lg:tw-gap-y-2.5 tw-mt-8 lg:tw-gap-x-4"
    >
      <div v-for="(p, index) in formParas" :key="index">
        <FuturePlaneSingleReason
          :question="p.q"
          description="Please explain how will you pay off you loan after retirement"
          v-model:one-of-expense="formValue.collection[index].oneOfExpense"
          v-model:text="formValue.collection[index].text"
        />
      </div>
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
import { type } from "@/types/routeParams";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import FuturePlaneSingleReason from "../../components/future-plan/FuturePlaneSingleReason.vue";
import TheFooter from "../../components/global/TheFooter.vue";
import { helpers, required, requiredIf } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const formValue = reactive({
  collection: [] as { oneOfExpense: string; text: string }[],
});
const checkAll = () => {
  return formValue.collection.some((c) => c.oneOfExpense);
};

const validations = computed(() => ({
  collection: {
    required,
    $each: helpers.forEach({
      oneOfExpense: { requiredIf: () => checkAll() },
      text: {},
    }),
  },
}));
const v$ = useVuelidate(validations, formValue);

const formParas = [
  { q: "I’ll downsize my home" },
  { q: "I’ll sell an investment property" },
  { q: "I’ll make additional payments before I retire" },
  { q: "I intend to retire after 67" },
  { q: "Something else" },
];
formParas.forEach(() =>
  formValue.collection.push({
    oneOfExpense: "",
    text: "",
  })
);
const { data } = useGetPersonalDetails();

const heading = computed(() => {
  if (route.params.type === type.joint) {
    return `It looks like ${data?.value[0]?.firstName} and/or ${data?.value[1]?.firstName} will reach retirement age before the end of the loan.`;
  } else {
    return `${data?.value[0]?.firstName}, It looks like you will reach retirement age before the end of the loan.`;
  }
});

const router = useRouter();
const route = useRoute();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
