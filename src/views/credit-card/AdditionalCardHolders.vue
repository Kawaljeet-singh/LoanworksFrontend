<template>
  <form @submit.prevent="handleNextClick" class="md:tw-gap-4 lg:tw-mb-20">
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
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const formValue = ref({
  isYes: "" as typeof options[number],
});

const options = ["No", "Yes"];

const router = useRouter();

const validations = computed(() => ({
  isYes: { required },
}));

const v$ = useVuelidate(validations, formValue);
const navigateTo = ref({ name: "WhoRAdditionalCardHolders" });

const handleNextClick = () => {
  switch (formValue.value.isYes) {
    case "Yes":
      navigateTo.value = { name: "WhoRAdditionalCardHolders" };

      break;
    case "No":
      navigateTo.value = { name: "SingleOrJointApplication" };

      break;

    default:
      navigateTo.value = { name: "" };

      break;
  }
  router.push(navigateTo.value);
};
</script>

<style scoped></style>
