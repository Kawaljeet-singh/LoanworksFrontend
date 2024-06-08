import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";

function useCheckEligibility() {
  const { applicationId } = useGetAppId();

  const toast = useToast();
  const updateApplication = (d: 0) => {
    return axiosInstance.post(`application/check-eligibility/${applicationId}`);
  };
  return useMutation(updateApplication, {
    onError(error, variables, context) {
      toast.error("Something went wrong!");
    },
  });
}

export default useCheckEligibility;
