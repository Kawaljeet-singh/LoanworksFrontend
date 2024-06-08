import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";
type postData = {
  additionalCardHoldersId: number;
};
export default function useDropAdditionalCardHolder() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const queryClient = useQueryClient();
  const toast = useToast();

  const dropCardHolder = async (postData: postData) => {
    const res = await axiosInstance.delete(`/application/add-card-holders`, {
      data: postData,
    });

    if (!res) throw new Error();
    return res;
  };
  return useMutation(dropCardHolder, {
    onError: (error, variables, context) => {
      console.log(error);

      toast.error("Unable to Delete Card Holder");
    },
    onSuccess: (newData, payload) => {
      queryClient.setQueryData(
        [QUERY_KEY.getAdditionalCardHolders, applicationId],
        (oldData: postData[]) => {
          const updateList = oldData.filter(
            (h) => h.additionalCardHoldersId !== payload.additionalCardHoldersId
          );

          return updateList;
        }
      );
    },
  });
}
