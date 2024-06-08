import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../../useGetAppId";

type Props = {
  isFirstPerson?: 0 | 1;
};
function useGetEmploymentDetails(params: Props = {}) {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const { setByName } = useApplicationStore();
  const getDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/employment-details/${queryKey[1]}/`,
      { params: queryKey[2] }
    );

    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getEmploymentDetails, applicationId, params],
    getDetails,
    {
      onSuccess(data) {
        if (data.length) {
          switch (data[0].isFirstPerson) {
            case 0:
              setByName("isSecondEmployeeExits", true);
              break;
            case 1:
              setByName("isFirstEmployeeExits", true);
              break;

            default:
              break;
          }
        }
      },
    }
  );
}

export default useGetEmploymentDetails;
