<template>
  <div
    class="tw-container tw-drop-shadow-primary tw-min-h-[400px] tw-rounded-3 tw-bg-primary-100 tw-p-2.5 lg:tw-p-6 tw-w-full tw-mx-auto tw-relative"
  >
    <!-- <h3 class="tw-mb-6 tw- tw-text-center">
      Save time by logging into internet banking to get your personal details
    </h3> -->
    <form @submit.prevent="handleLogin" class="tw-max-w-md tw-mx-auto">
      <div class="md:tw-grid md:tw-grid-cols-1 md:tw-gap-0">
        <div>
          <CustomInput
            name=""
            placeholder="Username"
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
        <CustomButton title="Sign in" :is-disabled="v$.$invalid" />
        <!-- <p
          class="tw-mx-auto tw-w-fit tw-cursor-pointer tw-text-qb-black-secondary-2 tw-mt-10 tw-underline tw-text-xs"
        >
          Forgot Customer Number or Password?
        </p> -->
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import useLogin from "@/utils/composables/API/admin/useLogin";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const formValue = reactive({
  username: "",
  password: "",
});
const validations = computed(() => ({
  username: { required, minLength: minLength(4) },
  password: { required, minLength: minLength(4) },
}));
const toast = useToast();
const v$ = useVuelidate(validations, formValue);

const router = useRouter();
const { mutate } = useLogin();
const handleLogin = () => {
  mutate(formValue);
  // setByName("isAuthenticated", true);
};
</script>

<style scoped></style>
