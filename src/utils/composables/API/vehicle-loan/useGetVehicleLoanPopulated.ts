import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import useGetAppId from "../../useGetAppId";

function useGetVehicleLoanPopulated() {
  const { applicationId } = useGetAppId();

  const getVehicleLoanDetails = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosInstance.get(
      `/application/vehicle-loan-details/${applicationId}`
    );

    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getVehicleLoan, "populated"],
    getVehicleLoanDetails
  );
}

export default useGetVehicleLoanPopulated;
