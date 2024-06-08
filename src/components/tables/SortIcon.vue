<template>
  <span class="wrapper">
    <span
      :class="[
        'caret',
        dir === 'asc' && 'tw-text-white',
        dir === 'desc' && 'tw-rotate-180',
      ]"
      role="img"
      aria-label="caret-up"
    >
      <svg
        fill="currentColor"
        height="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330"
        xml:space="preserve"
      >
        <path
          id="XMLID_29_"
          d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
	C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
	c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"
        />
      </svg>
    </span>
    <!-- <span
      :class="[
        'caret',
        dir === 'desc' ? 'tw-text-white' : 'tw-text-primary-500',
      ]"
      role="img"
      aria-label="caret-down"
    >
      <svg
        viewBox="0 0 1024 1024"
        width="10px"
        focusable="false"
        data-icon="caret-down"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
        ></path>
      </svg>
    </span> -->
  </span>
</template>

<script setup lang="ts">
type Props = {
  dir: string | boolean;
};
defineProps<Props>();
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  top: 1px;
}

.caret {
  flex-shrink: 0;
  position: relative;
}
.caret:first-of-type {
  top: 2px;
}
.caret :last-of-type {
  bottom: 2px;
}
</style>
