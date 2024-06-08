<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-p-1">
    <div class="md:tw-mb-10">
      <CustomInputVue
        placeholder=""
        type="number"
        class="tw-max-w-xl"
        className="tw-text-start tw-h-12.5 md:tw-h-16 "
        v-model.number="v$.income.$model"
        :v="v$.income"
        icon="fa-dollar-sign"
      />
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full md:tw-max-w-xs"
        className="tw-h-12.5 md:tw-h-15"
        :isDisabled="false"
        @onClick="handleNextClick()"
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
import CustomInputVue from "@/components/form/CustomInput.vue";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, minValue, required } from "@vuelidate/validators";
import { ref, watch, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "@/components/global/TheFooter.vue";
const route = useRoute();
const router = useRouter();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data, isLoading } = useGetEmploymentDetails(
  reactive({
    isFirstPerson: isFirst.value,
  })
);
const income = ref("");

watch(
  [isLoading, data],
  ([newVal]) => {
    if (!newVal && data.value && data?.value[0]) {
      income.value = data?.value[0]?.currentAnnualIncome;
    }
  },

  { immediate: true }
);

const validations = computed(() => ({
  income: { required, min: minValue(0) },
}));

const v$ = useVuelidate(validations, { income }, { $autoDirty: true });

const postData = computed(() => {
  return {
    isFirstPerson: isFirst.value,
    currentAnnualIncome: parseInt(income.value),
  };
});

const { mutate } = useUpdateEmploymentDetails();
const handleNextClick = () => {
  mutate(postData.value, {
    onSuccess() {
      router.push(nextNavigation.value);
    },
  });
};
</script>

<style scoped></style>
