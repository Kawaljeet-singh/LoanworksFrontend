import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  engineId?: number;
  draftApplicationStep?: string;
  engineType?: string;
  engine?: string;
  yearOfManufacture?: string;
  make?: string;
  model?: string;
  varient?: string;
  engineNumber?: string;
  registeredState?: string;
  watercraftDetailsId?: number;
};

function useUpdateEngineDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { watercraftDetailsId, engineId, vehicleLoanAppId } =
      applicationStore.value;
    if (engineId) {
      return axiosInstance.put(`/application/engine-details/step-2`, {
        watercraftDetailsId,
        engineId,
        vehicleLoanAppId,
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/engine-details/step-1`, {
      watercraftDetailsId,
      engineId,
      vehicleLoanAppId,
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("engineId", data.data.engineId);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useUpdateEngineDetails;
