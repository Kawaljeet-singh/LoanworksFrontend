import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { RouteLocationRaw } from "vue-router";

const useFooterStore = defineStore("footerButtons", () => {
  const faqId = ref<HTMLElement | null>(null);

  function scrollToFAQ() {
    faqId.value.scrollIntoView({ behavior: "smooth" });
  }
  return {
    faqId,
    scrollToFAQ,
  };
});

export default useFooterStore;
