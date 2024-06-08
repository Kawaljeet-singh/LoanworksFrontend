<template>
  <div>
    <h4
      class="tw-text-left tw-font-avenir-medium tw-mb-7 tw-mt-4.5 lg:tw-mt-1 tw-text-lg tw-text-primary-500"
    >
      Verify Your Identity - Passport
    </h4>

    <!-- <p class="tw-text-sm tw-leading-6">
      Please confirm the identity of {{ personX }}<br />
      Fill in the required fields:
    </p> -->
    <div class="tw-grid tw-grid-cols-2 tw-gap-5 lg:tw-grid-cols-6">
      <CustomInput
        v-model.trim="v$.fname.$model"
        :v="v$.fname"
        name="First Name"
        className="!tw-text-left"
        class="tw-col-span-2 md:tw-col-span-1 lg:tw-col-span-3"
        placeholder="Enter your name"
      />

      <CustomInput
        v-model.trim="v$.lname.$model"
        :v="v$.lname"
        name="Last Name"
        className="!tw-text-left"
        placeholder="Enter your last name"
        class="lg:tw-col-span-3"
      />
      <CustomInput
        :v="v$.passportNumber"
        v-model.lazy="v$.passportNumber.$model"
        name="Passport Number"
        className="!tw-text-left"
        placeholder="Enter your passport number"
        class="lg:tw-col-span-2"
      />

      <DatePicker
        v-model.trim="v$.expiryDate.$model"
        :v="v$.expiryDate"
        name="Expiry date "
        className="!tw-text-left"
        placeholder="DD / MM / YYYY"
        type="date"
        class="lg:tw-col-span-2"
        :allow-future-date="true"
        :allow-past-date="false"
      />

      <img
        src="/assets/personal-details/passport.png"
        class="tw-col-span-2 tw-mb-2 md:tw-col-span-1 tw-justify-self-center tw-w-60 tw-row-start-4 md:tw-row-span-2 md:tw-row-start-2 md:tw-col-start-2 md:tw-mt-6 md:tw-mb-7 lg:tw-mb-0 lg:tw-col-span-2 lg:tw-col-start-5 lg:tw-mt-0"
        alt=""
        srcset=""
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/components/form/CustomInput.vue";
import router from "@/router";
import { idNumber } from "@/types/routeParams";
import useUpdateIdentity from "@/utils/composables/API/personal-details/identity/useUpdateIdentity";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";
import useVuelidate from "@vuelidate/core";
import { helpers, required, sameAs } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DatePicker from "../../../components/form/DatePicker.vue";
import TheFooter from "../../../components/global/TheFooter.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { isFuture } from "@/utils/validations";

const formValue = reactive({
  fname: "",
  lname: "",
  expiryDate: "",
  passportNumber: "",
});
const personX = computed(() => route.meta.personX);

const validations = computed(() => ({
  fname: {
    required,
    sameAsRef: helpers.withMessage("Please Enter Valid name", sameAs(personX)),
  },

  lname: { required },
  expiryDate: {
    required,
    isFuture: helpers.withMessage("Must be valid", isFuture),
  },
  passportNumber: { required },
}));
const v$ = useVuelidate(validations, formValue);

const route = useRoute();

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
      formValue.fname = newData.firstName;
      formValue.lname = newData.lastName;

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
    { isFirstPerson: isFirst.value, passportVerified: 1 },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
      onError(err) {
        if (err.response.status === 409) router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
