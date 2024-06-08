<template>
  <form @submit.prevent="handleNextClick">
    <div class="tw-grid tw-gap-5 md:tw-grid-cols-2 md:tw-gap-2">
      <CustomInputVue
        v-model.trim="v$.firstName.$model"
        :v="v$.firstName"
        name="First Name"
        className="!tw-text-left"
        class="tw-mb-1"
        placeholder="Enter your first name"
      />
      <CustomInputVue
        v-model.trim="v$.middleName.$model"
        :v="v$.middleName"
        name="Middle Name"
        class="tw-mb-1"
        className="!tw-text-left"
        placeholder="Enter your middle name"
      />
      <CustomInputVue
        v-model.trim="v$.lastName.$model"
        :v="v$.lastName"
        name="Last Name"
        className="!tw-text-left"
        class="tw-mb-1"
        placeholder="Enter your last name"
      />
      <DatePicker
        name="Date of Birth"
        v-model.trim="v$.dob.$model"
        :v="v$.dob"
        placeholder="DD / MM / YYYY"
        :allow-past-date="true"
      />

      <CustomInputVue
        v-model.trim="v$.email.$model"
        :v="v$.email"
        name="Email"
        class="tw-mb-1"
        className="!tw-text-left"
        placeholder="Enter your email"
        type="email"
      />
      <CustomInputVue
        v-model="v$.mobileNumber.$model"
        :v="v$.mobileNumber"
        type="number"
        className="!tw-text-left"
        class="tw-mb-1"
        name="Mobile Number"
        placeholder="Enter your mobile number"
      />
      <AddressSelect
        v-model="v$.address.$model"
        :v="v$.address"
        name="Current Address"
        placeholder="Enter your address"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        :is-disabled="v$.$invalid"
        class="tw-w-full tw-max-w-xs"
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
import CustomButtonVue from "@/components/CustomButton.vue";
import AddressSelect from "@/components/form/AddressSelect.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useMutatePersonalDetails from "@/utils/composables/API/personal-details/useMutatePersonalDetails";
import {
  convertDateToStringForForm,
  ddmmyyyyToISOString,
} from "@/utils/helpers/convertDate";
import routeNames from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import DatePicker from "../../../components/form/DatePicker.vue";
import TheFooter from "../../../components/global/TheFooter.vue";
import { isAdult } from "@/utils/validations";
const { data, isSuccess } = useGetPersonalDetails({ isFirstPerson: 1 });

const formValue = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  mobileNumber: "",
  address: "",
  email: "",
});

const validations = computed(() => ({
  firstName: { required, minLength: minLength(3) },
  middleName: { minLength: minLength(3) },
  lastName: { required, minLength: minLength(3) },
  dob: {
    required,
    isAdult: helpers.withMessage("Person must be 18 or above", isAdult),
  },
  mobileNumber: { required, minLength: minLength(10) },
  address: { required },
  email: { required, email },
}));

const v$ = useVuelidate(validations, formValue);

watch(
  data,
  () => {
    if (isSuccess && data?.value?.length) {
      const {
        address,
        dob,
        email,
        firstName,
        lastName,
        middleName,
        mobileNumber,
      } = data.value[0];

      if (firstName) {
        formValue.firstName = firstName;
      }
      if (lastName) {
        formValue.lastName = lastName;
      }
      if (middleName) {
        formValue.middleName = middleName;
      }
      if (address) {
        formValue.address = address;
      }
      if (email) {
        formValue.email = email;
      }
      if (mobileNumber) formValue.mobileNumber = mobileNumber;

      if (dob) formValue.dob = convertDateToStringForForm(dob);
    }
  },
  { immediate: true }
);

const router = useRouter();
const nextRoute = computed(() => {
  return {
    name: routeNames.creditCard.searching,
  };
});

const { mutate } = useMutatePersonalDetails();

const handleNextClick = () => {
  mutate(
    {
      ...formValue,
      dob: ddmmyyyyToISOString(formValue.dob),
      isFirstPerson: 1,
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
