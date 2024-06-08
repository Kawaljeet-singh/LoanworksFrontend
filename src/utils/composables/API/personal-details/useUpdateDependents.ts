import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
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
  isSecondPersonPartner?: number;
  ages: { age: number }[];
};

function useUpdateDependents() {
  const { setByName } = useApplicationStore();
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const mutateApplication = async (postData: postData) => {
    const { isFirstPersonExits, isSecondPersonExits } = applicationStore.value;
    if (
      (isFirstPersonExits && postData.isFirstPerson) ||
      (isSecondPersonExits && !postData.isFirstPerson)
    ) {
      return axiosInstance.put(`/application/personal-dependents`, {
        applicationId,
        ...postData,
      });
    }

    return axiosInstance.post(`/application/personal-dependents`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstPersonExits", true);
      } else setByName("isSecondPersonExits", true);
    },
    onError(err: AxiosError, payload, context) {
      if (err.response.status === 409) {
        if (payload.isFirstPerson) {
          setByName("isFirstPersonExits", true);
        } else setByName("isSecondPersonExits", true);
      } else toast.error("Something went wrong");
    },
  });
}

export default useUpdateDependents;
