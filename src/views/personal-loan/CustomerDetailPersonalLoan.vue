<template>
  <form @submit.prevent="handleMutate()">
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
    <div
      class="tw-flex tw-items-center tw-my-6 tw-pt-11 tw-border-t tw-border-white"
    >
      <CheckBox
        class-name="tw-w-6 !tw-h-6"
        input-container-class-name="tw-my-0  tw-w-max  tw-h-6"
        type="checkbox"
        v-model="formValue.customerConsent"
      />

      <span class="tw-ml-4"
        >Consent to the collection, use, and disclosure of my personal
        information statement.</span
      >
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        :is-disabled="v$.$invalid"
        class="tw-w-full tw-max-w-xs"
        @onClick="handleMutate()"
        :showArrow="true"
      />
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        button-label="Search for Product"
        @handle-next-click="handleMutate"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import CustomButtonVue from "@/components/CustomButton.vue";
import AddressSelect from "@/components/form/AddressSelect.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import DatePicker from "@/components/form/DatePicker.vue";
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
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const formValue = reactive({
  firstName: "",
  lastName: "",
  dob: "",
  mobileNumber: "",
  email: "",
  customerConsent: "",
  address: "",
});

const validations = computed(() => ({
  firstName: { required, minLength: minLength(3) },

  lastName: { required, minLength: minLength(3) },
  dob: {
    required,
    isAdult: helpers.withMessage("Person must be 18 or above", isAdult),
  },
  mobileNumber: { required, minLength: minLength(10) },
  address: { required },

  email: { required, email },
  customerConsent: { required },
}));

const v$ = useVuelidate(validations, formValue);

const { data, isFetched, isLoading } = useGetPersonalDetails(
  reactive({
    isFirstPerson: 1,
  })
);
watch(
  [data, isFetched, isLoading],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData?.firstName) {
      formValue.mobileNumber = newData.mobileNumber;
      formValue.firstName = newData.firstName;
      formValue.lastName = newData.lastName;
      formValue.email = newData.email;
      formValue.address = newData.address;

      if (newData.dob) formValue.dob = convertDateToStringForForm(newData.dob);
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const router = useRouter();
const route = useRoute();
const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  router.push(nextRoute.value);
};

const { mutate } = useMutatePersonalDetails();

const handleMutate = () => {
  mutate(
    {
      ...formValue,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      isFirstPerson: 1,
      email: formValue.email,
      dob: ddmmyyyyToISOString(formValue.dob),
    },
    {
      onSuccess() {
        handleNextClick();
      },
    }
  );
};
</script>

<style scoped></style>
