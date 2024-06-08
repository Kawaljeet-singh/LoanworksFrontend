import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  supplierId?: number;
  bussinessName?: string;
  bussinessABN?: string;
  supplierAddress?: string;
  vehicleLoanAppId?: number;
};

function useUpdateSupplierDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { vehicleLoanAppId } = applicationStore.value;
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    return axiosInstance.post(`/application/supplier-details`, {
      vehicleLoanAppId,
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      //
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateSupplierDetails;
