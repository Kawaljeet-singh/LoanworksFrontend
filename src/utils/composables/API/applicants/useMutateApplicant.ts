import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../../useGetAppId";
type postData = {
  applicantDetailsId?: number;
  applicationId?: number;
  draftApplicationStep?: string;
  firstApplicantFirstName?: string;
  firstApplicantLastName?: string;
  firstApplicantEmail?: string;
  firstApplicantMobileNumber?: string;
  secondApplicantFirstName?: string;
  secondApplicantLastName?: string;
  secondApplicantEmail?: string;
  secondApplicantMobileNumber?: string;
};
export default function useMutateApplicant() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const queryClient = useQueryClient();

  const mutateApplication = async (postData: postData) => {
    const res = await axiosInstance.post(
      `/application/applicant-details/step-2`,
      { applicationId, ...postData }
    );
    if (!res) throw new Error();
    return res;
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
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
  });
}
