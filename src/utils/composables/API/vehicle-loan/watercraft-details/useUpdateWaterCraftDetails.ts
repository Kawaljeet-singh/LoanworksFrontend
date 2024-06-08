import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  readonly watercraftDetailsId?: number;
  draftApplicationStep?: string;
  readonly vehicleLoanAppId?: number;
  vehicleType?: string;
  vehicleSubType?: string;
  yearOfManufacture?: string;
  make?: string;
  model?: string;
  varient?: string;
  boat?: string;
  hullNumber?: string;
  officialNumber?: string;
  registeredNumber?: string;
  registeredState?: string;
  engineNumber?: string;
  readonly trailerId?: number;
  readonly engineId?: number;
};

function useUpdateWaterCraftDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { vehicleLoanAppId, watercraftDetailsId } = applicationStore.value;
    if (watercraftDetailsId) {
      return axiosInstance.put(`/application/watercraft-details/step-2`, {
        vehicleLoanAppId,
        watercraftDetailsId,
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/watercraft-details/step-1`, {
      vehicleLoanAppId,
      watercraftDetailsId,
      applicationId,
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

export default useUpdateWaterCraftDetails;
