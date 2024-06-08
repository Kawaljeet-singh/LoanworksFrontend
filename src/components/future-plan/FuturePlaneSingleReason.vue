<template>
  <div class="tw-mb-3 tw-bg-white tw-drop-shadow-tertiary tw-rounded-3">
    <CheckBox
      name=""
      :label="question"
      input-container-class-name="tw-p-4   "
      class="tw-drop-shadow-tertiary tw-bg-white"
      placeholder="Enter industry of employment..."
      v-model="v$.oneOfExpense.$model"
    />
    <div class="tw-p-4" v-show="formValue.oneOfExpense">
      <p>
        {{
          description ||
          "Please describe the expected changed and how you intend to meet your repayments:"
        }}
      </p>
      <TextAreaInput
        input-class-name="!tw-h-22.5 tw-text-start tw-align-text-top  "
        v-model="v$.text.$model"
        :v="v$.text"
        type="textArea"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import CheckBox from "../../components/form/CheckBox.vue";
import TextAreaInput from "../../components/form/TextAreaInput.vue";
import { helpers, requiredIf } from "@vuelidate/validators";
import useVuelidate, { type ErrorObject } from "@vuelidate/core";
type Props = {
  question: string;
  description?: string;

  oneOfExpense: string;
  text: string;
  v?: { $error: boolean; $errors: ErrorObject[] };
};

defineProps<Props>();

const formValue = reactive({
  oneOfExpense: "",
  text: "",
});
const emit = defineEmits(["update:oneOfExpense", "update:text"]);

watch(
  () => formValue.oneOfExpense,
  () => {
    emit("update:oneOfExpense", formValue.oneOfExpense);
  }
);

watch(
  () => formValue.text,
  () => {
    emit("update:text", formValue.text);
  }
);

const validations = computed(() => ({
  oneOfExpense: {},
  text: { requiredIf: requiredIf(formValue.oneOfExpense) },
}));

const v$ = useVuelidate(validations, formValue);
</script>

<style scoped></style>
