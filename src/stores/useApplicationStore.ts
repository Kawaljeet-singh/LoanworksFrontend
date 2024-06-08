import { defineStore } from "pinia";
import { reactive } from "vue";
interface store {
  creditCardAppId: number;
  draftApplicationStep: string;
  vehicleLoanAppId: number;
  carDetailsId: number;
  supplierId: number;
  productId: number;
  watercraftDetailsId: number;
  trailerId: number;
  engineId: number;
  saleId: number;
  isFirstPersonExits: boolean;
  isSecondPersonExits: boolean;
  isFirstCitizenExits: boolean;
  isSecondCitizenExits: boolean;
  isFirstEmployeeExits: boolean;
  isSecondEmployeeExits: boolean;
  isFirstPersonIdentity: boolean;
  isSecondPersonIdentity: boolean;
  isFirstIncome: boolean;
  isSecondIncome: boolean;
  saleDetails: boolean;
}

export interface CustomerDetail {
  customerDetailsId: number;
  applicationId: number;
  draftApplicationStep: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  address: string;
  email: string;
  mobile: string;
  userId: number;
}

const useApplicationStore = defineStore("applicationStore", () => {
  const applicationStore: store = reactive({
    creditCardAppId: 0,
    draftApplicationStep: "",
    vehicleLoanAppId: 0,
    carDetailsId: 0,
    watercraftDetailsId: 0,
    productId: 0,
    supplierId: 0,
    trailerId: 0,
    engineId: 0,
    saleId: 0,
    isFirstPersonExits: false,
    isSecondPersonExits: false,
    isFirstCitizenExits: false,
    isSecondCitizenExits: false,
    isFirstEmployeeExits: false,
    isSecondEmployeeExits: false,
    isFirstPersonIdentity: false,
    isSecondPersonIdentity: false,
    isFirstIncome: false,
    isSecondIncome: false,
    saleDetails: false,
  });

  function setByName<K extends keyof store>(name: K, value: store[K]) {
    applicationStore[name] = value;
  }

  return {
    applicationStore,

    setByName,
  };
});

export default useApplicationStore;
