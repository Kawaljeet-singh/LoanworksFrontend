import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  carDetailsId?: number;
  draftApplicationStep?: string;
  vehicleLoanAppId?: number;

  vehicleCondition?: string;
  yearOfManufacture?: string;
  make?: string;
  model?: string;
  varient?: string;
  car?: string;
  optionsId?: number;
  registrationNumber?: string;
  registeredState?: string;
  vin?: string;
  travelledDistance?: number;
  onRoadCost?: number;
  luxuryCarTax?: number;
  invoiceNumber?: number;
  gstAmount?: number;
  stampDuty?: number;
  totalPurchaseAmount?: number;
  depositPaidAmount?: number;
  tradeInAmount?: number;
};

function useUpdateCarDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { vehicleLoanAppId, carDetailsId } = applicationStore.value;

    if (carDetailsId) {
      return axiosInstance.put(`/application/car-details/step-2`, {
        vehicleLoanAppId,
        carDetailsId,
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/car-details/step-1`, {
      vehicleLoanAppId,
      carDetailsId,
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("carDetailsId", data.data.carDetailsId);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateCarDetails;
