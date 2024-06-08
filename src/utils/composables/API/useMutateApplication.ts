import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../useGetAppId";

type postData = {
  applicationId?: number;
  applicationStatus?: string;
  applicationType?: string;
  draftApplicationStep?: string;
  borrowerId?: number;
  clientId?: string;
  caseId?: string;
  sourceId?: string;
  userId?: number;
  isJointApplication?: number;
  idType?: string;
};

function useMutateApplication() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const handleMutate = async (postData: postData) => {
    if (applicationId) {
      return axiosInstance.put(`/application/id`, {
        applicationId,
        ...postData,
      });
    }

    return axiosInstance.post("/application", {
      applicationId,
      ...postData,
    });
  };
  return useMutation(handleMutate, {
    onSuccess: (res, payload) => {
      //
    },
  });
}
export default useMutateApplication;
