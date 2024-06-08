<template>
  <form @submit.prevent="handleNextClick">
    <div>
      <RadioButtons
        v-model="status"
        :options="options"
        className="tw-h-24 md:tw-h-26"
        containerClasses="tw-grid-cols-1 md:tw-grid-cols-2"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="!status"
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
import CustomButton from "@/components/CustomButton.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import { period } from "@/types/routeParams";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import { routeEmploymentDetails } from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";

const status = ref();

const options = ["Full-time", "Part-time", "Casual", "Not employed"];

const router = useRouter();
const route = useRoute();
const navigateTo = ref({
  name: route.meta.nextNavigation as RouteRecordName,
});

const validations = computed(() => ({
  status: { required, minLength: minLength(3) },
}));

const v$ = useVuelidate(validations, { status });

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { data: oldData, isLoading } = useGetEmploymentDetails(
  reactive({ isFirstPerson: isFirst.value })
);
watch(
  [isLoading, oldData],
  ([newVal]) => {
    if (!newVal && oldData.value && oldData?.value[0]) {
      status.value =
        oldData?.value[0]?.[
          route.params.period === period.current
            ? "currentEmploymentStatus"
            : "previousEmploymentStatus"
        ];
    }
  },
  { immediate: true }
);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      isFirstPerson: isFirst.value,
      currentEmploymentStatus: status.value,
    };
  } else {
    return {
      isFirstPerson: isFirst.value,
      previousEmploymentStatus: status.value,
    };
  }
});

const { mutate } = useUpdateEmploymentDetails();
const handleNextClick = () => {
  if (route.params.period === period.previous) {
    navigateTo.value.name =
      routeEmploymentDetails.currentEmployment.currentLengthOfEmployment;
  }
  mutate(postData.value, {
    onSuccess() {
      router.push(navigateTo.value);
    },
  });
};
</script>

<style scoped></style>
