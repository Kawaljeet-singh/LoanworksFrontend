import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";

type PostData = {
  applicationId?: number;
  draftApplicationStep?: string;
  receivedOvertimePay?: number;
  isFirstPerson: number;
  overtimePay?: number;
  receivedBonus?: number;
  bonus?: number;
  receivedGovtAllowance?: number;
  govtAllowance?: number;
  expectedFutureChanges?: number;
  futurePlans?: string;
  retirementPlans?: string;
  bankSalaryDescription?: string;
  paidFrequency?: string;
  firstApplicantIncomeConfirmed?: number;
  secondApplicantIncomeConfirmed?: number;
  incomeReviewed?: number;
  expensesReviewed?: number;
  liabilitiesReviewed?: number;
};

function useUpdateIncomeDetails() {
  const { setByName } = useApplicationStore();
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const mutateApplication = async (postData: PostData) => {
    const { isFirstIncome, isSecondIncome } = applicationStore.value;
    if (
      (isFirstIncome && postData.isFirstPerson) ||
      (isSecondIncome && postData.isFirstPerson === 0)
    ) {
      return axiosInstance.put(`/application/income-details/step-2`, {
        applicationId,
        isFirstPerson: 1,

        ...postData,
      });
    }
    const res = await axiosInstance.post(`/application/income-details/step-1`, {
      applicationId,
      isFirstPerson: 1,
      ...postData,
    });
    if (!res) throw new Error();
    return res;
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      if (payload.isFirstPerson) {
        setByName("isFirstIncome", true);
      } else if (payload.isFirstPerson == 0) setByName("isSecondIncome", true);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong");
    },
  });
}

export default useUpdateIncomeDetails;
