import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import { useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
type postData = {
  applicationId?: number;
  isFirstPerson: number;
  dlFirstName?: string;
  dlMiddleName?: string;
  dlLastName?: string;
  dldob?: string;
  dlLicenseNumber?: string;
  dlState?: string;
  dlExpiryDate?: string;
  dlVerified?: 0 | 1;
  passportGivenName?: string;
  passportLastName?: string;
  passportExpiryDate?: string;
  passportNumber?: string;
  passportVerified?: 0 | 1;
  medicareNumber?: string;
  medicareReferenceNumber?: 0 | 1;
  medicareCardType?: string;
  medicareVerified?: 0 | 1;
};

function useUpdateIdentity() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { isFirstPersonIdentity, isSecondPersonIdentity } =
    applicationStore.value;
  const { applicationId } = useGetAppId();
  const toast = useToast();
  const mutateApplication = async (postData: postData) => {
    if (
      (isFirstPersonIdentity && postData.isFirstPerson) ||
      (isSecondPersonIdentity && !postData.isFirstPerson)
    ) {
      return axiosInstance.put(`/application/identity-details`, {
        applicationId,
        ...postData,
      });
    }

    return axiosInstance.post(`/application/identity-details`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstPersonIdentity", true);
      } else setByName("isSecondPersonIdentity", true);
    },
    onError(err: AxiosError, variables, context) {
      if (err.response.status === 409) {
        if (variables.isFirstPerson) {
          setByName("isFirstPersonIdentity", true);
        } else setByName("isSecondPersonIdentity", true);
      } else toast.error("Something went wrong");
    },
  });
}

export default useUpdateIdentity;
