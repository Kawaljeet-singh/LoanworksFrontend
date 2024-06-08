<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-p-1">
    <AddressSelect v-model="address" placeholder="Enter your address" />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButtonVue
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
        @onClick="handleNextClick"
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
import CustomButtonVue from "@/components/CustomButton.vue";
import AddressSelect from "@/components/form/AddressSelect.vue";
import { period, type } from "@/types/routeParams";
import useGetCitizenship from "@/utils/composables/API/citizenship-details/useGetCitizenship";
import useUpdateCitizenship from "@/utils/composables/API/citizenship-details/useUpdateCitizenship";
import personalDetails from "@/utils/route-names/routeNamePersonalDetails";
import { computed } from "@vue/reactivity";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";

const route = useRoute();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const router = useRouter();
const address = ref("");
const isFirst = computed(() => Number(route.params.person) as 0 | 1);

const { mutate } = useUpdateCitizenship();
// const { data } = useGetPersonalDetails({ isFirstPerson: 1 });

const validations = computed(() => ({
  address: { required },
}));

const v$ = useVuelidate(validations, { address });

const { data, isFetched, isLoading } = useGetCitizenship(
  reactive({
    isFirstPerson: isFirst.value,
  })
);
const { data: customerDetail } = useGetPersonalDetails({ isFirstPerson: 1 });

watch(
  [data, customerDetail, isFetched, isLoading, isFirst],
  ([d, cd]) => {
    if (!d?.length) return;
    const newData = d[0];
    if (newData) {
      address.value =
        newData[
          route.params.period === period.current
            ? "currentAddress"
            : "previousAddress"
        ];
      if (!address.value && cd && cd[0]?.address) {
        if (
          isFirst.value ||
          (route.params.type === type.joint &&
            ["Married", "De Facto"].includes(
              customerDetail?.value[0]?.maritalStatus
            ))
        ) {
          address.value = cd[0].address;
        }
      }
    }
  },
  { immediate: true }
);

const postData = computed(() => {
  if (route.params.period === period.current) {
    return {
      citizenshipDetailsId: 0,
      isFirstPerson: isFirst.value,
      currentAddress: address.value,
    };
  } else {
    return {
      citizenshipDetailsId: 0,
      isFirstPerson: route.meta.isFirstPerson ? 1 : 0,
      previousAddress: address.value,
    };
  }
});

const handleNextClick = () => {
  if (route.params.period === period.previous) {
    nextNavigation.value.name =
      personalDetails.yourPersonalDetails.howLongDidYouLiveThere;
  }

  mutate(postData.value, {
    onSuccess() {
      router.push(nextNavigation.value);
    },
  });
};
</script>

<style scoped></style>
