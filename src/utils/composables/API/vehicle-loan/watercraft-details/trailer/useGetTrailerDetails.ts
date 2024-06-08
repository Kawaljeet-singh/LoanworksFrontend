import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

function useGetTrailerDetails() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const getVehicleLoanDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/trailer-details/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getTrailerDetails, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        setByName("trailerId", data.trailerId);
      },
    }
  );
}

export default useGetTrailerDetails;
