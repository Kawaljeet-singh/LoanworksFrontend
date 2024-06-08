<template>
  <div>
    <button
      :disabled="isDisabled"
      @click="Click"
      :type="type || 'submit'"
      :class="`
      tw-w-full
      tw-text-center
      tw-text-qb-black
      tw-py-3
      tw-bg-primary-engage
      tw-text-xs tw-drop-shadow-secondary
      tw-cursor-pointer 
      tw-text-white
 
    ${className}
    `"
    >
      {{ title }}

      <svg
        v-show="showArrow"
        :class="`tw-inline-block tw-ml-3  
     tw-align-middle  ${iconClassName}`"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="9px"
        height="15px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="matrix(1 0 0 1 -269 -263 )">
          <path
            d="M 8.305890000000002 8.43464  C 8.29178839 8.2743275  8.2272186 8.122185  8.121827500000002 8.001212  L 2.041827500000001 0.9712120000000002  C 1.9119454000000005 0.8108995000000001  1.7219435000000018 0.7107030000000001  1.517104500000002 0.6929000000000001  C 1.3115245000000018 0.6750875000000001  1.1081675000000022 0.7418838999999999  0.9522915000000021 0.8769625000000001  C 0.7971736000000016 1.0120411000000002  0.703657500000002 1.2050165000000002  0.6925235000000018 1.4105965  C 0.6821327800000017 1.6161765000000003  0.7548663000000015 1.8180514999999997  0.8958805000000014 1.9687215  L 6.542490500000003 8.499971500000001  L 0.8958805000000023 15.031221500000001  C 0.7548644000000024 15.1818858  0.6821305000000022 15.383025500000002  0.6925235000000027 15.5886055  C 0.7036561700000021 15.794926499999999  0.7971717000000025 15.987168500000003  0.9522915000000021 16.122239500000003  C 1.1081504000000022 16.2580591  1.3115055000000027 16.3241145  1.517104500000003 16.306302000000002  C 1.7219435000000027 16.2884895  1.9119435000000031 16.188294900000002  2.041827500000003 16.028731  L 8.121827500000002 8.998731000000003  C 8.2569061 8.842872100000003  8.322961500000002 8.639517000000001  8.305890000000002 8.434659000000002  Z "
            fill-rule="nonzero"
            stroke="none"
            fill="#f9f9f9"
            transform="matrix(1 0 0 1 269 263 )"
          />
        </g>
      </svg>

      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

interface Props {
  title: string;
  className?: string;
  iconClassName?: string;
  showArrow?: true;
  isDisabled: boolean;
  to?: string | object;
  type?: "button" | "reset" | "submit";
}
const props = defineProps<Props>();
const router = useRouter();
const emit = defineEmits<{
  (e: "onClick"): void;
}>();

function Click() {
  if (props.to) {
    router.push(props.to);
  } else emit("onClick");
}
</script>

<style scoped></style>
