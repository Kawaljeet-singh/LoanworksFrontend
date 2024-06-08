<template>
  <div>
    <div class="lg:tw-mb-60">
      <p>Well done!</p>
      <p>
        We have confirmed your {{ sectionName }} details successfully and
        completed this step.
      </p>
      <p v-if="isForSecond">Now for {{ person2 }}!</p>
      <p v-else>{{ p3 }}</p>
    </div>
    <div
      class="tw-mt-9 md:tw-mt-11 tw-flex tw-item tw-justify-center lg:tw-hidden"
    >
      <CustomButton
        title="Next"
        class="tw-w-full tw-h-10 md:tw-h-15 md:tw-max-w-xs"
        :isDisabled="false"
        @onClick="handleNavigation"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :isDisabled="false"
        :navigate-to="true"
        @handle-next-click="handleNavigation"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import { period, person, section, type } from "@/types/routeParams";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import {
  routeEmploymentDetails,
  routeFuturePlans,
  routeVerifyIncomeExpense,
} from "@/utils/route-names/routeName";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";
import { computed } from "vue";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";

const router = useRouter();
const route = useRoute();

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data } = useGetPersonalDetails();
const sectionName = computed(() => {
  switch (route.meta.section) {
    case section.personalDetails:
      return "personal";

    case section.employmentDetails:
      return "employment";

    case section.incomeExpense:
      return "income & expense";

    default:
      return "personal";
  }
});
const p3 = computed(() => {
  switch (route.meta.section) {
    case section.personalDetails:
      if (!isForSecond.value) {
        return "Let's move on to collect your employment details.";
      }
      return "";

    case section.employmentDetails:
      if (!isForSecond.value) {
        return "Let’s move on to verify your income and expenses.";
      }
      return "";

    default:
      return "";
  }
});

const navigateTo = computed(() => {
  switch (route.meta.section) {
    case section.personalDetails:
      if (route.params.type === type.joint) {
        if (route.params.person === person.first) {
          return {
            name: personalDetails.existingCustomer.isExistingCustomer,
            params: { person: person.second },
          };
        } else {
          return {
            name: routeEmploymentDetails.currentEmployment.currentEmployer,
            params: { person: person.first, period: period.current },
          };
        }
      } else {
        return {
          name: routeEmploymentDetails.currentEmployment.currentEmployer,
          params: { person: person.first, period: period.current },
        };
      }

    case section.employmentDetails:
      if (
        route.params.type === type.joint &&
        route.params.person === person.first
      ) {
        return {
          name: routeEmploymentDetails.currentEmployment.currentEmployer,
          params: { person: person.second, period: period.current },
        };
      } else {
        return {
          name: routeFuturePlans.confirmation,
          params: { person: person.first },
        };
      }
    case section.incomeExpense:
      if (
        route.params.type === type.joint &&
        route.params.person === person.first
      ) {
        return {
          name: routeVerifyIncomeExpense.getPreferredMethode,
          params: { person: person.second },
        };
      } else {
        return {
          name: routeVerifyIncomeExpense.review.income,
        };
      }
    default:
      return {
        name: "",
      };
  }
});
const personName = computed(
  () =>
    data?.value?.length &&
    data?.value[route.params.person === person.first ? 0 : 1]?.firstName
);
const person2 = computed(
  () => data?.value?.length && data?.value[1]?.firstName
);
const isForSecond = computed(
  () => route.params.type === type.joint && route.params.person === person.first
);
const handleNavigation = () => {
  router.push(navigateTo.value as RouteLocationRaw);
};
</script>

<style scoped></style>
