import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

type PostData = {
  trailerId?: number;
  draftApplicationStep?: string;
  watercraftDetailsId?: number;
  yearOfManufacture?: string;
  make?: string;
  model?: string;
  varient?: string;
  hullNumber?: string;
  registeredState?: string;
  trailer?: string;
};

export default function useUpdateTrailerDetail() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (postData: PostData) => {
    const { watercraftDetailsId, trailerId, vehicleLoanAppId } =
      applicationStore.value;
    if (trailerId) {
      return axiosInstance.put(`/application/trailer-details/step-2`, {
        watercraftDetailsId,
        trailerId,
        vehicleLoanAppId,
        applicationId,
        ...postData,
      });
    }

    return axiosInstance.post(`/application/trailer-details/step-1`, {
      watercraftDetailsId,
      trailerId,
      vehicleLoanAppId,
      applicationId,
      ...postData,
    });
  };
  return useMutation(updateApplication, {
    onSuccess(data, variables, context) {
      setByName("trailerId", data.data.trailerId);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}
