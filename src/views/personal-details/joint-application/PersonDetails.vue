<template>
  <form @submit.prevent="handleNextClick">
    <div class="md:tw-grid md:tw-grid-cols-2 md:tw-gap-2">
      <CustomInput
        v-model.trim="v$.firstName.$model"
        :v="v$.firstName"
        name="First Name"
        className="!tw-text-left"
        placeholder="Enter your first name"
      />

      <CustomInput
        v-model.trim="v$.lastName.$model"
        :v="v$.lastName"
        name="Last Name"
        className="!tw-text-left"
        placeholder="Enter your last name"
      />

      <CustomInput
        v-model.trim="v$.email.$model"
        :v="v$.email"
        name="Email"
        className="!tw-text-left"
        placeholder="Enter your email"
        type="email"
      />
      <CustomInput
        v-model="v$.MobileNumber.$model"
        :v="v$.MobileNumber"
        name="Mobile Number"
        className="!tw-text-left"
        placeholder="Enter your mobile number"
      />
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
import TheFooter from "@/components/global/TheFooter.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useMutatePersonalDetails from "@/utils/composables/API/personal-details/useMutatePersonalDetails";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, numeric } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import {
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
  type RouteRecordName,
} from "vue-router";
import { useToast } from "vue-toastification";

const { mutate } = useMutatePersonalDetails();

const formValue = reactive({
  firstName: "",
  lastName: "",
  email: "",
  MobileNumber: "",
});

const route = useRoute();
const router = useRouter();

const validations = computed(() => ({
  firstName: { required },
  lastName: { required },
  email: { required, email },
  MobileNumber: { required, minLength: minLength(10), numeric },
}));
const toast = useToast();
const v$ = useVuelidate(validations, formValue);
const nextNavigation = computed(() => {
  if (isFirst.value) {
    return { name: route.name, params: { person: 0 } };
  }

  return {
    name: route.meta.nextNavigation as RouteRecordName,
    params: { person: 1 },
  };
});

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data, isFetched, isLoading } = useGetPersonalDetails(
  reactive({
    isFirstPerson: isFirst.value,
  })
);

watch(
  [data, isFetched, isLoading, isFirst],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData?.firstName) {
      formValue.MobileNumber = newData.mobileNumber;
      formValue.firstName = newData.firstName;
      formValue.lastName = newData.lastName;
      formValue.email = newData.email;
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  mutate(
    {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      mobileNumber: formValue.MobileNumber,
      email: formValue.email,
      isFirstPerson: isFirst.value,
    },
    {
      onSuccess: () => router.push(nextNavigation.value),
    }
  );
};

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.person === "0") {
    to.meta.heading = "Please tell us about the 2nd applicant";
    to.meta.title = "Personal Details";
  }
});
</script>

<style scoped></style>
