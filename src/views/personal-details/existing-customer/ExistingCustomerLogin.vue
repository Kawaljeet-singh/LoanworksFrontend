<template>
  <div>
    <h3 class="tw-mb-6 tw- tw-text-center">
      Save time by logging into internet banking to get your personal details
    </h3>
    <div class="tw-max-w-md tw-mx-auto">
      <div class="md:tw-grid md:tw-grid-cols-1 md:tw-gap-0">
        <div>
          <CustomInput
            name=""
            placeholder="Customer Number"
            v-model="v$.username.$model"
            :v="v$.username"
          />
        </div>
        <div>
          <CustomInput
            name=""
            placeholder="Password"
            v-model.password="v$.password.$model"
            :v="v$.password"
            type="password"
          />
        </div>
      </div>
      <div class="tw-mt-10">
        <CustomButton
          title="Sign in"
          :is-disabled="v$.$invalid"
          @onClick="$router.push(nextNavigation)"
        />
        <p
          class="tw-mx-auto tw-w-fit tw-cursor-pointer tw-text-qb-black-secondary-2 tw-mt-10 tw-underline tw-text-xs"
        >
          Forgot Customer Number or Password?
        </p>
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter :navigate-to="false" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const route = useRoute();
const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const formValue = reactive({
  username: "",
  password: "",
});
const validations = computed(() => ({
  username: { required },
  password: { required, minLength: minLength(4) },
}));
const v$ = useVuelidate(validations, formValue);

const router = useRouter();
</script>

<style scoped></style>
