import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";

function useGetWaterCraftDetails() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const getVehicleLoanDetails = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosInstance.get(
      `/application/watercraft-details/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getBoatDetails, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        setByName("watercraftDetailsId", data.watercraftDetailsId);
      },
    }
  );
}

export default useGetWaterCraftDetails;
