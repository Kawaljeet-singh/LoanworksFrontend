import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
import axiosInstance from "../../axiosInstance";
import useGetAppId from "../useGetAppId";

export default function useGetCreditApplicationDetails() {
  const { applicationId } = useGetAppId();
  const getCreditCardDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/credit-card/${queryKey[1]}`
    );

    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getCreditApplicationDetails, applicationId],
    getCreditCardDetails
  );
}
