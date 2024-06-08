import { defineStore } from "pinia";
import { reactive } from "vue";
type store = {
  email: string;
  mobileNumber: string;
};
const useModalStore = defineStore("saveDraft", () => {
  const customerDetails: store = reactive({
    email: "",
    mobileNumber: "",
  });
  function setByName<K extends keyof store>(name: K, value: store[K]) {
    customerDetails[name] = value;
  }

  return { customerDetails, setByName };
});

export default useModalStore;
