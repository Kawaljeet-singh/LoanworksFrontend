import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  invoiceNumber?: number;
  gstAmount?: number;
  stampDuty?: number;
  totalPurchaseAmount?: number;
  depositPaidAmount?: number;
  tradeInAmount?: number;
};

function useUpdateSalesDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { saleDetails } = applicationStore.value;
    if (saleDetails) {
      return axiosInstance.put(`/application/sale-details/watercraft/step-2`, {
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/sale-details/watercraft/step-1`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("saleDetails", true);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateSalesDetails;
