<template>
  <form @submit.prevent="handleNextClick">
    <div>
      <RadioButtons
        v-model="livingSituation"
        :options="options"
        className="tw-h-20"
      />
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import useGetCitizenship from "@/utils/composables/API/citizenship-details/useGetCitizenship";
import useUpdateCitizenship from "@/utils/composables/API/citizenship-details/useUpdateCitizenship";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../../components/CustomButton.vue";
import TheFooter from "../../../components/global/TheFooter.vue";
const route = useRoute();
const livingSituation = ref("");
const router = useRouter();
const options = [
  "Owning",
  "Renting",
  "Option-1",
  "Option-2",
  "Option-3",
  "Option-4",
];
const navigateTo = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const validations = computed(() => ({
  livingSituation: { required },
}));

const v$ = useVuelidate(validations, { livingSituation });

const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const postData = computed(() => {
  return {
    isFirstPerson: isFirst.value,
    livingSituation: livingSituation.value,
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
      livingSituation.value = newData.livingSituation;

      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  mutate(postData.value, {
    onSuccess() {
      router.push(navigateTo.value);
    },
  });
};
</script>

<style scoped></style>
