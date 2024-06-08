<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
    <div class="tw-bg-white tw-p-4">
      <p class="tw-text-sm">Please select the vehicle options:</p>
      <div>
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-2.5">
          <template v-for="(v, i) in left" :key="i">
            <div
              class="tw-p-2.5 tw-flex tw-justify-between tw-border-b tw-border-[#c0c0c0] tw-items-center"
            >
              <div class="tw-flex tw-gap-3 tw-items-center">
                <CheckBox
                  class-name="tw-w-6 !tw-h-6"
                  input-container-class-name="tw-my-0  tw-w-max  tw-h-6"
                  type="checkbox"
                  v-model="formValue.year"
                />
                <div>
                  <span class="tw-block tw-text-sm"> {{ v.title }} </span>
                  <span class="tw-text-xs"> {{ v.subDescription }} </span>
                </div>
              </div>
              <div class="">$4,000</div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="false"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import carImg from "/assets/vehicle-loan/car.png";
import { required } from "@vuelidate/validators";
import { computed, ref, watch, type Ref, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "@/components/global/TheFooter.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import CheckBox from "@/components/form/CheckBox.vue";

const left = [
  {
    title: "Airbag Passenger",
    subDescription: "Sub description",
  },
  {
    title: "Anti-lock Braking",
    subDescription: "",
  },
  {
    title: "Alloy Wheels",
    subDescription: "Sub description",
  },
  {
    title: "Central Locking",
    subDescription: "Remote Control Wheels",
  },
  {
    title: "Compact Disc Player",
    subDescription: "Sub description",
  },
  {
    title: "Cruise Control",
    subDescription: "Sub description",
  },
  {
    title: "Heavy Duty Tow Pack",
    subDescription: "Sub description",
  },
  {
    title: "Independent Rear Suspension",
    subDescription: "Sub description",
  },
  {
    title: "Metallic Paint",
    subDescription: "Sub description",
  },
  {
    title: "Power Sunroof",
    subDescription: "Sub description",
  },
];

const formValue = reactive({
  year: false,
  make: "",
  model: "",
  varient: "",
  vehicle: "",
});

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  isYes: { required },
}));

// const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  router.push(nextNavigation.value);
};
</script>

<style></style>
