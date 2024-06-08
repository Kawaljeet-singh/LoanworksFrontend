<template>
  <div class="md:tw-p-1">
    <div class="">
      <div>
        <h3 class="tw-mb-7 tw-mt-2">What is your citizenship country?</h3>
        <div class=""></div>
        <QuasaraSelectVue
          v-model="formValue.citizenshipCountry"
          class="tw-pb-8 tw-border-b tw-border-secondary-600"
          :options="ALL_COUNTRIES"
          placeholder="Select the country..."
          drop-down-icon=""
        />
      </div>
      <!-- <VueGoogleAutocomplete /> -->
      <div>
        <h3 class="tw-mb-7 tw-mt-2.5">What is your residency country?</h3>
        <QuasaraSelectVue
          :options="ALL_COUNTRIES"
          placeholder="Select the country..."
          v-model="formValue.residencyCountry"
          drop-down-icon=""
        />
        <!-- <CustomInputVue
          name=""
          className="tw-text-start"
          placeholder="Select the country..."
          v-model="formValue.residencyCountry"
        /> -->
      </div>
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
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
  </div>
</template>

<script setup lang="ts">
import CustomButtonVue from "@/components/CustomButton.vue";
import QuasaraSelectVue from "@/components/form/QuasaraSelect.vue";
import { period } from "@/types/routeParams";
import useUpdateCitizenship from "@/utils/composables/API/citizenship-details/useUpdateCitizenship";
import { ALL_COUNTRIES } from "@/utils/constants";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";

const route = useRoute();

const navigateTo = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
  params: { period: period.current },
}));

const router = useRouter();

const formValue = reactive({
  citizenshipCountry: "",
  residencyCountry: "",
});

const validations = computed(() => ({
  citizenshipCountry: { required },
  residencyCountry: { required },
}));

const v$ = useVuelidate(validations, formValue);

const postData = computed(() => {
  return {
    isFirstPerson: Number(route.params.person),
    residencyCountry: formValue.residencyCountry,
    citizenshipCountry: formValue.citizenshipCountry,
  };
});

const { mutate } = useUpdateCitizenship();
const handleNextClick = () => {
  mutate(postData.value, {
    onSuccess() {
      router.push(navigateTo.value);
    },
  });
};
</script>

<style scoped></style>
