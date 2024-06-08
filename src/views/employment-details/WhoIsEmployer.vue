<template>
  <form @submit.prevent="handleNextClick" class="md:tw-p-1">
    <p v-if="$route.params.period === period.previous">
      We have noticed you have worked with your current employer for less than 3
      years. Your previous employment is required.
    </p>
    <div class="md:tw-mb-10">
      <CustomInput
        name=""
        className="tw-text-start tw-h-12.5 md:tw-h-16"
        placeholder="Enter your company's name"
        v-model="v$.employerName.$model"
        :v="v$.employerName"
      />
    </div>

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
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
import { period } from "@/types/routeParams";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import CustomInput from "../../components/form/CustomInput.vue";
import TheFooter from "../../components/global/TheFooter.vue";
const route = useRoute();
const router = useRouter();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const employerName = ref();

const validations = computed(() => ({
  employerName: { required, minLength: minLength(3) },
}));

const v$ = useVuelidate(validations, { employerName });

const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const { data, isLoading } = useGetEmploymentDetails(
  reactive({ isFirstPerson: isFirst.value })
);
const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,
      currentEmpName: employerName.value,
    };
  } else {
    return {
      isFirstPerson: isFirst.value,
      previousEmpName: employerName.value,
    };
  }
});

watch(
  [isLoading, data],
  ([newVal]) => {
    if (!newVal && data.value && data?.value[0]) {
      employerName.value =
        data?.value[0]?.[
          route.params.period === period.current
            ? "currentEmpName"
            : "previousEmpName"
        ];
    }
  },
  { immediate: true }
);

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
