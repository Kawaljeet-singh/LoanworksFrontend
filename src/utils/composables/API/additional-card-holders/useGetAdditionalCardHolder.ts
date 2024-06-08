import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
import useGetAppId from "../../useGetAppId";

export default function useGetAdditionalCardHolders() {
  const { applicationId } = useGetAppId();

  const getCreditCardDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/add-card-holders/${queryKey[1]}`
    );

    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getAdditionalCardHolders, applicationId],
    getCreditCardDetails
  );
}
