import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

function useGetEngineDetails() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const getVehicleLoanDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/engine-details/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getEngineDetails, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        setByName("engineId", data.engineId);
      },
    }
  );
}

export default useGetEngineDetails;
