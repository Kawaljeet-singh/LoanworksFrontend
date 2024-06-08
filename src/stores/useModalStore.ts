import ProductFilterModalVue from "@/components/modals/ProductFilterModal.vue";
import ReturnRateQuoteModal from "@/components/modals/ReturnRateQuotesModal.vue";
import SaveDraft from "@/components/modals/SaveDraftModal.vue";
import SendKeyFacts from "@/components/modals/SendKeyFactsModal.vue";
import VerifyOTPModal from "@/components/modals/VerifyOTPModal.vue";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

const useModalStore = defineStore("modalStore", () => {
  const isOpen: Ref<boolean> = ref();
  const curComponent = ref<keys>();
  const toggelModel = () => {
    isOpen.value = !isOpen.value;
  };

  const components = {
    SaveDraft: SaveDraft,
    SendKeyFacts: SendKeyFacts,
    ProductFilter: ProductFilterModalVue,
    ReturnRateQuoteModal: ReturnRateQuoteModal,
    VerifyOTPModal: VerifyOTPModal,
  };
  type keys = keyof typeof components;
  const OpenModal = (component: keys) => {
    curComponent.value = component;
    toggelModel();
  };

  return { isOpen, toggelModel, curComponent, OpenModal, components };
});

export default useModalStore;
