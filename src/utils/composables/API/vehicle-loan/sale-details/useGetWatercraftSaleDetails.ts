import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

function useGetWatercraftSaleDetails() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const getVehicleLoanDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/sale-details/watercraft/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getWatercraftSaleDetails, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        if (data.saleId) setByName("saleDetails", data.saleId);
      },
    }
  );
}

export default useGetWatercraftSaleDetails;
