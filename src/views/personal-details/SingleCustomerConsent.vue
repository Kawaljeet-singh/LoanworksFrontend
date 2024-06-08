<template>
  <div>
    <p>
      We will need to collect your personal details and share some of them with
      our key suppliers when we process your application.
    </p>
    <p>
      By confirming below you give us consent to share your identity and
      financial details.
    </p>
    <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-15">
      <template v-for="(key, index) in formValue" :key="key">
        <div>
          <h4 class="tw-text-primary !tw-text-lg" v-if="isJoint.length == 2">
            {{ isJoint[index] || `{Person ${index + 1} FirstName LastName }` }}
          </h4>
          <div class="tw-flex tw-items-center tw-my-6">
            <CheckBox
              class-name="tw-w-6 !tw-h-6"
              input-container-class-name="tw-my-0 tw-w-max  tw-h-6"
              i
              type="checkbox"
              v-model="formValue[index].equifax"
            />
            <span class="tw-ml-4"
              >Verify identity electronically using Equifax</span
            >
          </div>
          <div class="tw-flex tw-items-center tw-my-6">
            <CheckBox
              class-name="tw-w-6 !tw-h-6"
              input-container-class-name="tw-my-0  tw-w-max tw-h-6"
              type="checkbox"
              v-model="formValue[index].illion"
            />
            <span class="tw-ml-4"
              >Verify financial details electronically using Illion</span
            >
          </div>
          <div class="tw-flex tw-items-center tw-my-6">
            <CheckBox
              class-name="tw-w-6 !tw-h-6"
              input-container-class-name="tw-my-0  tw-w-max  tw-h-6"
              type="checkbox"
              v-model="formValue[index].creditCheck"
            />

            <span class="tw-ml-4">Conduct a credit check using Equifax</span>
          </div>
        </div>
      </template>
    </div>
    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="disabled"
        @onClick="handleNextClick"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        :is-disabled="disabled"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import { computed } from "@vue/reactivity";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CheckBox from "../../components/form/CheckBox.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const formValue = reactive([
  {
    equifax: false,
    illion: false,
    creditCheck: false,
  },
]);

const disabled = ref(true);

const router = useRouter();
const route = useRoute();
const { data } = useGetPersonalDetails();

const isJoint = computed(() => {
  const isJoint = route.params.type === "joint";
  const personX = data?.value[0]?.firstName + " " + data?.value[0]?.lastName;
  if (isJoint) {
    formValue.length = 0;
    formValue.push({
      equifax: false,
      illion: false,
      creditCheck: false,
    });
    formValue.push({
      equifax: false,
      illion: false,
      creditCheck: false,
    });

    const personY = data?.value[1]?.firstName + " " + data?.value[1]?.lastName;
    return [personX, personY];
  }
  return [personX];
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

watch(
  () => formValue,
  (newVal) => {
    let isInValid = false;
    newVal.forEach((value) => {
      if (!value.creditCheck || !value.equifax || !value.illion) {
        isInValid = true;
      }
    });

    if (isInValid) {
      disabled.value = true;
    } else disabled.value = false;
  },
  { deep: true }
);
const handleNextClick = () => {
  router.push(nextNavigation.value);
};
</script>

<style scoped></style>
