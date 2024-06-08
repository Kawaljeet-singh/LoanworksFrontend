<template>
  <div>
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <p>
      {{ p1 }}
    </p>
    <div>
      <div class="">
        <SelectIdRadioButtons
          v-model="idType"
          :options="IDOptions"
          containerClasses=" md:!tw-grid-cols-3 tw-gap-3  "
          className="tw-h-19.5 md:tw-h-26 "
        />
      </div>
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="!idType"
        @onClick="handleNavigation"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :isDisabled="!idType"
        :navigate-to="true"
        @handle-next-click="handleNavigation"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import SelectIdRadioButtons from "@/components/form/SelectIdRadioButtons.vue";
import { idNumber } from "@/types/routeParams";
import useGetIdentity from "@/utils/composables/API/personal-details/identity/useGetIdentity";
import routeNames, {
  routePersonalDetails,
} from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";

const route = useRoute();

const isFirst = computed(() => Number(route.params.person) as 0 | 1);
const { data } = useGetIdentity(
  reactive({
    isFirstPerson: isFirst.value,
  })
);
const { data: customerDetail } = useGetPersonalDetails(
  reactive({
    isFirstPerson: isFirst.value,
  })
);

const idType = ref("");
const IDOptions = computed<{ value: string; disabled?: boolean | number }[]>(
  () => {
    let dlVerified = 0,
      medicareVerified = 0,
      passportVerified = 0;
    if (data && data?.value.length) {
      dlVerified = data.value[0].dlVerified;
      medicareVerified = data.value[0].medicareVerified;
      passportVerified = data.value[0].passportVerified;
    }
    if (route.params.idNumber === idNumber.two) {
      return [
        { value: "Driving License", disabled: dlVerified },
        { value: "Passport", disabled: passportVerified },
        { value: "Medicare", disabled: medicareVerified },
      ];
    }
    return [
      { value: "Driving License" },
      { value: "Passport" },
      { value: "Medicare" },
    ];
  }
);
const firstName = computed(() => customerDetail.value[0].firstName || "Hi");
const isSecond = computed(
  () =>
    !!(
      data &&
      data?.value.length &&
      (data.value[0].dlVerified ||
        data.value[0].medicareVerified ||
        data.value[0].passportVerified)
    )
);
const heading = computed(() => {
  if (isSecond.value) {
    return `Thanks ${firstName.value}, and now for your second identity document.`;
  }
  return `${firstName.value}, please confirm your identity:`;
});
const p1 = computed(() => {
  if (isSecond.value) {
    return `Choose from the following ID type:`;
  }
  return `We require two types of identity document to be able to confirm their identity. Please choose the first identity document.`;
});
const navigateTo = ref({
  name: "",
});
watch(data, (newData) => {
  if (data && data?.value.length) {
    const dlVerified = data.value[0].dlVerified;
    const medicareVerified = data.value[0].medicareVerified;
    const passportVerified = data.value[0].passportVerified;
    if (dlVerified + medicareVerified + passportVerified >= 2)
      router.push({
        name: routePersonalDetails.yourIdentityIsConfirmed as RouteRecordName,
      });
  }
});

watch(
  () => idType.value,
  (newVal) => {
    switch (newVal) {
      case "Driving License":
        navigateTo.value.name =
          routeNames.personalDetails.verifyYourIdentity.drivingLicense;
        break;
      case "Passport":
        navigateTo.value.name =
          routeNames.personalDetails.verifyYourIdentity.passport;
        break;
      case "Medicare":
        navigateTo.value.name =
          routeNames.personalDetails.verifyYourIdentity.medicare;

        break;

      default:
        navigateTo.value.name = "";
        break;
    }
  }
);
const router = useRouter();

const handleNavigation = () => {
  router.push(navigateTo.value);
};
</script>

<style scoped></style>
