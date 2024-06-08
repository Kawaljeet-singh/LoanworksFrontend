import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";
type postData = {
  applicationId?: number;
  userId?: number;
  isFirstPerson: number;
  draftApplicationStep?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  address?: string;
  email?: string;
  mobileNumber?: string;
  maritalStatus?: string;
  numberOfDependents?: number;
  isSecondPersonPartner?: number;
};
export default function useMutatePersonalDetails() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const queryClient = useQueryClient();
  const toast = useToast();
  const mutateApplication = async (postData: postData) => {
    const { isFirstPersonExits, isSecondPersonExits } = applicationStore.value;
    if (
      (isFirstPersonExits && postData.isFirstPerson) ||
      (isSecondPersonExits && postData.isFirstPerson == 0)
    ) {
      return axiosInstance.put(`/application/personal-details`, {
        applicationId,
        ...postData,
      });
    }

    return axiosInstance.post(`/application/personal-details`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstPersonExits", true);
      } else if (payload.isFirstPerson === 0)
        setByName("isSecondPersonExits", true);
      //   const data = newData.data;
      //   queryClient.setQueryData(
      //     [
      //       QUERY_KEY.getAdditionalCardHolders,
      //       applicationStore.value.applicationId,
      //     ],
      //     (oldData: unknown[]) => {
      //       return [...oldData, data];
      //     }
      //   );
    },
    onError(err: AxiosError, variables, context) {
      toast.error("Something went wrong");
    },
  });
}
