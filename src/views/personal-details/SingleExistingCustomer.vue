<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
    <!-- <h3 class="tw-text-left tw-mb-5">{User}, are you an existing customer?</h3> -->

    <RadioButtons
      v-model="formValue.isYes"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
        @onClick="handleNextClick"
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const formValue = reactive({
  isYes: "",
});

const options = ["Yes", "No"];

const router = useRouter();
const route = useRoute();
const navigateTo = ref({ name: "" });

const validations = computed(() => ({
  isYes: { required },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  const { yes, no } = route.meta.nextNavigation as { yes: string; no: string };
  return {
    yes,
    no,
  };
});

const handleNextClick = () => {
  if (formValue.isYes == "Yes") {
    navigateTo.value = {
      name: nextNavigation.value.yes,
    };
  } else {
    navigateTo.value = {
      name: nextNavigation.value.no,
    };
  }
  router.push(navigateTo.value);
};
</script>

<style scoped></style>
