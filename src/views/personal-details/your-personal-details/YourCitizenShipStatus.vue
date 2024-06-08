<template>
  <form @submit.prevent="handleNextClick()">
    <div class="">
      <RadioButtons
        v-model="citizenShip"
        :options="options"
        containerClasses="tw-grid-cols-1 md:tw-grid-cols-3  "
        className="tw-h-14 !tw-rounded-3 "
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
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
import { period } from "@/types/routeParams";
import useGetCitizenship from "@/utils/composables/API/citizenship-details/useGetCitizenship";
import useUpdateCitizenship from "@/utils/composables/API/citizenship-details/useUpdateCitizenship";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../../components/CustomButton.vue";
import RadioButtons from "../../../components/form/RadioButtons.vue";
import TheFooter from "../../../components/global/TheFooter.vue";

const citizenShip = ref("");
const options = [
  "Australian Citizen",
  "Australian Permanent Resident",
  "Non Resident",
];
const route = useRoute();
const router = useRouter();
const navigateTo = ref({
  name: "" as RouteRecordName,
  params: {
    period: period.current,
  },
});

const validations = computed(() => ({
  citizenShip: { required },
}));

const v$ = useVuelidate(validations, { citizenShip });
const nextNavigation = computed(() => {
  const { australian, nonAustralian } = route.meta.nextNavigation as {
    australian: RouteRecordName;
    nonAustralian: RouteRecordName;
  };
  return {
    australian: australian,
    nonAustralian: nonAustralian,
  };
});

const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const postData = computed(() => {
  return {
    isFirstPerson: isFirst.value,
    citizenshipStatus: citizenShip.value,
    citizenshipCountry:
      citizenShip.value === "Non Australia" ? "" : "Australia",
  };
});

const { mutate } = useUpdateCitizenship();

const { data, isFetched, isLoading } = useGetCitizenship(
  reactive({
    isFirstPerson: isFirst.value,
  })
);

watch(
  [data, isFetched, isLoading, isFirst],
  ([d]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData) {
      citizenShip.value = newData.citizenshipStatus;
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  switch (citizenShip.value) {
    case options[2]:
      navigateTo.value.name = nextNavigation.value.nonAustralian;
      break;
    case options[1]:
    case options[0]:
      navigateTo.value.name = nextNavigation.value.australian;
      break;

    default:
      navigateTo.value.name = "";
      break;
  }

  mutate(postData.value, {
    onSuccess() {
      router.push(navigateTo.value);
    },
  });
};
</script>

<style scoped></style>
