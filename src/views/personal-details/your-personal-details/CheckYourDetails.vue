<template>
  <form @submit.prevent="handleNextClick()">
    <div>
      <div>
        <p>Title</p>
        <RadioButtons
          v-model="v$.title.$model"
          :options="options.title"
          containerClasses="tw-grid-cols-6  "
          className="tw-h-14 "
        />
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-5 md:tw-gap-6">
        <CustomInput
          v-model.trim="v$.firstName.$model"
          :v="v$.firstName"
          name="First Name"
          placeholder="First Name"
          className="!tw-text-left"
        />
        <CustomInput
          :v="v$.mname"
          v-model.trim="v$.mname.$model"
          name="Middle Name"
          placeholder="Enter your Middle Name"
          className="!tw-text-left"
        />

        <CustomInput
          v-model.trim="v$.lname.$model"
          :v="v$.lname"
          name="Last Name"
          placeholder="Last Name"
          className="!tw-text-left"
        />
        <DatePicker
          v-model="v$.dob.$model"
          name="Date of Birth"
          placeholder="DD / MM / YYYY "
          type="date"
          :v="v$.dob"
          :allow-past-date="true"
        />
      </div>
      <div>
        <p>Gender</p>
        <RadioButtons
          v-model="v$.gender.$model"
          :options="options.gender"
          containerClasses="!tw-grid-cols-3 md:!tw-grid-cols-6  "
          className="tw-h-14 !tw-rounded-3 tw-px-4 "
        />
      </div>
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
        @onClick="handleNextClick()"
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
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useMutatePersonalDetails from "@/utils/composables/API/personal-details/useMutatePersonalDetails";
import {
  convertDateToStringForForm,
  ddmmyyyyToISOString,
} from "@/utils/helpers/convertDate";
import { isAdult } from "@/utils/validations";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const { mutate } = useMutatePersonalDetails();
const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const isFetch = computed(() => Number(route.params.fetch) as 0 | 1);
console.log(isFetch.value, "route meta");
const { data, isFetched, isLoading } = useGetPersonalDetails({
  isFirstPerson: isFirst.value,
});
const formValue = reactive({
  title: "",
  firstName: "",
  mname: "",
  lname: "",
  dob: "",
  gender: "",
});

const personX = computed(() => route.meta.personX);

const validations = computed(() => ({
  title: { required },
  firstName: { required },
  mname: {},
  lname: { required },
  dob: {
    required,
    isAdult: helpers.withMessage("Person must be 18 or above", isAdult),
  },
  gender: { required },
}));
const toast = useToast();
const v$ = useVuelidate(validations, formValue);

const options = {
  title: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Sir"],
  gender: ["Male", "Female", "Prefer Not To Disclose"],
};

const navigateTo = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});
const applicant = computed(() => Number(route.params.applicant));

watch(
  [data, isFetched, isLoading, applicant],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData.firstName && isFetch.value === 1) {
      formValue.title = newData.title;
      formValue.firstName = newData.firstName;
      formValue.lname = newData.lastName;
      formValue.mname = newData.middleName;
      formValue.gender = newData.gender;
      formValue.dob = convertDateToStringForForm(newData.dob);
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const postData = computed(() => {
  return {
    userId: 0,
    isFirstPerson: Number(route.params.person),
    draftApplicationStep: "string",
    title: formValue.title,
    firstName: formValue.firstName,
    middleName: formValue.mname,
    lastName: formValue.lname,
    dob: ddmmyyyyToISOString(formValue.dob),
    gender: formValue.gender,
  };
});

const handleNextClick = () => {
  mutate(postData.value, {
    onSuccess: () => router.push(navigateTo.value),
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
</script>

<style scoped></style>
