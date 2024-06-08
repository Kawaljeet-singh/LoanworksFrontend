import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";
import type { AxiosError } from "axios";
type PostData = {
  vehicleLoanAppId?: number;
  applicationId?: number;
  vehicleType?: string;
  vehicleSubType?: string;
  vehicleCondition?: string;
  draftApplicationStep?: string;
  requestedAmount?: number;
  requestedYears?: number;
  loanPurpose?: string;
  repaymentFrequency?: string;
  annualIncome?: number;
  maritalStatus?: string;
  numberOfDependents?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  mobileNumber?: string;
  currentLender?: string;
  currentRate?: number;
  totalLoanLimit?: number;
  productId?: number;
  carDetailsId?: number;
  watercraftDetailsId?: number;
};

function useUpdateVehicleLoan() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { vehicleLoanAppId } = applicationStore.value;
    if (vehicleLoanAppId) {
      return axiosInstance.put(`/application/vehicle-loan/step-2`, {
        vehicleLoanAppId,
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/vehicle-loan/step-1`, {
      vehicleLoanAppId,
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("vehicleLoanAppId", data.data.vehicleLoanAppId);
    },
    onError(error: AxiosError, variables, context) {
      if (error.response.status === 409) setByName("vehicleLoanAppId", 1);
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateVehicleLoan;
