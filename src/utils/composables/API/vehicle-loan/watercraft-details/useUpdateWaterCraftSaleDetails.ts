import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
type PostData = {
  saleId?: number;
  draftApplicationStep?: string;
  invoiceNumber?: number;
  gstAmount?: number;
  stampDuty?: number;
  totalPurchaseAmount?: number;
  depositPaidAmount?: number;
  tradeInAmount?: number;
  vehicleLoanAppId?: number;
};

function useUpdateWaterCraftSaleDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { vehicleLoanAppId } = applicationStore.value;
  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    return axiosInstance.put(`/application/sale-details/watercraft/step-2`, {
      vehicleLoanAppId,

      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("watercraftDetailsId", data.data.watercraftDetailsId);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateWaterCraftSaleDetails;
