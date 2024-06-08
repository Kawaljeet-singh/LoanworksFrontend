<template>
  <form @submit.prevent="handleNextClick">
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <div>
      <div class="">
        <RadioButtons
          v-model="formValue.noOfDependents"
          :options="dependents"
          containerClasses="tw-grid-cols-6 tw-gap-3 md:tw-gap-7 lg:tw-gap-10 "
          className="tw-h-14 lg:tw-h-18 "
        />
      </div>
      <div
        v-if="noOfDependents > 0"
        class="tw-border-t tw-my-8 tw-border-[#9496c7] tw-grid md:tw-grid-cols-2 tw-border-collapse"
      >
        <label
          v-for="(no, index) in formValue.dependentsAge"
          :key="index"
          class="tw-grid tw-grid-cols-7 tw-items-center tw-text-primary-500 tw-font-medium tw-justify-items-center tw-gap- tw-mx-auto tw-border-secondary-600 md:tw-border-b odd:md:tw-border-r"
        >
          <div
            class="tw-flex tw-col-span-4 tw-items-center tw-text-primary-500"
          >
            <span
              class="tw-w-max tw-cursor-pointer tw-mr-2"
              @click="removeDependent(index)"
            >
              <img src="/assets/minus.svg" class="tw-w-5 tw-mx-2" alt="" />
            </span>
            {{ toOrdinalSuffix(index + 1) }} dependent's age
          </div>
          <NumberInputCounter
            :v="
              //@ts-ignore
              v$.dependentsAge.$each.$response.$errors[index].age
            "
            v-model.number="no.age"
            placeholder="5"
            class="tw-col-span-2"
          />

          <span class="tw-text-primary-500"> Years</span>
        </label>
        <div
          v-if="noOfDependents >= 5"
          class="tw-grid tw-grid-cols-2 tw-justify-items-center tw-font-medium tw-w-full tw-mx-auto tw-py-4 tw-my-4 tw-border-y tw-border-white md:tw-border-none"
        >
          <div
            class="tw-flex tw-text-primary-500 tw-w-max tw-cursor-pointer"
            @click="addDependent"
          >
            <img src="/assets/plus.svg" class="tw-w-5 tw-mr-2" />
            Add Dependent
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="v$.$invalid"
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
  </form>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import NumberInputCounter from "@/components/form/NumberInputCounter.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import { idNumber } from "@/types/routeParams";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useUpdateDependents from "@/utils/composables/API/personal-details/useUpdateDependents";
import toOrdinalSuffix from "@/utils/helpers/toOrdinalSuffix";
import { routePersonalDetails } from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  maxValue,
  minValue,
  numeric,
  required,
} from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const formValue = reactive({
  noOfDependents: "",
  dependentsAge: [] as { age: number }[],
});

const dependents = ["0", "1", "2", "3", "4", "5+"];

const validations = computed(() => ({
  noOfDependents: { required },
  dependentsAge: {
    $each: helpers.forEach({
      age: {
        required,
        numeric,
        minValue: helpers.withMessage("Invalid Age", minValue(1)),
        maxValue: helpers.withMessage("Invalid Age", maxValue(100)),
      },
    }),
  },
}));

const v$ = useVuelidate(validations, formValue);
const noOfDependents = computed((): number => {
  return parseInt(formValue.noOfDependents);
});

function addDependent() {
  formValue.dependentsAge.push({ age: null });
}
function removeDependent(index: number) {
  formValue.dependentsAge.splice(index, 1);
}

const router = useRouter();

const navigateTo = ref({
  name: routePersonalDetails.verifyYourIdentity.chooseIdType,
  params: { idNumber: idNumber.one },
});

const { data, isFetching } = useGetPersonalDetails({ isFirstPerson: 0 }, true);

const heading = computed(
  () =>
    `How many dependents does  ${data?.value?.firstName || "2nd Person"} have?`
);

watch(
  [data],
  ([d]) => {
    if (!d) return;
    const newData = d;
    if (newData?.firstName) {
      const { ages } = newData;
      if (ages?.length)
        formValue.dependentsAge = ages.map((a: { age: number }) => a);
      else {
        formValue.noOfDependents = dependents[0];
      }
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);
watch(
  () => formValue.noOfDependents,
  (newVal: string, oldValue: string) => {
    const newValI = parseInt(newVal) || 0;
    const oldValueI = parseInt(oldValue) || 0;
    if (newValI === formValue.dependentsAge.length || newValI > 5) return;

    if (newVal > oldValue) {
      for (let i = 1; i <= newValI - oldValueI; i++) addDependent();
    } else {
      while (formValue.dependentsAge.length > newValI) {
        formValue.dependentsAge.pop();
      }
    }
  },
  { immediate: true }
);

watch(
  () => formValue.dependentsAge.length,
  (newVal) => {
    if (newVal < 5) {
      formValue.noOfDependents = dependents[newVal];
    }
  }
);

const { mutate } = useUpdateDependents();

const handleNextClick = () => {
  mutate(
    {
      isFirstPerson: 0,
      ages: formValue.dependentsAge,
      // firstPersonAgeOfDependents: dependentsAge.value,
    },
    {
      onSuccess() {
        router.push(navigateTo.value);
      },
    }
  );
};
</script>

<style scoped></style>
