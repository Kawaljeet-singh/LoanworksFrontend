import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";

function useGetCarDetails() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const getVehicleLoanDetails = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosInstance.get(
      `/application/car-details/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getCarDetails, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        if (data) {
          setByName("carDetailsId", data.carDetailsId);
        }
      },
    }
  );
}

export default useGetCarDetails;
