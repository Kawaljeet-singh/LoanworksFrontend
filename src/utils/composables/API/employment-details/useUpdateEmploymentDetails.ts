import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";

type PostData = {
  employmentDetailsId?: number;
  applicationId?: number;
  draftApplicationStep?: string;
  currentEmpName?: string;
  currentEmpIndustry?: string;
  currentOccupation?: string;
  currentEmploymentStatus?: string;
  currentAnnualIncome?: number;
  currentEmpYears?: number;
  currentEmpMonths?: number;
  previousEmpName?: string;
  previousEmpIndustry?: string;
  previousEmploymentStatus?: string;
  previousEmpYears?: number;
  previousEmpMonths?: number;
  isFirstPerson: 0 | 1;
};

function useUpdateEmploymentDetails() {
  const { setByName } = useApplicationStore();
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const mutateApplication = async (postData: PostData) => {
    const { isFirstEmployeeExits, isSecondEmployeeExits } =
      applicationStore.value;
    if (
      (isFirstEmployeeExits && postData.isFirstPerson) ||
      (isSecondEmployeeExits && !postData.isFirstPerson)
    ) {
      return axiosInstance.put(`/application/employment-details/step-2`, {
        applicationId,
        ...postData,
      });
    }
    const res = await axiosInstance.post(
      `/application/employment-details/step-1`,
      { applicationId, ...postData }
    );
    if (!res) throw new Error();
    return res;
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstEmployeeExits", true);
      } else if (payload.isFirstPerson == 0)
        setByName("isSecondEmployeeExits", true);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong");
    },
  });
}

export default useUpdateEmploymentDetails;
