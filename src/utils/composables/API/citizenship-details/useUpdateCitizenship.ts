import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";
import type { AxiosError } from "axios";

type PostData = {
  citizenshipDetailsId?: number;
  applicationId?: number;
  isFirstPerson: number;
  draftApplicationStep?: string;
  citizenshipStatus?: string;
  citizenshipCountry?: string;
  residencyCountry?: string;
  currentAddress?: string;
  livingSituation?: string;
  yearsCurrentAddress?: number;
  monthsCurrentAddress?: number;
  previousAddress?: string;
  yearsPreviousAddress?: number;
  monthsPreviousAddress?: number;
};

function useUpdateCitizenship() {
  const { setByName } = useApplicationStore();
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const queryClient = useQueryClient();
  const toast = useToast();
  const mutateApplication = async (postData: PostData) => {
    const { isFirstCitizenExits, isSecondCitizenExits } =
      applicationStore.value;
    if (
      (isFirstCitizenExits && postData.isFirstPerson) ||
      (isSecondCitizenExits && postData.isFirstPerson === 0)
    ) {
      return axiosInstance.put(`/application/citizenship-details/step-2`, {
        applicationId,
        ...postData,
      });
    }
    const res = await axiosInstance.post(
      `/application/citizenship-details/step-1`,
      { applicationId, ...postData }
    );
    return res;
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstCitizenExits", true);
      } else setByName("isSecondCitizenExits", true);
    },
    onError(error: AxiosError, payload, context) {
      if (error.response.status === 409) {
        if (payload.isFirstPerson) {
          setByName("isFirstCitizenExits", true);
        } else setByName("isSecondCitizenExits", true);
      }

      toast.error("Something went wrong");
    },
  });
}

export default useUpdateCitizenship;
