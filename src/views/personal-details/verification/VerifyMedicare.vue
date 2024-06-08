<template>
  <div>
    <h4
      class="tw-text-left tw-font-avenir-medium tw-mb-7 tw-mt-4.5 lg:tw-mt-1 tw-text-lg tw-text-primary"
    >
      Verify Your Identity - Medicare
    </h4>

    <!-- <p class="tw-text-sm tw-leading-6">
      Please confirm the identity of {{ PersonX }} <br />
      Fill in the required fields:
    </p> -->
    <div class="tw-grid tw-grid-cols-2 tw-gap-5 lg:tw-grid-cols-6">
      <CustomInput
        v-model.trim="v$.medicareNo.$model"
        :v="v$.medicareNo"
        name="Medicare Number"
        className="!tw-text-left"
        type="number"
        class="tw-col-span-2 md:tw-col-span-1 lg:tw-col-span-3"
        placeholder="Enter Medicare Number"
      />

      <CustomInput
        v-model.trim="v$.refNo.$model"
        :v="v$.refNo"
        name="Reference Number"
        className="!tw-text-left"
        placeholder=""
        class="md:tw-w-1/2 lg:tw-col-span-2"
      />
      <QuasaraSelect
        v-model="formValue.cardType"
        name="Card Type"
        :options="['Green', 'Blue', 'Yellow']"
        className="!tw-text-left"
        placeholder="Select Type"
        hide-icon
        class="tw-col-start-2 md:tw-col-start-1 tw-row-start-2 md:tw-w-1/2 lg:tw-col-span-3"
      />

      <img
        src="/assets/personal-details/medicare.png"
        class="tw-col-span-2 tw-mb-2 md:tw-col-span-1 tw-justify-self-center tw-w-60 tw-row-start-4 md:tw-row-span-2 md:tw-row-start-2 md:tw-col-start-2 md:tw-mt-6 md:tw-mb-7 lg:tw-mb-0 lg:tw-col-span-2 lg:tw-col-start-4 lg:tw-mt-0"
        alt=""
        srcset=""
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :isDisabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/components/form/CustomInput.vue";
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import { idNumber } from "@/types/routeParams";
import useUpdateIdentity from "@/utils/composables/API/personal-details/identity/useUpdateIdentity";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";

import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const formValue = reactive({
  medicareNo: "",
  refNo: "",
  cardType: "",
});
const route = useRoute();

const validations = computed(() => ({
  medicareNo: {
    required: helpers.withMessage("Please Enter Medicare No", required),
  },

  refNo: { required },
  cardType: { required },
}));
const v$ = useVuelidate(validations, formValue);

const router = useRouter();
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

const PersonX = computed(() => route.meta.personX);

const { mutate } = useUpdateIdentity();
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const handleNextClick = () => {
  mutate(
    {
      medicareVerified: 1,
      isFirstPerson: isFirst.value,
    },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
