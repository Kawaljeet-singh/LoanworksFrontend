<template>
  <div>
    <h4
      class="tw-text-left tw-font-avenir-medium tw-mb-7 tw-mt-4.5 lg:tw-mt-1 tw-text-lg tw-text-primary"
    >
      Verify Your Identity - Drivers License
    </h4>

    <!-- <p class="tw-text-sm tw-leading-6">
      Please confirm the identity of {{ personX }} <br />
      Fill in the required fields:
    </p> -->
    <div class="tw-grid tw-grid-cols-2 tw-gap-5 lg:tw-grid-cols-3">
      <CustomInput
        v-model.trim="v$.fname.$model"
        :v="v$.fname"
        name="First Name"
        className="!tw-text-left"
        placeholder="Enter your first name"
      />

      <CustomInput
        v-model.trim="v$.mname.$model"
        :v="v$.mname"
        name="Middle Name"
        className="!tw-text-left"
        placeholder="Enter your middle name"
      />
      <CustomInput
        v-model.trim="v$.lname.$model"
        :v="v$.lname"
        name="Last Name"
        className="!tw-text-left"
        placeholder="Enter your last name"
      />

      <DatePicker
        v-model.trim="v$.dob.$model"
        :v="v$.dob"
        name="Date of Birth"
        className="!tw-text-left"
        placeholder="DD / MM / YYYY"
        type="date"
        :allow-past-date="true"
      />
      <CustomInput
        v-model.lazy="v$.licenseNumber.$model"
        :v="v$.licenseNumber"
        name="License Number"
        type="number"
        className="!tw-text-left"
        placeholder="Enter your license number"
      />
      <CustomInput
        v-model.lazy="v$.cardNumber.$model"
        :v="v$.cardNumber"
        name="Card Number"
        type="number"
        className="!tw-text-left"
        placeholder="Enter your Card number"
      />
      <CustomSelect
        v-model.lazy="v$.state.$model"
        :options="STATES.map((s) => s.name)"
        name="State "
        placeholder="Select State"
      />
      <DatePicker
        v-model.trim="v$.expiryDate.$model"
        :v="v$.expiryDate"
        name="Expiry date"
        className="!tw-text-left"
        placeholder="DD / MM / YYYY"
        type="date"
        :allow-future-date="true"
        :allow-past-date="false"
      />
      <img
        src="/assets/personal-details/drivingLicense.png"
        class="tw-row-start-5 tw-col-span-2 md:tw-col-span-1 md:tw-row-start-auto md:tw-col-start-auto lg:tw-row-span-2 lg:tw-row-start-2 lg:tw-col-start-3 lg:tw-mt-6 md:tw-mb-7 lg:tw-mb-0"
        alt=""
        srcset=""
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        :is-disabled="v$.$invalid"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/components/form/CustomInput.vue";

import CustomSelect from "@/components/form/CustomSelect.vue";
import { idNumber } from "@/types/routeParams";
import useUpdateIdentity from "@/utils/composables/API/personal-details/identity/useUpdateIdentity";
import { STATES } from "@/utils/constants";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";
import useVuelidate from "@vuelidate/core";
import { helpers, required, sameAs } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import DatePicker from "../../../components/form/DatePicker.vue";
import TheFooter from "../../../components/global/TheFooter.vue";
import { convertDateToStringForForm } from "@/utils/helpers/convertDate";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { isAdult, isFuture } from "@/utils/validations";
const formValue = ref({
  fname: "",
  mname: "",
  lname: "",
  dob: "",
  licenseNumber: "",
  state: "",
  expiryDate: "",
  cardNumber: "",
});

const personX = computed(() => route.meta.personX);

const validations = computed(() => ({
  fname: {
    required,
    sameAsRef: helpers.withMessage("Please Enter Valid name", sameAs(personX)),
  },
  mname: {},
  lname: { required },
  dob: {
    required,
    isAdult: helpers.withMessage("Person must be 18 or above", isAdult),
  },
  licenseNumber: { required },
  state: { required },
  expiryDate: {
    required,
    isFuture: helpers.withMessage("Must be valid", isFuture),
  },
  cardNumber: { required },
}));
const v$ = useVuelidate(validations, formValue);

const route = useRoute();
const router = useRouter();
const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const { data, isFetched, isLoading } = useGetPersonalDetails({
  isFirstPerson: isFirst.value,
});
watch(
  [data, isFetched, isLoading, isFirst],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData.firstName) {
      formValue.value.fname = newData.firstName;
      formValue.value.lname = newData.lastName;
      formValue.value.mname = newData.middleName;
      formValue.value.dob = convertDateToStringForForm(newData.dob);
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const nextNavigation = computed(() => {
  if (route.params.idNumber === idNumber.one) {
    return {
      name: personalDetails.verifyYourIdentity.chooseIdType,
      params: { idNumber: idNumber.two },
    };
  } else {
    return { name: personalDetails.yourIdentityIsConfirmed };
  }
});

const { mutate } = useUpdateIdentity();
const handleNextClick = () => {
  mutate(
    { isFirstPerson: isFirst.value, dlVerified: 1 },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
