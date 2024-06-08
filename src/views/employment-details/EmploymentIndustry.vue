<template>
  <form @submit.prevent="handleNextClick" class="md:tw-p-1">
    <div class="md:tw-mb-10">
      <QuasaraSelect
        name=""
        :options="industriesOption"
        className="tw-text-start tw-h-12.5 md:tw-h-16"
        placeholder="Enter industry of employment..."
        v-model="industry"
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
import useGetIndustries from "@/utils/composables/API/third-party/employment/useGetIndustries";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";

const { data } = useGetIndustries();

const industriesOption = computed(() =>
  data ? data?.value?.map((o: { industryName: string }) => o.industryName) : []
);
const route = useRoute();
const router = useRouter();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const industry = ref("");

const validations = computed(() => ({
  industry: { required, minLength: minLength(3) },
}));

const v$ = useVuelidate(validations, { industry });
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,
      currentEmpIndustry: industry.value,
    };
  } else {
    return {
      isFirstPerson: isFirst.value,
      previousEmpIndustry: industry.value,
    };
  }
});

const { mutate } = useUpdateEmploymentDetails();
const { data: oldData, isLoading } = useGetEmploymentDetails(
  reactive({ isFirstPerson: isFirst.value })
);
watch(
  [isLoading, oldData],
  ([newVal]) => {
    if (!newVal && oldData.value && oldData?.value[0]) {
      industry.value =
        oldData?.value[0]?.[
          route.params.period === period.current
            ? "currentEmpIndustry"
            : "previousEmpIndustry"
        ];
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  console.log(postData.value);
  mutate(postData.value, {
    onSuccess() {
      router.push(nextNavigation.value);
    },
  });
};
</script>

<style scoped></style>
