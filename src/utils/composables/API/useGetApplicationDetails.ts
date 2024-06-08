import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
import useGetAppId from "../useGetAppId";

function useGetApplicationDetails() {
  const { applicationId } = useGetAppId();
  const getCreditCardDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(`/application/${queryKey[1]}`);

    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getApplicationDetails, applicationId],
    getCreditCardDetails
  );
}

export default useGetApplicationDetails;
