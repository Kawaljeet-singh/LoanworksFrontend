<template>
  <div class="tw-grid">
    <div class="tw-bg-gray-white tw-drop-shadow-tertiary tw-rounded-3">
      <CheckBox
        name=""
        label="This is not right"
        input-container-class-name="tw-p-3   "
        label-class-name="!tw-text-xs"
        class="tw-bg-gray-fill"
        placeholder="Enter industry of employment..."
        v-model="formValue.isNotRight"
      />
      <div class="tw-p-4" v-if="formValue.isNotRight">
        <p>Why is this not right?</p>
        <TextAreaInput
          input-class-name="!tw-h-10 tw-text-start tw-align-text-top tw-mb-4.5 "
          v-model="formValue.text"
          type="textArea"
        />
        <p class="tw-mb-1">What should you salary be per month?</p>
        <p class="tw-mb-0">
          Please make the edits above. <br />
          The total will automatically be calculated.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CheckBox from "../../components/form/CheckBox.vue";
import TextAreaInput from "../../components/form/TextAreaInput.vue";
const formValue = ref({
  isNotRight: false,
  text: "",
});

const router = useRouter();
const route = useRoute();
const nextNavigation = computed(() => route.meta.nextNavigation);
const navigateTo = ref({ name: nextNavigation });
</script>

<style scoped></style>
