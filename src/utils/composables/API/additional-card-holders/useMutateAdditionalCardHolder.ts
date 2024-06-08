import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../../useGetAppId";
import { useToast } from "vue-toastification";
type postData = {
  date?: string;
  additionalCardHoldersId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  address: string;
  email: string;
};
export default function useMutateAdditionalCardHolder() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const queryClient = useQueryClient();
  const { applicationId } = useGetAppId();
  const toast = useToast();

  const mutateApplication = (postData: postData) => {
    if (postData.additionalCardHoldersId) {
      return axiosInstance.put(`/application/add-card-holders`, {
        applicationId,
        ...postData,
      });
    }
    return axiosInstance.post(`/application/add-card-holders`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (newData) {
        const data = newData?.data;
        queryClient.invalidateQueries([
          QUERY_KEY.getAdditionalCardHolders,
          applicationId,
        ]);
        // queryClient.setQueryData(
        //   [
        //     QUERY_KEY.getAdditionalCardHolders,
        //     applicationStore.value.applicationId,
        //   ],

        //   (oldData: postData[]) => {
        //     const filtered = oldData.filter(
        //       (h) =>
        //         h.additionalCardHoldersId !== payload.additionalCardHoldersId
        //     );
        //     return [...filtered, data];
        //   }
        // );
      }
    },
    onError: () => {
      toast.error("Unable to Add Card Holder");
    },
  });
}
