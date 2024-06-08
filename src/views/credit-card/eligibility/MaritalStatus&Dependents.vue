<template>
  <form @submit.prevent="handleNextClick">
    <div>
      <RadioButtons
        v-model="v$.maritalStatus.$model"
        :options="maritalStatusOptions"
        className="tw-h-24 md:tw-h-26"
        containerClasses="lg:tw-grid-cols-3"
      />
      <div class="md:tw-grid md:tw-grid-cols-2">
        <h3 class="tw-text-primary tw-text-lg tw-flex tw-items-center">
          Do you have any dependents?
        </h3>
        <RadioButtons
          v-model="formValue.noOfDependentsOption"
          :options="dependents"
          containerClasses="tw-grid-cols-6  "
          className="tw-h-14 "
        />
      </div>
      <div
        v-if="noOfDependents > 0 && v$.dependentsAge"
        class="tw-border-t tw-my-8 tw-border-[#9496c7] tw-grid md:tw-grid-cols-2 tw-border-collapse"
      >
        <label
          v-for="(no, index) in formValue.dependentsAge"
          :key="index"
          class="tw-grid tw-grid-cols-7 tw-items-center tw-text-primary tw-font-medium tw-justify-items-center tw-gap- tw-mx-auto tw-border-secondary-600 md:tw-border-b odd:md:tw-border-r"
        >
          <div class="tw-flex tw-col-span-4 tw-items-center tw-text-primary">
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

          <span class="tw-text-primary"> Years</span>
        </label>
        <div
          v-if="noOfDependents >= 5"
          class="tw-grid tw-grid-cols-2 tw-justify-items-center tw-items-center tw-font-medium tw-w-full tw-mx-auto tw-py-4 tw-my-4 tw-border-y tw-border-white md:tw-border-none"
        >
          <div
            class="tw-flex tw-text-primary tw-w-max tw-cursor-pointer"
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
        :is-disabled="v$.$invalid"
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
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useUpdateDependents from "@/utils/composables/API/personal-details/useUpdateDependents";
import { maritalStatusOptions } from "@/utils/constants";
import toOrdinalSuffix from "@/utils/helpers/toOrdinalSuffix";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  maxValue,
  minValue,
  numeric,
  required,
} from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";

const { data, isLoading } = useGetPersonalDetails({ isFirstPerson: 1 }, true);

const formValue = reactive({
  maritalStatus: data.value?.maritalStatus,
  noOfDependentsOption: "",
  dependentsAge: [] as { age: number }[],
});

const validations = computed(() => ({
  maritalStatus: {
    required,
  },
  noOfDependentsOption: { required },
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

const dependents = ["0", "1", "2", "3", "4", "5+"];

const noOfDependents = computed((): number => {
  return formValue.dependentsAge.length;
});
const dependentsAge = computed((): string => {
  const sim = formValue.dependentsAge.map((a) => a.age);
  console.log(sim);
  return sim.toString();
});

function addDependent() {
  formValue.dependentsAge.push({ age: null });
}
function removeDependent(index: number) {
  formValue.dependentsAge.splice(index, 1);
}

watch(
  [isLoading, data],
  ([val]) => {
    if (!val) {
      if (!data?.value) return;

      const { maritalStatus, ages } = data.value;

      if (maritalStatus) formValue.maritalStatus = maritalStatus;
      if (ages?.length)
        formValue.dependentsAge = ages.map((a: { age: number }) => a);
      else {
        formValue.noOfDependentsOption = dependents[0];
      }
    }
  },
  { immediate: true }
);

watch(
  () => formValue.noOfDependentsOption,
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
      formValue.noOfDependentsOption = dependents[newVal];
    }
  }
);

const route = useRoute();
const router = useRouter();
const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
  params: route.params,
}));

const loanType = computed(() => route.meta.loanType);

const { mutate } = useUpdateDependents();

const handleNextClick = () => {
  if (data.value) {
    const {
      firstPersonMaritalStatus,
      firstPersonNumberOfDependents,
      firstPersonAgeOfDependents,
    } = data.value;
    if (
      formValue.maritalStatus.value === firstPersonMaritalStatus &&
      noOfDependents.value === firstPersonNumberOfDependents &&
      dependentsAge.value === firstPersonAgeOfDependents
    ) {
      router.push(nextRoute.value);
      return;
    }
  }

  mutate(
    {
      maritalStatus: formValue.maritalStatus,
      isFirstPerson: 1,
      ages: formValue.dependentsAge,
      // firstPersonAgeOfDependents: dependentsAge.value,
    },
    {
      onSuccess() {
        router.push(nextRoute.value);
      },
    }
  );
};
</script>

<style scoped></style>
