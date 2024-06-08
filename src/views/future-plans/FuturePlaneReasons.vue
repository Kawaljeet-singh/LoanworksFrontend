<template>
  <div class="tw-min-h-[403px]">
    <div
      class="tw-grid md:tw-grid-cols-2 md:tw-gap-4.5 lg:tw-gap-y-2.5 tw-mt-8 lg:tw-gap-x-4"
    >
      <div v-for="(p, index) in formParas" :key="index">
        <FuturePlaneSingleReason
          :question="p.q"
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
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  minLength,
  minValue,
  required,
  requiredIf,
} from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import FuturePlaneSingleReason from "../../components/future-plan/FuturePlaneSingleReason.vue";
import TheFooter from "../../components/global/TheFooter.vue";
const formValue = reactive({
  collection: [] as { oneOfExpense: string; text: string }[],
});
const checkAll = () => {
  return formValue.collection.some((c) => c.oneOfExpense);
};

const validations = computed(() => ({
  collection: {
    required,
    minLength: minLength(1),
    $each: helpers.forEach({
      oneOfExpense: { requiredIf: () => checkAll() },
      text: {},
    }),
  },
}));

const v$ = useVuelidate(validations, formValue);

const formParas = [
  { q: "Large one off expense" },
  { q: "Permanent decrease in income" },
  { q: "Permanent increase in expenses" },
  { q: "Temporary decrease in income" },
  { q: "Temporary increase in expenses" },
  { q: "Something else" },
];
formParas.forEach(() =>
  formValue.collection.push({
    oneOfExpense: "",
    text: "",
  })
);
const router = useRouter();
const route = useRoute();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
