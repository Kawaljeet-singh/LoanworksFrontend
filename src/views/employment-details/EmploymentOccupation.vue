<template>
  <form @submit.prevent="handleNextClick" class="md:tw-p-1">
    <div class="md:tw-mb-10">
      <QuasaraSelect
        name=""
        :options="occupationOption"
        className="tw-text-start tw-h-12.5 md:tw-h-16"
        placeholder="Enter your occupation here..."
        v-model="occupation"
      />
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full md:tw-max-w-xs"
        className="tw-h-12.5 md:tw-h-15"
        :is-disabled="v$.$invalid"
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
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import { period } from "@/types/routeParams";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import useGetOccupation from "@/utils/composables/API/third-party/employment/useGetOccupation";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";

const { data } = useGetOccupation();

const occupationOption = computed(() =>
  data
    ? data.value.map((o: { occupationName: string }) => o.occupationName)
    : []
);

const route = useRoute();
const router = useRouter();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const occupation = ref();

const validations = computed(() => ({
  occupation: { required, minLength: minLength(3) },
}));

const v$ = useVuelidate(validations, { occupation });

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data: oldData, isLoading } = useGetEmploymentDetails(
  reactive({ isFirstPerson: isFirst.value })
);
watch(
  [isLoading, oldData],
  ([newVal]) => {
    if (!newVal && oldData.value && oldData?.value[0]) {
      occupation.value =
        oldData?.value[0]?.[
          route.params.period === period.current
            ? "currentOccupation"
            : "previousEmpIndustry"
        ];
    }
  },
  { immediate: true }
);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,
      currentOccupation: occupation.value,
    };
  } else {
    return {
      isFirstPerson: isFirst.value,
      previousEmpIndustry: occupation.value,
    };
  }
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
