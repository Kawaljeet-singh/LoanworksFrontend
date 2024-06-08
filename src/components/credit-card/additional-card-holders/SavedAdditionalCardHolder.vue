<template>
  <div class="qb-shadow-secondary tw-py-4 tw-my-4 tw-border-y tw-bg-white">
    <div
      class="tw-flex tw-w-full tw-items-center tw-cursor-pointer tw-align-middle"
    >
      <template v-if="holder.additionalCardHoldersId">
        <img
          src="/assets/dustbin.svg"
          class="tw-w-5 tw-mx-2"
          @click="
            mutate({
              additionalCardHoldersId: holderDetails.additionalCardHoldersId,
            })
          "
        />
        <div class="tw-w-full" @click="toggelHide">
          {{ fullName }}
        </div>
      </template>
      <template v-else>
        <img
          src="/assets/minus.svg"
          class="tw-w-5 tw-mx-2"
          alt=""
          @click="$emit('remove')"
        />
        <div class="tw-w-full tw-cursor-default">
          Card Holder {{ positionOfHolder }}
        </div>
      </template>
    </div>
    <form
      v-show="isOpen"
      @submit.prevent="handleSave(holder)"
      class="md:tw-grid tw-p-6 md:tw-grid-cols-2 md:tw-gap-2"
    >
      <CustomInput
        v-model.trim="v$.firstName.$model"
        :v="v$.firstName"
        name="First Name"
        placeholder="Enter your first name"
        className=" tw-p-6 !tw-text-left "
      />
      <CustomInput
        v-model.trim="v$.middleName.$model"
        :v="v$.middleName"
        name="Middle Name"
        placeholder="Enter your middle name"
        className="tw-p-6 !tw-text-left "
      />
      <CustomInput
        v-model.trim="v$.lastName.$model"
        :v="v$.lastName"
        name="Last Name"
        placeholder="Enter your last name"
        className="tw-p-6 !tw-text-left "
      />

      <DatePicker
        v-model.trim="v$.dob.$model"
        :v="v$.dob"
        name="Date of Birth"
        placeholder="DD / MM / YYYY "
        type="date"
        :allow-past-date="true"
        class="tw-mb-5"
      />
      <AddressSelect
        v-model="v$.address.$model"
        :v="v$.address"
        name="Current Address"
        placeholder="Enter your address"
        className="tw-p-6 !tw-text-left"
        class="tw-mb-5"
      />

      <CustomInput
        v-model.trim="v$.email.$model"
        :v="v$.email"
        name="Email"
        placeholder="Enter your email"
        className="tw-p-6 !tw-text-left "
        type="email"
      />
      <CustomInput
        v-model="v$.mobileNumber.$model"
        :v="v$.mobileNumber"
        type="number"
        name="Mobile Number"
        placeholder="Enter your mobile number"
        className="tw-p-6 !tw-text-left "
      />
      <CustomButton
        :title="holder.additionalCardHoldersId ? 'Update' : 'Save'"
        :isDisabled="v$.$invalid"
        className="md:tw-h-15 "
        class="tw-py-6"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { AdditionalCardHolder } from "@/types/additionalCardHolder.type";
import useDropAdditionalCardHolder from "@/utils/composables/API/additional-card-holders/useDropAdditionalCardHolder";
import useMutateAdditionalCardHolder from "@/utils/composables/API/additional-card-holders/useMutateAdditionalCardHolder";
import { computed, reactive, ref } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { date } from "quasar";
import CustomButton from "../../CustomButton.vue";
import CustomInput from "../../form/CustomInput.vue";
import DatePicker from "../../form/DatePicker.vue";
import { isAdult } from "@/utils/validations";
import AddressSelect from "@/components/form/AddressSelect.vue";

const {
  mutate: updateHolder,
  isSuccess,
  status,
} = useMutateAdditionalCardHolder();

const { formatDate } = date;

const { mutate } = useDropAdditionalCardHolder();

interface Props {
  holderDetails?: AdditionalCardHolder;
  positionOfHolder: number;
}
const props = defineProps<Props>();
const fullName = computed(
  () => props.holderDetails.firstName + " " + props.holderDetails.lastName
);
const formField = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  mobileNumber: "",
  address: "",
  email: "",
  additionalCardHoldersId: 0,
};

const holder = reactive({
  ...formField,
  ...props.holderDetails,
  dob: props.holderDetails
    ? formatDate(props.holderDetails.dob, "DD/MM/YYYY")
    : "",
});
const isOpen = ref<boolean>(
  holder.additionalCardHoldersId === 0 ? true : false
);
const toggelHide = () => (isOpen.value = !isOpen.value);

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

const v$ = useVuelidate(validations, holder);
const emit = defineEmits(["remove"]);
const handleSave = (data: typeof formField) => {
  // console.log("date", date.extractDate(data.dob, "DD/MM/YYYY", true));

  const postData = {
    ...data,
    dob: date.extractDate(data.dob, "DD/MM/YYYY").toISOString(),
  };

  updateHolder(postData, {
    onSuccess: (data, variable) => {
      if (variable.additionalCardHoldersId === 0) emit("remove");
      toggelHide();
    },
  });
};
</script>

<style scoped></style>
