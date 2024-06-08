import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../useGetAppId";

type postData = {
  creditCardAppId?: number;
  applicationId?: number;
  productId?: number;
  draftApplicationStep?: string;
  preferredLimit?: number;
  annualIncome?: number;
  monthlyMortgageRepayments?: number;
  monthlyPersonalLoanRepayments?: number;
  existingCreditCardLimit?: number;
  firstPersonMaritalStatus?: string;
  firstPersonNumberOfDependents?: number;
  firstPersonAgeOfDependents?: string;
  amount?: number;
  isSecondPersonPartner?: number;
  secondPersonMaritalStatus?: string;
  secondPersonNumberOfDependents?: number;
  secondPersonAgeOfDependents?: string;
};

export default function useMutateCreditApplicationDetails() {
  const { setByName } = useApplicationStore();
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { creditCardAppId } = applicationStore.value;
  const { applicationId } = useGetAppId();

  const queryClient = useQueryClient();

  const mutateApplication = (postData: postData) => {
    if (creditCardAppId) {
      return axiosInstance.put(`/application/credit-card/step-2`, {
        creditCardAppId,
        applicationId,
        ...postData,
      });
    } else
      return axiosInstance.post(`/application/credit-card/step-1`, {
        creditCardAppId,
        applicationId,
        ...postData,
      });
  };
  const {
    mutate: mutateCreditApplication,
    isSuccess: isSuccessMutateCreditApplication,
  } = useMutation(mutateApplication, {
    onSuccess: (newData, variables, context) => {
      setByName("creditCardAppId", newData.data.creditCardAppId);
      queryClient.setQueryData(
        [
          QUERY_KEY.getCreditApplicationDetails,
          applicationStore.value.creditCardAppId,
        ],
        () => {
          return newData;
        }
      );
      // queryClient.invalidateQueries(QUERY_KEY.getCreditApplicationDetails);
    },
  });
  return {
    mutateCreditApplication,
    isSuccessMutateCreditApplication,
  };
}
