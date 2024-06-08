import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import useGetAppId from "../../useGetAppId";
import useVehicleStore from "@/stores/useVehicleStore";

function useGetVehicleLoan() {
  const { applicationId } = useGetAppId();
  const { setByName } = useApplicationStore();
  const { setByName: setVehicle } = useVehicleStore();

  const getVehicleLoanDetails = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosInstance.get(
      `/application/vehicle-loan/${applicationId}`
    );
    return res.data[0];
  };
  return useQuery(
    [QUERY_KEY.getVehicleLoan, applicationId],
    getVehicleLoanDetails,
    {
      onSuccess(data) {
        setByName("vehicleLoanAppId", data.vehicleLoanAppId);
        setVehicle("categoryOfVehicle", data.vehicleType);
      },
    }
  );
}

export default useGetVehicleLoan;
