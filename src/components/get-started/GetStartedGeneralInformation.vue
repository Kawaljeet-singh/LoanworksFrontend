<template>
  <div class="tw-container tw-w-11/12 tw-mx-auto lg:tw-mr-4 lg:tw-w-1/2">
    <div
      v-for="(q, index) in queries"
      :key="index"
      class="tw-border tw-border-primary-engage tw-px-5 lg:tw-px-8 tw-py-4 tw-mb-3.5 lg:tw-mb-9 tw-rounded-md"
    >
      <div>
        <div class="tw-flex tw-w-full tw-my-2 lg:tw-my-3.5 tw-items-center">
          <h4
            class="tw-text-primary tw-w-full tw-font-avenir-medium !tw-text-base tw-font-medium lg:!tw-text-xl"
          >
            {{ q.heading }}
          </h4>
          <div class="tw-justify-self-end">
            <img src="/assets/infoSign.png" alt="" width="15" />
          </div>
        </div>
        <p class="tw-leading-5 tw-text-sm lg:tw-mr-5">{{ q.paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const currentRouteName = router.currentRoute.value.name;
console.log(currentRouteName);
const queries = [
  {
    heading:
      currentRouteName === "PersonalLoan/GetStarted"
        ? "Personal Loan Process"
        : "Credit Card Process",
    paragraph:
      "Vestibulum in consectetur metus. Morbi eget velit malesuada, tempor metus a, tempus eros. Proin consequat tellus mi, ac bibendum nisl egestas eu. Nam vitae rhoncus elit. Maecenas porttitor eleifend odio, eleifend sodales tellus sollicitudin vel. ",
  },
  {
    heading: "Eligibility Information",
    paragraph:
      "Vestibulum in consectetur metus. Morbi eget velit malesuada, tempor metus a, tempus eros. Proin consequat tellus mi, ac bibendum nisl egestas eu. Nam vitae rhoncus elit. Maecenas porttitor eleifend odio, eleifend sodales tellus sollicitudin vel. ",
  },
];
</script>

<style scoped></style>
